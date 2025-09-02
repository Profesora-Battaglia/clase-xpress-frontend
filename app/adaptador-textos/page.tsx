"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { adaptadorAPI } from "@/lib/api"
import { Loader2, FileText, Wand2, ArrowRight } from "lucide-react"

export default function AdaptadorTextosPage() {
  const [textoOriginal, setTextoOriginal] = useState("")
  const [nivel, setNivel] = useState("")
  const [textoAdaptado, setTextoAdaptado] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAdaptar = async () => {
    if (!textoOriginal.trim() || !nivel) return

    setLoading(true)
    try {
      const response = await adaptadorAPI.adaptarTexto(textoOriginal, nivel)
      if (response.success) {
        setTextoAdaptado(response.data)
      } else {
        setTextoAdaptado(`Error: ${response.error}`)
      }
    } catch (error) {
      setTextoAdaptado("Error al adaptar el texto")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Adaptador de Textos</h1>
          <p className="text-muted-foreground">Adapta textos a diferentes niveles de comprensión usando IA</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Texto Original
              </CardTitle>
              <CardDescription>Pega aquí el texto que quieres adaptar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nivel">Nivel de Adaptación</Label>
                  <Select value={nivel} onValueChange={setNivel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="infantil">Educación Infantil</SelectItem>
                      <SelectItem value="primario-inicial">Primario Inicial (1°-3°)</SelectItem>
                      <SelectItem value="primario-superior">Primario Superior (4°-6°)</SelectItem>
                      <SelectItem value="secundario-basico">Secundario Básico</SelectItem>
                      <SelectItem value="secundario-superior">Secundario Superior</SelectItem>
                      <SelectItem value="nee">Necesidades Educativas Especiales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="texto">Texto a Adaptar</Label>
                  <Textarea
                    id="texto"
                    value={textoOriginal}
                    onChange={(e) => setTextoOriginal(e.target.value)}
                    placeholder="Pega aquí el texto que quieres adaptar..."
                    rows={12}
                    className="resize-none"
                  />
                </div>

                <Button
                  onClick={handleAdaptar}
                  className="w-full"
                  disabled={loading || !textoOriginal.trim() || !nivel}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adaptando Texto...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Adaptar Texto
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center">
            <div className="bg-white rounded-full p-4 shadow-lg">
              <ArrowRight className="h-8 w-8 text-primary" />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-secondary" />
                Texto Adaptado
              </CardTitle>
              <CardDescription>El texto adaptado aparecerá aquí</CardDescription>
            </CardHeader>
            <CardContent>
              {textoAdaptado ? (
                <div className="bg-muted p-4 rounded-lg">
                  <Textarea
                    value={textoAdaptado}
                    readOnly
                    rows={12}
                    className="resize-none border-none bg-transparent"
                  />
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>El texto adaptado aparecerá aquí</p>
                  <p className="text-sm mt-2">Selecciona un nivel y pega tu texto para comenzar</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
