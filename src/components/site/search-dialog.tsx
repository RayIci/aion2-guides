import * as React from "react"
import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

// Pagefind's browser API, loaded at runtime from the built site (`pagefind --site dist`).
interface PagefindResultData {
  url: string
  excerpt: string
  meta: { title?: string; guide?: string; patch?: string }
}
interface Pagefind {
  options(opts: { baseUrl?: string }): Promise<void>
  search(term: string, opts?: { filters?: Record<string, string> }): Promise<{ results: { id: string; data(): Promise<PagefindResultData> }[] }>
}

let pagefindPromise: Promise<Pagefind> | undefined
function loadPagefind(base: string): Promise<Pagefind> {
  pagefindPromise ??= (import(/* @vite-ignore */ `${base}pagefind/pagefind.js`) as Promise<Pagefind>).then(async (pf) => {
    await pf.options({ baseUrl: base })
    return pf
  })
  return pagefindPromise
}

interface Hit extends PagefindResultData {
  id: string
}

type State = { kind: "idle" } | { kind: "loading" } | { kind: "done"; hits: Hit[] } | { kind: "unavailable" }

/** Full-text search over guide sections, scoped to the patch being viewed by default. */
export function SearchDialog({ patchId, patchTitle }: { patchId: string; patchTitle: string }) {
  const base = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [allPatches, setAllPatches] = React.useState(false)
  const [state, setState] = React.useState<State>({ kind: "idle" })

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  React.useEffect(() => {
    if (!open) return
    const term = query.trim()
    if (!term) {
      setState({ kind: "idle" })
      return
    }
    let cancelled = false
    setState({ kind: "loading" })
    const timer = window.setTimeout(async () => {
      try {
        const pf = await loadPagefind(base)
        const search = await pf.search(term, allPatches ? undefined : { filters: { patch: patchId } })
        const hits = await Promise.all(search.results.slice(0, 12).map(async (r) => ({ id: r.id, ...(await r.data()) })))
        if (!cancelled) setState({ kind: "done", hits })
      } catch {
        if (!cancelled) setState({ kind: "unavailable" })
      }
    }, 150)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [open, query, allPatches, patchId, base])

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)} aria-label="Search guides">
        <SearchIcon data-icon="inline-start" />
        <span className="hidden lg:inline">Search</span>
        <KbdGroup className="hidden lg:inline-flex">
          <Kbd>Ctrl</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} title="Search guides" description="Search every guide section in this patch.">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search skills, materials, maps…" value={query} onValueChange={setQuery} />
          <div className="flex items-center gap-2 border-b px-3 py-2">
            <Switch id="search-all-patches" size="sm" checked={allPatches} onCheckedChange={setAllPatches} />
            <Label htmlFor="search-all-patches" className="text-xs font-normal text-muted-foreground">
              {allPatches ? "Searching all patches" : `Only ${patchTitle}`}
            </Label>
          </div>
          <CommandList>
            {state.kind === "idle" && <CommandEmpty>Type to search the guides.</CommandEmpty>}
            {state.kind === "loading" && <CommandEmpty>Searching…</CommandEmpty>}
            {state.kind === "unavailable" && (
              <CommandEmpty>Search isn't available here. The index is only built by `npm run build`.</CommandEmpty>
            )}
            {state.kind === "done" && state.hits.length === 0 && <CommandEmpty>No sections match "{query.trim()}".</CommandEmpty>}
            {state.kind === "done" && state.hits.length > 0 && (
              <CommandGroup heading="Sections">
                {state.hits.map((hit) => (
                  <CommandItem key={hit.id} value={hit.id} onSelect={() => window.location.assign(hit.url)}>
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="truncate font-medium">{hit.meta.title ?? hit.url}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {[hit.meta.guide, allPatches ? hit.meta.patch : undefined].filter(Boolean).join(" · ")}
                      </span>
                      <span
                        className="line-clamp-2 text-xs text-muted-foreground [&_mark]:bg-transparent [&_mark]:font-semibold [&_mark]:text-foreground"
                        dangerouslySetInnerHTML={{ __html: hit.excerpt }}
                      />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
