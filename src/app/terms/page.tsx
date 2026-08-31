import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Service — sideby",
};

export default function TermsPage() {
  return (
    <div className="pageShell">
      <Nav />

      <main className={styles.container}>
        <h1>Terms of Service</h1>
        <div className={styles.updated}>Last updated: 2026</div>

        <p>
          By using <strong>sideby</strong>, you agree to comply with and be
          bound by the following terms and conditions.
        </p>

        <h2>1. Account Responsibility</h2>
        <p>
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activities conducted under your
          profile.
        </p>

        <h2>2. Community Conduct</h2>
        <p>
          Members must engage respectfully and honor agreed-upon splits and
          commitments. Misleading members or attempting fraud will result in
          immediate termination of access.
        </p>

        <h2>3. Transactions &amp; Payments</h2>
        <p>
          sideby provides the platform to facilitate group splits and shared
          expenses. Users agree to settle obligations in accordance with
          agreed timelines.
        </p>

        <h2>4. Limitation of Liability</h2>
        <p>
          sideby is not liable for indirect, incidental, or consequential
          damages resulting from platform usage or disputes between users.
        </p>
      </main>

      <Footer />
    </div>
  );
}
