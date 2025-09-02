import Link from "next/link"
import {
  Home,
  MessageSquare,
  History,
  BookOpen,
  Calendar,
  FileText,
  Users,
  BarChart3,
  Settings,
  PlusCircle,
  ClipboardList,
  Target,
  TrendingUp,
  FileCheck,
  Gamepad2,
  Mail,
  Award,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const navigationSections = [
  {
    title: "Principal",
    items: [
      { name: "Panel Principal", href: "/", icon: Home, active: true },
      { name: "ChatBot Pedagógico", href: "/chatbot", icon: MessageSquare, badge: "IA" },
      { name: "Historial", href: "/historial", icon: History },
      { name: "Guía de Usuario", href: "/guia", icon: BookOpen },
    ],
  },
  {
    title: "Planificación",
    items: [
      { name: "Planificador de Clases", href: "/planificador-clases", icon: Calendar, popular: true },
      { name: "Secuencias Didácticas", href: "/secuencias", icon: FileText },
      { name: "Planificador Anual", href: "/planificador-anual", icon: ClipboardList },
      { name: "Planificador Trimestral", href: "/planificador-trimestral", icon: Target },
    ],
  },
  {
    title: "Evaluación",
    items: [
      { name: "Generador de Rúbricas", href: "/rubricas", icon: BarChart3 },
      { name: "Generador de Cuestionarios", href: "/cuestionarios", icon: FileCheck },
      { name: "Asistente de Retroalimentación", href: "/retroalimentacion", icon: TrendingUp, badge: "IA" },
      { name: "Informes de Progreso", href: "/informes", icon: Award },
    ],
  },
  {
    title: "Personalización",
    items: [
      { name: "Adaptaciones NEE", href: "/adaptaciones", icon: Users },
      { name: "Adaptador de Textos", href: "/adaptador-textos", icon: FileText, badge: "IA" },
      { name: "Ideas de Gamificación", href: "/gamificacion", icon: Gamepad2 },
      { name: "Generador de ABP", href: "/abp", icon: PlusCircle },
      { name: "Boletín para Padres", href: "/boletin", icon: Mail },
      { name: "Generador de Actos", href: "/actos", icon: Settings },
    ],
  },
]

export function Sidebar() {
  return (
    <div className="w-72 bg-sidebar border-r border-sidebar-border flex flex-col shadow-sm">
      <div className="p-6 border-b border-sidebar-border bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-sidebar-foreground">ClaseIAXpress</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
          <span className="text-sm text-sidebar-foreground/80 font-medium">Backend Gemini conectado</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {navigationSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-3 px-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200",
                          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-sm",
                          "focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-1",
                          item.active
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-sidebar-foreground hover:translate-x-1",
                          item.popular && !item.active && "border border-secondary/20",
                        )}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate flex-1">{item.name}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs px-1.5 py-0.5 h-5">
                            {item.badge}
                          </Badge>
                        )}
                        {item.popular && !item.active && (
                          <Badge
                            variant="outline"
                            className="text-xs px-1.5 py-0.5 h-5 border-secondary text-secondary"
                          >
                            Popular
                          </Badge>
                        )}
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}
