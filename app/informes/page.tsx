"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Settings, Sparkles, Loader2, UserCheck } from "lucide-react"
import { generateContent } from "@/lib/api"
import { PageHeader } from "@/components/page-header"

export default function GeneradorInformesPage() {
  const [formData, setFormData] = useState({
    nombreAlumno: "",
    nivel: "",
    periodo: "",
    fortalezas: "",
    areasAMejorar: "",
    tono: "formal y alentador",
  })
  const [informe, setInforme] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!formData.nombreAlumno || !formData.nivel || !formData.fortalezas || !formData.areasAMejorar) return

    setLoading(true)
    setInforme("")
    try {
      const prompt = `Redacta un informe de progreso descriptivo y constructivo para un/a alumno/a con los siguientes datos:
- Nombre del Alumno/a: ${formData.nombreAlumno}
- Nivel Educativo: ${formData.nivel}
- Período de Evaluación: ${formData.periodo}
- Principales Fortalezas y Logros observados: ${formData.fortalezas}
- Áreas a Mejorar o seguir trabajando: ${formData.areasAMejorar}
- Tono deseado para el informe: ${formData.tono}

El informe debe estar bien redactado en un párrafo coherente (o varios, si es necesario). Debe integrar la información proporcionada de forma fluida y profesional, utilizando un lenguaje positivo y orientado al crecimiento. El objetivo es que el informe sea claro y útil para los padres y el propio alumno.`

      const result = await generateContent(prompt)
      setInforme(result)
    } catch (error) {
      console.error("Error:", error)
      setInforme("Hubo un error al generar el informe. Por favor, intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const isFormIncomplete = !formData.nombreAlumno || !formData.nivel || !formData.fortalezas || !formData.areasAMejorar

  return (
    <div className="p-2 sm:p-6">
      <PageHeader
        title="Generador de Informes de Progreso"
        description="Redacta informes descriptivos de alumnos de manera eficiente y constructiva."
      />

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Datos para el Informe
            </CardTitle>
            <CardDescription>Proporciona la información clave del alumno/a.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="nombreAlumno">Nombre del Alumno/a</Label>
                    <Input
                        id="nombreAlumno"
                        placeholder="Ej: Juan Pérez"
                        value={formData.nombreAlumno}
                        onChange={(e) => setFormData({ ...formData, nombreAlumno: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="periodo">Período de Evaluación</Label>
                    <Input
                        id="periodo"
                        placeholder="Ej: Primer Trimestre"
                        value={formData.periodo}
                        onChange={(e) => setFormData({ ...formData, periodo: e.target.value })}
                    />
                </div>
            </div>

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
              <Label htmlFor="fortalezas">Fortalezas y Logros</Label>
              <Textarea
                id="fortalezas"
                placeholder="Ej: Muestra gran curiosidad, participa activamente, ha mejorado en cálculo..."
                value={formData.fortalezas}
                onChange={(e) => setFormData({ ...formData, fortalezas: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="areasAMejorar">Áreas a Mejorar</Label>
              <Textarea
                id="areasAMejorar"
                placeholder="Ej: Necesita practicar la lectura en voz alta, debe mejorar la organización de sus tareas..."
                value={formData.areasAMejorar}
                onChange={(e) => setFormData({ ...formData, areasAMejorar: e.target.value })}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tono">Tono del Informe</Label>
              <Select value={formData.tono} onValueChange={(value) => setFormData({ ...formData, tono: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal y alentador">Formal y Alentador</SelectItem>
                  <SelectItem value="directo y conciso">Directo y Conciso</SelectItem>
                  <SelectItem value="cercano y amigable">Cercano y Amigable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleGenerate} disabled={loading || isFormIncomplete} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Redactando Informe...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generar Informe
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
              Informe Redactado
            </CardTitle>
            <CardDescription>El texto generado para tu informe aparecerá aquí.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center p-6">
            {loading ? (
              <div className="text-center text-muted-foreground">
                <Loader2 className="h-8 w-8 mx-auto animate-spin mb-4" />
                <p>Personalizando el informe...</p>
              </div>
            ) : informe ? (
              <div className="w-full h-full max-h-[60vh] overflow-y-auto bg-muted rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm font-sans">{informe}</pre>
              </div>
            ) : (
              <div className="text-center text-muted-foreground p-8">
                <UserCheck className="h-12 w-12 mx-auto mb-4" />
                <p>Completa los datos para redactar un informe de progreso.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}