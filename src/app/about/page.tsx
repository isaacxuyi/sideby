import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About — sideby",
};

export default function AboutPage() {
  return (
    <div className="pageShell">
      <Nav />

      <main className={styles.container}>
        <h1>Side by better together.</h1>
        <p>
          At <strong>sideby</strong>, we believe the best things in life
          shouldn&apos;t be out of reach just because of the price tag. From
          travel and shared subscriptions to tools, housing, and life
          experiences, splitting costs shouldn&apos;t mean compromising on
          comfort or trust.
        </p>

        <div className={styles.highlightCard}>
          <h3>Our Mission</h3>
          <p>
            To empower individuals to unlock richer experiences, optimize
            their everyday spending, and build trusted shared economies
            without the headaches.
          </p>
        </div>

        <p>
          We&apos;re building the infrastructure that makes pooling resources
          seamless, accountable, and rewarding. Whether you are traveling
          across borders or collaborating across projects, sideby lets you
          share the cost and keep the experience intact.
        </p>
      </main>

      <Footer />
    </div>
  );
}
