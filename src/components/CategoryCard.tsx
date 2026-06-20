import Link from "next/link";
import type { Category } from "@/data/mockData";
import ArticleImage from "./ArticleImage";
import { CategoryIcon } from "@/components/icons";

const categoryImages: Record<string, string> = {
  "cat-routing": "/images/covers/routing.svg",
  "cat-security": "/images/covers/security.svg",
  "cat-wireless": "/images/covers/wireless.svg",
  "cat-datacenter": "/images/covers/datacenter.svg",
  "cat-troubleshoot": "/images/covers/troubleshoot.svg",
};

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const image = categoryImages[category.id] ?? "/images/covers/routing.svg";

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="card group flex flex-col overflow-hidden"
    >
      <ArticleImage src={image} alt={category.name} variant="cover" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2.5">
          <span className="icon-box h-9 w-9 shrink-0">
            <CategoryIcon name={category.icon} size={18} />
          </span>
          <h3 className="text-[15px] font-semibold leading-snug text-black group-hover:text-green-700">
            {category.name}
          </h3>
        </div>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-neutral-700">
          {category.description}
        </p>
        <p className="mt-4 text-sm font-medium text-green-700">
          {category.articleCount} บทความ →
        </p>
      </div>
    </Link>
  );
}
