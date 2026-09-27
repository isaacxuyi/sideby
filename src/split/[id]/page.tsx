import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { OpenInApp } from "./OpenInApp";
import styles from "./page.module.css";

type SplitPreview = {
  id: string;
  item_title: string;
  description: string | null;
  thumbnail_url: string | null;
  total_cost: string | number | null;
  currency_code: string;
  status: string;
  category_tag: string | null;
  is_moneyless: boolean;
  duration_label: string | null;
  max_participants: number | null;
  participant_count: number;
};

async function getSplit(id: string): Promise<SplitPreview | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("split_share_preview")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return data as SplitPreview | null;
}

function formatCost(split: SplitPreview): string | null {
  if (split.is_moneyless || !split.total_cost) return null;
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: split.currency_code,
      maximumFractionDigits: 0,
    }).format(Number(split.total_cost));
  } catch {
    return `${split.total_cost} ${split.currency_code}`;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const split = await getSplit(id);

  if (!split) {
    return { title: "Split not found" };
  }

  const cost = formatCost(split);
  const description = split.description?.trim()
    ? split.description
    : cost
      ? `Split ${cost} on sideby — ${split.duration_label ?? "join to split the cost"}.`
      : "Join this split on sideby.";

  return {
    title: split.item_title,
    description,
    openGraph: {
      title: `${split.item_title} — sideby`,
      description,
      url: `https://sideby.org/split/${split.id}`,
      images: split.thumbnail_url ? [{ url: split.thumbnail_url }] : undefined,
      type: "website",
    },
    twitter: {
      card: split.thumbnail_url ? "summary_large_image" : "summary",
      title: `${split.item_title} — sideby`,
      description,
      images: split.thumbnail_url ? [split.thumbnail_url] : undefined,
    },
  };
}

export default async function SplitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const split = await getSplit(id);

  if (!split) {
    return (
      <main className={styles.main}>
        <div className={styles.card}>
          <h1 className={styles.title}>This split isn&apos;t available</h1>
          <p className={styles.subtitle}>
            It may have been completed, removed, or the link is off. Open sideby to look around.
          </p>
          <OpenInApp splitId={id} />
        </div>
      </main>
    );
  }

  const cost = formatCost(split);
  const spotsLeft =
    split.max_participants != null
      ? Math.max(split.max_participants - split.participant_count, 0)
      : null;

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        {split.thumbnail_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={split.thumbnail_url} alt="" className={styles.thumbnail} />
        )}
        {split.category_tag && <span className={styles.tag}>{split.category_tag}</span>}
        <h1 className={styles.title}>{split.item_title}</h1>
        {split.description && <p className={styles.description}>{split.description}</p>}
        <div className={styles.meta}>
          {cost && <span className={styles.metaItem}>{cost}</span>}
          {split.duration_label && <span className={styles.metaItem}>{split.duration_label}</span>}
          {spotsLeft != null && (
            <span className={styles.metaItem}>
              {spotsLeft > 0 ? `${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} left` : "Full"}
            </span>
          )}
        </div>
        <OpenInApp splitId={split.id} />
      </div>
    </main>
  );
}
