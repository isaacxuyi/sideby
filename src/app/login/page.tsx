"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import styles from "../auth-form.module.css";

function friendlySignInError(message: string): string {
  if (message.includes("Invalid login credentials")) {
    return "No account found for that email and password.";
  }
  if (message.includes("Email not confirmed")) {
    return "Please confirm your email before logging in — check your inbox.";
  }
  return "Something went wrong. Please try again.";
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setSubmitting(false);

    if (signInError) {
      setError(friendlySignInError(signInError.message));
      return;
    }

    router.push("/welcome");
    router.refresh();
  }

  return (
    <div className="pageShell">
      <Nav />
      <main className={styles.container}>
        <h1>Log in</h1>
        <p className={styles.lead}>
          Check your reserved username and waitlist status.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <label className={styles.field}>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={submitting}
          >
            {submitting ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className={styles.altAction}>
          Don&apos;t have an account? <Link href="/join">Reserve your spot</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
