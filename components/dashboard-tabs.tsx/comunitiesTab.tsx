"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus,Edit,Trash2 } from "lucide-react"
import { Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription,DialogHeader,DialogFooter} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"



export default function CommunityTab() {    

  const [editingCommunityPost, setEditingCommunityPost] = useState<any>(null)

  return (
<Card>
        <CardHeader>
        <div className="flex items-center justify-between">
            <div>
            <CardTitle>Community Wall Management</CardTitle>
            <CardDescription>Manage community posts and announcements</CardDescription>
            </div>
            <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-teal hover:bg-teal/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Post
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add Community Post</DialogTitle>
                <DialogDescription>Create a new community post</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="post-name">Post Title</Label>
                    <Input id="post-name" placeholder="Community Event" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="post-type">Post Type</Label>
                    <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ANNOUNCEMENT">Announcement</SelectItem>
                        <SelectItem value="EVENT">Event</SelectItem>
                        <SelectItem value="NEWS_LETTER">Newsletter</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="post-description">Description</Label>
                    <Textarea id="post-description" placeholder="Enter post description" />
                </div>
                </div>
                <DialogFooter>
                <Button type="submit" className="bg-teal hover:bg-teal/90">
                    Add Post
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
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Posted By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            <TableRow>
                <TableCell className="font-medium">Community BBQ Event</TableCell>
                <TableCell>
                <Badge className="bg-blue-500">Event</Badge>
                </TableCell>
                <TableCell>Building Manager</TableCell>
                <TableCell>2025-01-28</TableCell>
                <TableCell>
                <Badge className="bg-green-500">Active</Badge>
                </TableCell>
                <TableCell>
                <div className="flex items-center gap-2">
                    <Dialog
                    open={editingCommunityPost !== null}
                    onOpenChange={(open) => !open && setEditingCommunityPost(null)}
                    >
                    <DialogTrigger asChild>
                        <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                            setEditingCommunityPost({
                            id: 1,
                            name: "Community BBQ Event",
                            type: "EVENT",
                            description: "Join us for a community BBQ event this weekend!",
                            })
                        }
                        >
                        <Edit className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Edit Community Post</DialogTitle>
                        <DialogDescription>Update post details</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-post-name">Post Title</Label>
                            <Input id="edit-post-name" defaultValue={editingCommunityPost?.name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-post-type">Post Type</Label>
                            <Select defaultValue={editingCommunityPost?.type}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ANNOUNCEMENT">Announcement</SelectItem>
                                <SelectItem value="EVENT">Event</SelectItem>
                                <SelectItem value="NEWS_LETTER">Newsletter</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-post-description">Description</Label>
                            <Textarea
                            id="edit-post-description"
                            defaultValue={editingCommunityPost?.description}
                            />
                        </div>
                        </div>
                        <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingCommunityPost(null)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-teal hover:bg-teal/90">
                            Update Post
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