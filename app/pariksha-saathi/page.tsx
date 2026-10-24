import type { Metadata } from "next";
import ParikshaSaathiPrototype from "../components/ParikshaSaathiPrototype";

export const metadata: Metadata = {
  title: "Pariksha Saathi: Concept Prototype",
  description:
    "Concept prototype, in English and Hindi: a weekly Hindi board-practice test distributed through a newspaper's education page, paid for by sponsors, schools and parents."
};

export default function ParikshaSaathiPage() {
  return <ParikshaSaathiPrototype />;
}
