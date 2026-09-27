import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import styles from "../auth-form.module.css";

export default async function WelcomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="pageShell">
        <Nav />
        <main className={styles.container}>
          <h1>You&apos;re not signed in</h1>
          <p className={styles.lead}>
            <Link href="/join">Create your account</Link> to reserve a
            username and join the iOS waitlist, or{" "}
            <Link href="/login">log in</Link> if you already have one.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, full_name")
    .eq("id", user.id)
    .maybeSingle();

  const firstName = profile?.full_name?.split(" ")[0];

  return (
    <div className="pageShell">
      <Nav />
      <main className={styles.container}>
        <h1>You&apos;re on the list{firstName ? `, ${firstName}` : ""}</h1>
        <p className={styles.lead}>
          Your username <strong>{profile?.username ?? ""}</strong> is
          reserved. We&apos;ll email <strong>{user.email}</strong> the
          moment iOS access opens.
        </p>
      </main>
      <Footer />
    </div>
  );
}
