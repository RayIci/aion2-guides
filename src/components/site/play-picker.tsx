import * as React from "react"

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface Choice {
  key: string
  label: string
}

function readChoice(storageKey: string): { stage?: string; mode?: string } {
  try {
    return JSON.parse(localStorage.getItem(storageKey) ?? "{}")
  } catch {
    return {}
  }
}

/**
 * Stage + Mode picker for playing mode. The play content itself is static HTML in the page
 * (so checklists keep their enhancement); this island only shows the matching groups.
 */
export function PlayPicker({ stages, modes, storageKey }: { stages: Choice[]; modes: Choice[]; storageKey: string }) {
  const [stage, setStage] = React.useState(stages[0]?.key)
  const [mode, setMode] = React.useState(modes[0]?.key)

  React.useEffect(() => {
    const saved = readChoice(storageKey)
    if (saved.stage && stages.some((s) => s.key === saved.stage)) setStage(saved.stage)
    if (saved.mode && modes.some((m) => m.key === saved.mode)) setMode(saved.mode)
  }, [storageKey, stages, modes])

  React.useEffect(() => {
    for (const el of document.querySelectorAll<HTMLElement>("[data-play-group]")) {
      const [kind, key] = [el.dataset.playKind, el.dataset.playGroup]
      el.hidden = (kind === "stage" && key !== stage) || (kind === "mode" && key !== mode)
    }
    try {
      localStorage.setItem(storageKey, JSON.stringify({ stage, mode }))
    } catch {}
  }, [stage, mode, storageKey])

  const stageItems = stages.map((s) => ({ value: s.key, label: s.label }))
  return (
    <FieldGroup className="flex-row flex-wrap items-end gap-4">
      {stages.length > 0 && (
        <Field className="w-full sm:w-64">
          <FieldLabel htmlFor="play-stage">Stage</FieldLabel>
          <Select items={stageItems} value={stage} onValueChange={(v) => v && setStage(v as string)}>
            <SelectTrigger id="play-stage" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectGroup>
                {stages.map((s) => (
                  <SelectItem key={s.key} value={s.key}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      )}
      {modes.length > 0 && (
        <Field className="w-auto min-w-0">
          <FieldLabel>Mode</FieldLabel>
          <ToggleGroup
            variant="outline"
            value={mode ? [mode] : []}
            onValueChange={(v: string[]) => v[0] && setMode(v[0])}
            className="flex-wrap"
            aria-label="Mode"
          >
            {modes.map((m) => (
              <ToggleGroupItem key={m.key} value={m.key}>
                {m.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </Field>
      )}
    </FieldGroup>
  )
}
