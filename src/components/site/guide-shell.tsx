import * as React from "react"
import { ChevronRightIcon, CircleDotIcon, Gamepad2Icon } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { HeaderControls, type PatchNav } from "@/components/site/site-header"

/** One entry in the guide navigation; built at build time from the section tree (src/lib/nav.ts). */
export interface NavItem {
  title: string
  href?: string
  active?: boolean
  /** Changed in the patch being viewed. */
  changed?: boolean
  /** Folder contains the current page, so it starts expanded. */
  open?: boolean
  children: NavItem[]
}

export interface Crumb {
  title: string
  href?: string
}

interface GuideShellProps {
  siteHref: string
  guideTitle: string
  patchLabel: string
  items: NavItem[]
  crumbs: Crumb[]
  patch: PatchNav
  /** Playing mode for this guide in the viewed patch. */
  playHref: string
  children?: React.ReactNode
}

export function GuideShell({ siteHref, guideTitle, patchLabel, items, crumbs, patch, playHref, children }: GuideShellProps) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" render={<a href={siteHref} />}>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">AION 2 Guides</span>
                  <span className="text-xs text-muted-foreground">{patchLabel}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{guideTitle}</SidebarGroupLabel>
            <SidebarMenu>
              {items.map((item) => (
                <TopItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton render={<a href={playHref} />}>
                <Gamepad2Icon />
                <span>Playing mode</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Breadcrumb className="min-w-0 flex-1">
            <BreadcrumbList>
              {crumbs.map((crumb, i) => (
                <React.Fragment key={`${crumb.title}-${i}`}>
                  {i > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                  <BreadcrumbItem className={i < crumbs.length - 1 ? "hidden md:block" : undefined}>
                    {crumb.href && i < crumbs.length - 1 ? (
                      <BreadcrumbLink href={crumb.href}>{crumb.title}</BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="truncate">{crumb.title}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <HeaderControls patch={patch} />
        </header>
        <div className="mx-auto w-full max-w-3xl px-4 py-10 md:px-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function ChangedMark() {
  return (
    <>
      <CircleDotIcon aria-hidden className="ml-auto text-primary" />
      <span className="sr-only">(changed in this patch)</span>
    </>
  )
}

function TopItem({ item }: { item: NavItem }) {
  if (item.children.length === 0) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton isActive={item.active} render={<a href={item.href} />}>
          <span className="truncate">{item.title}</span>
          {item.changed && <ChangedMark />}
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }
  return (
    <Collapsible defaultOpen={item.open} render={<SidebarMenuItem />}>
      <CollapsibleTrigger render={<SidebarMenuButton className="group/trigger" />}>
        <span className="truncate">{item.title}</span>
        <ChevronRightIcon className="ml-auto transition-transform group-data-[panel-open]/trigger:rotate-90" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          <FolderChildren item={item} />
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  )
}

/** A folder's own index page (if any) comes first as "Overview", then its children. */
function FolderChildren({ item }: { item: NavItem }) {
  return (
    <>
      {item.href && (
        <SidebarMenuSubItem>
          <SidebarMenuSubButton isActive={item.active} href={item.href}>
            <span className="truncate">Overview</span>
            {item.changed && <ChangedMark />}
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      )}
      {item.children.map((child) => (
        <SubItem key={child.title} item={child} />
      ))}
    </>
  )
}

function SubItem({ item }: { item: NavItem }) {
  if (item.children.length === 0) {
    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton isActive={item.active} href={item.href}>
          <span className="truncate">{item.title}</span>
          {item.changed && <ChangedMark />}
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    )
  }
  return (
    <Collapsible defaultOpen={item.open} render={<SidebarMenuSubItem />}>
      <CollapsibleTrigger render={<SidebarMenuSubButton render={<button type="button" />} className="group/trigger w-full" />}>
        <span className="truncate">{item.title}</span>
        <ChevronRightIcon className="ml-auto transition-transform group-data-[panel-open]/trigger:rotate-90" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          <FolderChildren item={item} />
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  )
}
