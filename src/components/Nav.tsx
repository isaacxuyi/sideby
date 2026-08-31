import Link from "next/link";
import styles from "./Nav.module.css";

type NavProps = {
  variant?: "home" | "simple";
};

export default function Nav({ variant = "simple" }: NavProps) {
  if (variant === "home") {
    return (
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          sideby
        </Link>
        <div className={styles.navActions}>
          <a href="#" className={styles.btnGhost}>
            Log in
          </a>
          <a href="#" className={styles.btnWhite}>
            Join sideby
          </a>
        </div>
      </nav>
    );
  }

  return (
    <nav className={styles.navSimple}>
      <Link href="/" className={styles.logoSimple}>
        sideby
      </Link>
      <div className={styles.navActions}>
        <Link href="/" className={styles.btnWhiteSimple}>
          Home
        </Link>
      </div>
    </nav>
  );
}
