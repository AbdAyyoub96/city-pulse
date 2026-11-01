import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { en } from "../lib/i18n/en";
import { ar } from "../lib/i18n/ar";

test("translations have identical keys and all required content", () => {
  const shape = (value: unknown): unknown =>
    Array.isArray(value)
      ? value.map(shape)
      : value && typeof value === "object"
        ? Object.fromEntries(
            Object.entries(value).map(([key, item]) => [key, shape(item)]),
          )
        : typeof value;
  expect(shape(ar)).toEqual(shape(en));
  for (const d of [ar, en]) {
    expect(d.services.items).toHaveLength(5);
    d.services.items.forEach((service) =>
      expect(service.bullets).toHaveLength(4),
    );
    expect(d.method.steps.map((step) => step.letter).join("")).toBe("PULSE");
    expect(d.work.cases).toHaveLength(3);
    expect(d.tools.names).toHaveLength(11);
  }
});

for (const [locale, d] of [
  ["en", en],
  ["ar", ar],
] as const) {
  test(`${locale}: document, SEO, responsive layouts and reduced motion`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    mkdirSync("artifacts", { recursive: true });
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`/${locale}`);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute(
        "dir",
        locale === "ar" ? "rtl" : "ltr",
      );
      await expect(page).toHaveTitle(d.meta.title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        d.meta.description,
      );
      await expect(page.locator('link[hreflang="ar"]')).toHaveAttribute(
        "href",
        /\/ar$/,
      );
      await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
        "href",
        /\/en$/,
      );
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
        "content",
        locale === "ar" ? "ar_JO" : "en_US",
      );
      await expect(page.locator(".service-card")).toHaveCount(5);
      await expect(page.locator(".method-timeline > li")).toHaveCount(5);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      expect(
        await page
          .locator(".pulse-run")
          .evaluate((node) => getComputedStyle(node).animationName),
      ).toBe("none");
      if (width === 390 || width === 1440) {
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({
          path: `artifacts/${locale}-${width}.png`,
          fullPage: true,
        });
        if (width === 1440)
          await page.screenshot({ path: `artifacts/${locale}-hero.png` });
      }
    }
    expect(errors).toEqual([]);
  });

  test(`${locale}: mobile menu and language switch retain section`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${locale}`);
    const menu = page.locator(".menu-toggle");
    await expect(menu).toHaveAccessibleName(d.nav.menu);
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await expect(menu).toHaveAccessibleName(d.nav.close);
    await page.keyboard.press("Escape");
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await expect(menu).toBeFocused();
    await menu.click();
    await page
      .locator("#site-navigation")
      .getByRole("link", { name: d.nav.work, exact: true })
      .click();
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator(".language-switch")).toHaveAttribute(
      "href",
      `/${locale === "ar" ? "en" : "ar"}#work`,
    );
    await page.locator(".language-switch").click();
    await expect(page).toHaveURL(
      new RegExp(`/${locale === "ar" ? "en" : "ar"}#work$`),
    );
    await expect(page.locator("#work")).toBeInViewport();
    await page.mouse.wheel(0, 20);
    await page.locator("#contact").evaluate((node) => node.scrollIntoView());
    await expect(page.locator(".language-switch")).toHaveAttribute(
      "href",
      `/${locale}#contact`,
    );
  });

  test(`${locale}: validation, JSON contract, success and server errors`, async ({
    page,
  }) => {
    await page.goto(`/${locale}#contact`);
    const form = page.locator(".lead-form");
    await form.getByRole("button", { name: d.contact.submit }).click();
    await expect(page.locator("#error-fullName")).toHaveText(
      d.contact.errors.fullName,
    );
    await expect(page.locator("#lead-fullName")).toBeFocused();
    await page
      .locator("#lead-fullName")
      .fill(locale === "ar" ? "عميل تجريبي" : "Test customer");
    await page.locator("#lead-phone").fill("+962790000000");
    await page.locator("#lead-company").fill("Example company");
    await page.locator("#lead-email").fill("test@example.com");
    await page.locator("#lead-service").selectOption("automation");
    await page
      .locator("#lead-message")
      .fill("A test request, intercepted locally.");
    await page.route("**/api/leads", async (route) => {
      const payload = route.request().postDataJSON();
      expect(Object.keys(payload).sort()).toEqual(
        [
          "fullName",
          "company",
          "phone",
          "email",
          "service",
          "message",
          "website",
        ].sort(),
      );
      expect(payload.service).toBe("automation");
      expect(payload.website).toBe("");
      await route.fulfill({ status: 201, json: { id: "test-id" } });
    });
    await form.getByRole("button", { name: d.contact.submit }).click();
    await expect(form.getByRole("status")).toHaveText(d.contact.success);
    await expect(page.locator("#lead-fullName")).toHaveValue("");
    await page.unroute("**/api/leads");
    await page.route("**/api/leads", (route) =>
      route.fulfill({
        status: 500,
        json: { message: "Untranslated server detail" },
      }),
    );
    await page.locator("#lead-fullName").fill("Test customer");
    await page.locator("#lead-phone").fill("+962790000000");
    await page.locator("#lead-service").selectOption("websites");
    await form.getByRole("button", { name: d.contact.submit }).click();
    await expect(form.getByRole("alert")).toHaveText(d.contact.error);
    await page.route("**/api/leads", (route) =>
      route.fulfill({ status: 429, json: {} }),
    );
    await form.getByRole("button", { name: d.contact.submit }).click();
    await expect(form.getByRole("alert")).toHaveText(d.contact.rateLimit);
    await page.route("**/api/leads", (route) => route.abort());
    await form.getByRole("button", { name: d.contact.submit }).click();
    await expect(form.getByRole("alert")).toHaveText(d.contact.network);
  });
}

test("admin login keeps its independent document and scoped styles", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/admin/login");
  await expect(page.locator("body")).toHaveClass("admin-page");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator(".admin-card")).toBeVisible();
  expect(
    await page
      .locator(".admin-card")
      .evaluate((node) => getComputedStyle(node).display),
  ).toBe("grid");
  expect(
    await page
      .locator(".admin-card h1")
      .evaluate((node) => parseFloat(getComputedStyle(node).fontSize)),
  ).toBeLessThan(32);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("root defaults to Arabic, unknown locale is 404, API rejects invalid data", async ({
  request,
}) => {
  const home = await request.get("/");
  expect(home.url()).toMatch(/\/ar$/);
  const missing = await request.get("/fr");
  expect(missing.status()).toBe(404);
  const invalid = await request.post("/api/leads", {
    data: { service: "__proto__" },
  });
  expect(invalid.status()).toBe(400);
  const body = await invalid.json();
  expect(body.errors.service).toBeTruthy();
  const nullBody = await request.post("/api/leads", {
    data: "null",
    headers: { "Content-Type": "application/json" },
  });
  expect(nullBody.status()).toBe(400);
  const bot = await request.post("/api/leads", {
    data: { website: "bot.example" },
  });
  expect(bot.status()).toBe(200);
});
