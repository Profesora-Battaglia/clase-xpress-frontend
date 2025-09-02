"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Settings, Sparkles, Loader2, BookOpen } from "lucide-react"
import { generateContent } from "@/lib/api"
import { PageHeader } from "@/components/page-header"

const SECCIONES_GUIA = [
  { id: "resumen", label: "Resumen del Tema" },
  { id: "conceptos", label: "Explicación de Conceptos Clave" },
  { id: "preguntas", label: "Preguntas de Repaso" },
  { id: "ejercicios", label: "Ejercicios Prácticos" },
  { id: "glosario", label: "Glosario de Términos" },
  { id: "recursos", label: "Recursos Adicionales (videos, webs)" },
]

export default function GeneradorGuiaPage() {
  const [formData, setFormData] = useState({
    tema: "",
    nivel: "",
    conceptosClave: "",
    secciones: {
      resumen: true,
      conceptos: true,
      preguntas: true,
      ejercicios: false,
      glosario: true,
      recursos: false,
    },
  })
  const [guia, setGuia] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSeccionChange = (seccionId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      secciones: { ...prev.secciones, [seccionId]: checked },
    }))
  }

  const handleGenerate = async () => {
    if (!formData.tema || !formData.nivel) return

    const seccionesSeleccionadas = Object.entries(formData.secciones)
      .filter(([_, selected]) => selected)
      .map(([key]) => SECCIONES_GUIA.find(s => s.id === key)?.label)
      .filter(Boolean)

    setLoading(true)
    setGuia("")
    try {
      const prompt = `Crea una guía de estudio completa y didáctica con los siguientes parámetros:
- Tema Principal: "${formData.tema}"
- Nivel Educativo: ${formData.nivel}
- Conceptos Clave a desarrollar (si se especifican): ${formData.conceptosClave || 'Basado en el tema general'}
- Secciones a Incluir en la Guía: ${seccionesSeleccionadas.join(", ")}

La guía debe estar bien organizada, ser fácil de entender para el nivel educativo indicado, y debe desarrollar cada una de las secciones solicitadas de forma clara y concisa. Para las preguntas y ejercicios, asegúrate de que fomenten la reflexión y no solo la memorización.`

      const result = await generateContent(prompt)
      setGuia(result)
    } catch (error) {
      console.error("Error:", error)
      setGuia("Hubo un error al generar la guía de estudio. Por favor, intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const isFormIncomplete = !formData.tema || !formData.nivel

  return (
    <div className="p-2 sm:p-6">
      <PageHeader
        title="Generador de Guías de Estudio"
        description="Crea guías de estudio personalizadas para ayudar a tus alumnos a prepararse."
      />

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración de la Guía
            </CardTitle>
            <CardDescription>Define el contenido y las secciones de tu guía.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tema">Tema Principal de la Guía</Label>
              <Input
                id="tema"
                placeholder="Ej: El ciclo del agua, La Edad Media..."
                value={formData.tema}
                onChange={(e) => setFormData({ ...formData, tema: e.target.value })}
              />
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
              <Label htmlFor="conceptosClave">Conceptos Clave a Incluir (Opcional)</Label>
              <Textarea
                id="conceptosClave"
                placeholder="Ej: Evaporación, condensación, precipitación..."
                value={formData.conceptosClave}
                onChange={(e) => setFormData({ ...formData, conceptosClave: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <Label>Secciones de la Guía</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SECCIONES_GUIA.map((seccion) => (
                  <div key={seccion.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={seccion.id}
                      checked={formData.secciones[seccion.id as keyof typeof formData.secciones]}
                      onCheckedChange={(checked) => handleSeccionChange(seccion.id, checked as boolean)}
                    />
                    <Label htmlFor={seccion.id} className="text-sm font-normal">
                      {seccion.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleGenerate} disabled={loading || isFormIncomplete} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generando Guía...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generar Guía de Estudio
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
              Guía de Estudio Generada
            </CardTitle>
            <CardDescription>Tu guía de estudio lista para compartir.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center p-6">
            {loading ? (
              <div className="text-center text-muted-foreground">
                <Loader2 className="h-8 w-8 mx-auto animate-spin mb-4" />
                <p>Estructurando el conocimiento...</p>
              </div>
            ) : guia ? (
              <div className="w-full h-full max-h-[60vh] overflow-y-auto bg-muted rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm font-sans">{guia}</pre>
              </div>
            ) : (
              <div className="text-center text-muted-foreground p-8">
                <BookOpen className="h-12 w-12 mx-auto mb-4" />
                <p>Completa el formulario para crear tu guía de estudio.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}