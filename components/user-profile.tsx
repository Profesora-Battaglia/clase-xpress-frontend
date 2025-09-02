"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Settings, LogOut } from "lucide-react"
import { useAuth } from "./auth-provider"
import { signOut, getAuth } from "firebase/auth"
import { app } from "@/lib/firebase"
import { useRouter } from "next/navigation"

export function UserProfile() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const auth = getAuth(app);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (loading) {
    return null; // Or a loading spinner
  }

  if (!user) {
    return (
      <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4 shadow-sm text-center">
        <p className="text-sm text-muted-foreground">No has iniciado sesión.</p>
        <Button onClick={() => router.push("/login")} className="mt-2">Iniciar Sesión</Button>
      </div>
    );
  }

  return (
    <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12 ring-2 ring-primary/20">
          <AvatarImage src="/diverse-classroom-teacher.png" alt="Docente" />
          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
            {user.email ? user.email[0].toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-semibold text-foreground">Docente Pro</p>
          </div>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
