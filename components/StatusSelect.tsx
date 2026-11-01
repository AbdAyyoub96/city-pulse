"use client";

import { useRef } from "react";
import { updateStatus } from "@/app/admin/actions";
import { STATUSES, type LeadStatus } from "@/lib/leads";

export function StatusSelect({
  id,
  status,
}: {
  id: string;
  status: LeadStatus;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form action={updateStatus} ref={formRef}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        aria-label="حالة الطلب"
        onChange={() => formRef.current?.requestSubmit()}
      >
        {Object.entries(STATUSES).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </form>
  );
}
