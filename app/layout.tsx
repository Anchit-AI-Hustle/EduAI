import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EveryYear AI School | Cradle-to-Career Individual Year Planner & Skill Graph",
  description:
    "AI-first school covering home learning (0-3), Nursery to Class 12 (CBSE, CISCE, NIOS, State Boards), and competitive/global tracks (JEE, NEET, CUET, UPSC, SAT, ACT, IELTS, TOEFL)."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
