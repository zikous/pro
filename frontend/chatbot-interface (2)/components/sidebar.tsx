"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

const mockConversations = [
  { id: "1", title: "React Best Practices", time: "2h ago", active: true },
  { id: "2", title: "TypeScript Help", time: "1d ago", active: false },
  { id: "3", title: "Next.js Routing", time: "2d ago", active: false },
  { id: "4", title: "CSS Grid Layout", time: "3d ago", active: false },
  { id: "5", title: "API Integration", time: "1w ago", active: false },
]

export function Sidebar() {
  const [conversations, setConversations] = useState(mockConversations)
  const [activeId, setActiveId] = useState("1")

  const handleSelect = (id: string) => {
    setActiveId(id)
    setConversations((prev) => prev.map((conv) => ({ ...conv, active: conv.id === id })))
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setConversations((prev) => prev.filter((conv) => conv.id !== id))
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Button className="w-full justify-start" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => handleSelect(conv.id)}
              className={cn(
                "group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent",
                conv.active && "bg-accent",
              )}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{conv.title}</p>
                  <p className="text-xs text-muted-foreground">{conv.time}</p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => handleDelete(conv.id, e)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
