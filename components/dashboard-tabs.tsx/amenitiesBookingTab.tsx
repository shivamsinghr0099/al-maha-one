"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription,DialogHeader,DialogFooter} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"



export default function AmenityBookingsTab() {    

  return (
    <Card>
        <CardHeader>
        <CardTitle>Amenity Booking Management</CardTitle>
        <CardDescription>Manage amenity bookings and approvals</CardDescription>
        </CardHeader>
        <CardContent>
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Amenity</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            <TableRow>
                <TableCell className="font-medium">Swimming Pool</TableCell>
                <TableCell>Palm Tower</TableCell>
                <TableCell>Ahmed Ali</TableCell>
                <TableCell>2025-01-30</TableCell>
                <TableCell>5</TableCell>
                <TableCell>
                <Badge className="bg-yellow-500">Pending</Badge>
                </TableCell>
                <TableCell>
                <Dialog>
                    <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Update
                    </Button>
                    </DialogTrigger>
                    <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Booking Status</DialogTitle>
                        <DialogDescription>Change booking status</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                        <Label>Booking Status</Label>
                        <Select>
                            <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                            <SelectItem value="COMPLETED">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button className="bg-teal hover:bg-teal/90">Update Status</Button>
                    </DialogFooter>
                    </DialogContent>
                </Dialog>
                </TableCell>
            </TableRow>
            </TableBody>
        </Table>
        </CardContent>
    </Card>
  )
}