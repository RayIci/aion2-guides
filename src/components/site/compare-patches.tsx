import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { ChangelogDiff } from "@/components/site/changelog-diff"
import { diffStats, hunks, lineDiff, type Hunk } from "@/lib/diff"

interface PatchRef {
  id: string
  title: string
}
interface SectionData {
  id: string
  title: string
  body: string
}
interface Row {
  id: string
  title: string
  kind: "changed" | "added" | "removed"
  href?: string
  diff: Hunk[]
  added: number
  removed: number
}

const KIND = {
  changed: { label: "Changed", variant: "secondary" },
  added: { label: "Added", variant: "default" },
  removed: { label: "Removed", variant: "outline" },
} as const

async function loadSections(base: string, id: string): Promise<SectionData[]> {
  const res = await fetch(`${base}${id}/sections.json`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return (await res.json()).sections
}

function compare(base: string, from: SectionData[], to: SectionData[], toId: string, fromId: string): Row[] {
  const before = new Map(from.map((s) => [s.id, s]))
  const after = new Map(to.map((s) => [s.id, s]))
  const rows: Row[] = []
  for (const id of new Set([...before.keys(), ...after.keys()])) {
    const a = before.get(id)
    const b = after.get(id)
    if (a && b && a.body.trim() === b.body.trim()) continue
    const lines = lineDiff(a?.body ?? "", b?.body ?? "")
    const path = id.replace(/(^|\/)index$/, "")
    rows.push({
      id,
      title: (b ?? a)!.title,
      kind: a && b ? "changed" : b ? "added" : "removed",
      href: b ? `${base}${toId}/${path}` : `${base}${fromId}/${path}`,
      diff: hunks(lines),
      ...diffStats(lines),
    })
  }
  return rows.sort((x, y) => x.id.localeCompare(y.id))
}

/** Pick any two patches and see every section whose text differs, computed in the browser. */
export function ComparePatches({ patches }: { patches: PatchRef[] }) {
  const base = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`
  const items = patches.map((p) => ({ value: p.id, label: p.title }))
  const [from, setFrom] = React.useState(patches[1]?.id ?? patches[0]?.id)
  const [to, setTo] = React.useState(patches[0]?.id)
  const [state, setState] = React.useState<{ kind: "loading" } | { kind: "error" } | { kind: "done"; rows: Row[] }>({ kind: "loading" })

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const f = params.get("from")
    const t = params.get("to")
    if (f && patches.some((p) => p.id === f)) setFrom(f)
    if (t && patches.some((p) => p.id === t)) setTo(t)
  }, [patches])

  React.useEffect(() => {
    if (!from || !to) return
    const url = new URL(window.location.href)
    url.searchParams.set("from", from)
    url.searchParams.set("to", to)
    window.history.replaceState(null, "", url)
    let cancelled = false
    setState({ kind: "loading" })
    Promise.all([loadSections(base, from), loadSections(base, to)])
      .then(([a, b]) => !cancelled && setState({ kind: "done", rows: compare(base, a, b, to, from) }))
      .catch(() => !cancelled && setState({ kind: "error" }))
    return () => {
      cancelled = true
    }
  }, [from, to, base])

  const picker = (label: string, value: string | undefined, onChange: (v: string) => void, id: string) => (
    <Field className="min-w-0 flex-1">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Select items={items} value={value} onValueChange={(v) => v && onChange(v as string)}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            {patches.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )

  const rows = state.kind === "done" ? state.rows : []
  return (
    <div className="flex flex-col gap-8">
      <FieldGroup className="flex-row flex-wrap gap-4">
        {picker("From", from, setFrom, "compare-from")}
        {picker("To", to, setTo, "compare-to")}
      </FieldGroup>

      {state.kind === "loading" && (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      )}
      {state.kind === "error" && (
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>Couldn't load the patches</EmptyTitle>
            <EmptyDescription>Reload the page to try again.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
      {state.kind === "done" && rows.length === 0 && (
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>{from === to ? "Pick two different patches" : "No differences"}</EmptyTitle>
            <EmptyDescription>
              {from === to ? "Choose another patch in From or To." : "Every section reads the same in both patches."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
      {state.kind === "done" && rows.length > 0 && (
        <ol className="flex flex-col divide-y rounded-xl border">
          {rows.map((row) => (
            <li key={row.id} className="flex flex-col gap-1 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={KIND[row.kind].variant}>{KIND[row.kind].label}</Badge>
                <a className="font-medium underline-offset-4 hover:underline" href={row.href}>
                  {row.title}
                </a>
                <span className="truncate text-xs text-muted-foreground">{row.id}</span>
              </div>
              <ChangelogDiff hunks={row.diff} added={row.added} removed={row.removed} />
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
