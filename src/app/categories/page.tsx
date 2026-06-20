import type { Metadata } from "next";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/data/mockData";

export const metadata: Metadata = {
  title: "หมวดหมู่",
  description: "หมวดหมู่ความรู้ด้าน Network ทั้งหมด",
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-black sm:text-3xl">หมวดหมู่ความรู้</h1>
        <p className="mt-2.5 text-base text-neutral-800">
          เลือกหมวดหมู่เพื่อดูบทความที่เกี่ยวข้อง — {categories.length} หมวดหมู่
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
