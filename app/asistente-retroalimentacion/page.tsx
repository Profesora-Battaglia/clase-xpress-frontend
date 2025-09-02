"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, User, Target, Lightbulb, Copy, Sparkles } from "lucide-react"
import { generateContent } from "@/lib/api"

export default function AsistenteRetroalimentacion() {
  const [formData, setFormData] = useState({
    estudiante: "",
    actividad: "",
    desempeño: "",
    fortalezas: "",
    dificultades: "",
    tono: "constructivo",
  })
  const [retroalimentacion, setRetroalimentacion] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!formData.estudiante || !formData.actividad || !formData.desempeño) return

    setLoading(true)
    try {
      const prompt = `Genera una retroalimentación personalizada para el estudiante ${formData.estudiante} sobre la actividad "${formData.actividad}".

Información del desempeño:
${formData.desempeño}

Fortalezas observadas:
${formData.fortalezas}

Dificultades identificadas:
${formData.dificultades}

Tono de la retroalimentación: ${formData.tono}

La retroalimentación debe:
- Ser personalizada y específica
- Reconocer logros y fortalezas
- Señalar áreas de mejora de manera constructiva
- Incluir sugerencias concretas para el progreso
- Motivar al estudiante a seguir aprendiendo
- Usar un lenguaje apropiado para la edad
- Ser equilibrada entre lo positivo y las oportunidades de mejora

Formato: Mensaje directo al estudiante, cálido y profesional.`

      const result = await generateContent(prompt)
      setRetroalimentacion(result)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(retroalimentacion)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquare className="h-8 w-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-900">Asistente de Retroalimentación</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Genera retroalimentación personalizada y constructiva para tus estudiantes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Formulario */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información del Estudiante
              </CardTitle>
              <CardDescription className="text-orange-100">
                Completa los datos para generar retroalimentación personalizada
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estudiante">Nombre del Estudiante</Label>
                  <Input
                    id="estudiante"
                    placeholder="Nombre del estudiante"
                    value={formData.estudiante}
                    onChange={(e) => setFormData({ ...formData, estudiante: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tono">Tono de la Retroalimentación</Label>
                  <Select value={formData.tono} onValueChange={(value) => setFormData({ ...formData, tono: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="constructivo">Constructivo</SelectItem>
                      <SelectItem value="motivacional">Motivacional</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="cercano">Cercano y cálido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="actividad">Actividad/Evaluación</Label>
                <Input
                  id="actividad"
                  placeholder="Ej: Examen de matemática, Proyecto de ciencias..."
                  value={formData.actividad}
                  onChange={(e) => setFormData({ ...formData, actividad: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="desempeño">Descripción del Desempeño</Label>
                <Textarea
                  id="desempeño"
                  placeholder="Describe cómo se desempeñó el estudiante en la actividad..."
                  value={formData.desempeño}
                  onChange={(e) => setFormData({ ...formData, desempeño: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fortalezas">Fortalezas Observadas</Label>
                <Textarea
                  id="fortalezas"
                  placeholder="¿Qué hizo bien el estudiante? ¿Cuáles son sus puntos fuertes?"
                  value={formData.fortalezas}
                  onChange={(e) => setFormData({ ...formData, fortalezas: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dificultades">Dificultades Identificadas</Label>
                <Textarea
                  id="dificultades"
                  placeholder="¿Qué aspectos necesita mejorar? ¿Dónde tuvo dificultades?"
                  value={formData.dificultades}
                  onChange={(e) => setFormData({ ...formData, dificultades: e.target.value })}
                  rows={2}
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={loading || !formData.estudiante || !formData.actividad || !formData.desempeño}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
              >
                {loading ? (
                  <>
                    <MessageSquare className="mr-2 h-4 w-4 animate-spin" />
                    Generando retroalimentación...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generar Retroalimentación
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Resultado */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Retroalimentación Generada
              </CardTitle>
              <CardDescription className="text-pink-100">Mensaje personalizado para tu estudiante</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {retroalimentacion ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <div className="text-sm text-gray-700 font-sans leading-relaxed">{retroalimentacion}</div>
                  </div>
                  <Button variant="outline" onClick={copyToClipboard} className="w-full bg-transparent">
                    <Copy className="mr-2 h-4 w-4" />
                    Copiar Retroalimentación
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Completa la información del estudiante para generar retroalimentación</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
