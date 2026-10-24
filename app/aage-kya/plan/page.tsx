import type { Metadata } from "next";
import AageKyaPlan from "../../components/AageKyaPlan";

export const metadata: Metadata = {
  title: "Aage Kya: Strategy and Roadmap",
  description:
    "Why Aage Kya, the six venture questions with sources, a dated roadmap with go and stop gates, metrics and risks. English and Hindi."
};

export default function AageKyaPlanPage() {
  return <AageKyaPlan />;
}
