"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Settings, Sparkles, Loader2, PartyPopper } from "lucide-react"
import { generateContent } from "@/lib/api"
import { PageHeader } from "@/components/page-header"

const ELEMENTOS_ACTO = [
  { id: "discurso", label: "Discurso / Palabras alusivas" },
  { id: "numero_musical", label: "Número musical" },
  { id: "poesia", label: "Lectura de poesía" },
  { id: "representacion", label: "Representación teatral" },
  { id: "video", label: "Proyección de video" },
  { id: "entrega_diplomas", label: "Entrega de diplomas/menciones" },
]

export default function GeneradorActosPage() {
  const [formData, setFormData] = useState({
    motivo: "",
    nivel: "",
    ideasClave: "",
    elementos: {
      discurso: true,
      numero_musical: true,
      poesia: false,
      representacion: false,
      video: false,
      entrega_diplomas: false,
    },
  })
  const [propuesta, setPropuesta] = useState("")
  const [loading, setLoading] = useState(false)

  const handleElementoChange = (elementoId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      elementos: { ...prev.elementos, [elementoId]: checked },
    }))
  }

  const handleGenerate = async () => {
    if (!formData.motivo || !formData.nivel) return

    const elementosSeleccionados = Object.entries(formData.elementos)
      .filter(([_, selected]) => selected)
      .map(([key]) => ELEMENTOS_ACTO.find(el => el.id === key)?.label)
      .filter(Boolean)

    setLoading(true)
    setPropuesta("")
    try {
      const prompt = `Genera una propuesta creativa y estructurada para un acto escolar con los siguientes datos:
- Efeméride o Motivo: "${formData.motivo}"
- Nivel Educativo: ${formData.nivel}
- Ideas Clave o Mensaje a Transmitir: ${formData.ideasClave}
- Elementos Solicitados: ${elementosSeleccionados.join(", ")}

La propuesta debe ser detallada e incluir las siguientes secciones:
1. **Título del Acto:** Un nombre original y memorable.
2. **Guion y Cronograma:** Una secuencia de eventos paso a paso (ej: Apertura, Himno, Palabras de bienvenida, Desarrollo, Cierre).
3. **Sugerencias para el Discurso:** Un borrador o puntos clave para las palabras alusivas, adaptado al nivel educativo.
4. **Ideas para Números Artísticos:** Sugerencias concretas de canciones, poemas, o representaciones teatrales acordes al motivo.
5. **Propuesta de Decoración:** Ideas sencillas y efectivas para ambientar el espacio (escenario, salón, etc.).
6. **Recursos Necesarios:** Una lista de materiales y equipamiento técnico.`

      const result = await generateContent(prompt)
      setPropuesta(result)
    } catch (error) {
      console.error("Error:", error)
      setPropuesta("Hubo un error al generar la propuesta. Por favor, intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const isFormIncomplete = !formData.motivo || !formData.nivel

  return (
    <div className="p-2 sm:p-6">
      <PageHeader
        title="Generador de Actos Escolares"
        description="Diseña actos escolares memorables y bien organizados en minutos."
      />

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración del Acto
            </CardTitle>
            <CardDescription>Completa los detalles para crear tu acto escolar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="motivo">Efeméride o Motivo del Acto</Label>
              <Input
                id="motivo"
                placeholder="Ej: Día de la Independencia, Aniversario de la escuela..."
                value={formData.motivo}
                onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
              />
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
                  <SelectItem value="todos">Todos los niveles</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ideasClave">Ideas Clave o Mensaje a Transmitir</Label>
              <Textarea
                id="ideasClave"
                placeholder="Ej: La importancia de la libertad, el valor del trabajo en equipo..."
                value={formData.ideasClave}
                onChange={(e) => setFormData({ ...formData, ideasClave: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <Label>Elementos a Incluir</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ELEMENTOS_ACTO.map((elemento) => (
                  <div key={elemento.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={elemento.id}
                      checked={formData.elementos[elemento.id as keyof typeof formData.elementos]}
                      onCheckedChange={(checked) => handleElementoChange(elemento.id, checked as boolean)}
                    />
                    <Label htmlFor={elemento.id} className="text-sm font-normal">
                      {elemento.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleGenerate} disabled={loading || isFormIncomplete} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generando Propuesta...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generar Acto Escolar
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
              Propuesta Generada
            </CardTitle>
            <CardDescription>Aquí aparecerá el guion y las ideas para tu acto.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center p-6">
            {loading ? (
              <div className="text-center text-muted-foreground">
                <Loader2 className="h-8 w-8 mx-auto animate-spin mb-4" />
                <p>Organizando las ideas, por favor espera...</p>
              </div>
            ) : propuesta ? (
              <div className="w-full h-full max-h-[60vh] overflow-y-auto bg-muted rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm font-sans">{propuesta}</pre>
              </div>
            ) : (
              <div className="text-center text-muted-foreground p-8">
                <PartyPopper className="h-12 w-12 mx-auto mb-4" />
                <p>Completa el formulario para diseñar tu próximo acto escolar.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}