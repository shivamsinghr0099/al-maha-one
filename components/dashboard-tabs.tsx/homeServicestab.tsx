"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus,Edit,Trash2,Upload } from "lucide-react"
import { Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription,DialogHeader,DialogFooter} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


export default function HomeServicesTab() {    

    const [editingHomeService, setEditingHomeService] = useState<any>(null)

  return (
    <Card>
            <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                <CardTitle>Home Service Management</CardTitle>
                <CardDescription>Manage available home services</CardDescription>
                </div>
                <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-teal hover:bg-teal/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Add Home Service</DialogTitle>
                    <DialogDescription>Create a new home service</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="service-property">Property</Label>
                        <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select property" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="prop1">Palm Tower</SelectItem>
                            <SelectItem value="prop2">Marina View</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="service-title">Service Title</Label>
                        <Input id="service-title" placeholder="AC Maintenance" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="service-name">Service Name</Label>
                        <Input id="service-name" placeholder="Air Conditioning Service" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="service-price">Base Price (AED)</Label>
                        <Input id="service-price" type="number" placeholder="150" />
                    </div>
                    <div className="space-y-2">
                        <Label>Service Image</Label>
                        <Button variant="outline" className="w-full bg-transparent">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                        </Button>
                    </div>
                    </div>
                    <DialogFooter>
                    <Button type="submit" className="bg-teal hover:bg-teal/90">
                        Add Service
                    </Button>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
            </div>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Service Title</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Base Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                <TableRow>
                    <TableCell className="font-medium">AC Maintenance</TableCell>
                    <TableCell>Palm Tower</TableCell>
                    <TableCell>AED 150</TableCell>
                    <TableCell>
                    <Badge className="bg-green-500">Active</Badge>
                    </TableCell>
                    <TableCell>
                    <div className="flex items-center gap-2">
                        <Dialog
                        open={editingHomeService !== null}
                        onOpenChange={(open) => !open && setEditingHomeService(null)}
                        >
                        <DialogTrigger asChild>
                            <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                                setEditingHomeService({
                                id: 1,
                                title: "AC Maintenance",
                                name: "Air Conditioning Service",
                                property: "Palm Tower",
                                price: 150,
                                })
                            }
                            >
                            <Edit className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Edit Home Service</DialogTitle>
                            <DialogDescription>Update service details</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-service-property">Property</Label>
                                <Select defaultValue="prop1">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select property" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="prop1">Palm Tower</SelectItem>
                                    <SelectItem value="prop2">Marina View</SelectItem>
                                </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-service-title">Service Title</Label>
                                <Input id="edit-service-title" defaultValue={editingHomeService?.title} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-service-name">Service Name</Label>
                                <Input id="edit-service-name" defaultValue={editingHomeService?.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-service-price">Base Price (AED)</Label>
                                <Input
                                id="edit-service-price"
                                type="number"
                                defaultValue={editingHomeService?.price}
                                />
                            </div>
                            </div>
                            <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingHomeService(null)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-teal hover:bg-teal/90">
                                Update Service
                            </Button>
                            </DialogFooter>
                        </DialogContent>
                        </Dialog>
                        <Button size="icon" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    </TableCell>
                </TableRow>
                </TableBody>
            </Table>
            </CardContent>
        </Card>
  )
}