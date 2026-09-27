"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import { normalizeUsername, MIN_USERNAME_LENGTH } from "@/lib/username";
import styles from "../auth-form.module.css";

type Availability = "idle" | "checking" | "available" | "taken" | "invalid";

function friendlySignUpError(message: string): string {
  if (message.includes("User already registered")) {
    return "An account already exists for that email — log in instead.";
  }
  if (message.toLowerCase().includes("password")) {
    return "Password must be at least 6 characters.";
  }
  if (message.toLowerCase().includes("captcha")) {
    return "Verification failed — check your connection and try again.";
  }
  return "Something went wrong creating your account. Please try again.";
}

export default function JoinPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [availability, setAvailability] = useState<Availability>("idle");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const normalized = normalizeUsername(usernameInput);

  // Debounced availability check against the public `profiles` read policy.
  useEffect(() => {
    if (!usernameInput.trim()) {
      setAvailability("idle");
      return;
    }
    if (!normalized || normalized.length - 1 < MIN_USERNAME_LENGTH) {
      setAvailability("invalid");
      return;
    }

    let cancelled = false;
    setAvailability("checking");
    const supabase = createClient();

    const timer = setTimeout(async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", normalized)
        .maybeSingle();
      if (!cancelled) setAvailability(data ? "taken" : "available");
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [normalized, usernameInput]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (availability !== "available") {
      setError("Choose a username that's available first.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          name: fullName.trim(),
          username: normalized,
          signup_source: "web_waitlist",
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setSubmitting(false);

    if (signUpError) {
      setError(friendlySignUpError(signUpError.message));
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="pageShell">
        <Nav />
        <main className={styles.container}>
          <h1>Check your inbox</h1>
          <p className={styles.lead}>
            We sent a confirmation link to <strong>{email}</strong>. Your
            username <strong>{normalized}</strong> is reserved right now —
            confirm your email to lock in your spot, and we&apos;ll let you
            know the moment iOS access opens.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="pageShell">
      <Nav />
      <main className={styles.container}>
        <h1>Reserve your spot</h1>
        <p className={styles.lead}>
          iOS is coming soon. Create your account now, claim your username,
          and we&apos;ll email you the moment iOS access opens.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Full name</span>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name"
            />
          </label>

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
            <span>Username</span>
            <input
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="e.g. ada_l"
              required
              autoComplete="off"
              autoCapitalize="off"
            />
            {availability !== "idle" && (
              <span className={styles.usernameHint} data-state={availability}>
                {availability === "checking" && "Checking…"}
                {availability === "available" &&
                  `${normalized} is available`}
                {availability === "taken" && `${normalized} is already taken`}
                {availability === "invalid" &&
                  `Use ${MIN_USERNAME_LENGTH}+ letters, numbers, or underscores`}
              </span>
            )}
          </label>

          <label className={styles.field}>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={submitting}
          >
            {submitting ? "Creating account…" : "Reserve my spot"}
          </button>
        </form>

        <p className={styles.altAction}>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
