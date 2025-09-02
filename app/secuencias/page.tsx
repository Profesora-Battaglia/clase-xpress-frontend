"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Settings, Sparkles, Loader2, ArrowRightLeft } from "lucide-react"
import { generateContent } from "@/lib/api"
import { PageHeader } from "@/components/page-header"

export default function GeneradorSecuenciasPage() {
  const [formData, setFormData] = useState({
    tema: "",
    nivel: "",
    cantidadClases: "3",
    objetivos: "",
  })
  const [secuencia, setSecuencia] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!formData.tema || !formData.nivel || !formData.objetivos) return

    setLoading(true)
    setSecuencia("")
    try {
      const prompt = `Diseña una secuencia didáctica detallada con los siguientes parámetros:
- Tema Central: "${formData.tema}"
- Nivel Educativo: ${formData.nivel}
- Cantidad de Clases/Sesiones: ${formData.cantidadClases}
- Objetivos de Aprendizaje: ${formData.objetivos}

La secuencia didáctica debe planificar las actividades para cada clase, estructurándolas en tres momentos: Inicio, Desarrollo y Cierre.

El formato debe ser claro y seguir esta estructura para cada clase:
**Clase 1: [Título de la Clase]**
- **Inicio:** (Actividad para recuperar conocimientos previos o motivar. Ej: Lluvia de ideas, video corto, pregunta desafiante).
- **Desarrollo:** (Actividades principales para construir el conocimiento. Ej: Explicación dialogada, trabajo en grupos, investigación, experimentación).
- **Cierre:** (Actividad para sintetizar y evaluar lo aprendido. Ej: Puesta en común, ticket de salida, mapa conceptual).

(Repetir esta estructura para el número de clases solicitado)

Al final de toda la secuencia, añade una sección de "Evaluación Final" con sugerencias de instrumentos o criterios para evaluar el logro de los objetivos generales de la secuencia.`

      const result = await generateContent(prompt)
      setSecuencia(result)
    } catch (error) {
      console.error("Error:", error)
      setSecuencia("Hubo un error al generar la secuencia. Por favor, intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const isFormIncomplete = !formData.tema || !formData.nivel || !formData.objetivos

  return (
    <div className="p-2 sm:p-6">
      <PageHeader
        title="Generador de Secuencias Didácticas"
        description="Planifica una serie de clases coherentes con inicio, desarrollo y cierre."
      />

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración de la Secuencia
            </CardTitle>
            <CardDescription>Define los parámetros de tu secuencia didáctica.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tema">Tema Central</Label>
              <Input
                id="tema"
                placeholder="Ej: El sistema solar, Cuentos de fantasía..."
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
                    <SelectItem value="inicial">Nivel Inicial</SelectItem>
                    <SelectItem value="primario">Nivel Primario</SelectItem>
                    <SelectItem value="secundario">Nivel Secundario</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cantidadClases">Cantidad de Clases</Label>
                <Select value={formData.cantidadClases} onValueChange={(value) => setFormData({ ...formData, cantidadClases: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Clases</SelectItem>
                    <SelectItem value="3">3 Clases</SelectItem>
                    <SelectItem value="4">4 Clases</SelectItem>
                    <SelectItem value="5">5 Clases</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="objetivos">Objetivos de Aprendizaje</Label>
              <Textarea
                id="objetivos"
                placeholder="Ej: Identificar los planetas del sistema solar, reconocer las características de un cuento..."
                value={formData.objetivos}
                onChange={(e) => setFormData({ ...formData, objetivos: e.target.value })}
                rows={3}
              />
            </div>

            <Button onClick={handleGenerate} disabled={loading || isFormIncomplete} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Diseñando Secuencia...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generar Secuencia
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
              Secuencia Didáctica Generada
            </CardTitle>
            <CardDescription>Tu plan de clases listo para usar.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center p-6">
            {loading ? (
              <div className="text-center text-muted-foreground">
                <Loader2 className="h-8 w-8 mx-auto animate-spin mb-4" />
                <p>Estructurando las clases...</p>
              </div>
            ) : secuencia ? (
              <div className="w-full h-full max-h-[60vh] overflow-y-auto bg-muted rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm font-sans">{secuencia}</pre>
              </div>
            ) : (
              <div className="text-center text-muted-foreground p-8">
                <ArrowRightLeft className="h-12 w-12 mx-auto mb-4" />
                <p>Completa el formulario para generar tu secuencia didáctica.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}