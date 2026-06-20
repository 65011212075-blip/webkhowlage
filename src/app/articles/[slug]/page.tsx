import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/MarkdownContent";
import CategoryBadge from "@/components/CategoryBadge";
import ArticleCard from "@/components/ArticleCard";
import ArticleImage from "@/components/ArticleImage";
import {
  articles,
  getArticleBySlug,
  getAuthorById,
  getCategoryById,
  getRelatedArticles,
  getArticleCover,
} from "@/data/mockData";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "ไม่พบบทความ" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const author = getAuthorById(article.authorId);
  const category = getCategoryById(article.categoryId);
  const related = getRelatedArticles(article);
  const { coverImage, coverImageAlt } = getArticleCover(article);

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-neutral-600">
        <Link href="/" className="hover:text-green-700">
          หน้าแรก
        </Link>
        <span className="mx-2">/</span>
        <Link href="/articles" className="hover:text-green-700">
          บทความ
        </Link>
        {category && (
          <>
            <span className="mx-2">/</span>
            <Link
              href={`/categories/${category.slug}`}
              className="hover:text-green-700"
            >
              {category.name}
            </Link>
          </>
        )}
      </nav>

      <div className="max-w-3xl">
        {category && <CategoryBadge category={category} />}

        <h1 className="mt-4 text-2xl font-bold leading-tight text-black sm:text-4xl">
          {article.title}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-neutral-800">{article.excerpt}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-[var(--color-border)] pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-800 ring-1 ring-green-200">
              {author?.avatar}
            </span>
            <div>
              <p className="text-sm font-medium text-black">{author?.name}</p>
              <p className="text-xs text-neutral-600">{author?.role}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-neutral-600">
            <span>{new Date(article.publishedAt).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>·</span>
            <span>{article.readTime} นาทีในการอ่าน</span>
            <span>·</span>
            <span>{article.views.toLocaleString()} views</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 max-w-3xl">
        <ArticleImage
          src={coverImage}
          alt={coverImageAlt}
          caption={coverImageAlt}
          variant="cover"
        />
      </div>

      <div className="mt-10 max-w-3xl">
        <MarkdownContent content={article.content} />
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-[var(--color-border)] pt-10">
          <h2 className="text-lg font-bold text-black">บทความที่เกี่ยวข้อง</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} variant="compact" />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
