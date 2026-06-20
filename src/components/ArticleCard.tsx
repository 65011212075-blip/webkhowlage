import Link from "next/link";
import type { Article } from "@/data/mockData";
import { getAuthorById, getCategoryById, getArticleCover } from "@/data/mockData";
import CategoryBadge from "./CategoryBadge";
import ArticleImage from "./ArticleImage";

type ArticleCardProps = {
  article: Article;
  variant?: "default" | "compact";
};

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const author = getAuthorById(article.authorId);
  const category = getCategoryById(article.categoryId);
  const { coverImage, coverImageAlt } = getArticleCover(article);

  if (variant === "compact") {
    return (
      <div className="card group flex gap-4 p-4">
        <Link href={`/articles/${article.slug}`} className="shrink-0">
          <ArticleImage src={coverImage} alt={coverImageAlt} variant="thumbnail" />
        </Link>
        <div className="min-w-0 flex-1">
          {category && <CategoryBadge category={category} size="sm" />}
          <Link href={`/articles/${article.slug}`}>
            <h3 className="mt-2 line-clamp-2 text-[15px] font-semibold leading-snug text-black group-hover:text-green-700">
              {article.title}
            </h3>
          </Link>
          <p className="mt-1.5 text-sm text-neutral-600">
            {article.readTime} นาที · {article.views} views
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card group flex h-full flex-col overflow-hidden">
      <Link href={`/articles/${article.slug}`} className="block">
        <ArticleImage src={coverImage} alt={coverImageAlt} variant="cover" />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          {category && <CategoryBadge category={category} />}
          {article.featured && (
            <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-green-800 ring-1 ring-green-300">
              Featured
            </span>
          )}
        </div>

        <Link href={`/articles/${article.slug}`} className="mt-3 block flex-1">
          <h3 className="text-[16px] font-semibold leading-snug text-black group-hover:text-green-700">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-700">
            {article.excerpt}
          </p>
        </Link>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-800">
              {author?.avatar}
            </span>
            <span className="text-sm text-black">{author?.name}</span>
          </div>
          <span className="text-sm text-neutral-600">
            {article.readTime} นาที · {article.views.toLocaleString()} views
          </span>
        </div>
      </div>
    </div>
  );
}
