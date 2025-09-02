import { TrendingUp, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RetroalimentacionPage() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Asistente de Retroalimentación</h1>
            <p className="text-muted-foreground">Genera comentarios constructivos con IA</p>
          </div>
        </div>
      </div>

      <Card className="text-center py-12">
        <CardHeader>
          <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-secondary" />
          </div>
          <CardTitle className="text-2xl">Próximamente</CardTitle>
          <CardDescription className="text-lg">Esta funcionalidad estará disponible muy pronto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline">Comentarios personalizados</Badge>
            <Badge variant="outline">Sugerencias de mejora</Badge>
            <Badge variant="outline">Retroalimentación constructiva</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
