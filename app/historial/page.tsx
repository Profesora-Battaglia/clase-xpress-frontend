"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, BookOpen, Gamepad2, Trash2, Copy, Eye, AlertTriangle } from "lucide-react"
import { PageHeader } from "@/components/page-header"

const fakeHistory = [
  {
    id: 1,
    type: "Proyecto ABP",
    title: "Los Ecosistemas de Nuestra Región",
    date: "2024-08-15",
    icon: <FileText className="h-5 w-5 text-blue-500" />,
  },
  {
    id: 2,
    type: "Guía de Estudio",
    title: "La Edad Media",
    date: "2024-08-14",
    icon: <BookOpen className="h-5 w-5 text-green-500" />,
  },
  {
    id: 3,
    type: "Estrategia de Gamificación",
    title: "Tablas de Multiplicar",
    date: "2024-08-12",
    icon: <Gamepad2 className="h-5 w-5 text-purple-500" />,
  },
  {
    id: 4,
    type: "Proyecto ABP",
    title: "El Sistema Solar",
    date: "2024-08-10",
    icon: <FileText className="h-5 w-5 text-blue-500" />,
  },
];

export default function HistorialPage() {
  return (
    <div className="p-2 sm:p-6">
      <PageHeader
        title="Historial de Contenidos"
        description="Aquí encontrarás todas las creaciones que has guardado."
      />

      <Card className="mt-6 border-2 border-dashed border-yellow-400 bg-yellow-50/50">
        <CardHeader className="flex-row items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
            <div >
                <CardTitle className="text-yellow-800">Página en Desarrollo</CardTitle>
                <CardDescription className="text-yellow-700">Esta es una maqueta visual. La funcionalidad de guardar y cargar el historial requiere conexión con el backend.</CardDescription>
            </div>
        </CardHeader>
      </Card>

      <div className="mt-6 space-y-4">
        {fakeHistory.map((item) => (
          <Card key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className="hidden sm:block">{item.icon}</div>
              <div>
                <p className="font-semibold">{item.title}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {item.icon}
                    <Badge variant="outline">{item.type}</Badge>
                    <span>-</span>
                    <p>{item.date}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 self-end sm:self-center">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Ver
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copiar
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}