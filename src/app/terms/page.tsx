import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Service — sideby",
  description: "The terms that govern your use of Sideby.",
};

export default function TermsPage() {
  return (
    <div className="pageShell">
      <Nav />

      <main className={styles.container}>
        <h1>Terms of Service</h1>
        <div className={styles.updated}>Last Updated: September 19, 2026</div>

        <p>
          These Terms of Service (&quot;Agreement&quot;) govern your use of
          Sideby. By downloading, accessing, or using our App and Platform, you
          agree to be bound by these Terms, our Privacy Policy, and our
          Community Standards. If you do not agree, do not use the Services.
        </p>

        <div className={styles.noticeBox}>
          <p>
            <strong>IMPORTANT NOTICE: BINDING ARBITRATION &amp; CLASS ACTION WAIVER</strong>
          </p>
          <p>
            THIS AGREEMENT CONTAINS A BINDING ARBITRATION PROVISION AND CLASS
            ACTION WAIVER (SECTION 11) THAT AFFECTS YOUR LEGAL RIGHTS.
          </p>
        </div>

        <h2>1. Closed-Loop Utility Wallet &amp; Non-Banking Status</h2>

        <p>
          Sideby is an activity coordination and social platform, not a bank or
          Money Services Business (MSB). Wallet balances represent closed-loop
          platform utility credits used strictly for settling shared group
          expenses. Credits cannot be transferred outside the Platform or
          redeemed for fiat currency. Maximum stored balances are capped at
          $2,000.00 USD (or local equivalent). Payment processing is handled by
          independent third-party gateways (e.g., Paystack, Stripe).
        </p>

        <h2>2. Community Guidelines &amp; Acceptable Use</h2>

        <p>
          Your use of Sideby is subject to our separate Community Guidelines,
          which are incorporated into these Terms by this reference. You agree
          to comply with all behavioral, financial integrity, synthetic media,
          phishing, and content standards outlined in the Community Guidelines
          when interacting with other users, posting content, or organizing
          meetups.
        </p>

        <h2>3. Account Investigation, Suspension &amp; Identity Verification</h2>

        <p>
          By agreeing to these Terms, you acknowledge and agree that Sideby
          reserves the right, under appropriate and necessary circumstances
          (such as investigations into severe cyberbullying, safety threats,
          phishing, fraud, or violations of our Terms and Community Standards),
          to suspend account access, review account activity stored on the
          platform, or request that you provide information necessary to verify
          your identity through secure, authorized verification channels. Sideby
          will never ask for your password. Such investigations and verification
          requests are exercised solely for the purpose of verifying compliance,
          resolving security breaches, or addressing serious platform
          violations.
        </p>

        <h2>4. User Content, Media Uploads &amp; Platform Disclaimer</h2>

        <p>
          You retain ownership of any content, photos, or data you upload to
          Sideby. By posting content, you grant Sideby a worldwide, royalty-free
          license to display and distribute it within the App. Sideby acts
          purely as a passive software host for User-Generated Content. By
          agreeing to these Terms, you acknowledge and agree that while Sideby
          is not obligated to pre-screen or monitor all user uploads or
          communications, it reserves the right to do so at its discretion to
          ensure platform safety and compliance with these Terms. You assume
          full and sole legal responsibility for all content, text, images, and
          intellectual property you upload, and you release Sideby from any
          liability, claims, or damages arising from user-generated media or
          interactions.
        </p>

        <h2>5. General Regional Location Data &amp; District Disclaimers</h2>

        <p>
          Sideby displays general regional and district-level location data
          (such as Kubwa or Lugbe) to help users discover nearby activities and
          coordinate cost-splitting. By using the App, you consent to our
          processing of general regional location information. You acknowledge
          and agree that Sideby displays broad geographical zones rather than
          precise GPS coordinates, and Sideby is not liable for regional
          location inaccuracies, matching discrepancies, offline meetings, or
          third-party conduct.
        </p>

        <h2>6. Composite Trust Scores &amp; Automated Metrics</h2>

        <p>
          Sideby displays automated composite trust scores based on platform
          activity and peer feedback. By using the Services, you acknowledge
          that these metrics are generated algorithmically and agree that Sideby
          bears no liability for reputation impacts, feedback disputes, or score
          fluctuations.
        </p>

        <h2>7. Purchases, Non-Refundable Credits &amp; Subscriptions</h2>

        <p>
          All wallet top-ups and credit purchases are final and non-refundable.
          Digital credits cannot be exchanged for cash. Subscriptions and
          top-ups are processed via standard mobile app store billing or
          authorized payment gateways.
        </p>

        <h2>8. Disclaimers: Real-World Meetups, Chat Rooms &amp; Post-Match Interactions</h2>

        <p>
          Sideby provides software tools for social coordination and does not
          organize, sponsor, supervise, or insure real-world meetups. Once users
          mutually accept each other&rsquo;s split requests and enter a private
          chat room or direct communication channel, all subsequent
          interactions, messages, agreements, and offline meetups are strictly
          between the participants. Sideby explicitly disclaims all liability
          and responsibility for user communications, chat room content, offline
          personal injury, property damage, harassment, or unlawful acts
          occurring after a match or split is mutually accepted. You agree that
          Sideby is not responsible for the conduct of any user on or off the
          Platform.
        </p>

        <h2>9. Limitation of Liability &amp; Indemnity</h2>

        <p>
          To the maximum extent permitted by applicable law, Sideby, its
          officers, directors, and employees shall not be liable for any
          indirect, incidental, special, or consequential damages. You agree to
          defend, indemnify, and hold Sideby harmless from and against any
          claims, liabilities, damages, and expenses arising out of your breach
          of these Terms, your uploaded content, or your participation in
          meetups.
        </p>

        <h2>10. Governing Law, Jurisdiction &amp; International Application</h2>

        <p>
          To ensure enforceability and compliance across global regions, this
          Agreement is governed by the following laws based on your primary
          country of residence:
        </p>

        <ul>
          <li>
            <strong>For Users in the United States:</strong> These Terms are
            governed by the laws of the State of Delaware and the U.S. Federal
            Arbitration Act (FAA), without regard to conflict of law
            principles. Any legal suits exempt from arbitration shall be
            brought exclusively in the state or federal courts located in
            Delaware.
          </li>
          <li>
            <strong>For Users in the European Union (EU) or United Kingdom
            (UK):</strong> These Terms are governed by the laws of England and
            Wales. However, this governing law selection does not deprive you
            of any mandatory consumer protections or statutory rights granted
            by the laws of your country of residence. You may bring legal
            proceedings in your local competent courts.
          </li>
          <li>
            <strong>For Users in Nigeria and All Other Regions:</strong> These
            Terms are governed by the laws of the Federal Republic of Nigeria,
            without regard to conflict of law principles. Any disputes exempt
            from arbitration shall be resolved exclusively in courts located
            in Abuja, Federal Capital Territory, Nigeria.
          </li>
        </ul>

        <h2>11. Dispute Resolution, Binding Arbitration &amp; Class Action Waiver</h2>

        <p>
          Depending on your jurisdiction, disputes arising out of these Terms or
          the Services will be handled as follows:
        </p>

        <ul>
          <li>
            <strong>US, Nigerian, and Global Users (Excluding EU/UK):</strong>
            You and Sideby agree that any dispute, claim, or controversy will
            be settled by binding individual arbitration. YOU WAIVE ANY RIGHT
            TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE
            ARBITRATION. For US users, arbitration shall be administered by
            the American Arbitration Association (AAA) under its Consumer
            Arbitration Rules. For Nigerian and all other global users,
            arbitration shall be administered in Abuja under the Arbitration
            and Mediation Act (AMA) 2023.
          </li>
          <li>
            <strong>EU and UK Exceptions:</strong> If you reside in the EU or
            UK, the binding arbitration requirement and class action waiver do
            not apply to you. You maintain the right to submit disputes to a
            local consumer protection body, an online dispute resolution
            platform, or bring a claim directly in a competent local court.
          </li>
        </ul>

        <h2>12. Western Regulatory Compliance &amp; Passive Host Safe Harbors</h2>

        <p>
          As a passive software host, Sideby adheres to international
          intermediary liability frameworks regarding user-generated content and
          platform conduct:
        </p>

        <ul>
          <li>
            <strong>United States (DMCA &amp; Section 230):</strong> Sideby
            complies with the Digital Millennium Copyright Act (DMCA) and acts
            as an interactive computer service provider under 47 U.S.C. § 230.
            We do not act as the publisher or speaker of any information
            provided by another user. If you believe your intellectual
            property has been infringed, you may submit a takedown notice to
            our designated copyright agent. We maintain a strict policy of
            terminating repeat infringers.
          </li>
          <li>
            <strong>European Union (Digital Services Act):</strong> Under the
            EU Digital Services Act (DSA), Sideby operates strictly as a
            hosting service. We bear no liability for illegal user-generated
            content provided we do not have actual knowledge of its illegality
            and act expeditiously to remove or disable access to it upon
            obtaining such knowledge.
          </li>
        </ul>
      </main>

      <Footer />
    </div>
  );
}