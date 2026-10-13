"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import authStyles from "../auth-form.module.css";
import styles from "./delete-account.module.css";

// The delete-account edge function answers with { error: "..." } on a 400.
// supabase-js wraps that in a FunctionsHttpError whose .context is the Response.
async function readError(err: unknown): Promise<string> {
  const ctx = (err as { context?: Response })?.context;
  let code = "";
  if (ctx && typeof ctx.json === "function") {
    try {
      const body = await ctx.json();
      if (body?.error) code = String(body.error);
    } catch {
      /* fall through */
    }
  }
  const msg = code || (err as Error)?.message || "";

  if (msg.includes("wallet_balance")) {
    return "Your wallet still has a balance. Withdraw it in the app, then come back to delete your account.";
  }
  if (msg.includes("active_splits")) {
    return "You own a split that is still active or pending. Finish or cancel it in the app, then come back to delete your account.";
  }
  return msg || "Something went wrong. Please try again.";
}

function friendlySignInError(message: string): string {
  if (message.includes("Invalid login credentials")) {
    return "No account found for that email and password.";
  }
  if (message.includes("Email not confirmed")) {
    return "Please confirm your email first — check your inbox.";
  }
  return "Something went wrong. Please try again.";
}

export default function DeleteAccountPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // OAuth and emailed links come back through the existing /auth/callback
  // route (code exchange), which then forwards to ?next.
  function callbackUrl() {
    return `${window.location.origin}/auth/callback?next=/delete-account`;
  }

  async function signInWithPassword(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (signInError) setError(friendlySignInError(signInError.message));
    setBusy(false);
  }

  async function signInWithGoogle() {
    setError(null);
    setNotice(null);
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl() },
    });
    if (oauthError) setError("Couldn't start Google sign-in. Please try again.");
  }

  async function sendMagicLink() {
    if (!email.trim()) {
      setError("Enter your email first.");
      return;
    }
    setBusy(true);
    setError(null);
    setNotice(null);
    const supabase = createClient();
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: callbackUrl(), shouldCreateUser: false },
    });
    if (otpError) setError("Couldn't send a sign-in link. Check the email and try again.");
    else setNotice("Check your inbox for a sign-in link.");
    setBusy(false);
  }

  async function deleteAccount() {
    setBusy(true);
    setError(null);
    const supabase = createClient();
    const { error: fnError } = await supabase.functions.invoke("delete-account", {
      method: "POST",
    });
    if (fnError) {
      setError(await readError(fnError));
      setBusy(false);
      return;
    }
    await supabase.auth.signOut();
    setDone(true);
    setBusy(false);
  }

  async function cancel() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setConfirmText("");
    setError(null);
    setNotice(null);
  }

  return (
    <div className="pageShell">
      <Nav />
      <main className={authStyles.container}>
        <h1>Delete your account</h1>

        {done ? (
          <p className={authStyles.lead}>
            Your Sideby account has been deleted and you&apos;ve been signed
            out. This can&apos;t be undone. If you want to come back,
            you&apos;ll need to sign up again.
          </p>
        ) : !ready ? null : !session ? (
          <>
            <p className={authStyles.lead}>
              Sign in with the account you want to delete. You&apos;ll be asked
              to confirm before anything is removed.
            </p>

            <form className={authStyles.form} onSubmit={signInWithPassword}>
              <label className={authStyles.field}>
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </label>

              <label className={authStyles.field}>
                <span>Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </label>

              <button
                type="submit"
                className={authStyles.submitBtn}
                disabled={busy || !email || !password}
              >
                {busy ? "Signing in…" : "Sign in"}
              </button>
            </form>

            <div className={styles.altMethods}>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={signInWithGoogle}
              >
                Continue with Google
              </button>
              <button
                type="button"
                className={styles.linkBtn}
                onClick={sendMagicLink}
                disabled={busy}
              >
                Email me a sign-in link instead
              </button>
            </div>
          </>
        ) : (
          <>
            <p className={authStyles.lead}>
              Signed in as <strong>{session.user.email}</strong>.
            </p>

            <div className={styles.warning}>
              <p className={styles.warningTitle}>This is permanent.</p>
              <ul>
                <li>Your profile, wallet history, notifications and location are deleted.</li>
                <li>You&apos;re removed from splits and chats you joined, and your sent messages are erased.</li>
                <li>Your forum posts and comments stay but show as &quot;Deleted user&quot;.</li>
                <li>
                  You must withdraw any wallet balance and finish or cancel
                  splits you own before deleting.
                </li>
              </ul>
            </div>

            <div className={authStyles.form}>
              <label className={authStyles.field}>
                <span>
                  Type <strong>DELETE</strong> to confirm
                </span>
                <input
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  autoComplete="off"
                />
              </label>

              <button
                type="button"
                className={styles.dangerBtn}
                onClick={deleteAccount}
                disabled={busy || confirmText !== "DELETE"}
              >
                {busy ? "Deleting…" : "Delete my account"}
              </button>
              <button type="button" className={styles.linkBtn} onClick={cancel}>
                Cancel and sign out
              </button>
            </div>
          </>
        )}

        {error && (
          <p role="alert" className={`${authStyles.error} ${styles.message}`}>
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className={`${styles.notice} ${styles.message}`}>
            {notice}
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}
