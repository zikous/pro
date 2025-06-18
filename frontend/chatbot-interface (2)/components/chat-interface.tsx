"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Copy, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

// Mock messages for demonstration
const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your AI assistant. How can I help you today?",
    role: "assistant",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    content: "I need help with React best practices. Can you explain how to optimize component performance?",
    role: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
  },
  {
    id: "3",
    content:
      "Great question! Here are some key React performance optimization techniques:\n\n**1. Use React.memo()** for functional components to prevent unnecessary re-renders when props haven't changed.\n\n**2. Implement useMemo()** for expensive calculations that don't need to run on every render.\n\n**3. Use useCallback()** to memoize functions and prevent child components from re-rendering unnecessarily.\n\n**4. Code splitting** with React.lazy() and Suspense to load components only when needed.\n\n**5. Optimize bundle size** by removing unused dependencies and using tree shaking.\n\n**6. Virtual scrolling** for large lists to render only visible items.\n\nWould you like me to elaborate on any of these techniques with code examples?",
    role: "assistant",
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
  },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "This is a mock response from the AI assistant. In a real implementation, this would be connected to an AI service like OpenAI's GPT. The response would be more contextual and helpful based on your specific question.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)

    // Auto-resize textarea
    const textarea = e.target
    textarea.style.height = "auto"
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px"
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Header */}
      <div className="border-b p-4 bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">React Best Practices</h2>
            <p className="text-sm text-muted-foreground">AI Assistant • Online</p>
          </div>
          <Button variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Clear Chat
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex gap-4", message.role === "user" ? "justify-end" : "justify-start")}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div className={cn("flex flex-col", message.role === "user" ? "items-end" : "items-start")}>
                <Card
                  className={cn(
                    "max-w-[80%] p-4 relative group",
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>

                  {/* Message Actions */}
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-1 mt-3 pt-2 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2"
                        onClick={() => copyToClipboard(message.content)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </Card>

                <div
                  className={cn(
                    "text-xs text-muted-foreground mt-1 px-1",
                    message.role === "user" ? "text-right" : "text-left",
                  )}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              {message.role === "user" && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 justify-start">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <Card className="bg-muted p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground">AI is thinking...</span>
                </div>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t p-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                className="min-h-[44px] max-h-[200px] resize-none pr-12"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="sm"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 bottom-2 h-8 w-8 p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            This is a mock chatbot interface. Messages are simulated for demonstration purposes.
          </p>
        </div>
      </div>
    </div>
  )
}
