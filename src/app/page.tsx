import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import ActiveUsersBadge from "@/components/ActiveUsersBadge";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <HeroBackground />

      <section className={styles.hero}>
        <Nav variant="home" />

        <div className={styles.heroBody}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1>
                Share the cost.
                <br />
                Keep the experience.
              </h1>
            </div>

            <div className={styles.heroCta}>
              <Link href="/join" className={styles.startBtn}>
                <span className={styles.startDot} />
                Join Sideby
              </Link>
              <ActiveUsersBadge />
              <p>
                Side by better together.
                <br />
                Split the price tag without compromising on what matters most.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="full" />
    </>
  );
}