import Link from "next/link";
import { UnplugIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <span className="icon-box h-16 w-16 text-neutral-600">
        <UnplugIcon size={32} />
      </span>
      <h1 className="mt-6 text-2xl font-bold text-black">404 — ไม่พบหน้านี้</h1>
      <p className="mt-3 text-base text-neutral-800">
        หน้าที่คุณค้นหาไม่มีอยู่ในระบบ หรือถูกย้ายไปแล้ว
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-green-600 px-5 py-2.5 text-[15px] font-semibold text-black transition hover:bg-green-500"
      >
        กลับหน้าแรก
      </Link>
    </div>
  );
}
