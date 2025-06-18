"use client"

import { useState } from "react"
import { MessageSquare, Trash2, Edit3, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Mock conversation data
const mockConversations = [
  {
    id: "1",
    title: "React Best Practices",
    lastMessage: "How to optimize React components?",
    timestamp: "2 hours ago",
    isActive: true,
  },
  {
    id: "2",
    title: "TypeScript Help",
    lastMessage: "Explain generic types",
    timestamp: "1 day ago",
    isActive: false,
  },
  {
    id: "3",
    title: "Next.js Routing",
    lastMessage: "App router vs Pages router",
    timestamp: "2 days ago",
    isActive: false,
  },
  {
    id: "4",
    title: "CSS Grid Layout",
    lastMessage: "Creating responsive grids",
    timestamp: "3 days ago",
    isActive: false,
  },
  {
    id: "5",
    title: "API Integration",
    lastMessage: "Handling API errors",
    timestamp: "1 week ago",
    isActive: false,
  },
  {
    id: "6",
    title: "Database Design",
    lastMessage: "Normalization techniques",
    timestamp: "1 week ago",
    isActive: false,
  },
  {
    id: "7",
    title: "Performance Optimization",
    lastMessage: "Web vitals improvement",
    timestamp: "2 weeks ago",
    isActive: false,
  },
]

export function AppSidebar() {
  const [conversations, setConversations] = useState(mockConversations)
  const [activeConversation, setActiveConversation] = useState("1")
  const [searchQuery, setSearchQuery] = useState("")

  const handleConversationClick = (id: string) => {
    setActiveConversation(id)
    setConversations((prev) =>
      prev.map((conv) => ({
        ...conv,
        isActive: conv.id === id,
      })),
    )
  }

  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== id))
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <Button className="w-full justify-start mb-3" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Conversation
        </Button>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredConversations.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No conversations found</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={cn(
                    "group relative rounded-lg p-3 cursor-pointer transition-all hover:bg-accent",
                    conversation.isActive && "bg-accent",
                  )}
                  onClick={() => handleConversationClick(conversation.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate mb-1">{conversation.title}</h3>
                      <p className="text-xs text-muted-foreground truncate mb-1">{conversation.lastMessage}</p>
                      <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" align="start">
                        <DropdownMenuItem>
                          <Edit3 className="h-4 w-4 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteConversation(conversation.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
