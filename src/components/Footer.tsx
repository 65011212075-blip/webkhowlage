import Link from "next/link";
import { stats } from "@/data/mockData";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm font-bold text-white">NetKnowledge</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300">
              แพลตฟอร์มแชร์ความรู้ด้าน Network สำหรับทีม IT ภายในองค์กร
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-green-400">
              ลิงก์ด่วน
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/articles" className="text-neutral-300 hover:text-green-400">
                  บทความทั้งหมด
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-neutral-300 hover:text-green-400">
                  หมวดหมู่
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-300 hover:text-green-400">
                  เกี่ยวกับเรา
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-green-400">
              สถิติ (Mock)
            </p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li>{stats.totalArticles} บทความ</li>
              <li>{stats.totalCategories} หมวดหมู่</li>
              <li>{stats.totalAuthors} ผู้เขียน</li>
              <li>{stats.totalViews.toLocaleString()} views</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-green-400">
              หมายเหตุ
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-300">
              ข้อมูลทั้งหมดเป็น Mock Data สำหรับ demo ระบบ Knowledge Sharing
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-800 pt-6 text-center text-sm text-neutral-400">
          © {new Date().getFullYear()} NetKnowledge — Built with Next.js
        </div>
      </div>
    </footer>
  );
}
