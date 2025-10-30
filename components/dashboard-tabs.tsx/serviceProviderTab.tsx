"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus,Edit,Upload,Trash2 } from "lucide-react"
import { Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription,DialogHeader,DialogFooter} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


export default function ServiceProvidersTab() {    


    const [editingServiceProvider, setEditingServiceProvider] = useState<any>(null)
  return (
        <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Service Provider Management</CardTitle>
                    <CardDescription>Manage service providers and vendors</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-teal hover:bg-teal/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Provider
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Service Provider</DialogTitle>
                        <DialogDescription>Register a new service provider</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="provider-service">Service Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="service1">AC Maintenance</SelectItem>
                              <SelectItem value="service2">Plumbing</SelectItem>
                              <SelectItem value="service3">Electrical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="provider-name-en">Name (English)</Label>
                            <Input id="provider-name-en" placeholder="Cool Tech Services" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="provider-name-ar">Name (Arabic)</Label>
                            <Input id="provider-name-ar" placeholder="خدمات التبريد" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="provider-email">Email</Label>
                          <Input id="provider-email" type="email" placeholder="info@cooltech.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="provider-phone">Phone</Label>
                          <Input id="provider-phone" placeholder="+971 4 123 4567" />
                        </div>
                        <div className="space-y-2">
                          <Label>Provider Logo</Label>
                          <Button variant="outline" className="w-full bg-transparent">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Logo
                          </Button>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-teal hover:bg-teal/90">
                          Add Provider
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
                      <TableHead>Provider Name</TableHead>
                      <TableHead>Service Type</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Cool Tech Services</TableCell>
                      <TableCell>AC Maintenance</TableCell>
                      <TableCell>info@cooltech.com</TableCell>
                      <TableCell>+971 4 123 4567</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog
                            open={editingServiceProvider !== null}
                            onOpenChange={(open) => !open && setEditingServiceProvider(null)}
                          >
                            <DialogTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() =>
                                  setEditingServiceProvider({
                                    id: 1,
                                    nameEn: "Cool Tech Services",
                                    nameAr: "خدمات التبريد",
                                    email: "info@cooltech.com",
                                    phone: "+971 4 123 4567",
                                    service: "AC Maintenance",
                                  })
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Service Provider</DialogTitle>
                                <DialogDescription>Update provider details</DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-provider-service">Service Type</Label>
                                  <Select defaultValue="service1">
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select service" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="service1">AC Maintenance</SelectItem>
                                      <SelectItem value="service2">Plumbing</SelectItem>
                                      <SelectItem value="service3">Electrical</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-provider-name-en">Name (English)</Label>
                                    <Input id="edit-provider-name-en" defaultValue={editingServiceProvider?.nameEn} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-provider-name-ar">Name (Arabic)</Label>
                                    <Input id="edit-provider-name-ar" defaultValue={editingServiceProvider?.nameAr} />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-provider-email">Email</Label>
                                  <Input
                                    id="edit-provider-email"
                                    type="email"
                                    defaultValue={editingServiceProvider?.email}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-provider-phone">Phone</Label>
                                  <Input id="edit-provider-phone" defaultValue={editingServiceProvider?.phone} />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setEditingServiceProvider(null)}>
                                  Cancel
                                </Button>
                                <Button type="submit" className="bg-teal hover:bg-teal/90">
                                  Update Provider
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