"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Settings, Sparkles, Loader2, Newspaper } from "lucide-react"
import { generateContent } from "@/lib/api"
import { PageHeader } from "@/components/page-header"

const SECCIONES_BOLETIN = [
  { id: "noticias", label: "Noticias de la Clase" },
  { id: "eventos", label: "Próximos Eventos" },
  { id: "recordatorios", label: "Recordatorios Importantes" },
  { id: "logros", label: "Logros de los Alumnos" },
  { id: "recursos", label: "Recursos Recomendados" },
]

export default function GeneradorBoletinPage() {
  const [formData, setFormData] = useState({
    titulo: "",
    nivel: "",
    fecha: new Date().toISOString().split('T')[0],
    infoAdicional: "",
    secciones: {
      noticias: true,
      eventos: true,
      recordatorios: true,
      logros: false,
      recursos: false,
    },
  })
  const [boletin, setBoletin] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSeccionChange = (seccionId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      secciones: { ...prev.secciones, [seccionId]: checked },
    }))
  }

  const handleGenerate = async () => {
    if (!formData.titulo || !formData.nivel) return

    const seccionesSeleccionadas = Object.entries(formData.secciones)
      .filter(([_, selected]) => selected)
      .map(([key]) => SECCIONES_BOLETIN.find(sec => sec.id === key)?.label)
      .filter(Boolean)

    setLoading(true)
    setBoletin("")
    try {
      const prompt = `Genera el contenido para un boletín informativo escolar con los siguientes datos:
- Título del Boletín: "${formData.titulo}"
- Nivel Educativo al que se dirige: ${formData.nivel}
- Mes/Fecha de Publicación: ${formData.fecha}
- Secciones a Incluir: ${seccionesSeleccionadas.join(", ")}
- Información Adicional o Temas Específicos a mencionar: ${formData.infoAdicional || 'Ninguna'}

El boletín debe tener un tono amigable y profesional. Estructura el contenido claramente para cada sección solicitada, desarrollando párrafos informativos y concisos. Para las secciones de eventos y recordatorios, utiliza listas o viñetas.`

      const result = await generateContent(prompt)
      setBoletin(result)
    } catch (error) {
      console.error("Error:", error)
      setBoletin("Hubo un error al generar el boletín. Por favor, intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const isFormIncomplete = !formData.titulo || !formData.nivel

  return (
    <div className="p-2 sm:p-6">
      <PageHeader
        title="Generador de Boletines Informativos"
        description="Crea boletines para padres y alumnos de forma rápida y sencilla."
      />

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración del Boletín
            </CardTitle>
            <CardDescription>Define el contenido y estructura de tu boletín.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título del Boletín</Label>
              <Input
                id="titulo"
                placeholder="Ej: Novedades de 2º Grado, Boletín de Septiembre..."
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
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
                    <SelectItem value="toda la escuela">Toda la escuela</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha de Publicación</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Secciones a Incluir</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SECCIONES_BOLETIN.map((seccion) => (
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

             <div className="space-y-2">
              <Label htmlFor="infoAdicional">Información Adicional (Opcional)</Label>
              <Textarea
                id="infoAdicional"
                placeholder="Ej: Mencionar el próximo campamento, detallar el proyecto de ciencias..."
                value={formData.infoAdicional}
                onChange={(e) => setFormData({ ...formData, infoAdicional: e.target.value })}
                rows={3}
              />
            </div>

            <Button onClick={handleGenerate} disabled={loading || isFormIncomplete} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generando Boletín...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generar Boletín
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
              Contenido del Boletín
            </CardTitle>
            <CardDescription>Aquí aparecerá el texto para tu boletín.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center p-6">
            {loading ? (
              <div className="text-center text-muted-foreground">
                <Loader2 className="h-8 w-8 mx-auto animate-spin mb-4" />
                <p>Redactando el contenido...</p>
              </div>
            ) : boletin ? (
              <div className="w-full h-full max-h-[60vh] overflow-y-auto bg-muted rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm font-sans">{boletin}</pre>
              </div>
            ) : (
              <div className="text-center text-muted-foreground p-8">
                <Newspaper className="h-12 w-12 mx-auto mb-4" />
                <p>Completa el formulario para generar tu boletín informativo.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}