"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { SearchIcon } from "@/components/icons";

export default function SearchBar({ placeholder = "ค้นหาบทความ..." }: { placeholder?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/articles${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <SearchIcon
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
        size={18}
      />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[var(--color-border)] bg-white py-3 pl-11 pr-4 text-[15px] text-black placeholder:text-neutral-400 focus:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/20"
      />
    </form>
  );
}
