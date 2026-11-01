const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const sharp = require("sharp");
const dictionarySource = fs.readFileSync(
  path.join(__dirname, "../lib/i18n/en.ts"),
  "utf8",
);
const compiled = ts.transpileModule(dictionarySource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const context = { exports: {} };
vm.runInNewContext(compiled, context);
const d = context.exports.en;
const escape = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[char],
  );
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#0B1626"/><g fill="none" stroke="#263448"><circle cx="1000" cy="315" r="235"/><circle cx="1000" cy="315" r="175" stroke-dasharray="4 12"/></g><text x="80" y="120" fill="#A3AFBF" font-family="Arial,sans-serif" font-size="23" letter-spacing="3">${escape(d.brand.name)}</text><text x="80" y="260" fill="#FFFFFF" font-family="Arial,sans-serif" font-size="60" font-weight="700">${escape(d.hero.title)}</text><text x="80" y="345" fill="#FF5A36" font-family="Arial,sans-serif" font-size="60" font-weight="700">${escape(d.hero.emphasis)}</text><text x="80" y="430" fill="#FFFFFF" font-family="Arial,sans-serif" font-size="60" font-weight="700">${escape(d.hero.ending)}</text><path d="M0 500h760l20-25 25 65 30-110 35 140 30-70h300" fill="none" stroke="#FF5A36" stroke-width="3"/><text x="80" y="580" fill="#A3AFBF" font-family="Arial,sans-serif" font-size="18">${escape(d.brand.location)}</text></svg>`;
sharp(Buffer.from(svg))
  .png()
  .toFile(path.join(__dirname, "../public/opengraph.png"))
  .then(() => console.log("Generated public/opengraph.png"))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
