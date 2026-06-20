import type { Metadata } from "next";
import Link from "next/link";
import { FeatureIcon } from "@/components/icons";
import type { FeatureIconId } from "@/components/icons";
import { authors, faqs, stats } from "@/data/mockData";

export const metadata: Metadata = {
  title: "เกี่ยวกับ",
  description: "เกี่ยวกับ NetKnowledge — แพลตฟอร์มแชร์ความรู้ด้าน Network",
};

const missionItems: { icon: FeatureIconId; title: string; desc: string }[] = [
  {
    icon: "book",
    title: "รวบรวมความรู้",
    desc: "เก็บบทความ design, config guide และ lessons learned จากทีม",
  },
  {
    icon: "search",
    title: "ค้นหาง่าย",
    desc: "ค้นหาด้วย keyword, tag และหมวดหมู่ เพื่อหาคำตอบได้เร็ว",
  },
  {
    icon: "team",
    title: "แชร์เป็นทีม",
    desc: "ทุกคนมีส่วนร่วมในการเพิ่มและอัปเดตความรู้ให้ทันสมัย",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold text-black sm:text-3xl">เกี่ยวกับ NetKnowledge</h1>
        <p className="mt-4 text-base leading-relaxed text-neutral-800 sm:text-lg">
          NetKnowledge เป็นแพลตฟอร์ม Knowledge Sharing สำหรับทีม Network ภายในองค์กร
          ออกแบบมาเพื่อรวบรวมความรู้ ประสบการณ์ และ best practices ไว้ในที่เดียว
          ช่วยลด knowledge silo และเร่ง onboarding สมาชิกใหม่
        </p>
      </div>

      <section className="mt-12 grid gap-6 sm:grid-cols-3">
        {missionItems.map((item) => (
          <div key={item.title} className="card p-5">
            <span className="icon-box h-11 w-11">
              <FeatureIcon name={item.icon} size={22} />
            </span>
            <h3 className="mt-4 text-[16px] font-semibold text-black">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-xl border border-[var(--color-border)] bg-green-50 p-6">
        <h2 className="text-lg font-bold text-black">สถิติปัจจุบัน (Mock Data)</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "บทความ", value: stats.totalArticles },
            { label: "หมวดหมู่", value: stats.totalCategories },
            { label: "ผู้เขียน", value: stats.totalAuthors },
            { label: "Total Views", value: stats.totalViews.toLocaleString() },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-green-700">{s.value}</p>
              <p className="mt-0.5 text-sm text-neutral-700">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-bold text-black">ผู้เขียนในทีม</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {authors.map((author) => (
            <div key={author.id} className="card flex items-center gap-4 p-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-800 ring-1 ring-green-200">
                {author.avatar}
              </span>
              <div>
                <p className="font-medium text-black">{author.name}</p>
                <p className="text-sm text-neutral-700">{author.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-bold text-black">คำถามที่พบบ่อย</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((faq) => (
            <details key={faq.id} className="group card">
              <summary className="cursor-pointer px-5 py-4 text-[15px] font-medium text-black marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}
                  <span className="text-neutral-500 transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="border-t border-[var(--color-border)] px-5 py-4 text-sm leading-relaxed text-neutral-800">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-12 rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-base text-black">พร้อมเริ่มอ่านแล้วหรือยัง?</p>
        <Link
          href="/articles"
          className="mt-4 inline-block rounded-lg bg-green-600 px-6 py-2.5 text-[15px] font-semibold text-black transition hover:bg-green-500"
        >
          ดูบทความทั้งหมด
        </Link>
      </div>
    </div>
  );
}
