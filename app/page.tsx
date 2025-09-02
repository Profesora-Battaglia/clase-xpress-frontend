import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { UserProfile } from "@/components/user-profile"
import { ProtectedRoute } from "../components/auth-provider"

export default function HomePage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <MainContent />

          {/* User Profile Footer */}
          <UserProfile />
        </div>
      </div>
    </ProtectedRoute>
  )
}
