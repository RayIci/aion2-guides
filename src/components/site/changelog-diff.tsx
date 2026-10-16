import { ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DiffView } from "@/components/site/diff-view"
import type { Hunk } from "@/lib/diff"

/** "Show text changes" toggle on a changelog entry. */
export function ChangelogDiff({ hunks, added, removed }: { hunks: Hunk[]; added: number; removed: number }) {
  return (
    <Collapsible className="flex flex-col gap-2">
      <CollapsibleTrigger render={<Button variant="ghost" size="sm" className="group/trigger w-fit -ml-2.5" />}>
        <ChevronRightIcon data-icon="inline-start" className="transition-transform group-data-[panel-open]/trigger:rotate-90" />
        Text changes
        <span className="text-verified tabular-nums">+{added}</span>
        <span className="text-unverified tabular-nums">−{removed}</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <DiffView hunks={hunks} />
      </CollapsibleContent>
    </Collapsible>
  )
}
