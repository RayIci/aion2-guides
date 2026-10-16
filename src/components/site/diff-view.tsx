import { cn } from "cn"

import type { Hunk } from "@/lib/diff"

/** Line diff of section Markdown: removed lines struck in red, added lines in green. */
export function DiffView({ hunks }: { hunks: Hunk[] }) {
  if (hunks.length === 0) return <p className="text-sm text-muted-foreground">No text changes.</p>
  return (
    <div className="flex flex-col gap-2">
      {hunks.map((hunk, i) => (
        <pre key={i} className="overflow-x-auto bg-muted py-2 font-mono text-sm leading-relaxed" data-ui>
          {hunk.map((line, j) => (
            <div
              key={j}
              className={cn(
                "px-3 whitespace-pre-wrap",
                line.kind === "add" && "bg-verified/10 text-verified",
                line.kind === "del" && "bg-unverified/10 text-unverified line-through decoration-unverified/50"
              )}
            >
              <span aria-hidden className="mr-2 inline-block w-3 select-none text-muted-foreground">
                {line.kind === "add" ? "+" : line.kind === "del" ? "−" : " "}
              </span>
              <span className="sr-only">{line.kind === "add" ? "Added: " : line.kind === "del" ? "Removed: " : ""}</span>
              {line.text || " "}
            </div>
          ))}
        </pre>
      ))}
    </div>
  )
}
