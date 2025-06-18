"use client"

import { Button } from "@/components/ui/button"
import { Menu, Plus, Settings } from "lucide-react"

interface NavbarProps {
  onToggleSidebar: () => void
  sidebarOpen: boolean
}

export function Navbar({ onToggleSidebar, sidebarOpen }: NavbarProps) {
  return (
    <header className="h-14 border-b bg-background">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="h-8 w-8 p-0">
            <Menu className="h-4 w-4" />
          </Button>
          <h1 className="font-semibold">ChatBot AI</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
