// Progressive enhancement for content blocks rendered by the content core:
// macro copy buttons and persistent checklists. Pages work without it.

function storageGet(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function storageSet(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, value)
  } catch {}
}

/** Progress is keyed by section id + item id, not by patch, so it survives patch switches. */
export function checklistKey(sectionId: string, itemId: string): string {
  return `checklist:${sectionId}#${itemId}`
}

function enhanceMacros(root: ParentNode) {
  for (const button of root.querySelectorAll<HTMLButtonElement>("[data-copy-macro]")) {
    if (button.dataset.ready) continue
    button.dataset.ready = "1"
    button.addEventListener("click", async () => {
      const code = button.closest("figure")?.querySelector("code")
      if (!code) return
      const text = (code.textContent ?? "").replace(/\n$/, "")
      try {
        await navigator.clipboard.writeText(text)
        button.textContent = "Copied"
      } catch {
        // Clipboard blocked: select the text so the player can copy it by hand.
        const range = document.createRange()
        range.selectNodeContents(code)
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
        button.textContent = "Selected"
      }
      window.setTimeout(() => (button.textContent = "Copy"), 1500)
    })
  }
}

function enhanceChecklists(root: ParentNode) {
  for (const list of root.querySelectorAll<HTMLElement>("[data-checklist]")) {
    if (list.dataset.ready) continue
    list.dataset.ready = "1"
    const sectionId = list.closest<HTMLElement>("[data-section-id]")?.dataset.sectionId ?? location.pathname
    const boxes: { input: HTMLInputElement; key: string }[] = []

    for (const item of list.querySelectorAll<HTMLLIElement>("li[data-checklist-id]")) {
      const input = item.querySelector<HTMLInputElement>('input[type="checkbox"]')
      if (!input) continue
      const key = checklistKey(sectionId, item.dataset.checklistId!)
      input.disabled = false
      input.checked = storageGet(key) === "1"
      input.setAttribute("aria-label", item.textContent?.trim() ?? "Checklist item")
      input.addEventListener("change", () => {
        storageSet(key, input.checked ? "1" : null)
        update()
      })
      // The whole row toggles, except links inside it.
      item.addEventListener("click", (event) => {
        if (event.target === input || (event.target as HTMLElement).closest("a")) return
        input.click()
      })
      boxes.push({ input, key })
    }
    if (boxes.length === 0) continue

    const footer = document.createElement("div")
    footer.className = "checklist__footer"
    const progress = document.createElement("span")
    const reset = document.createElement("button")
    reset.type = "button"
    reset.className = "checklist__reset"
    reset.textContent = "Reset"
    reset.addEventListener("click", () => {
      for (const box of boxes) {
        box.input.checked = false
        storageSet(box.key, null)
      }
      update()
    })
    footer.append(progress, reset)
    list.append(footer)

    function update() {
      const done = boxes.filter((b) => b.input.checked).length
      progress.textContent = `${done} of ${boxes.length} done`
      reset.hidden = done === 0
    }
    update()
  }
}

export function enhance(root: ParentNode = document) {
  enhanceMacros(root)
  enhanceChecklists(root)
}

enhance()
