import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ReviewQueue from "./ReviewQueue";

export const metadata = { title: "Review queue", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminReviewPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Admin gate: the stats RPC is admin-only, so if it errors for this user,
  // they aren't an admin. Swap in your own is_admin check if you prefer.
  const { error } = await supabase.rpc("admin_moderation_sla_stats");
  if (error) notFound();

  return (
    <div className="pageShell">
      <Nav />
      <ReviewQueue />
      <Footer />
    </div>
  );
}