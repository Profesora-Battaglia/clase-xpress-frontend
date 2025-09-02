"use client"

import type React from "react"

import { useState } from "react"
import { Users, Download, Copy, Loader2, BookOpen, Heart, Brain } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { generateContent } from "@/lib/api"

export default function AdaptacionesPage() {
  const [formData, setFormData] = useState({
    estudiante: "",
    nivel: "",
    materia: "",
    necesidad: "",
    dificultades: "",
    fortalezas: "",
    objetivos: "",
  })
  const [adaptacion, setAdaptacion] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const prompt = `Crea adaptaciones curriculares personalizadas para:

INFORMACIÓN DEL ESTUDIANTE:
- Nombre/Iniciales: ${formData.estudiante}
- Nivel educativo: ${formData.nivel}
- Materia: ${formData.materia}
- Tipo de NEE: ${formData.necesidad}

PERFIL DEL ESTUDIANTE:
- Dificultades identificadas: ${formData.dificultades}
- Fortalezas: ${formData.fortalezas}
- Objetivos específicos: ${formData.objetivos}

Genera adaptaciones que incluyan:
1. ADAPTACIONES DE ACCESO (metodológicas, materiales, espaciales)
2. ADAPTACIONES CURRICULARES (objetivos, contenidos, evaluación)
3. ESTRATEGIAS ESPECÍFICAS para las dificultades mencionadas
4. RECURSOS Y MATERIALES adaptados
5. CRITERIOS DE EVALUACIÓN modificados
6. SEGUIMIENTO Y APOYO familiar

Formato profesional para incluir en el expediente del estudiante.`

    try {
      const result = await generateContent(prompt)
      setAdaptacion(result)
    } catch (error) {
      console.error("Error:", error)
      setAdaptacion("Error al generar las adaptaciones. Por favor, intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(adaptacion)
  }

  const downloadAdaptacion = () => {
    const element = document.createElement("a")
    const file = new Blob([adaptacion], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `adaptaciones-nee-${formData.estudiante || "estudiante"}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Adaptaciones NEE</h1>
            <p className="text-muted-foreground">
              Genera adaptaciones curriculares personalizadas para estudiantes con necesidades educativas especiales
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Información del Estudiante
            </CardTitle>
            <CardDescription>Completa los datos para generar adaptaciones personalizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="estudiante">Nombre/Iniciales del Estudiante</Label>
                  <Input
                    id="estudiante"
                    value={formData.estudiante}
                    onChange={(e) => setFormData({ ...formData, estudiante: e.target.value })}
                    placeholder="Ej: M.A. o María A."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="nivel">Nivel Educativo</Label>
                  <Select value={formData.nivel} onValueChange={(value) => setFormData({ ...formData, nivel: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inicial">Educación Inicial</SelectItem>
                      <SelectItem value="primaria">Educación Primaria</SelectItem>
                      <SelectItem value="secundaria">Educación Secundaria</SelectItem>
                      <SelectItem value="especial">Educación Especial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="materia">Materia/Área</Label>
                  <Input
                    id="materia"
                    value={formData.materia}
                    onChange={(e) => setFormData({ ...formData, materia: e.target.value })}
                    placeholder="Ej: Matemáticas, Lengua"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="necesidad">Tipo de NEE</Label>
                  <Select
                    value={formData.necesidad}
                    onValueChange={(value) => setFormData({ ...formData, necesidad: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dislexia">Dislexia</SelectItem>
                      <SelectItem value="tdah">TDAH</SelectItem>
                      <SelectItem value="discalculia">Discalculia</SelectItem>
                      <SelectItem value="tea">TEA (Autismo)</SelectItem>
                      <SelectItem value="discapacidad-intelectual">Discapacidad Intelectual</SelectItem>
                      <SelectItem value="discapacidad-visual">Discapacidad Visual</SelectItem>
                      <SelectItem value="discapacidad-auditiva">Discapacidad Auditiva</SelectItem>
                      <SelectItem value="discapacidad-motora">Discapacidad Motora</SelectItem>
                      <SelectItem value="altas-capacidades">Altas Capacidades</SelectItem>
                      <SelectItem value="otra">Otra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="dificultades">Dificultades Identificadas</Label>
                <Textarea
                  id="dificultades"
                  value={formData.dificultades}
                  onChange={(e) => setFormData({ ...formData, dificultades: e.target.value })}
                  placeholder="Describe las principales dificultades del estudiante..."
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="fortalezas">Fortalezas del Estudiante</Label>
                <Textarea
                  id="fortalezas"
                  value={formData.fortalezas}
                  onChange={(e) => setFormData({ ...formData, fortalezas: e.target.value })}
                  placeholder="Describe las fortalezas y habilidades del estudiante..."
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="objetivos">Objetivos Específicos</Label>
                <Textarea
                  id="objetivos"
                  value={formData.objetivos}
                  onChange={(e) => setFormData({ ...formData, objetivos: e.target.value })}
                  placeholder="¿Qué objetivos específicos quieres lograr con este estudiante?"
                  rows={3}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generando Adaptaciones...
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 mr-2" />
                    Generar Adaptaciones NEE
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {adaptacion && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Adaptaciones Generadas
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadAdaptacion}>
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-lg max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">{adaptacion}</pre>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Información sobre NEE</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Las <strong>Necesidades Educativas Especiales</strong> requieren adaptaciones específicas para
                  garantizar el acceso equitativo a la educación.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Inclusión</Badge>
                  <Badge variant="secondary">Personalización</Badge>
                  <Badge variant="secondary">Equidad</Badge>
                  <Badge variant="secondary">Diversidad</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
