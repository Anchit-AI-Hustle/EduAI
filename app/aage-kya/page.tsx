import type { Metadata } from "next";
import AageKyaPrototype from "../components/AageKyaPrototype";

export const metadata: Metadata = {
  title: "Aage Kya: Concept Prototype",
  description:
    "Concept prototype, in English and Hindi: a free Hindi plan on board-result day (courses, exams, scholarships, verified colleges), paid for by colleges per parent-approved enquiry."
};

export default function AageKyaPage() {
  return <AageKyaPrototype />;
}
