"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  Users,
  MessageSquare,
  ThumbsUp,
  Share2,
  Search,
  Plus,
  Pin,
  Clock,
  Eye,
  Reply,
  Award,
  TrendingUp,
  Calendar,
  MapPin,
  Bell,
  ImageIcon,
  Paperclip,
} from "lucide-react"
import Link from "next/link"

const forumCategories = [
  { id: "general", name: "General Discussion", icon: MessageSquare, color: "bg-blue-100 text-blue-600", posts: 45 },
  { id: "announcements", name: "Announcements", icon: Bell, color: "bg-green-100 text-green-600", posts: 12 },
  { id: "events", name: "Community Events", icon: Calendar, color: "bg-purple-100 text-purple-600", posts: 23 },
  { id: "marketplace", name: "Marketplace", icon: Award, color: "bg-orange-100 text-orange-600", posts: 67 },
  { id: "suggestions", name: "Suggestions", icon: TrendingUp, color: "bg-yellow-100 text-yellow-600", posts: 34 },
  { id: "help", name: "Help & Support", icon: Users, color: "bg-red-100 text-red-600", posts: 18 },
]

const forumPosts = [
  {
    id: 1,
    title: "Pool maintenance schedule update",
    content: "The swimming pool will be closed for maintenance from January 25-26. We apologize for any inconvenience.",
    author: "Building Management",
    authorAvatar: "/placeholder.svg?height=40&width=40&text=BM",
    category: "announcements",
    isPinned: true,
    isOfficial: true,
    createdAt: "2024-01-20T10:30:00Z",
    replies: 8,
    likes: 15,
    views: 124,
    tags: ["maintenance", "pool", "schedule"],
  },
  {
    id: 2,
    title: "Organizing a community BBQ event",
    content:
      "Hi everyone! I'm thinking of organizing a community BBQ event next weekend. Who would be interested in joining? We can use the BBQ area and make it a fun family event.",
    author: "Sarah Johnson",
    authorAvatar: "/placeholder.svg?height=40&width=40&text=SJ",
    category: "events",
    isPinned: false,
    isOfficial: false,
    createdAt: "2024-01-19T15:45:00Z",
    replies: 23,
    likes: 31,
    views: 89,
    tags: ["bbq", "community", "family", "weekend"],
  },
  {
    id: 3,
    title: "Selling: Kids bicycle in excellent condition",
    content:
      "My daughter has outgrown her bicycle. It's a pink 16-inch bike in excellent condition. Asking for AED 200. Contact me if interested!",
    author: "Ahmed Hassan",
    authorAvatar: "/placeholder.svg?height=40&width=40&text=AH",
    category: "marketplace",
    isPinned: false,
    isOfficial: false,
    createdAt: "2024-01-18T09:20:00Z",
    replies: 5,
    likes: 8,
    views: 67,
    tags: ["bicycle", "kids", "sale"],
  },
  {
    id: 4,
    title: "Suggestion: Add more parking spaces",
    content:
      "With the growing number of residents, I think we need to consider adding more parking spaces. The current parking is often full, especially during weekends.",
    author: "Mike Chen",
    authorAvatar: "/placeholder.svg?height=40&width=40&text=MC",
    category: "suggestions",
    isPinned: false,
    isOfficial: false,
    createdAt: "2024-01-17T14:10:00Z",
    replies: 12,
    likes: 19,
    views: 156,
    tags: ["parking", "suggestion", "improvement"],
  },
  {
    id: 5,
    title: "Gym equipment maintenance needed",
    content:
      "The treadmill #2 in the gym has been making strange noises. Can someone from maintenance please check it?",
    author: "Lisa Wong",
    authorAvatar: "/placeholder.svg?height=40&width=40&text=LW",
    category: "help",
    isPinned: false,
    isOfficial: false,
    createdAt: "2024-01-16T11:30:00Z",
    replies: 3,
    likes: 6,
    views: 45,
    tags: ["gym", "maintenance", "equipment"],
  },
]

const communityEvents = [
  {
    id: 1,
    title: "Community Cleanup Day",
    date: "2024-01-28",
    time: "09:00 AM",
    location: "Community Garden",
    attendees: 23,
    description: "Join us for a community cleanup day to keep our neighborhood beautiful!",
  },
  {
    id: 2,
    title: "Kids Movie Night",
    date: "2024-01-30",
    time: "07:00 PM",
    location: "Function Room",
    attendees: 15,
    description: "Family-friendly movie night with popcorn and refreshments.",
  },
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("forum")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("recent")

  const filteredPosts = forumPosts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-purple-600" />
              <h1 className="text-xl font-semibold text-gray-900">Community Forum</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="forum">Forum</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="polls">Polls</TabsTrigger>
            <TabsTrigger value="create">Create Post</TabsTrigger>
          </TabsList>

          <TabsContent value="forum" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search discussions..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {forumCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="replies">Most Replies</SelectItem>
                  <SelectItem value="views">Most Views</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Categories */}
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {forumCategories.map((category) => (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-all ${
                    selectedCategory === category.id ? "ring-2 ring-purple-500 bg-purple-50" : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? "all" : category.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className={`w-12 h-12 rounded-lg ${category.color} mx-auto mb-2 flex items-center justify-center`}
                    >
                      <category.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
                    <p className="text-xs text-gray-500">{category.posts} posts</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Forum Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => {
                const category = forumCategories.find((cat) => cat.id === post.category)
                return (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
                          <AvatarFallback>
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {post.isPinned && <Pin className="h-4 w-4 text-blue-600" />}
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                              {post.title}
                            </h3>
                            {post.isOfficial && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                Official
                              </Badge>
                            )}
                            {category && (
                              <Badge variant="outline" className={category.color}>
                                {category.name}
                              </Badge>
                            )}
                          </div>

                          <p className="text-gray-700 mb-3 line-clamp-2">{post.content}</p>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="font-medium">{post.author}</span>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{formatTimeAgo(post.createdAt)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageSquare className="h-4 w-4" />
                                <span>{post.replies}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="h-4 w-4" />
                                <span>{post.views}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                {post.likes}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                                <Reply className="h-4 w-4 mr-1" />
                                Reply
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Community Events</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {communityEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {event.date} at {event.time}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1">Join Event</Button>
                      <Button variant="outline">Share</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="polls" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Community Polls</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Poll
              </Button>
            </div>

            <CommunityPolls />
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Post</h2>
              <p className="text-gray-600">Share your thoughts with the community</p>
            </div>

            <CreatePostForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function CommunityPolls() {
  const polls = [
    {
      id: 1,
      title: "What time should the gym close on weekdays?",
      description: "Help us decide the best closing time for the fitness center",
      options: [
        { text: "9:00 PM", votes: 15 },
        { text: "10:00 PM", votes: 23 },
        { text: "11:00 PM", votes: 8 },
        { text: "12:00 AM", votes: 4 },
      ],
      totalVotes: 50,
      endsAt: "2024-01-25",
      hasVoted: false,
    },
    {
      id: 2,
      title: "Which amenity should we add next?",
      description: "Vote for the next amenity you'd like to see in our community",
      options: [
        { text: "Yoga Studio", votes: 18 },
        { text: "Kids Play Area", votes: 25 },
        { text: "Co-working Space", votes: 12 },
        { text: "Rooftop Garden", votes: 20 },
      ],
      totalVotes: 75,
      endsAt: "2024-01-30",
      hasVoted: true,
    },
  ]

  return (
    <div className="space-y-6">
      {polls.map((poll) => (
        <Card key={poll.id}>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{poll.title}</h3>
            <p className="text-gray-600 mb-4">{poll.description}</p>

            <div className="space-y-3 mb-4">
              {poll.options.map((option, index) => {
                const percentage = (option.votes / poll.totalVotes) * 100
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{option.text}</span>
                      <span className="text-sm text-gray-500">
                        {option.votes} votes ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <span>
                  {poll.totalVotes} total votes • Ends {poll.endsAt}
                </span>
              </div>
              <div className="flex space-x-2">
                {!poll.hasVoted ? <Button size="sm">Vote</Button> : <Badge variant="secondary">Voted</Badge>}
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function CreatePostForm() {
  const [postType, setPostType] = useState("discussion")
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    tags: "",
    isAnonymous: false,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="postType">Post Type</Label>
          <Select value={postType} onValueChange={setPostType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="discussion">Discussion</SelectItem>
              <SelectItem value="question">Question</SelectItem>
              <SelectItem value="announcement">Announcement</SelectItem>
              <SelectItem value="marketplace">Marketplace</SelectItem>
              <SelectItem value="event">Event</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter post title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {forumCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write your post content..."
            rows={6}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="Enter tags separated by commas"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="anonymous"
            checked={formData.isAnonymous}
            onCheckedChange={(checked) => setFormData({ ...formData, isAnonymous: checked as boolean })}
          />
          <Label htmlFor="anonymous">Post anonymously</Label>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <ImageIcon className="h-4 w-4 mr-2" />
            Add Image
          </Button>
          <Button variant="outline">
            <Paperclip className="h-4 w-4 mr-2" />
            Attach File
          </Button>
        </div>

        <div className="flex space-x-4">
          <Button className="flex-1">Publish Post</Button>
          <Button variant="outline">Save Draft</Button>
        </div>
      </CardContent>
    </Card>
  )
}
