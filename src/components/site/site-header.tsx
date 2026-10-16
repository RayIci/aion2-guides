import { HistoryIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/site/mode-toggle"
import { PatchSwitcher, type PatchOption } from "@/components/site/patch-switcher"

export interface PatchNav {
  current: string
  options: PatchOption[]
  changelogHref: string
}

/** Right-hand header controls shared by every page: patch switcher, changelog link, theme. */
export function HeaderControls({ patch }: { patch?: PatchNav }) {
  return (
    <div className="ml-auto flex items-center gap-1">
      {patch && (
        <>
          <PatchSwitcher current={patch.current} options={patch.options} />
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" render={<a href={patch.changelogHref} />}>
            <HistoryIcon data-icon="inline-start" />
            Changelog
          </Button>
        </>
      )}
      <ModeToggle />
    </div>
  )
}
