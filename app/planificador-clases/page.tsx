"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/page-header"
import { planificadorAPI } from "@/lib/api"
import { Loader2, BookOpen, Clock, Users, Lightbulb, Copy, Download } from "lucide-react"

const EXAMPLE_TEMPLATES = [
  {
    tema: "Fracciones matemáticas",
    nivel: "primario",
    duracion: "80min",
    objetivos: "Que los estudiantes comprendan el concepto de fracción y puedan representarlas gráficamente",
  },
  {
    tema: "Revolución Industrial",
    nivel: "secundario",
    duracion: "80min",
    objetivos: "Analizar las causas y consecuencias de la Revolución Industrial en Europa",
  },
  {
    tema: "Ecosistemas y biodiversidad",
    nivel: "primario",
    duracion: "40min",
    objetivos: "Identificar los componentes de un ecosistema y su importancia para la vida",
  },
]

export default function PlanificadorClasesPage() {
  const [formData, setFormData] = useState({
    tema: "",
    nivel: "",
    duracion: "",
    objetivos: "",
    recursos: "",
  })
  const [resultado, setResultado] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await planificadorAPI.crearPlanificacion(formData)
      if (response.success) {
        setResultado(response.data)
      } else {
        setResultado(`Error: ${response.error}`)
      }
    } catch (error) {
      setResultado("Error al generar la planificación")
    } finally {
      setLoading(false)
    }
  }

  const loadExample = (example: (typeof EXAMPLE_TEMPLATES)[0]) => {
    setFormData({
      ...formData,
      tema: example.tema,
      nivel: example.nivel,
      duracion: example.duracion,
      objetivos: example.objetivos,
    })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resultado)
  }

  const downloadPlan = () => {
    const blob = new Blob([resultado], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `planificacion-${formData.tema.replace(/\s+/g, "-")}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        <PageHeader
          title="Planificador de Clases"
          description="Crea planificaciones detalladas y alineadas con el currículo"
        />

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Ejemplos de planificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Haz clic en cualquier ejemplo para cargar los datos automáticamente:
            </p>
            <div className="grid gap-3">
              {EXAMPLE_TEMPLATES.map((example, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors p-3 text-xs leading-relaxed justify-start"
                  onClick={() => loadExample(example)}
                >
                  <div className="text-left">
                    <div className="font-medium">{example.tema}</div>
                    <div className="opacity-80">
                      {example.nivel} • {example.duracion}
                    </div>
                  </div>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Datos de la Clase
              </CardTitle>
              <CardDescription>Completa la información para generar tu planificación</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="tema">Tema de la Clase</Label>
                  <Input
                    id="tema"
                    value={formData.tema}
                    onChange={(e) => setFormData({ ...formData, tema: e.target.value })}
                    placeholder="Ej: Fracciones matemáticas"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="nivel">Nivel Educativo</Label>
                  <Select value={formData.nivel} onValueChange={(value) => setFormData({ ...formData, nivel: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primario">Primario</SelectItem>
                      <SelectItem value="secundario">Secundario</SelectItem>
                      <SelectItem value="superior">Superior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duracion">Duración</Label>
                  <Select
                    value={formData.duracion}
                    onValueChange={(value) => setFormData({ ...formData, duracion: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Duración de la clase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="40min">40 minutos</SelectItem>
                      <SelectItem value="80min">80 minutos</SelectItem>
                      <SelectItem value="120min">120 minutos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="objetivos">Objetivos de Aprendizaje</Label>
                  <Textarea
                    id="objetivos"
                    value={formData.objetivos}
                    onChange={(e) => setFormData({ ...formData, objetivos: e.target.value })}
                    placeholder="Describe los objetivos que quieres lograr..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="recursos">Recursos Disponibles</Label>
                  <Textarea
                    id="recursos"
                    value={formData.recursos}
                    onChange={(e) => setFormData({ ...formData, recursos: e.target.value })}
                    placeholder="Pizarra, computadoras, material didáctico..."
                    rows={2}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generando Planificación...
                    </>
                  ) : (
                    <>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Generar Planificación
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary" />
                Planificación Generada
              </CardTitle>
              <CardDescription>Tu planificación aparecerá aquí</CardDescription>
              {resultado && (
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-1" />
                    Copiar
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadPlan}>
                    <Download className="h-4 w-4 mr-1" />
                    Descargar
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {resultado ? (
                <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">{resultado}</pre>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Completa el formulario para generar tu planificación</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
