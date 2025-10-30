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
import { Textarea } from "@/components/ui/textarea"





export default function AmenitiesTab() {

     const [editingAmenity, setEditingAmenity] = useState<any>(null)
    

  return (
    <Card>
            <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                <CardTitle>Amenity Management</CardTitle>
                <CardDescription>Manage property amenities</CardDescription>
                </div>
                <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-teal hover:bg-teal/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Amenity
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Add New Amenity</DialogTitle>
                    <DialogDescription>Create a new amenity</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="amenity-property">Property</Label>
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
                        <Label htmlFor="amenity-name">Amenity Name</Label>
                        <Input id="amenity-name" placeholder="Swimming Pool" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amenity-description">Description</Label>
                        <Textarea id="amenity-description" placeholder="Enter description" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                        <Label htmlFor="amenity-capacity">Capacity</Label>
                        <Input id="amenity-capacity" type="number" placeholder="20" />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="amenity-price">Price (AED)</Label>
                        <Input id="amenity-price" type="number" placeholder="100" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Amenity Image</Label>
                        <Button variant="outline" className="w-full bg-transparent">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                        </Button>
                    </div>
                    </div>
                    <DialogFooter>
                    <Button type="submit" className="bg-teal hover:bg-teal/90">
                        Add Amenity
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
                    <TableHead>Amenity Name</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                <TableRow>
                    <TableCell className="font-medium">Swimming Pool</TableCell>
                    <TableCell>Palm Tower</TableCell>
                    <TableCell>20 people</TableCell>
                    <TableCell>AED 100</TableCell>
                    <TableCell>
                    <Badge className="bg-green-500">Active</Badge>
                    </TableCell>
                    <TableCell>
                    <div className="flex items-center gap-2">
                        <Dialog
                        open={editingAmenity !== null}
                        onOpenChange={(open) => !open && setEditingAmenity(null)}
                        >
                        <DialogTrigger asChild>
                            <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                                setEditingAmenity({
                                id: 1,
                                name: "Swimming Pool",
                                property: "Palm Tower",
                                capacity: 20,
                                price: 100,
                                description: "Olympic-sized swimming pool",
                                })
                            }
                            >
                            <Edit className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Edit Amenity</DialogTitle>
                            <DialogDescription>Update amenity details</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-amenity-property">Property</Label>
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
                                <Label htmlFor="edit-amenity-name">Amenity Name</Label>
                                <Input id="edit-amenity-name" defaultValue={editingAmenity?.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-amenity-description">Description</Label>
                                <Textarea id="edit-amenity-description" defaultValue={editingAmenity?.description} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                <Label htmlFor="edit-amenity-capacity">Capacity</Label>
                                <Input
                                    id="edit-amenity-capacity"
                                    type="number"
                                    defaultValue={editingAmenity?.capacity}
                                />
                                </div>
                                <div className="space-y-2">
                                <Label htmlFor="edit-amenity-price">Price (AED)</Label>
                                <Input id="edit-amenity-price" type="number" defaultValue={editingAmenity?.price} />
                                </div>
                            </div>
                            </div>
                            <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingAmenity(null)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-teal hover:bg-teal/90">
                                Update Amenity
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