import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy — sideby",
};

export default function PrivacyPage() {
  return (
    <div className="pageShell">
      <Nav />

      <main className={styles.container}>
        <h1>Privacy Policy</h1>
        <div className={styles.updated}>Last updated: 2026</div>

        <p>
          Your privacy matters to us. This Privacy Policy explains how{" "}
          <strong>sideby</strong> collects, uses, and safeguards your
          information when you interact with our platform.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us when creating an
          account, updating your profile, participating in split
          transactions, or communicating with us.
        </p>
        <ul>
          <li>Account credentials (name, email, phone number)</li>
          <li>Transaction history and split records</li>
          <li>Direct communications and support inquiries</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use your data solely to provide, secure, and improve our
          services, facilitate transactions, verify members, and communicate
          critical updates regarding your account.
        </p>

        <h2>3. Data Protection &amp; Sharing</h2>
        <p>
          We do not sell your personal data. Information is only shared with
          verified payment processors and essential service providers
          strictly to execute transactions securely.
        </p>

        <h2>4. Contact</h2>
        <p>
          If you have any questions regarding your privacy, please reach out
          to us at privacy@sideby.app.
        </p>
      </main>

      <Footer />
    </div>
  );
}
