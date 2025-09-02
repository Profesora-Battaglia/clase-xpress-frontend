"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Settings, Sparkles, Loader2, CalendarDays } from "lucide-react"
import { generateContent } from "@/lib/api"
import { PageHeader } from "@/components/page-header"

export default function PlanificadorTrimestralPage() {
  const [formData, setFormData] = useState({
    materia: "",
    nivel: "",
    trimestre: "",
    grandesTemas: "",
    objetivosPrincipales: "",
  })
  const [planificacion, setPlanificacion] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!formData.materia || !formData.nivel || !formData.trimestre || !formData.grandesTemas) return

    setLoading(true)
    setPlanificacion("")
    try {
      const prompt = `Crea una planificación trimestral para una materia escolar con los siguientes datos:
- Materia: ${formData.materia}
- Nivel Educativo: ${formData.nivel}
- Trimestre: ${formData.trimestre}
- Grandes Temas o Unidades a cubrir: ${formData.grandesTemas}
- Objetivos Principales del Trimestre (opcional): ${formData.objetivosPrincipales}

La planificación debe proponer una distribución semanal de los contenidos y actividades (asumiendo un trimestre de 12 semanas). El formato debe ser una lista estructurada semana por semana. Para cada semana, sugiere:
- **Tema/Contenido:** El subtema o contenido específico a tratar.
- **Actividades Sugeridas:** Ejemplos de actividades en clase, tareas o mini-proyectos.

Al final, añade una sección de "Sugerencias de Evaluación" con ideas para evaluar el progreso de los alumnos durante y al final del trimestre.`

      const result = await generateContent(prompt)
      setPlanificacion(result)
    } catch (error) {
      console.error("Error:", error)
      setPlanificacion("Hubo un error al generar la planificación. Por favor, intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const isFormIncomplete = !formData.materia || !formData.nivel || !formData.trimestre || !formData.grandesTemas

  return (
    <div className="p-2 sm:p-6">
      <PageHeader
        title="Planificador Trimestral"
        description="Organiza tu trimestre completo, distribuyendo temas y actividades semana a semana."
      />

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Datos de la Planificación
            </CardTitle>
            <CardDescription>Define la estructura general de tu trimestre.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="materia">Materia</Label>
                <Input
                  id="materia"
                  placeholder="Ej: Ciencias Naturales"
                  value={formData.materia}
                  onChange={(e) => setFormData({ ...formData, materia: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trimestre">Trimestre</Label>
                <Select value={formData.trimestre} onValueChange={(value) => setFormData({ ...formData, trimestre: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Primer Trimestre">Primer Trimestre</SelectItem>
                    <SelectItem value="Segundo Trimestre">Segundo Trimestre</SelectItem>
                    <SelectItem value="Tercer Trimestre">Tercer Trimestre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nivel">Nivel Educativo</Label>
              <Select value={formData.nivel} onValueChange={(value) => setFormData({ ...formData, nivel: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primario">Nivel Primario</SelectItem>
                  <SelectItem value="secundario">Nivel Secundario</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="grandesTemas">Grandes Temas o Unidades del Trimestre</Label>
              <Textarea
                id="grandesTemas"
                placeholder="Ej: 1. La Célula. 2. Los Seres Vivos. 3. Ecosistemas..."
                value={formData.grandesTemas}
                onChange={(e) => setFormData({ ...formData, grandesTemas: e.target.value })}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="objetivosPrincipales">Objetivos Principales (Opcional)</Label>
              <Textarea
                id="objetivosPrincipales"
                placeholder="Ej: Comprender la estructura celular, clasificar seres vivos..."
                value={formData.objetivosPrincipales}
                onChange={(e) => setFormData({ ...formData, objetivosPrincipales: e.target.value })}
                rows={3}
              />
            </div>

            <Button onClick={handleGenerate} disabled={loading || isFormIncomplete} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Planificando Trimestre...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generar Planificación
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
              Planificación Trimestral Generada
            </CardTitle>
            <CardDescription>La distribución semanal de tu trimestre aparecerá aquí.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center p-6">
            {loading ? (
              <div className="text-center text-muted-foreground">
                <Loader2 className="h-8 w-8 mx-auto animate-spin mb-4" />
                <p>Organizando el calendario...</p>
              </div>
            ) : planificacion ? (
              <div className="w-full h-full max-h-[60vh] overflow-y-auto bg-muted rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm font-sans">{planificacion}</pre>
              </div>
            ) : (
              <div className="text-center text-muted-foreground p-8">
                <CalendarDays className="h-12 w-12 mx-auto mb-4" />
                <p>Completa los datos para generar tu planificación trimestral.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}