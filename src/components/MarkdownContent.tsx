function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-green-50 px-1.5 py-0.5 text-green-800">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function parseImageBlock(block: string) {
  const match = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (!match) return null;
  return { alt: match[1], src: match[2] };
}

function renderMarkdown(content: string) {
  const blocks = content.trim().split(/\n\n+/);
  const elements: React.ReactNode[] = [];

  blocks.forEach((block, idx) => {
    const trimmed = block.trim();

    const image = parseImageBlock(trimmed);
    if (image) {
      elements.push(
        <figure
          key={idx}
          className="my-6 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} className="w-full" />
          {image.alt && (
            <figcaption className="border-t border-[var(--color-border)] px-4 py-2.5 text-center text-xs text-neutral-600">
              {image.alt}
            </figcaption>
          )}
        </figure>
      );
      return;
    }

    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={idx}>{trimmed.replace(/^## /, "")}</h2>
      );
      return;
    }

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={idx}>{trimmed.replace(/^### /, "")}</h3>
      );
      return;
    }

    if (trimmed.startsWith("```")) {
      const code = trimmed.replace(/^```\w*\n?/, "").replace(/```$/, "");
      elements.push(
        <pre key={idx}>
          <code>{code}</code>
        </pre>
      );
      return;
    }

    if (trimmed.startsWith("|")) {
      const rows = trimmed.split("\n").filter((r) => !r.match(/^\|[\s-|]+\|$/));
      const headerCells = rows[0]?.split("|").filter(Boolean).map((c) => c.trim()) ?? [];
      const bodyRows = rows.slice(1);

      elements.push(
        <table key={idx}>
          <thead>
            <tr>
              {headerCells.map((cell, i) => (
                <th key={i}>{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row, ri) => {
              const cells = row.split("|").filter(Boolean).map((c) => c.trim());
              return (
                <tr key={ri}>
                  {cells.map((cell, ci) => (
                    <td key={ci}>{renderInline(cell)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
      return;
    }

    if (/^[-*] /.test(trimmed)) {
      const items = trimmed.split("\n").map((line) => line.replace(/^[-*] /, ""));
      elements.push(
        <ul key={idx}>
          {items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      return;
    }

    if (/^\d+\. /.test(trimmed)) {
      const items = trimmed.split("\n").map((line) => line.replace(/^\d+\. /, ""));
      elements.push(
        <ol key={idx}>
          {items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ol>
      );
      return;
    }

    elements.push(<p key={idx}>{renderInline(trimmed)}</p>);
  });

  return elements;
}

export default function MarkdownContent({ content }: { content: string }) {
  return <div className="prose-content">{renderMarkdown(content)}</div>;
}
