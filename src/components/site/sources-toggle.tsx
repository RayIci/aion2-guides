import * as React from "react"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

// Citations are hidden by default so the guide reads cleanly; the pre-paint script in
// Base.astro applies the saved choice. Same storage key there.
const KEY = "sources"

function read(): boolean {
  try {
    return localStorage.getItem(KEY) === "show"
  } catch {
    return false
  }
}

export function SourcesToggle() {
  const [shown, setShown] = React.useState(false)
  React.useEffect(() => setShown(read()), [])
  const change = (on: boolean) => {
    setShown(on)
    document.documentElement.dataset.sources = on ? "show" : "hide"
    try {
      localStorage.setItem(KEY, on ? "show" : "hide")
    } catch {}
  }
  return (
    <div className="flex items-center gap-2 px-1 sm:px-2" title="Show sources">
      <Switch id="sources-toggle" checked={shown} onCheckedChange={change} />
      <Label htmlFor="sources-toggle" className="sr-only text-sm xl:not-sr-only">
        Sources
      </Label>
    </div>
  )
}
