// Tests de caractérisation : ils figent le comportement ACTUEL de report.js.
// Ils doivent rester verts après le refactoring (exercice 1).
import { describe, expect, it } from "vitest";
import { generateReport } from "./report.js";

const tasks = [
  { title: "Maquette", project: "site-web", status: "done", dueDate: "2026-10-10" },
  { title: "Formulaire", project: "site-web", status: "in_progress", dueDate: "2026-10-24" },
  { title: "Menu mobile", project: "site-web", status: "todo", dueDate: "2026-10-20" },
  { title: "Login", project: "mobile", status: "todo", dueDate: "2026-10-18" },
];

describe("generateReport (texte)", () => {
  it("produit le rapport complet", () => {
    expect(generateReport(tasks, "2026-10-22")).toBe(
      [
        "RAPPORT DU 2026-10-22",
        "========================",
        "",
        "## MOBILE",
        "Avancement : 0/1 (0%)",
        "En retard :",
        "  - Login (échéance 2026-10-18)",
        "",
        "## SITE-WEB",
        "Avancement : 1/3 (33%)",
        "En retard :",
        "  - Maquette (échéance 2026-10-10)",
        "  - Menu mobile (échéance 2026-10-20)",
        "",
        "TOTAL : 1/4 (25%)",
        "",
      ].join("\n"),
    );
  });

  it("filtre par projet et affiche les détails", () => {
    const out = generateReport(tasks, "2026-10-22", { project: "site-web", details: true });
    expect(out).not.toContain("MOBILE");
    expect(out).toContain("  [x] Maquette\n");
    expect(out).toContain("  [~] Formulaire\n");
    expect(out).toContain("  [ ] Menu mobile\n");
  });
});

describe("generateReport (csv)", () => {
  it("produit une ligne par projet", () => {
    expect(generateReport(tasks, "2026-10-22", { format: "csv" })).toBe(
      "projet;total;terminees;taux;en_retard\nmobile;1;0;0;1\nsite-web;3;1;33;2\n",
    );
  });
});
