import { ChevronRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item"

export interface GuideListEntry {
  id: string
  title: string
  href: string
  sections?: number
  drafts?: number
  claims?: { verified: number; community: number; unverified: number }
}

export function GuideList({ guides }: { guides: GuideListEntry[] }) {
  if (guides.length === 0) {
    return (
      <Empty className="bg-muted">
        <EmptyHeader>
          <EmptyTitle>No guides in this patch yet</EmptyTitle>
          <EmptyDescription>Guides appear here once their first section is written.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }
  return (
    <ItemGroup className="gap-2">
      {guides.map((g) => (
        <Item key={g.id} variant="outline" render={<a href={g.href} />}>
          <ItemContent>
            <ItemTitle>{g.title}</ItemTitle>
            {g.sections !== undefined && (
              <ItemDescription>
                {g.sections} sections, {g.drafts} still in draft
              </ItemDescription>
            )}
          </ItemContent>
          <ItemActions>
            {g.claims && (
              <div className="hidden gap-1 sm:flex">
                <Badge variant="verified">{g.claims.verified} verified</Badge>
                <Badge variant="community">{g.claims.community} community</Badge>
                <Badge variant="unverified">{g.claims.unverified} unverified</Badge>
              </div>
            )}
            <ChevronRightIcon className="text-muted-foreground" />
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  )
}
