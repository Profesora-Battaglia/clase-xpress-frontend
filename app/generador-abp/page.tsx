"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Target, Users, Clock, CheckCircle, Lightbulb, FileText } from "lucide-react"
import { generateContent } from "@/lib/api"

export default function GeneradorABP() {
  const [formData, setFormData] = useState({
    tema: "",
    nivel: "",
    area: "",
    duracion: "",
    objetivos: "",
    contexto: "",
  })
  const [proyecto, setProyecto] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generarProyecto = async () => {
    if (!formData.tema || !formData.nivel || !formData.area) {
      alert("Por favor completa los campos obligatorios")
      return
    }

    setIsLoading(true)
    try {
      const prompt = `
        Genera un proyecto de Aprendizaje Basado en Proyectos (ABP) completo con la siguiente información:
        
        Tema/Problema: ${formData.tema}
        Nivel educativo: ${formData.nivel}
        Área curricular: ${formData.area}
        Duración: ${formData.duracion}
        Objetivos específicos: ${formData.objetivos}
        Contexto adicional: ${formData.contexto}
        
        El proyecto debe incluir:
        1. Título atractivo del proyecto
        2. Pregunta guía o problema central
        3. Objetivos de aprendizaje claros
        4. Descripción del producto final
        5. Fases del proyecto con actividades específicas
        6. Recursos necesarios
        7. Criterios de evaluación
        8. Roles de estudiantes y docente
        9. Cronograma sugerido
        10. Conexiones curriculares
        
        Formato: Estructura clara con títulos y subtítulos, lenguaje pedagógico apropiado.
      `

      const resultado = await generateContent(prompt)
      setProyecto(resultado)
    } catch (error) {
      console.error("Error:", error)
      alert("Error al generar el proyecto. Intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl text-white">
              <Lightbulb className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Generador de ABP
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Crea proyectos de Aprendizaje Basado en Proyectos completos y estructurados para involucrar a tus
            estudiantes en experiencias de aprendizaje significativas
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Formulario */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Configuración del Proyecto
              </CardTitle>
              <CardDescription className="text-blue-100">
                Define los parámetros para generar tu proyecto ABP
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tema" className="text-sm font-medium">
                  Tema o Problema Central *
                </Label>
                <Textarea
                  id="tema"
                  placeholder="Ej: Contaminación del agua en nuestra comunidad, Diseño de una ciudad sostenible..."
                  value={formData.tema}
                  onChange={(e) => handleInputChange("tema", e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nivel">Nivel Educativo *</Label>
                  <Select onValueChange={(value) => handleInputChange("nivel", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primaria-inicial">Primaria Inicial (1°-3°)</SelectItem>
                      <SelectItem value="primaria-superior">Primaria Superior (4°-6°)</SelectItem>
                      <SelectItem value="secundaria-basica">Secundaria Básica (1°-3°)</SelectItem>
                      <SelectItem value="secundaria-superior">Secundaria Superior (4°-6°)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Área Curricular *</Label>
                  <Select onValueChange={(value) => handleInputChange("area", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar área" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ciencias-naturales">Ciencias Naturales</SelectItem>
                      <SelectItem value="ciencias-sociales">Ciencias Sociales</SelectItem>
                      <SelectItem value="matematica">Matemática</SelectItem>
                      <SelectItem value="lengua">Lengua y Literatura</SelectItem>
                      <SelectItem value="tecnologia">Tecnología</SelectItem>
                      <SelectItem value="arte">Arte</SelectItem>
                      <SelectItem value="interdisciplinario">Interdisciplinario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duracion">Duración del Proyecto</Label>
                <Select onValueChange={(value) => handleInputChange("duracion", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar duración" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-semana">1 semana</SelectItem>
                    <SelectItem value="2-semanas">2 semanas</SelectItem>
                    <SelectItem value="1-mes">1 mes</SelectItem>
                    <SelectItem value="1-trimestre">1 trimestre</SelectItem>
                    <SelectItem value="1-semestre">1 semestre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="objetivos">Objetivos Específicos</Label>
                <Textarea
                  id="objetivos"
                  placeholder="Describe los objetivos de aprendizaje que quieres lograr..."
                  value={formData.objetivos}
                  onChange={(e) => handleInputChange("objetivos", e.target.value)}
                  className="min-h-[60px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contexto">Contexto Adicional</Label>
                <Textarea
                  id="contexto"
                  placeholder="Información sobre el grupo, recursos disponibles, particularidades..."
                  value={formData.contexto}
                  onChange={(e) => handleInputChange("contexto", e.target.value)}
                  className="min-h-[60px]"
                />
              </div>

              <Button
                onClick={generarProyecto}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Generando Proyecto ABP...
                  </>
                ) : (
                  <>
                    <Target className="h-4 w-4 mr-2" />
                    Generar Proyecto ABP
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Resultado */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Proyecto Generado
              </CardTitle>
              <CardDescription className="text-green-100">
                Tu proyecto de Aprendizaje Basado en Proyectos personalizado
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {proyecto ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium text-green-700">Proyecto generado exitosamente</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-[600px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                      {proyecto}
                    </pre>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => navigator.clipboard.writeText(proyecto)}
                      className="flex-1"
                    >
                      Copiar Proyecto
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const blob = new Blob([proyecto], { type: "text/plain" })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement("a")
                        a.href = url
                        a.download = `proyecto-abp-${formData.tema.slice(0, 20)}.txt`
                        a.click()
                      }}
                      className="flex-1"
                    >
                      Descargar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Completa el formulario y genera tu proyecto ABP personalizado</p>
                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        <Target className="h-3 w-3 mr-1" />
                        Objetivos claros
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <Clock className="h-3 w-3 mr-1" />
                        Cronograma detallado
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        <Users className="h-3 w-3 mr-1" />
                        Roles definidos
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Evaluación integral
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Información adicional */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-green-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">¿Qué es el Aprendizaje Basado en Proyectos?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-medium mb-2">Aprendizaje Significativo</h4>
                <p className="text-muted-foreground">
                  Los estudiantes trabajan en problemas reales y relevantes para su contexto
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-medium mb-2">Trabajo Colaborativo</h4>
                <p className="text-muted-foreground">Fomenta la colaboración, comunicación y trabajo en equipo</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-medium mb-2">Pensamiento Crítico</h4>
                <p className="text-muted-foreground">
                  Desarrolla habilidades de análisis, síntesis y resolución de problemas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
