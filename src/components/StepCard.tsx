import styles from "@/app/how-it-works/page.module.css";

type StepCardProps = {
  number: number;
  title: string;
  description: string;
};

export default function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className={styles.stepCard}>
      <div className={styles.stepNum}>{number}</div>
      <div className={styles.stepContent}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
