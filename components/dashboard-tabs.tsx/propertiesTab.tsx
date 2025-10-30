"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus,Upload,Search,Eye,Edit,Trash2 } from "lucide-react"
import { Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription,DialogHeader,DialogFooter} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"




export default function PropertiesTab() {

    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all")
    const [editingProperty, setEditingProperty] = useState<any>(null)




  return (
    <Card>
        <CardHeader>
        <div className="flex items-center justify-between">
            <div>
            <CardTitle>Property Management</CardTitle>
            <CardDescription>Add, edit, and manage all properties</CardDescription>
            </div>
            <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-teal hover:bg-teal/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                <DialogTitle>Add New Property</DialogTitle>
                <DialogDescription>Enter property details</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <Label htmlFor="property-name-en">Name (English)</Label>
                    <Input id="property-name-en" placeholder="Luxury Villa" />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="property-name-ar">Name (Arabic)</Label>
                    <Input id="property-name-ar" placeholder="فيلا فاخرة" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Dubai, UAE" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                    <Label htmlFor="area">Area (sqft)</Label>
                    <Input id="area" type="number" placeholder="1450" />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input id="bedrooms" type="number" placeholder="3" />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="floor">Floor</Label>
                    <Input id="floor" type="number" placeholder="12" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <Label htmlFor="property-type">Property Type</Label>
                    <Select>
                        <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="adults">Number of Adults</Label>
                    <Input id="adults" type="number" placeholder="4" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="owner">Owner</Label>
                    <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select owner" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="owner1">John Doe</SelectItem>
                        <SelectItem value="owner2">Jane Smith</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="tenant">Tenant (Optional)</Label>
                    <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select tenant" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="tenant1">Ahmed Ali</SelectItem>
                        <SelectItem value="tenant2">Sara Mohammed</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="checkbox" id="handed-over" className="rounded" />
                    <Label htmlFor="handed-over">Property Handed Over</Label>
                </div>
                <div className="space-y-2">
                    <Label>Property Documents</Label>
                    <Button variant="outline" className="w-full bg-transparent">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Documents
                    </Button>
                </div>
                </div>
                <DialogFooter>
                <Button type="submit" className="bg-teal hover:bg-teal/90">
                    Add Property
                </Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        </div>
        </CardHeader>
        <CardContent>
        <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
                placeholder="Search properties..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
            </Select>
        </div>
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Property Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Bedrooms</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            <TableRow>
                <TableCell className="font-medium">Palm Tower Apt 1201</TableCell>
                <TableCell>Dubai Marina</TableCell>
                <TableCell>Apartment</TableCell>
                <TableCell>3</TableCell>
                <TableCell>1450 sqft</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>Ahmed Ali</TableCell>
                <TableCell>
                <Badge className="bg-green-500">Active</Badge>
                </TableCell>
                <TableCell>
                <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost">
                    <Eye className="h-4 w-4" />
                    </Button>
                    <Dialog
                    open={editingProperty !== null}
                    onOpenChange={(open) => !open && setEditingProperty(null)}
                    >
                    <DialogTrigger asChild>
                        <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                            setEditingProperty({
                            id: 1,
                            nameEn: "Palm Tower Apt 1201",
                            nameAr: "برج النخلة شقة 1201",
                            location: "Dubai Marina",
                            type: "apartment",
                            bedrooms: 3,
                            area: 1450,
                            floor: 12,
                            })
                        }
                        >
                        <Edit className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                        <DialogTitle>Edit Property</DialogTitle>
                        <DialogDescription>Update property details</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                            <Label htmlFor="edit-property-name-en">Name (English)</Label>
                            <Input id="edit-property-name-en" defaultValue={editingProperty?.nameEn} />
                            </div>
                            <div className="space-y-2">
                            <Label htmlFor="edit-property-name-ar">Name (Arabic)</Label>
                            <Input id="edit-property-name-ar" defaultValue={editingProperty?.nameAr} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-location">Location</Label>
                            <Input id="edit-location" defaultValue={editingProperty?.location} />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                            <Label htmlFor="edit-area">Area (sqft)</Label>
                            <Input id="edit-area" type="number" defaultValue={editingProperty?.area} />
                            </div>
                            <div className="space-y-2">
                            <Label htmlFor="edit-bedrooms">Bedrooms</Label>
                            <Input id="edit-bedrooms" type="number" defaultValue={editingProperty?.bedrooms} />
                            </div>
                            <div className="space-y-2">
                            <Label htmlFor="edit-floor">Floor</Label>
                            <Input id="edit-floor" type="number" defaultValue={editingProperty?.floor} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-property-type">Property Type</Label>
                            <Select defaultValue={editingProperty?.type}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="villa">Villa</SelectItem>
                                <SelectItem value="townhouse">Townhouse</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>
                        </div>
                        <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingProperty(null)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-teal hover:bg-teal/90">
                            Update Property
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