import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { CategoryIcon } from "@/components/icons";
import {
  categories,
  getCategoryBySlug,
  getArticlesByCategory,
} from "@/data/mockData";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "ไม่พบหมวดหมู่" };
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const categoryArticles = getArticlesByCategory(category.id).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-neutral-600">
        <Link href="/" className="hover:text-green-700">
          หน้าแรก
        </Link>
        <span className="mx-2">/</span>
        <Link href="/categories" className="hover:text-green-700">
          หมวดหมู่
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-800">{category.name}</span>
      </nav>

      <div className="flex items-start gap-4">
        <span className="icon-box h-14 w-14 shrink-0">
          <CategoryIcon name={category.icon} size={28} />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-black sm:text-3xl">{category.name}</h1>
          <p className="mt-2.5 max-w-2xl text-base leading-relaxed text-neutral-800">
            {category.description}
          </p>
          <p className="mt-3 text-sm font-medium text-green-700">
            {categoryArticles.length} บทความในหมวดหมู่นี้
          </p>
        </div>
      </div>

      {categoryArticles.length === 0 ? (
        <div className="mt-12 rounded-xl border border-dashed border-[var(--color-border)] bg-white p-12 text-center">
          <p className="text-neutral-700">ยังไม่มีบทความในหมวดหมู่นี้</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categoryArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
