import Link from "next/link";
import type { Category } from "@/data/mockData";
import { CategoryIcon } from "@/components/icons";

type CategoryBadgeProps = {
  category: Category;
  size?: "sm" | "md";
  linked?: boolean;
};

export default function CategoryBadge({
  category,
  size = "md",
  linked = true,
}: CategoryBadgeProps) {
  const className =
    size === "sm"
      ? "inline-flex items-center gap-1.5 rounded-md bg-green-50 px-2.5 py-1 text-xs font-medium text-black ring-1 ring-green-200"
      : "inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-1.5 text-sm font-medium text-black ring-1 ring-green-200";

  const content = (
    <>
      <CategoryIcon name={category.icon} size={size === "sm" ? 14 : 16} className="shrink-0 text-green-700" />
      <span>{category.name}</span>
    </>
  );

  if (linked) {
    return (
      <Link
        href={`/categories/${category.slug}`}
        className={`${className} transition hover:bg-green-100 hover:ring-green-300`}
      >
        {content}
      </Link>
    );
  }

  return <span className={className}>{content}</span>;
}
