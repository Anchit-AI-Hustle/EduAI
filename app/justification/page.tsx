import type { Metadata } from "next";
import EveryYearJustification from "../components/EveryYearJustification";

export const metadata: Metadata = {
  title: "Venture Justification | EveryYear",
  description:
    "Six core venture questions answered from primary data, in English and Hindi: who uses it, current alternatives, bottom-up market size, honest differentiation, willingness to pay, and the unsolved problem."
};

export default function JustificationPage() {
  return <EveryYearJustification />;
}
