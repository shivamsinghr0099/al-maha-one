"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus,Edit,Trash2 } from "lucide-react"
import { Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription,DialogHeader,DialogFooter} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


export default function ServiceProductsTab() {    

  const [editingServiceProduct, setEditingServiceProduct] = useState<any>(null)

  return (
        <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Home Service Product Management</CardTitle>
                    <CardDescription>Manage service product options</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-teal hover:bg-teal/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Service Product</DialogTitle>
                        <DialogDescription>Create a new service product option</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="product-service">Home Service</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="service1">AC Maintenance</SelectItem>
                              <SelectItem value="service2">Plumbing</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="product-name-en">Product Name (English)</Label>
                            <Input id="product-name-en" placeholder="Filter Replacement" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="product-name-ar">Product Name (Arabic)</Label>
                            <Input id="product-name-ar" placeholder="استبدال الفلتر" />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-teal hover:bg-teal/90">
                          Add Product
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
                      <TableHead>Product Name</TableHead>
                      <TableHead>Home Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Filter Replacement</TableCell>
                      <TableCell>AC Maintenance</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog
                            open={editingServiceProduct !== null}
                            onOpenChange={(open) => !open && setEditingServiceProduct(null)}
                          >
                            <DialogTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() =>
                                  setEditingServiceProduct({
                                    id: 1,
                                    nameEn: "Filter Replacement",
                                    nameAr: "استبدال الفلتر",
                                    service: "AC Maintenance",
                                  })
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Service Product</DialogTitle>
                                <DialogDescription>Update product details</DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-product-service">Home Service</Label>
                                  <Select defaultValue="service1">
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select service" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="service1">AC Maintenance</SelectItem>
                                      <SelectItem value="service2">Plumbing</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-product-name-en">Product Name (English)</Label>
                                    <Input id="edit-product-name-en" defaultValue={editingServiceProduct?.nameEn} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-product-name-ar">Product Name (Arabic)</Label>
                                    <Input id="edit-product-name-ar" defaultValue={editingServiceProduct?.nameAr} />
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setEditingServiceProduct(null)}>
                                  Cancel
                                </Button>
                                <Button type="submit" className="bg-teal hover:bg-teal/90">
                                  Update Product
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