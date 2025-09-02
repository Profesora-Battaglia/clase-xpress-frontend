"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gamepad2, Trophy, Star, Zap, Download, Sparkles } from "lucide-react"
import { generateContent } from "@/lib/api"

export default function IdeasGamificacion() {
  const [formData, setFormData] = useState({
    materia: "",
    tema: "",
    edad: "",
    duracion: "1 clase",
    objetivo: "",
    recursos: "básicos",
  })
  const [ideas, setIdeas] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!formData.materia || !formData.tema || !formData.edad) return

    setLoading(true)
    try {
      const prompt = `Genera ideas creativas de gamificación para enseñar "${formData.tema}" en ${formData.materia} para estudiantes de ${formData.edad} años.

Duración: ${formData.duracion}
Objetivo de aprendizaje: ${formData.objetivo}
Recursos disponibles: ${formData.recursos}

Incluye:

1. **MECÁNICAS DE JUEGO** (3-4 ideas):
   - Sistema de puntos/recompensas
   - Desafíos y misiones
   - Elementos de competencia colaborativa
   - Progresión por niveles

2. **ACTIVIDADES GAMIFICADAS** (4-5 propuestas):
   - Juegos de rol educativos
   - Escape rooms temáticos
   - Torneos de conocimiento
   - Misiones de investigación
   - Simulaciones interactivas

3. **HERRAMIENTAS Y RECURSOS**:
   - Materiales necesarios
   - Plataformas digitales recomendadas
   - Elementos físicos (cartas, tableros, etc.)

4. **SISTEMA DE EVALUACIÓN GAMIFICADO**:
   - Badges y logros
   - Portafolios de misiones
   - Autoevaluación lúdica

5. **CONSEJOS DE IMPLEMENTACIÓN**:
   - Cómo introducir la gamificación
   - Mantener la motivación
   - Adaptar según el grupo

Formato: Guía práctica y detallada, fácil de implementar.`

      const result = await generateContent(prompt)
      setIdeas(result)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-cyan-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gamepad2 className="h-8 w-8 text-violet-600" />
            <h1 className="text-3xl font-bold text-gray-900">Ideas de Gamificación</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transforma tus clases en experiencias lúdicas y motivadoras con estrategias de gamificación
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Configuración */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Configuración del Juego
              </CardTitle>
              <CardDescription className="text-violet-100">
                Define el contexto para generar ideas de gamificación personalizadas
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="materia">Materia</Label>
                  <Input
                    id="materia"
                    placeholder="Ej: Matemática, Historia..."
                    value={formData.materia}
                    onChange={(e) => setFormData({ ...formData, materia: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edad">Edad de los Estudiantes</Label>
                  <Select value={formData.edad} onValueChange={(value) => setFormData({ ...formData, edad: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar edad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6-8">6-8 años</SelectItem>
                      <SelectItem value="9-11">9-11 años</SelectItem>
                      <SelectItem value="12-14">12-14 años</SelectItem>
                      <SelectItem value="15-17">15-17 años</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tema">Tema Específico</Label>
                <Input
                  id="tema"
                  placeholder="Ej: Fracciones, Revolución Industrial..."
                  value={formData.tema}
                  onChange={(e) => setFormData({ ...formData, tema: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duracion">Duración</Label>
                  <Select
                    value={formData.duracion}
                    onValueChange={(value) => setFormData({ ...formData, duracion: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 clase">1 clase (40-80 min)</SelectItem>
                      <SelectItem value="1 semana">1 semana</SelectItem>
                      <SelectItem value="1 mes">1 mes</SelectItem>
                      <SelectItem value="1 trimestre">1 trimestre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recursos">Recursos Disponibles</Label>
                  <Select
                    value={formData.recursos}
                    onValueChange={(value) => setFormData({ ...formData, recursos: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="básicos">Básicos (papel, pizarra)</SelectItem>
                      <SelectItem value="digitales">Digitales (tablets, proyector)</SelectItem>
                      <SelectItem value="completos">Completos (tecnología + materiales)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="objetivo">Objetivo de Aprendizaje</Label>
                <Textarea
                  id="objetivo"
                  placeholder="¿Qué quieres que aprendan o practiquen los estudiantes?"
                  value={formData.objetivo}
                  onChange={(e) => setFormData({ ...formData, objetivo: e.target.value })}
                  rows={3}
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={loading || !formData.materia || !formData.tema || !formData.edad}
                className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800"
              >
                {loading ? (
                  <>
                    <Zap className="mr-2 h-4 w-4 animate-spin" />
                    Generando ideas...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generar Ideas de Gamificación
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Resultado */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Ideas Generadas
              </CardTitle>
              <CardDescription className="text-cyan-100">
                Estrategias de gamificación personalizadas para tu clase
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {ideas ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">{ideas}</pre>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar Guía de Gamificación
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Gamepad2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Configura tu clase y genera ideas de gamificación</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
