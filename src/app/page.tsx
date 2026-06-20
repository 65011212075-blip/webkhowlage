import Link from "next/link";
import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import ArticleCard from "@/components/ArticleCard";
import CategoryCard from "@/components/CategoryCard";
import {
  categories,
  getFeaturedArticles,
  stats,
  articles,
} from "@/data/mockData";

export default function HomePage() {
  const featured = getFeaturedArticles();
  const recent = [...articles]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 4);

  return (
    <div className="grid-bg">
      <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-green-50 via-transparent to-white" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3.5 py-1.5 text-sm font-medium text-green-800">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600 animate-pulse" />
              Network Knowledge Sharing Platform
            </span>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-black sm:text-[2.75rem] sm:leading-tight">
              แชร์ความรู้
              <span className="text-green-700"> Network </span>
              ให้ทีม IT ของคุณ
            </h1>
            <p className="mt-5 text-base leading-relaxed text-neutral-800 sm:text-lg">
              รวบรวมบทความ แนวทางปฏิบัติ และประสบการณ์จริงจากทีม Network Engineer
              — Routing, Security, Wireless, Data Center และ Troubleshooting
            </p>
          </div>

          <div className="mt-8 max-w-xl">
            <Suspense fallback={<div className="h-11 rounded-xl bg-neutral-100" />}>
              <SearchBar placeholder="ค้นหา OSPF, VPN, Wi-Fi 6E..." />
            </Suspense>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "บทความ", value: stats.totalArticles },
              { label: "หมวดหมู่", value: stats.totalCategories },
              { label: "ผู้เขียน", value: stats.totalAuthors },
              { label: "Views", value: stats.totalViews.toLocaleString() },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 shadow-sm"
              >
                <p className="text-2xl font-bold text-black">{stat.value}</p>
                <p className="mt-0.5 text-sm text-neutral-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-black sm:text-2xl">บทความแนะนำ</h2>
            <p className="mt-1.5 text-sm text-neutral-700">เนื้อหาที่ได้รับความนิยมและอัปเดตล่าสุด</p>
          </div>
          <Link
            href="/articles"
            className="hidden text-sm font-medium text-green-700 hover:text-green-600 sm:block"
          >
            ดูทั้งหมด →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 6).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface-green)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-black sm:text-2xl">หมวดหมู่ความรู้</h2>
              <p className="mt-1.5 text-sm text-neutral-700">เลือกหัวห้อที่สนใจ</p>
            </div>
            <Link
              href="/categories"
              className="hidden text-sm font-medium text-green-700 hover:text-green-600 sm:block"
            >
              ดูทั้งหมด →
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-xl font-bold text-black sm:text-2xl">บทความล่าสุด</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {recent.map((article) => (
            <ArticleCard key={article.id} article={article} variant="compact" />
          ))}
        </div>
      </section>
    </div>
  );
}
