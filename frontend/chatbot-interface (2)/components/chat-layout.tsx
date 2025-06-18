"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"
import { ChatArea } from "./chat-area"
import { cn } from "@/lib/utils"

export function ChatLayout() {
  const [sidebarWidth, setSidebarWidth] = useState(280)
  const [isResizing, setIsResizing] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const minWidth = 240
  const maxWidth = 400

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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
    [isResizing],
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

  return (
    <div className="h-screen flex flex-col bg-background">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {!isMobile && (
          <div
            className={cn(
              "relative border-r bg-muted/30 transition-all duration-200",
              sidebarOpen ? "translate-x-0" : "-translate-x-full",
            )}
            style={{ width: sidebarOpen ? sidebarWidth : 0 }}
          >
            <Sidebar />

            {/* Resize Handle */}
            {sidebarOpen && (
              <div
                className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-border transition-colors"
                onMouseDown={handleMouseDown}
              />
            )}
          </div>
        )}

        {/* Mobile Sidebar Overlay */}
        {isMobile && sidebarOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed left-0 top-14 bottom-0 w-80 bg-background border-r">
              <Sidebar />
            </div>
            <div className="absolute inset-0" onClick={() => setSidebarOpen(false)} />
          </div>
        )}

        {/* Chat Area */}
        <div className="flex-1 min-w-0">
          <ChatArea />
        </div>
      </div>

      {/* Resize Overlay */}
      {isResizing && <div className="fixed inset-0 z-50 cursor-col-resize" />}
    </div>
  )
}
