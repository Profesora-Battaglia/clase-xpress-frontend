"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, BookOpen, Target, Clock, Download, Sparkles } from "lucide-react"
import { generateContent } from "@/lib/api"

export default function PlanificadorAnual() {
  const [formData, setFormData] = useState({
    materia: "",
    grado: "",
    año: "2024",
    objetivos: "",
    contenidos: "",
  })
  const [planificacion, setPlanificacion] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!formData.materia || !formData.grado) return

    setLoading(true)
    try {
      const prompt = `Genera una planificación anual completa para ${formData.materia} de ${formData.grado} para el año ${formData.año}.

Objetivos específicos: ${formData.objetivos}
Contenidos principales: ${formData.contenidos}

Incluye:
- Fundamentación pedagógica
- Objetivos generales y específicos
- Contenidos organizados por trimestre/cuatrimestre
- Metodología de enseñanza
- Recursos didácticos
- Evaluación y criterios
- Cronograma detallado
- Actividades especiales y proyectos

Formato: Documento estructurado y profesional para presentar a dirección.`

      const result = await generateContent(prompt)
      setPlanificacion(result)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Planificador Anual</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Genera una planificación anual completa con fundamentación, acuerdos y tabla de contenidos curriculares
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Formulario */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Datos de la Planificación
              </CardTitle>
              <CardDescription className="text-blue-100">
                Completa la información básica para generar tu planificación anual
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="materia">Materia/Asignatura</Label>
                  <Input
                    id="materia"
                    placeholder="Ej: Matemática, Lengua..."
                    value={formData.materia}
                    onChange={(e) => setFormData({ ...formData, materia: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grado">Grado/Año</Label>
                  <Select value={formData.grado} onValueChange={(value) => setFormData({ ...formData, grado: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar grado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1° grado">1° grado</SelectItem>
                      <SelectItem value="2° grado">2° grado</SelectItem>
                      <SelectItem value="3° grado">3° grado</SelectItem>
                      <SelectItem value="4° grado">4° grado</SelectItem>
                      <SelectItem value="5° grado">5° grado</SelectItem>
                      <SelectItem value="6° grado">6° grado</SelectItem>
                      <SelectItem value="1° año secundario">1° año secundario</SelectItem>
                      <SelectItem value="2° año secundario">2° año secundario</SelectItem>
                      <SelectItem value="3° año secundario">3° año secundario</SelectItem>
                      <SelectItem value="4° año secundario">4° año secundario</SelectItem>
                      <SelectItem value="5° año secundario">5° año secundario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="año">Año Lectivo</Label>
                <Select value={formData.año} onValueChange={(value) => setFormData({ ...formData, año: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="objetivos">Objetivos Específicos</Label>
                <Textarea
                  id="objetivos"
                  placeholder="Describe los objetivos principales que quieres lograr este año..."
                  value={formData.objetivos}
                  onChange={(e) => setFormData({ ...formData, objetivos: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contenidos">Contenidos Principales</Label>
                <Textarea
                  id="contenidos"
                  placeholder="Lista los contenidos curriculares principales a desarrollar..."
                  value={formData.contenidos}
                  onChange={(e) => setFormData({ ...formData, contenidos: e.target.value })}
                  rows={3}
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={loading || !formData.materia || !formData.grado}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                {loading ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Generando planificación...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generar Planificación Anual
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Resultado */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Planificación Generada
              </CardTitle>
              <CardDescription className="text-green-100">
                Tu planificación anual completa y estructurada
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {planificacion ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">{planificacion}</pre>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar Planificación
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Completa el formulario y genera tu planificación anual</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
