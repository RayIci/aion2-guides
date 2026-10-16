import { HistoryIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/site/mode-toggle"
import { PatchSwitcher, type PatchOption } from "@/components/site/patch-switcher"
import { SearchDialog } from "@/components/site/search-dialog"

export interface PatchNav {
  current: string
  options: PatchOption[]
  changelogHref: string
}

/** Right-hand header controls shared by every page: search, patch switcher, changelog link, theme. */
export function HeaderControls({ patch }: { patch?: PatchNav }) {
  const currentTitle = patch?.options.find((o) => o.id === patch.current)?.title ?? patch?.current
  return (
    <div className="ml-auto flex items-center gap-1" data-ui>
      {patch && (
        <>
          <SearchDialog patchId={patch.current} patchTitle={currentTitle ?? ""} />
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
