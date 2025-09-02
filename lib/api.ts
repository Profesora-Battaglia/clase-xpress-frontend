const API_BASE_URL = "https://claseiaxpress-backend-gemini.vercel.app"

export interface ApiResponse {
  success: boolean
  data?: any
  error?: string
}

export async function callGeminiAPI(prompt: string): Promise<ApiResponse> {
  try {
    console.log("[v0] Iniciando llamada API a:", `${API_BASE_URL}/api/generate`)
    console.log("[v0] Prompt enviado:", prompt.substring(0, 100) + "...")

    const response = await fetch(`${API_BASE_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })

    console.log("[v0] Response status:", response.status)
    console.log("[v0] Response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[v0] Error response body:", errorText)
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
    }

    const data = await response.json()
    console.log("[v0] Response data:", data)
    return { success: true, data: data.text }
  } catch (error) {
    console.error(`[v0] Error calling API:`, error)
    if (error instanceof TypeError && error.message.includes("fetch")) {
      console.error("[v0] Posible problema de CORS o conectividad")
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    }
  }
}

export const planificadorAPI = {
  crearPlanificacion: (datos: any) =>
    callGeminiAPI(`Crea una planificación de clase detallada con los siguientes datos: ${JSON.stringify(datos)}`),
}

export const chatbotAPI = {
  enviarMensaje: (mensaje: string) =>
    callGeminiAPI(`Como asistente pedagógico inteligente, responde a esta consulta educativa: ${mensaje}`),
}

export const rubricasAPI = {
  generarRubrica: (tema: string, nivel: string) =>
    callGeminiAPI(`Genera una rúbrica de evaluación para el tema "${tema}" nivel "${nivel}"`),
}

export const adaptadorAPI = {
  adaptarTexto: (texto: string, nivel: string) => callGeminiAPI(`Adapta este texto para nivel ${nivel}: ${texto}`),
}

export async function generateContent(prompt: string): Promise<string> {
  try {
    const response = await callGeminiAPI(prompt)
    if (response.success) {
      return response.data || ""
    } else {
      throw new Error(response.error || "Error al generar contenido")
    }
  } catch (error) {
    console.error("Error en generateContent:", error)
    throw error
  }
}
