"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Download, Activity, Mail } from "lucide-react"
import { QUICK_ACTIONS } from "@/lib/constants/admin-constants"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface QuickActionsProps {
  onAction?: (actionId: string) => void
}

export function QuickActions({ onAction }: QuickActionsProps) {
  const router = useRouter()

  const handleAction = (actionId: string, action: string) => {
    switch (action) {
      case "ADD_COMPANY":
        router.push("/admin/companies?action=add")
        break
      case "EXPORT_REPORTS":
        toast.success("Report export started. You will receive an email when ready.")
        break
      case "VIEW_ANALYTICS":
        router.push("/admin/reports")
        break
      case "SEND_NOTIFICATIONS":
        toast.info("Notification center coming soon!")
        break
      default:
        if (onAction) {
          onAction(actionId)
        }
    }
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Plus":
        return <Plus className="mr-2 h-4 w-4" />
      case "Download":
        return <Download className="mr-2 h-4 w-4" />
      case "Activity":
        return <Activity className="mr-2 h-4 w-4" />
      case "Mail":
        return <Mail className="mr-2 h-4 w-4" />
      default:
        return <Activity className="mr-2 h-4 w-4" />
    }
  }

  const getColorClass = (color: string) => {
    switch (color) {
      case "blue":
        return "hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950"
      case "green":
        return "hover:bg-green-50 hover:border-green-200 dark:hover:bg-green-950"
      case "purple":
        return "hover:bg-purple-50 hover:border-purple-200 dark:hover:bg-purple-950"
      case "orange":
        return "hover:bg-orange-50 hover:border-orange-200 dark:hover:bg-orange-950"
      default:
        return "hover:bg-gray-50 hover:border-gray-200 dark:hover:bg-gray-800"
    }
  }

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {QUICK_ACTIONS.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            className={`w-full justify-start bg-transparent transition-colors ${getColorClass(action.color)}`}
            onClick={() => handleAction(action.id, action.action)}
          >
            {getIcon(action.icon)}
            <div className="text-left">
              <div className="font-medium">{action.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{action.description}</div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
