import type { Metadata } from "next";
import ParikshaSaathiJustification from "../../components/ParikshaSaathiJustification";

export const metadata: Metadata = {
  title: "Pariksha Saathi: Justification",
  description:
    "Why a weekly Hindi board-practice test, sold through a newspaper's print reach and ad desk, is worth piloting: six questions answered from primary data, in English and Hindi."
};

export default function ParikshaSaathiJustificationPage() {
  return <ParikshaSaathiJustification />;
}
