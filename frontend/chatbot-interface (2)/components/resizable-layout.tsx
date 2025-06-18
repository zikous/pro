"use client"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import { AppSidebar } from "./app-sidebar"
import { ChatInterface } from "./chat-interface"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function ResizableLayout() {
  const [sidebarWidth, setSidebarWidth] = useState(320)
  const [isResizing, setIsResizing] = useState(false)
  const { open, isMobile } = useSidebar()
  const resizeRef = useRef<HTMLDivElement>(null)

  const minWidth = 240
  const maxWidth = 480

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return

      const newWidth = e.clientX
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth)
      }
    },
    [isResizing, minWidth, maxWidth],
  )

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
  }, [])

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
      }
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  if (isMobile) {
    return (
      <div className="flex-1 pt-14">
        <AppSidebar />
        <ChatInterface />
      </div>
    )
  }

  return (
    <div className="flex-1 flex pt-14 overflow-hidden">
      {/* Sidebar */}
      <div
        className={cn(
          "relative border-r bg-background transition-all duration-200 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        style={{ width: open ? sidebarWidth : 0 }}
      >
        <div className="h-full overflow-hidden">
          <AppSidebar />
        </div>

        {/* Resize Handle */}
        {open && (
          <div
            ref={resizeRef}
            className="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-border transition-colors group"
            onMouseDown={handleMouseDown}
          >
            <div className="absolute top-1/2 right-0 w-1 h-8 -translate-y-1/2 bg-border opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 min-w-0">
        <ChatInterface />
      </div>

      {/* Resize Overlay */}
      {isResizing && <div className="fixed inset-0 z-50 cursor-col-resize" />}
    </div>
  )
}
