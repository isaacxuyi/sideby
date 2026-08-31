import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StepCard from "@/components/StepCard";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "How It Works — sideby",
};

const STEPS = [
  {
    title: "Create or Discover",
    description:
      "Post an upcoming trip, shared plan, or group purchase—or discover trusted members looking to pool resources.",
  },
  {
    title: "Match & Align",
    description:
      "Coordinate details with verified members. Ensure expectations, timelines, and payment structures match upfront.",
  },
  {
    title: "Split & Enjoy",
    description:
      "Payments and splits are handled transparently. You save money, maximize your budget, and enjoy the experience side by side.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="pageShell">
      <Nav />

      <main className={styles.container}>
        <h1>How sideby works</h1>
        <p className={styles.lead}>
          Sharing expenses and enjoying premium experiences shouldn&apos;t
          involve awkward conversations or messy spreadsheets.
        </p>

        <div className={styles.stepsGrid}>
          {STEPS.map((step, index) => (
            <StepCard
              key={step.title}
              number={index + 1}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
