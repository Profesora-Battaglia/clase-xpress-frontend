"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Settings, Sparkles, Loader2, Gamepad2 } from "lucide-react"
import { generateContent } from "@/lib/api"
import { PageHeader } from "@/components/page-header"

const MECANICAS_JUEGO = [
  { id: "puntos", label: "Sistema de Puntos" },
  { id: "insignias", label: "Insignias / Logros" },
  { id: "ranking", label: "Tabla de Clasificación" },
  { id: "niveles", label: "Niveles / Progreso" },
  { id: "narrativa", label: "Narrativa / Historia" },
  { id: "retos", label: "Retos / Misiones" },
]

export default function GeneradorGamificacionPage() {
  const [formData, setFormData] = useState({
    tema: "",
    nivel: "",
    objetivo: "",
    mecanicas: {
      puntos: true,
      insignias: true,
      ranking: false,
      niveles: false,
      narrativa: false,
      retos: true,
    },
  })
  const [estrategia, setEstrategia] = useState("")
  const [loading, setLoading] = useState(false)

  const handleMecanicaChange = (mecanicaId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      mecanicas: { ...prev.mecanicas, [mecanicaId]: checked },
    }))
  }

  const handleGenerate = async () => {
    if (!formData.tema || !formData.nivel || !formData.objetivo) return

    const mecanicasSeleccionadas = Object.entries(formData.mecanicas)
      .filter(([_, selected]) => selected)
      .map(([key]) => MECANICAS_JUEGO.find(m => m.id === key)?.label)
      .filter(Boolean)

    setLoading(true)
    setEstrategia("")
    try {
      const prompt = `Diseña una estrategia de gamificación educativa con los siguientes parámetros:
- Contenido o Tema a Gamificar: "${formData.tema}"
- Nivel Educativo: ${formData.nivel}
- Objetivo de Aprendizaje Principal: "${formData.objetivo}"
- Mecánicas de Juego a Incluir: ${mecanicasSeleccionadas.join(", ")}

La estrategia debe ser creativa, práctica y estar bien detallada. Incluye las siguientes secciones:
1. **Nombre de la Aventura/Juego:** Un título atractivo para la experiencia.
2. **Concepto y Narrativa:** Una breve historia o contexto que enganche a los estudiantes.
3. **Reglas del Juego:** Instrucciones claras sobre cómo participar y progresar.
4. **Sistema de Recompensas:** Explica cómo funcionarán los puntos, insignias, niveles o la tabla de clasificación.
5. **Actividades y Misiones:** Describe las tareas específicas que los alumnos deben completar para avanzar. Estas deben estar directamente relacionadas con el objetivo de aprendizaje.
6. **Condiciones de Victoria o Cierre:** Cómo termina el juego o la experiencia gamificada.`

      const result = await generateContent(prompt)
      setEstrategia(result)
    } catch (error) {
      console.error("Error:", error)
      setEstrategia("Hubo un error al generar la estrategia. Por favor, intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const isFormIncomplete = !formData.tema || !formData.nivel || !formData.objetivo

  return (
    <div className="p-2 sm:p-6">
      <PageHeader
        title="Generador de Estrategias de Gamificación"
        description="Transforma cualquier tema en una experiencia de aprendizaje divertida y motivadora."
      />

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración de la Estrategia
            </CardTitle>
            <CardDescription>Define los elementos para gamificar tu clase.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tema">Contenido o Tema a Gamificar</Label>
              <Input
                id="tema"
                placeholder="Ej: Las tablas de multiplicar, la Revolución Francesa..."
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
                  <SelectItem value="inicial">Nivel Inicial</SelectItem>
                  <SelectItem value="primario">Nivel Primario</SelectItem>
                  <SelectItem value="secundario">Nivel Secundario</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="objetivo">Principal Objetivo de Aprendizaje</Label>
              <Textarea
                id="objetivo"
                placeholder="Ej: Memorizar las tablas del 1 al 10, comprender las causas de la revolución..."
                value={formData.objetivo}
                onChange={(e) => setFormData({ ...formData, objetivo: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-3">
              <Label>Mecánicas de Juego</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {MECANICAS_JUEGO.map((mecanica) => (
                  <div key={mecanica.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={mecanica.id}
                      checked={formData.mecanicas[mecanica.id as keyof typeof formData.mecanicas]}
                      onCheckedChange={(checked) => handleMecanicaChange(mecanica.id, checked as boolean)}
                    />
                    <Label htmlFor={mecanica.id} className="text-sm font-normal">
                      {mecanica.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleGenerate} disabled={loading || isFormIncomplete} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Diseñando Estrategia...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generar Gamificación
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
              Estrategia de Gamificación
            </CardTitle>
            <CardDescription>Tu plan de juego educativo listo para implementar.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center p-6">
            {loading ? (
              <div className="text-center text-muted-foreground">
                <Loader2 className="h-8 w-8 mx-auto animate-spin mb-4" />
                <p>Creando una experiencia divertida...</p>
              </div>
            ) : estrategia ? (
              <div className="w-full h-full max-h-[60vh] overflow-y-auto bg-muted rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm font-sans">{estrategia}</pre>
              </div>
            ) : (
              <div className="text-center text-muted-foreground p-8">
                <Gamepad2 className="h-12 w-12 mx-auto mb-4" />
                <p>Completa el formulario para diseñar tu estrategia de gamificación.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}