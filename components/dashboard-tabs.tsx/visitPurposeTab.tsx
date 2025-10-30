"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit,Trash2,Plus } from "lucide-react"
import { Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription,DialogHeader,DialogFooter} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function VisitPurposesTab() {

    const [editingVisitPurpose, setEditingVisitPurpose] = useState<any>(null)
    

  return (
        <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Visit Purpose Management</CardTitle>
                    <CardDescription>Manage visit purpose types</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-teal hover:bg-teal/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Purpose
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Visit Purpose</DialogTitle>
                        <DialogDescription>Create a new visit purpose type</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="purpose-name-en">Name (English)</Label>
                            <Input id="purpose-name-en" placeholder="Delivery" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="purpose-name-ar">Name (Arabic)</Label>
                            <Input id="purpose-name-ar" placeholder="توصيل" />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="auto-approval" className="rounded" />
                          <Label htmlFor="auto-approval">Enable Auto Approval</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-teal hover:bg-teal/90">
                          Add Purpose
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
                      <TableHead>Purpose Name</TableHead>
                      <TableHead>Auto Approval</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Delivery</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Enabled</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog
                            open={editingVisitPurpose !== null}
                            onOpenChange={(open) => !open && setEditingVisitPurpose(null)}
                          >
                            <DialogTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() =>
                                  setEditingVisitPurpose({
                                    id: 1,
                                    nameEn: "Delivery",
                                    nameAr: "توصيل",
                                    autoApproval: true,
                                  })
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Visit Purpose</DialogTitle>
                                <DialogDescription>Update visit purpose details</DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-purpose-name-en">Name (English)</Label>
                                    <Input id="edit-purpose-name-en" defaultValue={editingVisitPurpose?.nameEn} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-purpose-name-ar">Name (Arabic)</Label>
                                    <Input id="edit-purpose-name-ar" defaultValue={editingVisitPurpose?.nameAr} />
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id="edit-auto-approval"
                                    className="rounded"
                                    defaultChecked={editingVisitPurpose?.autoApproval}
                                  />
                                  <Label htmlFor="edit-auto-approval">Enable Auto Approval</Label>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setEditingVisitPurpose(null)}>
                                  Cancel
                                </Button>
                                <Button type="submit" className="bg-teal hover:bg-teal/90">
                                  Update Purpose
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
                    <TableRow>
                      <TableCell className="font-medium">Maintenance</TableCell>
                      <TableCell>
                        <Badge className="bg-red-500">Disabled</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog
                            open={editingVisitPurpose !== null}
                            onOpenChange={(open) => !open && setEditingVisitPurpose(null)}
                          >
                            <DialogTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() =>
                                  setEditingVisitPurpose({
                                    id: 2,
                                    nameEn: "Maintenance",
                                    nameAr: "صيانة",
                                    autoApproval: false,
                                  })
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Visit Purpose</DialogTitle>
                                <DialogDescription>Update visit purpose details</DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-purpose-name-en">Name (English)</Label>
                                    <Input id="edit-purpose-name-en" defaultValue={editingVisitPurpose?.nameEn} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-purpose-name-ar">Name (Arabic)</Label>
                                    <Input id="edit-purpose-name-ar" defaultValue={editingVisitPurpose?.nameAr} />
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id="edit-auto-approval"
                                    className="rounded"
                                    defaultChecked={editingVisitPurpose?.autoApproval}
                                  />
                                  <Label htmlFor="edit-auto-approval">Enable Auto Approval</Label>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setEditingVisitPurpose(null)}>
                                  Cancel
                                </Button>
                                <Button type="submit" className="bg-teal hover:bg-teal/90">
                                  Update Purpose
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