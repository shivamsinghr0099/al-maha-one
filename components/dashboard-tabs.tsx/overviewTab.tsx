import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, UserCheck, Calendar, FileText } from "lucide-react"

export default function OverviewTab() {
  return (
    <>
    <Card>
        <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Latest updates across all properties</CardDescription>
        </CardHeader>
        <CardContent>
        <div className="space-y-4">
            {[
            { action: "New tenant registered", property: "Tower A, Unit 1205", time: "2 hours ago" },
            { action: "Maintenance request completed", property: "Tower B, Unit 804", time: "5 hours ago" },
            { action: "Amenity booking confirmed", property: "Pool Area", time: "1 day ago" },
            ].map((a, i) => (
            <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0">
                <div className="h-2 w-2 rounded-full bg-teal mt-2" />
                <div className="flex-1">
                <p className="font-medium text-sm">{a.action}</p>
                <p className="text-xs text-gray-600">{a.property}</p>
                <p className="text-xs text-gray-500 mt-1">{a.time}</p>
                </div>
            </div>
            ))}
        </div>
        </CardContent>
    </Card>

    {/* Quick Actions */}
    <Card>
        <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common management tasks</CardDescription>
        </CardHeader>
        <CardContent>
        <div className="grid grid-cols-2 gap-3">
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
            <Plus className="h-5 w-5" />
            <span className="text-xs">Add Property</span>
            </Button>
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
            <UserCheck className="h-5 w-5" />
            <span className="text-xs">Add Tenant</span>
            </Button>
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
            <Calendar className="h-5 w-5" />
            <span className="text-xs">View Bookings</span>
            </Button>
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
            <FileText className="h-5 w-5" />
            <span className="text-xs">Generate Report</span>
            </Button>
        </div>
        </CardContent>
    </Card>
    </>
  )
}