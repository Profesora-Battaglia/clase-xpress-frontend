"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PageHeaderProps {
  title: string
  description: string
  showBackButton?: boolean
}

export function PageHeader({ title, description, showBackButton = true }: PageHeaderProps) {
  return (
    <div className="mb-6">
      {showBackButton && (
        <div className="mb-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      )}
      <h1 className="text-3xl font-bold text-primary mb-2">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
