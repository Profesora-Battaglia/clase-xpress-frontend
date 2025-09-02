"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { rubricasAPI } from "@/lib/api"
import { Loader2, BarChart3, Target, CheckCircle } from "lucide-react"

export default function RubricasPage() {
  const [formData, setFormData] = useState({
    tema: "",
    nivel: "",
    criterios: "",
    escalas: "4",
  })
  const [resultado, setResultado] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await rubricasAPI.generarRubrica(formData.tema, formData.nivel)
      if (response.success) {
        setResultado(response.data)
      } else {
        setResultado(`Error: ${response.error}`)
      }
    } catch (error) {
      setResultado("Error al generar la rúbrica")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Generador de Rúbricas</h1>
          <p className="text-muted-foreground">Crea rúbricas de evaluación personalizadas y detalladas</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Configuración de la Rúbrica
              </CardTitle>
              <CardDescription>Define los parámetros para generar tu rúbrica</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="tema">Tema o Actividad</Label>
                  <Input
                    id="tema"
                    value={formData.tema}
                    onChange={(e) => setFormData({ ...formData, tema: e.target.value })}
                    placeholder="Ej: Ensayo argumentativo"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="nivel">Nivel Educativo</Label>
                  <Select value={formData.nivel} onValueChange={(value) => setFormData({ ...formData, nivel: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primario">Primario</SelectItem>
                      <SelectItem value="secundario">Secundario</SelectItem>
                      <SelectItem value="superior">Superior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="escalas">Escala de Evaluación</Label>
                  <Select
                    value={formData.escalas}
                    onValueChange={(value) => setFormData({ ...formData, escalas: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 niveles (Básico, Intermedio, Avanzado)</SelectItem>
                      <SelectItem value="4">4 niveles (Insuficiente, Básico, Satisfactorio, Excelente)</SelectItem>
                      <SelectItem value="5">5 niveles (1-5 puntos)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="criterios">Criterios Específicos (Opcional)</Label>
                  <Textarea
                    id="criterios"
                    value={formData.criterios}
                    onChange={(e) => setFormData({ ...formData, criterios: e.target.value })}
                    placeholder="Ej: Coherencia, gramática, uso de fuentes..."
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generando Rúbrica...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Generar Rúbrica
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                Rúbrica Generada
              </CardTitle>
              <CardDescription>Tu rúbrica de evaluación aparecerá aquí</CardDescription>
            </CardHeader>
            <CardContent>
              {resultado ? (
                <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">{resultado}</pre>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Completa el formulario para generar tu rúbrica</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
