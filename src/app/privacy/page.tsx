import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy — sideby",
  description:
    "How Sideby collects, uses, shares and protects your information.",
};

export default function PrivacyPage() {
  return (
    <div className="pageShell">
      <Nav />

      <main className={styles.container}>
        <h1>Privacy Policy</h1>
        <div className={styles.updated}>
          Last Updated: October 7, 2026 &nbsp;·&nbsp; Effective Date: October 7, 2026
        </div>

        <p>
          At Sideby, we are committed to protecting your privacy. This Privacy
          Policy explains how we collect, use, disclose, and safeguard your
          information when you use the Sideby mobile application and platform.
          This policy operates in strict tandem with our Master Terms of
          Service and Community Standards.
        </p>

        <h2>1. Information We Collect</h2>

        <ul>
          <li>
            <strong>Profile &amp; Identity Data:</strong> Name, email
            address, profile photo, and authentication details (we utilize
            secure hashing and never store or request plain-text passwords).
          </li>
          <li>
            <strong>Financial &amp; Transactional Data:</strong> We collect
            transaction history for your closed-loop utility wallet (capped
            at $2,000.00 USD). Actual payment processing is handled securely
            by independent third-party gateways (e.g., Paystack, Stripe),
            meaning Sideby does not store your raw credit card numbers or
            bank credentials.
          </li>
          <li>
            <strong>Location Data (District-Level):</strong> To facilitate
            nearby cost-splitting, we collect location data. However, to
            protect your privacy and physical safety, Sideby aggregates and
            displays this as broad regional or district-level zones (e.g.,
            Kubwa, Manassas) rather than broadcasting precise live GPS
            pinpoints to other users.
          </li>
          <li>
            <strong>Communications &amp; Metadata:</strong> We collect chat
            logs, match history, and platform interaction metadata.
          </li>
          <li>
            <strong>Usage &amp; Analytics Data (Firebase Analytics,
            optional):</strong> If you opt in, we use Google&rsquo;s
            Firebase Analytics to collect basic app-usage information, such
            as the screens you view, when you sign up or log in (and by
            which method), and key actions like creating a split, requesting
            to join a split, posting in a community forum, or completing
            onboarding. These events carry coarse details only (for example,
            a category or number of seats) and never your name, email
            address, free-text content, or exact location. Events are linked
            to your Sideby account ID. Firebase Analytics also automatically
            collects technical information such as device model, operating
            system, app version, and an app-instance identifier, and may
            infer your approximate region from your IP address. See Section
            5 for how to control this.
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>

        <ul>
          <li>
            <strong>Service Delivery:</strong> To connect you with nearby
            users, facilitate cost-splitting matches, and manage your
            utility wallet.
          </li>
          <li>
            <strong>Automated Trust Metrics:</strong> We analyze platform
            activity, match completion rates, and peer feedback to generate
            algorithmic composite trust scores.
          </li>
          <li>
            <strong>Trust, Safety &amp; Investigations:</strong> As outlined
            in our Terms of Service, we review account activity, metadata,
            and stored communications to investigate reports of severe
            cyberbullying, safety threats, phishing, deepfakes, or financial
            fraud. We do this to ensure community safety without requesting
            user credentials.
          </li>
          <li>
            <strong>Product Improvement (with your consent):</strong> If you
            opt in to analytics, we use it to fix bugs and understand which
            features people use. We do not use analytics data for
            advertising.
          </li>
          <li>
            <strong>Legal Compliance:</strong> To comply with applicable
            laws, respond to legal requests, and protect the rights of
            Sideby and our users.
          </li>
        </ul>

        <h2>3. How We Share Your Information</h2>

        <ul>
          <li>
            <strong>With Other Users:</strong> Once a split request is
            mutually accepted, we share your basic profile, trust score, and
            open a private chat room. Your precise location is never shared.
          </li>
          <li>
            <strong>Third-Party Service Providers:</strong> We share
            necessary data with authorized vendors, such as payment
            processors (Paystack/Stripe), cloud hosting infrastructure
            (e.g., Supabase), and, if you opt in, Google (Firebase
            Analytics) for usage analytics. These vendors are bound by
            strict data processing agreements. Data processed by these
            providers may be stored on servers outside Nigeria, including in
            the United States.
          </li>
          <li>
            <strong>Law Enforcement &amp; Safety Bodies:</strong> In cases
            involving immediate threats to physical safety, human
            exploitation, or child endangerment, we will share data with
            relevant local authorities (e.g., Nigeria Police Force, NAPTIP)
            and international bodies (e.g., NCMEC), as mandated by our
            Community Standards.
          </li>
        </ul>

        <h2>4. Data Security &amp; Retention</h2>

        <p>
          Sideby implements industry-standard administrative, technical, and
          physical security measures to protect your personal information. We
          retain your data only for as long as your account is active or as
          needed to provide you the Services, resolve disputes, and comply
          with legal obligations. Financial transaction records may be kept
          longer as required by tax and accounting laws.
        </p>

        <h2>5. Analytics Choices &amp; Your Controls</h2>

        <ul>
          <li>
            <strong>Analytics is off by default:</strong> Firebase Analytics
            collects nothing unless you accept it in the prompt shown in the
            app.
          </li>
          <li>
            <strong>Change your mind any time:</strong> Go to Security &amp;
            Privacy &rarr; Data sharing in the app. Turning it off stops
            collection and resets the app&rsquo;s analytics data and
            identifier on your device.
          </li>
          <li>
            <strong>No ads, no sale:</strong> Sideby does not run
            advertising trackers and does not sell analytics data.
          </li>
          <li>
            <strong>Download or delete your data:</strong> In Security &amp;
            Privacy you can download a copy of your data or permanently
            delete your account. Some financial transaction records may be
            retained as described in Section 4.
          </li>
        </ul>

        <h2>6. Global Privacy Rights &amp; Jurisdictional Protections</h2>

        <p>
          Depending on your region, you possess specific rights regarding your
          personal data:
        </p>

        <ul>
          <li>
            <strong>Nigerian Users (NDPR):</strong> You have the right to
            access, rectify, or erase your personal data, restrict
            processing, and object to data use under the Nigerian Data
            Protection Regulations.
          </li>
          <li>
            <strong>EU &amp; UK Users (GDPR):</strong> You have the right to
            data portability, the &quot;Right to be Forgotten,&quot; and the
            right to lodge a complaint with a supervisory authority. Sideby
            does not process EU/UK data for automated decision-making that
            produces legal effects without human oversight.
          </li>
          <li>
            <strong>US Users (CCPA/CPRA &amp; State Laws):</strong> You have
            the right to request disclosure of data collection practices,
            request deletion, and opt-out of the &quot;sale&quot; or
            &quot;sharing&quot; of personal data. Sideby does not sell your
            personal data to third-party data brokers.
          </li>
        </ul>

        <h2>7. Children&rsquo;s Privacy</h2>

        <p>
          Sideby is strictly intended for individuals 18 years of age or
          older. We do not knowingly collect personal data from anyone under
          18. If we become aware that we have collected data from a minor, we
          will immediately delete that account and data, and report
          exploitation matters to relevant bodies (e.g., NCMEC) as required.
        </p>

        <h2>8. Third-Party Links &amp; External Scams</h2>

        <p>
          In accordance with our Community Standards on anti-phishing, Sideby
          is not responsible for the privacy practices of external websites.
          If you click a malicious external link or unauthorized third-party
          payment gateway shared by another user, your data falls outside
          Sideby&rsquo;s protection. We actively ban accounts that share such
          links.
        </p>

        <h2>9. Changes to This Privacy Policy</h2>

        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any material changes by updating the &quot;Last Updated&quot;
          date and providing an in-app notification. Continued use of Sideby
          after changes implies acceptance.
        </p>

        <h2>10. Contact Us</h2>

        <p>
          For privacy questions or to exercise your rights, email
          support@sideby.org.
        </p>
      </main>

      <Footer />
    </div>
  );
}