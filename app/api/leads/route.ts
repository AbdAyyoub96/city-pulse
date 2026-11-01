import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { isSpam, toRow, validateLead, type LeadInput } from "@/lib/leads";
import { allow } from "@/lib/rate-limit";

const OK = "تم استلام طلبك بنجاح.";

function clientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || null
  );
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  if (!allow(ip ?? "unknown")) {
    return NextResponse.json(
      { message: "تم إرسال عدد كبير من الطلبات، يرجى المحاولة بعد دقيقة." },
      { status: 429 },
    );
  }

  let input: LeadInput;
  try {
    input = (await request.json()) as LeadInput;
  } catch {
    return NextResponse.json(
      { message: "صيغة الطلب غير صحيحة." },
      { status: 400 },
    );
  }

  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return NextResponse.json(
      { message: "صيغة الطلب غير صحيحة." },
      { status: 400 },
    );
  }

  // Bots that fill the hidden field get the same success reply, so they learn nothing.
  if (isSpam(input)) return NextResponse.json({ message: OK });

  const errors = validateLead(input);
  const first = Object.values(errors)[0];
  if (first)
    return NextResponse.json({ message: first, errors }, { status: 400 });

  const { data, error } = await createServiceClient()
    .from("leads")
    .insert(toRow(input, ip))
    .select("id")
    .single();

  if (error) {
    console.error("Failed to save lead", error);
    return NextResponse.json(
      { message: "تعذّر حفظ الطلب، يرجى المحاولة لاحقاً." },
      { status: 500 },
    );
  }

  return NextResponse.json({ id: data.id, message: OK }, { status: 201 });
}
