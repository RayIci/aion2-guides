import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface PatchOption {
  id: string
  title: string
  status: "staged" | "live" | "superseded"
  /** Full URL (base included) of the page to open in that patch. */
  href: string
}

const STATUS = { staged: "Staged", live: "Live", superseded: "Older" } as const

/** Switches patch while staying on the same section where that patch has it (src/lib/patches.ts). */
export function PatchSwitcher({ current, options }: { current: string; options: PatchOption[] }) {
  const items = options.map((o) => ({ value: o.id, label: o.title }))
  return (
    <Select
      items={items}
      value={current}
      onValueChange={(value) => {
        const target = options.find((o) => o.id === value)
        if (target && value !== current) window.location.assign(target.href)
      }}
    >
      <SelectTrigger size="sm" aria-label="Patch" className="max-w-40 2xl:max-w-80">
        <SelectValue className="truncate" />
      </SelectTrigger>
      <SelectContent align="end" alignItemWithTrigger={false} className="w-auto min-w-(--anchor-width) max-w-[min(24rem,calc(100vw-2rem))]">
        <SelectGroup>
          <SelectLabel>Patch</SelectLabel>
          {options.map((o) => (
            <SelectItem key={o.id} value={o.id}>
              <span className="truncate">{o.title}</span>
              <span className="ml-auto pl-4 text-xs text-muted-foreground">{STATUS[o.status]}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
