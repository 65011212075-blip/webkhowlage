import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import ArticleCard from "@/components/ArticleCard";
import { CategoryIcon } from "@/components/icons";
import { articles, categories, searchArticles } from "@/data/mockData";

export const metadata: Metadata = {
  title: "บทความทั้งหมด",
  description: "ค้นหาและอ่านบทความด้าน Network ทั้งหมด",
};

type Props = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export default async function ArticlesPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q ?? "";
  const categorySlug = params.category ?? "";

  let filtered = query ? searchArticles(query) : [...articles];

  if (categorySlug) {
    const cat = categories.find((c) => c.slug === categorySlug);
    if (cat) {
      filtered = filtered.filter((a) => a.categoryId === cat.id);
    }
  }

  filtered.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-black sm:text-3xl">บทความทั้งหมด</h1>
        <p className="mt-2.5 text-base text-neutral-800">
          ค้นหาและกรองบทความด้าน Network — {articles.length} บทความในระบบ
        </p>
      </div>

      <div className="mt-6 max-w-xl">
        <Suspense fallback={<div className="h-11 rounded-xl bg-neutral-100" />}>
          <SearchBar />
        </Suspense>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/articles"
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition ${
            !categorySlug
              ? "bg-green-600 text-black"
              : "bg-neutral-100 text-black hover:bg-green-50"
          }`}
        >
          ทั้งหมด
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/articles?category=${cat.slug}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition ${
              categorySlug === cat.slug
                ? "bg-green-600 text-black"
                : "bg-neutral-100 text-black hover:bg-green-50"
            }`}
          >
            <CategoryIcon name={cat.icon} size={15} className={categorySlug === cat.slug ? "text-black" : "text-green-700"} />
            {cat.name}
          </Link>
        ))}
      </div>

      {query && (
        <p className="mt-4 text-sm text-neutral-700">
          ผลการค้นหา &quot;{query}&quot; — พบ {filtered.length} บทความ
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="mt-12 rounded-xl border border-dashed border-[var(--color-border)] bg-white p-12 text-center">
          <p className="text-neutral-700">ไม่พบบทความที่ตรงกับการค้นหา</p>
          <Link href="/articles" className="mt-3 inline-block text-sm font-medium text-green-700 hover:underline">
            ล้างตัวกรอง
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
