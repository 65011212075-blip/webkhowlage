type ArticleImageProps = {
  src: string;
  alt: string;
  caption?: string;
  variant?: "cover" | "inline" | "thumbnail";
  priority?: boolean;
};

export default function ArticleImage({
  src,
  alt,
  caption,
  variant = "inline",
}: ArticleImageProps) {
  if (variant === "cover") {
    return (
      <figure className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
        <div className="relative aspect-[16/9] w-full bg-[var(--color-surface)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
          />
        </div>
        {caption && (
          <figcaption className="border-t border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2.5 text-center text-xs text-slate-500">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (variant === "thumbnail") {
    return (
      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full" />
      {caption && (
        <figcaption className="border-t border-[var(--color-border)] px-4 py-2.5 text-center text-xs text-slate-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
