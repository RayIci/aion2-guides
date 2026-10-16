import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Theme = "dark" | "light" | "system"

// Same rule as the pre-paint script in Base.astro: dark unless the visitor chose otherwise.
function apply(theme: Theme) {
  const dark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
  document.documentElement.classList.toggle("dark", dark)
}

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem("theme")
    return stored === "light" || stored === "system" ? stored : "dark"
  } catch {
    return "dark"
  }
}

export function ModeToggle() {
  const [theme, setTheme] = React.useState<Theme>("dark")

  React.useEffect(() => setTheme(readTheme()), [])

  const choose = (value: Theme) => {
    setTheme(value)
    apply(value)
    try {
      localStorage.setItem("theme", value)
    } catch {}
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Choose theme" />}>
        <SunIcon className="scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
        <MoonIcon className="absolute scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={theme} onValueChange={(v) => choose(v as Theme)}>
            <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
