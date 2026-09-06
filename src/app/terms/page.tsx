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
        <div className={styles.updated}>
          Last Updated: August 31, 2026 &nbsp;·&nbsp; Effective Date: August 31, 2026
        </div>

        <p>
          These Terms of Service (&quot;Agreement&quot; or &quot;Terms&quot;) are a legally
          binding agreement between you (the &quot;User,&quot; &quot;you,&quot; or
          &quot;your&quot;) and Sideby, Inc. (&quot;Sideby,&quot; &quot;we,&quot;
          &quot;us,&quot; or &quot;our&quot;). You acknowledge and agree that your access to
          and use of Sideby&rsquo;s platform (the &quot;Platform&quot;), including our
          website at https://sideby.org (the &quot;Website&quot;), our mobile application
          (the &quot;App&quot;), APIs, internal ledger tools, and associated services
          (collectively, the &quot;Services&quot;), are governed by this Agreement and our
          Privacy Policy.
        </p>
        <p>
          If you do not agree to the terms of this Agreement, do not access, download, or
          use our Website, App, or Platform. Contact us at support@sideby.org if you have
          questions regarding these provisions.
        </p>

        <div className={styles.noticeBox}>
          <p>
            <strong>
              IMPORTANT LEGAL NOTICE: BINDING ARBITRATION &amp; CLASS ACTION WAIVER
            </strong>
          </p>
          <p>
            PLEASE READ THIS AGREEMENT CAREFULLY TO ENSURE THAT YOU UNDERSTAND EACH
            PROVISION. THIS AGREEMENT CONTAINS A MANDATORY AND BINDING ARBITRATION
            PROVISION AND A CLASS ACTION / JURY TRIAL WAIVER (SECTION 18) THAT REQUIRES
            DISPUTES TO BE RESOLVED ON AN INDIVIDUAL BASIS THROUGH ARBITRATION RATHER THAN
            JURY TRIALS OR CLASS ACTIONS, AND LIMITS THE REMEDIES AVAILABLE TO YOU IN THE
            EVENT OF A DISPUTE.
          </p>
        </div>

        <p>
          <strong>
            BY CREATING AN ACCOUNT, CLICKING AN ACCEPTANCE BOX, DOWNLOADING THE APP, OR
            OTHERWISE ACCESSING OR USING THE SERVICES, YOU REPRESENT AND WARRANT THAT:
          </strong>
        </p>
        <ul>
          <li>
            YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE LEGALLY BOUND BY THIS AGREEMENT AND
            OUR PRIVACY POLICY;
          </li>
          <li>
            YOU ARE AT LEAST 18 YEARS OF AGE (OR THE LEGAL AGE OF MAJORITY IN YOUR
            JURISDICTION) AND HAVE THE LEGAL CAPACITY TO FORM A BINDING CONTRACT;
          </li>
          <li>
            IF YOU ARE ENTERING INTO THIS AGREEMENT ON BEHALF OF A COMPANY, ORGANIZATION,
            OR OTHER ENTITY, YOU HAVE THE LEGAL AUTHORITY TO BIND THAT ENTITY TO THESE
            TERMS.
          </li>
        </ul>

        <h2>1. Description of the Services</h2>
        <p>
          Sideby is a consumer social network and activity coordination platform designed
          to help users discover, organize, and participate in real-world hangouts,
          events, and shared activities, while automating the upfront calculation and
          settlement of shared costs with people nearby.
        </p>
        <p>
          <strong>
            Sideby is a software and communications platform, not a bank, depository
            institution, or licensed money services business (MSB).
          </strong>{" "}
          Sideby facilitates internal platform balance deductions for shared social
          expenses. Actual payment processing, gateway top-ups, and fund collections are
          executed via regulated third-party payment processors (e.g., Paystack, Stripe).
        </p>

        <h2>2. Privacy Policy &amp; Data Transfer</h2>
        <p>
          Our Privacy Policy describes how we collect, process, and protect the personal
          and financial information you provide. By accessing or using our Website, App,
          or Platform, you consent to the collection, use, and transfer of your data to
          servers located in the United States, Nigeria, and/or other jurisdictions for
          hosting, processing, and maintenance by Sideby and its infrastructure service
          providers (e.g., Supabase, Vercel).
        </p>

        <h2>3. Eligibility &amp; Account Restrictions</h2>
        <p>To be eligible to access and use the Services, you represent and warrant that you:</p>
        <ul>
          <li>Are at least 18 years old;</li>
          <li>
            Are not currently restricted, suspended, or prohibited by Sideby or applicable
            law from maintaining an account;
          </li>
          <li>
            Are not a direct competitor of Sideby and are not using the Services for
            competitive analysis, reverse engineering, or market espionage;
          </li>
          <li>Will maintain only one registered individual account at any given time;</li>
          <li>
            Have full power and authority to enter into this Agreement without violating
            any other contractual obligation;
          </li>
          <li>
            Will not infringe upon Sideby&rsquo;s or any third party&rsquo;s intellectual
            property, privacy, or statutory rights; and
          </li>
          <li>
            Agree to furnish, at your own cost, all mobile hardware, operating software,
            cellular data, and internet connectivity required to run the App.
          </li>
        </ul>

        <h2>4. Account Registration, Verification &amp; Security</h2>
        <p>
          To access certain features of the App and Platform, you must register for an
          account by providing accurate, current, and complete personal information,
          including your full legal name, telephone number, email address, profile photo,
          and location data.
        </p>
        <ul>
          <li>
            <strong>Communication Consent:</strong> You explicitly consent to receiving
            SMS verification codes, transactional emails (via services such as Resend),
            and push notifications necessary to authenticate your account and confirm
            shared split transactions.
          </li>
          <li>
            <strong>Credential Security:</strong> You are solely responsible for
            safeguarding your login credentials, multi-factor tokens, and session
            integrity. You may not share, sell, or transfer your account to any third
            party. You agree to immediately notify Sideby at security@sideby.org of any
            unauthorized access or security breach.
          </li>
        </ul>

        <h2>5. In-App Wallet, Non-Refundable Float &amp; Split Fees</h2>
        <ul>
          <li>
            <strong>Upfront Stored Wallet Balance:</strong> To participate in automated
            splits and coordinate group activities, users load an upfront stored-value
            balance into their Sideby in-app digital wallet (minimum $5.00 USD or local
            currency equivalent).
          </li>
          <li>
            <strong>Strict Non-Refundable Policy:</strong> ALL WALLET DEPOSITS, TOP-UPS,
            AND PREPAYMENTS ARE FINAL, NON-REFUNDABLE, AND NON-REDISBURSABLE TO FIAT
            CURRENCY, EXCEPT WHERE MANDATED BY APPLICABLE CONSUMER PROTECTION LAWS. Stored
            balances represent closed-loop platform utility credits intended strictly for
            settling shared activities and convenience fees within the Sideby ecosystem.
          </li>
          <li>
            <strong>Platform Convenience Fees:</strong> Sideby deducts an automated
            platform service fee (e.g., $0.99 USD or local currency equivalent) from your
            wallet balance upon the confirmation or execution of a split event.
          </li>
          <li>
            <strong>Third-Party Payment Gateways:</strong> Initial wallet funding
            operations are processed by independent third-party gateways (e.g., Paystack,
            Stripe). Sideby does not store raw credit/debit card numbers and is not liable
            for gateway downtimes, interchange fees, or banking network failures.
          </li>
          <li>
            <strong>Inactive Accounts &amp; Breakage:</strong> Unclaimed or unspent wallet
            balances on inactive accounts shall be handled in strict accordance with
            applicable stored-value and unclaimed property statutes.
          </li>
        </ul>

        <h2>6. Limited License Grant</h2>
        <p>
          Subject to your continued compliance with this Agreement, Sideby grants you a
          limited, non-exclusive, revocable, non-transferable, non-sublicensable license
          to:
        </p>
        <ul>
          <li>Download and install the App on personal mobile devices owned or controlled by you; and</li>
          <li>
            Access and utilize the Platform, Website, and related content solely for
            personal, non-commercial activity coordination and cost-splitting purposes in
            accordance with these Terms.
          </li>
        </ul>
        <p>
          You agree not to copy, modify, distribute, license, sell, create derivative
          works from, publicly display, stream, or commercially exploit the App or
          Platform except as expressly authorized in writing by Sideby.
        </p>

        <h2>7. Proprietary Rights &amp; Derived Data</h2>
        <ul>
          <li>
            <strong>Reservation of Rights:</strong> The Platform, App, user interfaces,
            branding, software architecture, databases, codebases, and visual designs are
            the exclusive intellectual property of Sideby, Inc. and its licensors.
          </li>
          <li>
            <strong>Derived Data:</strong> You acknowledge and agree that Sideby
            exclusively owns all rights, title, and interest in and to any data, insights,
            behavioral patterns, activity graphs, and aggregate metrics generated,
            inferred, or derived from platform activity (&quot;Derived Data&quot;).
            Derived Data does not include your raw, identifiable personal data, which
            remains subject to our Privacy Policy.
          </li>
          <li>
            <strong>Feedback License:</strong> If you provide feedback, feature
            suggestions, code contributions, or bug reports (&quot;Feedback&quot;) to
            Sideby, you grant Sideby a perpetual, irrevocable, worldwide, royalty-free,
            fully sublicensable license to utilize, modify, and incorporate such Feedback
            for any commercial or non-commercial purpose without compensation or
            attribution to you.
          </li>
          <li>
            <strong>Public Profile &amp; Activity Display:</strong> You grant Sideby a
            worldwide, non-exclusive, royalty-free license to display your public profile
            (name, avatar, social bio) and your initiated activity listings to other users
            on the network to facilitate peer-to-peer discovery and group matching.
          </li>
        </ul>

        <h2>8. Prohibited Conduct &amp; Platform Integrity</h2>
        <p>As a condition of using the Services, you agree strictly NOT to:</p>
        <ul>
          <li>
            <strong>Duplicate or Scrape:</strong> Use bots, spiders, automated scripts, or
            scrapers to extract data, profiles, or activity listings from the App or
            Website;
          </li>
          <li>
            <strong>Reverse Engineer:</strong> Decompile, disassemble, decipher, or attempt
            to derive the underlying source code, database structures, or proprietary
            algorithms of the Platform;
          </li>
          <li>
            <strong>Interfere with Infrastructure:</strong> Introduce viruses, worms,
            Trojan horses, or malicious code, or impose an unreasonable or disproportionate
            load on our servers, Supabase databases, or network infrastructure;
          </li>
          <li>
            <strong>Manipulate Ledger Balances:</strong> Attempt to alter, double-spend,
            forge, or illicitly inject credits or transactions into the Sideby wallet
            ledger;
          </li>
          <li>
            <strong>Engage in Fraud or Illegal Activity:</strong> Organize, promote, or
            split costs for unlawful gatherings, unregulated gambling, illegal substance
            purchases, money laundering, prostitution, terrorism financing, or violent
            acts;
          </li>
          <li>
            <strong>Harass or Defame:</strong> Stalk, threaten, bully, defraud, or
            impersonate other users, groups, or Sideby personnel;
          </li>
          <li>
            <strong>Exploit Minors:</strong> Post or transmit content that exploits,
            endangers, or harms minors in any manner.
          </li>
        </ul>

        <h2>9. Real-World Activities &amp; Peer Liability Disclaimer</h2>
        <ul>
          <li>
            <strong>User Autonomy:</strong> Sideby provides the software medium to
            organize meetups and split expenses. Sideby does not organize, sponsor,
            inspect, insure, supervise, or control real-world events, dining venues,
            transportation arrangements, or social gatherings created by users.
          </li>
          <li>
            <strong>Assumption of Risk:</strong> Your attendance at or participation in
            any real-world activity organized via the App is entirely at your own
            voluntary risk. Sideby disclaims all liability for property damage, personal
            injury, illness, physical harm, or illegal acts committed by users or third
            parties during real-world interactions.
          </li>
          <li>
            <strong>Peer Disputes:</strong> If a participant fails to attend an event,
            disputes a restaurant bill, or refuses to agree on a split share, the dispute
            must be resolved directly among the involved users. Sideby reserves the right,
            but is under no obligation, to arbitrate in-app ledger disputes or reverse
            transactions in verified cases of technical error or fraud.
          </li>
        </ul>

        <h2>10. Copyright Infringement &amp; DMCA Takedown Policy</h2>
        <p>
          Sideby respects intellectual property rights and complies with the Digital
          Millennium Copyright Act (17 U.S.C. § 512). If you believe content on our
          Platform infringes your copyright, submit a written notice to our Designated
          DMCA Agent containing:
        </p>
        <ul>
          <li>A physical or electronic signature of the authorized copyright owner;</li>
          <li>Identification of the copyrighted work claimed to have been infringed;</li>
          <li>
            Identification of the infringing material and specific URL/App location to
            enable us to locate it;
          </li>
          <li>Your contact details (address, phone number, email address);</li>
          <li>A good faith statement that the disputed use is unauthorized; and</li>
          <li>
            A statement under penalty of perjury that the information provided is accurate
            and that you are authorized to act on behalf of the owner.
          </li>
        </ul>
        <h3>Designated DMCA Agent</h3>
        <div className={styles.contactBlock}>
          <p><strong>Company:</strong> Sideby, Inc.</p>
          <p><strong>Attn:</strong> Legal / DMCA Agent</p>
          <p><strong>Email:</strong> dmca@sideby.org</p>
          <p><strong>Address:</strong> [Registered Entity / Legal Address]</p>
        </div>

        <h2>11. Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless Sideby, Inc., its directors,
          officers, employees, investors, contractors, and agents from and against any
          third-party claims, damages, liabilities, losses, costs, and expenses (including
          reasonable attorneys&rsquo; fees) arising out of or related to:
        </p>
        <ul>
          <li>Your access to, use of, or misuse of the Website, App, or Platform;</li>
          <li>Your breach or alleged breach of this Agreement or our Privacy Policy;</li>
          <li>
            Any real-world activity, dispute, or injury arising from events you organize or
            attend;
          </li>
          <li>Any fraudulent or inaccurate information submitted by you; or</li>
          <li>
            Your violation of any applicable laws, export regulations, or third-party
            rights.
          </li>
        </ul>

        <h2>12. Disclaimer of Warranties</h2>
        <p>
          <strong>
            THE WEBSITE, APP, PLATFORM, AND SERVICES ARE PROVIDED ON AN &quot;AS IS&quot;
            AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER
            EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE BY APPLICABLE LAW,
            SIDEBY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE,
            ACCURACY, SYSTEM INTEGRITY, AND NON-INFRINGEMENT.
          </strong>
        </p>
        <p>
          <strong>
            SIDEBY DOES NOT WARRANT THAT THE APP WILL BE CONTINUOUS, SECURE, BUG-FREE, OR
            UNINTERRUPTED, OR THAT LEDGER BALANCES WILL REFLECT IN REAL TIME UNDER POOR
            NETWORK CONDITIONS.
          </strong>
        </p>

        <h2>13. Limitation of Liability</h2>
        <p>
          <strong>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL SIDEBY, INC., ITS
            DIRECTORS, EMPLOYEES, AFFILIATES, OR LICENSORS BE LIABLE FOR ANY INDIRECT,
            PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES (INCLUDING
            LOSS OF PROFITS, DATA, USE, GOODWILL, OR PERSONAL INJURY) ARISING OUT OF OR IN
            CONNECTION WITH THIS AGREEMENT OR YOUR USE OF THE SERVICES.
          </strong>
        </p>
        <p>
          <strong>
            IN NO EVENT SHALL SIDEBY&rsquo;S TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS
            ARISING OUT OF THIS AGREEMENT EXCEED THE TOTAL FEES (IF ANY) ACTUALLY PAID BY
            YOU TO SIDEBY IN THE THREE (3) MONTHS PRECEDING THE EVENT GIVING RISE TO
            LIABILITY, OR FIFTY DOLLARS ($50.00 USD), WHICHEVER IS GREATER.
          </strong>
        </p>

        <h2>14. Term &amp; Termination</h2>
        <ul>
          <li>
            <strong>User Termination:</strong> You may terminate your account at any time
            by deleting the App and submitting an account closure request to
            support@sideby.org. Any remaining non-refundable wallet balance shall be
            forfeited in accordance with Section 5.
          </li>
          <li>
            <strong>Sideby Termination Rights:</strong> We reserve the right, in our sole
            discretion and without prior notice, to suspend, restrict, or terminate your
            access to the App and Platform for any reason, including violation of these
            Terms, suspected fraud, security threats, or commercial unviability.
          </li>
          <li>
            <strong>Survival:</strong> Sections 5, 7, 8, 9, 11, 12, 13, 15, 17, 18, and 19
            shall survive the termination of this Agreement.
          </li>
        </ul>

        <h2>15. Export Control &amp; Anti-Bribery Compliance</h2>
        <p>
          You agree not to access, export, re-export, or transfer the Platform or App in
          violation of applicable trade sanctions, embargoes, or export control
          regulations (including the US Export Administration Regulations and OFAC
          Specially Designated Nationals lists). You further represent that you have not
          and will not violate the US Foreign Corrupt Practices Act, the UK Bribery Act, or
          local anti-corruption laws in connection with your use of Sideby.
        </p>

        <h2>16. Modifications to the Agreement</h2>
        <p>
          We reserve the right to modify these Terms at any time. When modifications are
          made, we will update the &quot;Last Updated&quot; date at the top of this page
          and provide notice through the App, Website, or via email. Continued access or
          use of the Services after modified Terms become effective constitutes your
          binding acceptance of the updated Agreement.
        </p>

        <h2>17. Governing Law &amp; Venue</h2>
        <p>
          This Agreement and any dispute arising out of or related to it shall be governed
          by and construed in accordance with the laws of the State of Delaware, without
          regard to conflict of law principles. To the extent court proceedings are
          permitted under Section 18, both parties consent to the exclusive jurisdiction
          and venue of state and federal courts located in Delaware (or New York, NY).
        </p>

        <h2>18. Mandatory Binding Arbitration &amp; Dispute Resolution</h2>
        <p>
          <strong>
            PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS, INCLUDING
            YOUR RIGHT TO FILE A LAWSUIT IN COURT.
          </strong>
        </p>
        <ul>
          <li>
            <strong>Informal Resolution:</strong> Before filing an arbitration claim, you
            and Sideby agree to attempt to resolve any dispute informally for at least
            thirty (30) days by sending written notice detailing the issue, your
            registered email, and requested relief to legal@sideby.org.
          </li>
          <li>
            <strong>Binding Arbitration:</strong> If unresolved after 30 days, any dispute,
            controversy, or claim arising out of or relating to this Agreement or the
            Services shall be settled by binding arbitration administered by the American
            Arbitration Association (AAA) under its Consumer Arbitration Rules, rather than
            in court before a judge or jury.
          </li>
          <li>
            <strong>Class Action &amp; Jury Trial Waiver:</strong> YOU AND SIDEBY AGREE
            THAT ALL CLAIMS MUST BE BROUGHT IN AN INDIVIDUAL CAPACITY AND NOT AS A
            PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, COLLECTIVE, OR REPRESENTATIVE
            PROCEEDING. THE ARBITRATOR MAY NOT CONSOLIDATE CLAIMS OF MULTIPLE PERSONS.
          </li>
          <li>
            <strong>Time Limitation:</strong> ANY CLAIM ARISING OUT OF OR RELATED TO THIS
            AGREEMENT MUST BE COMMENCED WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION
            ACCRUES; OTHERWISE, THE CLAIM IS PERMANENTLY BARRED.
          </li>
          <li>
            <strong>Arbitration Opt-Out:</strong> You have the right to opt out of this
            mandatory arbitration clause within thirty (30) days of first creating your
            account by sending a formal written opt-out notice to legal@sideby.org with
            your full name, username, and an unequivocal statement of your intent to opt
            out.
          </li>
        </ul>

        <h2>19. Miscellaneous Legal Provisions</h2>
        <ul>
          <li>
            <strong>Entire Agreement:</strong> This Agreement and our Privacy Policy
            constitute the entire legal agreement between you and Sideby regarding your
            use of the Services.
          </li>
          <li>
            <strong>Severability:</strong> If any provision of this Agreement is held
            invalid or unenforceable, that provision will be modified to reflect the
            parties&rsquo; intent, and all remaining provisions will remain in full force
            and effect.
          </li>
          <li>
            <strong>No Waiver:</strong> The failure of Sideby to enforce any right or
            provision of this Agreement shall not operate as a waiver of that right or
            future enforcement.
          </li>
          <li>
            <strong>Assignment:</strong> You may not assign or transfer your rights or
            obligations under this Agreement without Sideby&rsquo;s prior written consent.
            Sideby may freely assign its rights and obligations in connection with a
            merger, acquisition, or asset sale.
          </li>
        </ul>

        <h2>20. Contact &amp; Legal Notices</h2>
        <p>
          For legal inquiries, takedown notices, or operational support regarding this
          Agreement, contact:
        </p>
        <div className={styles.contactBlock}>
          <p><strong>Legal Team:</strong> legal@sideby.org</p>
          <p><strong>General Support:</strong> support@sideby.org</p>
          <p><strong>Company Entity:</strong> Sideby, Inc.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
