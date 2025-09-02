import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  ArrowRight,
  Calendar,
  FileText,
  BarChart3,
  BookOpen,
  Sparkles,
  TrendingUp,
  Users,
  Gamepad2,
  Zap,
} from "lucide-react"

const featuredTools = [
  {
    title: "Planificador de Clases",
    description: "Crea planificaciones detalladas y alineadas con el currículo de la DGE Mendoza con IA.",
    icon: Calendar,
    href: "/planificador-clases",
    category: "Planificación",
    popular: true,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "ChatBot Pedagógico",
    description: "Asistente inteligente que responde dudas pedagógicas y sugiere estrategias de enseñanza.",
    icon: Sparkles,
    href: "/chatbot",
    category: "IA",
    badge: "Nuevo",
    gradient: "from-green-500 to-green-600",
  },
  {
    title: "Generador de Rúbricas",
    description: "Crea rúbricas de evaluación personalizadas para cualquier actividad o proyecto.",
    icon: BarChart3,
    href: "/rubricas",
    category: "Evaluación",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    title: "Adaptador de Textos",
    description: "Adapta automáticamente textos para diferentes niveles de comprensión y NEE.",
    icon: FileText,
    href: "/adaptador-textos",
    category: "Personalización",
    badge: "IA",
    gradient: "from-orange-500 to-orange-600",
  },
]

const quickActions = [
  {
    title: "Secuencias Didácticas",
    description: "Planifica unidades completas",
    icon: BookOpen,
    href: "/secuencias",
    count: "12 plantillas",
  },
  {
    title: "Informes de Progreso",
    description: "Seguimiento de estudiantes",
    icon: TrendingUp,
    href: "/informes",
    count: "5 formatos",
  },
  {
    title: "Adaptaciones NEE",
    description: "Herramientas inclusivas",
    icon: Users,
    href: "/adaptaciones",
    count: "8 categorías",
  },
  {
    title: "Gamificación",
    description: "Ideas para motivar",
    icon: Gamepad2,
    href: "/gamificacion",
    count: "20+ ideas",
  },
]

export function MainContent() {
  return (
    <main className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-background to-muted/20">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Bienvenido a ClaseIAXpress</h1>
            <p className="text-xl text-primary font-medium">Tu Asistente Pedagógico Inteligente</p>
          </div>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm">
          <p className="text-foreground leading-relaxed text-lg mb-4">
            Hemos rediseñado tu panel principal para que encuentres tus herramientas pedagógicas más rápido.
            <strong className="text-primary"> Ahora están agrupadas por categorías</strong> para facilitar tu flujo de
            trabajo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold text-sm text-foreground">Planificación</p>
                <p className="text-xs text-muted-foreground">Todos los planificadores</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg border border-secondary/10">
              <BarChart3 className="w-5 h-5 text-secondary" />
              <div>
                <p className="font-semibold text-sm text-foreground">Evaluación</p>
                <p className="text-xs text-muted-foreground">Rúbricas y feedback</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg border border-accent/10">
              <Users className="w-5 h-5 text-accent" />
              <div>
                <p className="font-semibold text-sm text-foreground">Personalización</p>
                <p className="text-xs text-muted-foreground">Adapta y gamifica</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Herramientas Destacadas</h2>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg">
            Ver todas las herramientas
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link key={tool.title} href={tool.href}>
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md hover:-translate-y-1 bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 bg-gradient-to-br ${tool.gradient} rounded-xl shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                              {tool.title}
                            </CardTitle>
                            {tool.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {tool.badge}
                              </Badge>
                            )}
                            {tool.popular && (
                              <Badge className="text-xs bg-gradient-to-r from-primary to-secondary text-white">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {tool.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed mb-4 text-muted-foreground">
                      {tool.description}
                    </CardDescription>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform"
                    >
                      Comenzar ahora
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-foreground mb-6">Acceso Rápido</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.title} href={action.href}>
                <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                          {action.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-secondary font-medium">{action.count}</span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
