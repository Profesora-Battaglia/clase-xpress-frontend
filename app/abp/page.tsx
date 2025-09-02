"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Settings, Sparkles, Loader2, School } from "lucide-react"
import { generateContent } from "@/lib/api"
import { PageHeader } from "@/components/page-header"

export default function GeneradorABPPage() {
  const [formData, setFormData] = useState({
    tema: "",
    nivel: "",
    duracion: "",
    objetivos: "",
  })
  const [proyecto, setProyecto] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!formData.tema || !formData.nivel || !formData.objetivos) return

    setLoading(true)
    setProyecto("")
    try {
      const prompt = `Genera una planificación detallada de Aprendizaje Basado en Proyectos (ABP) con los siguientes datos:
- Tema Principal: "${formData.tema}"
- Nivel Educativo: ${formData.nivel}
- Duración Estimada: ${formData.duracion}
- Objetivos de Aprendizaje Clave: ${formData.objetivos}

La planificación debe estar bien estructurada e incluir, como mínimo, las siguientes secciones:
1. **Título del Proyecto:** Un nombre creativo y atractivo.
2. **Pregunta Esencial:** Una pregunta guía que impulse la investigación de los alumnos.
3. **Descripción General:** Un resumen del proyecto.
4. **Fases del Proyecto:** Detalla las etapas (ej: Inicio, Desarrollo, Cierre) con actividades específicas para cada una.
5. **Actividades Clave:** Describe las tareas principales que realizarán los estudiantes.
6. **Recursos Necesarios:** Lista de materiales, herramientas tecnológicas, etc.
7. **Evaluación:** Propón criterios de evaluación y ejemplos de instrumentos (rúbricas, listas de cotejo).
8. **Producto Final:** Describe qué entregarán o presentarán los estudiantes al concluir.`

      const result = await generateContent(prompt)
      setProyecto(result)
    } catch (error) {
      console.error("Error:", error)
      setProyecto("Hubo un error al generar el proyecto. Por favor, intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const isFormIncomplete = !formData.tema || !formData.nivel || !formData.objetivos

  return (
    <div className="p-2 sm:p-6">
      <PageHeader
        title="Generador de Aprendizaje Basado en Proyectos (ABP)"
        description="Crea proyectos educativos completos y estructurados a partir de tus ideas."
      />

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración del Proyecto
            </CardTitle>
            <CardDescription>Define los parámetros clave para tu proyecto.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tema">Tema Principal del Proyecto</Label>
              <Input
                id="tema"
                placeholder="Ej: Los ecosistemas de nuestra región"
                value={formData.tema}
                onChange={(e) => setFormData({ ...formData, tema: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <Label htmlFor="duracion">Duración Estimada</Label>
                <Input
                  id="duracion"
                  placeholder="Ej: 3 semanas"
                  value={formData.duracion}
                  onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="objetivos">Objetivos de Aprendizaje</Label>
              <Textarea
                id="objetivos"
                placeholder="Ej: Identificar los componentes de un ecosistema, analizar el impacto humano..."
                value={formData.objetivos}
                onChange={(e) => setFormData({ ...formData, objetivos: e.target.value })}
                rows={4}
              />
            </div>

            <Button onClick={handleGenerate} disabled={loading || isFormIncomplete} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generando Proyecto...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generar Proyecto ABP
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Resultado */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Planificación Generada
            </CardTitle>
            <CardDescription>Aquí aparecerá la estructura de tu proyecto ABP.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center p-6">
            {loading ? (
              <div className="text-center text-muted-foreground">
                <Loader2 className="h-8 w-8 mx-auto animate-spin mb-4" />
                <p>Creando tu proyecto, por favor espera...</p>
              </div>
            ) : proyecto ? (
              <div className="w-full h-full max-h-[60vh] overflow-y-auto bg-muted rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm font-sans">{proyecto}</pre>
              </div>
            ) : (
              <div className="text-center text-muted-foreground p-8">
                <School className="h-12 w-12 mx-auto mb-4" />
                <p>Completa el formulario para generar tu planificación de Aprendizaje Basado en Proyectos.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}