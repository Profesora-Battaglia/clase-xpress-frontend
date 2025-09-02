"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { HelpCircle, FileText, Settings, Download, Sparkles } from "lucide-react"
import { generateContent } from "@/lib/api"

export default function GeneradorCuestionarios() {
  const [formData, setFormData] = useState({
    tema: "",
    nivel: "",
    cantidad: "10",
    tipos: {
      multiple: true,
      verdadero: false,
      desarrollo: false,
      completar: false,
    },
    dificultad: "intermedio",
  })
  const [cuestionario, setCuestionario] = useState("")
  const [loading, setLoading] = useState(false)

  const handleTipoChange = (tipo: string, checked: boolean) => {
    setFormData({
      ...formData,
      tipos: { ...formData.tipos, [tipo]: checked },
    })
  }

  const handleGenerate = async () => {
    if (!formData.tema || !formData.nivel) return

    const tiposSeleccionados = Object.entries(formData.tipos)
      .filter(([_, selected]) => selected)
      .map(([tipo, _]) => {
        switch (tipo) {
          case "multiple":
            return "opción múltiple"
          case "verdadero":
            return "verdadero/falso"
          case "desarrollo":
            return "desarrollo"
          case "completar":
            return "completar espacios"
          default:
            return tipo
        }
      })

    if (tiposSeleccionados.length === 0) return

    setLoading(true)
    try {
      const prompt = `Genera un cuestionario de ${formData.cantidad} preguntas sobre "${formData.tema}" para nivel ${formData.nivel}.

Tipos de preguntas a incluir: ${tiposSeleccionados.join(", ")}
Nivel de dificultad: ${formData.dificultad}

Formato requerido:
- Numera cada pregunta
- Para opción múltiple: incluye 4 opciones (a, b, c, d)
- Para verdadero/falso: marca la respuesta correcta
- Para desarrollo: incluye criterios de evaluación
- Para completar: usa espacios en blanco claros

Al final incluye:
- Respuestas correctas
- Criterios de evaluación
- Tiempo estimado de resolución`

      const result = await generateContent(prompt)
      setCuestionario(result)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Generador de Cuestionarios</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Crea cuestionarios personalizados con diferentes tipos de preguntas y niveles de dificultad
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Configuración */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuración del Cuestionario
              </CardTitle>
              <CardDescription className="text-purple-100">Define el tema, nivel y tipos de preguntas</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tema">Tema/Contenido</Label>
                <Input
                  id="tema"
                  placeholder="Ej: Sistema Solar, Revolución de Mayo..."
                  value={formData.tema}
                  onChange={(e) => setFormData({ ...formData, tema: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nivel">Nivel Educativo</Label>
                  <Select value={formData.nivel} onValueChange={(value) => setFormData({ ...formData, nivel: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primario inicial">Primario Inicial</SelectItem>
                      <SelectItem value="primario medio">Primario Medio</SelectItem>
                      <SelectItem value="primario superior">Primario Superior</SelectItem>
                      <SelectItem value="secundario básico">Secundario Básico</SelectItem>
                      <SelectItem value="secundario superior">Secundario Superior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cantidad">Cantidad de Preguntas</Label>
                  <Select
                    value={formData.cantidad}
                    onValueChange={(value) => setFormData({ ...formData, cantidad: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 preguntas</SelectItem>
                      <SelectItem value="10">10 preguntas</SelectItem>
                      <SelectItem value="15">15 preguntas</SelectItem>
                      <SelectItem value="20">20 preguntas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Tipos de Preguntas</Label>
                <div className="space-y-2">
                  {[
                    { key: "multiple", label: "Opción múltiple" },
                    { key: "verdadero", label: "Verdadero/Falso" },
                    { key: "desarrollo", label: "Desarrollo" },
                    { key: "completar", label: "Completar espacios" },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={formData.tipos[key as keyof typeof formData.tipos]}
                        onCheckedChange={(checked) => handleTipoChange(key, checked as boolean)}
                      />
                      <Label htmlFor={key} className="text-sm font-normal">
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dificultad">Nivel de Dificultad</Label>
                <Select
                  value={formData.dificultad}
                  onValueChange={(value) => setFormData({ ...formData, dificultad: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="básico">Básico</SelectItem>
                    <SelectItem value="intermedio">Intermedio</SelectItem>
                    <SelectItem value="avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={
                  loading || !formData.tema || !formData.nivel || Object.values(formData.tipos).every((v) => !v)
                }
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              >
                {loading ? (
                  <>
                    <HelpCircle className="mr-2 h-4 w-4 animate-spin" />
                    Generando cuestionario...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generar Cuestionario
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Resultado */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Cuestionario Generado
              </CardTitle>
              <CardDescription className="text-blue-100">Tu cuestionario personalizado listo para usar</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {cuestionario ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">{cuestionario}</pre>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar Cuestionario
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Configura tu cuestionario y genera las preguntas</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
