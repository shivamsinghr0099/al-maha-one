"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import {
  listLandlords,
  addLandlord,
  editLandlord,
  removeLandlord,
  connectPropertyToLandlord,
} from "@/redux/actions/landlord"; 
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function LandlordsTab() {
  const dispatch = useDispatch<AppDispatch>();
  const { landlords, loading, error } = useSelector(
    (state: RootState) => state.landlord
  );

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    homeAddress: "",
    deliveryAddress: "",
  });

  useEffect(() => {
    dispatch(listLandlords({ limit: 10, offset: 0 }));
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleAddLandlord = async () => {
    if (!formData.firstName || !formData.email) {
      toast.error("Please fill required fields");
      return;
    }

    const payload = {
      firstName: { en: formData.firstName },
      lastName: { en: formData.lastName },
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      homeAddress: { city: formData.homeAddress },
      deliveryAddress: { city: formData.deliveryAddress },
    };

    const result = await dispatch(addLandlord(payload));
    if (addLandlord.fulfilled.match(result)) {
      toast.success("Landlord added successfully!");
      setOpen(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        homeAddress: "",
        deliveryAddress: "",
      });
      dispatch(listLandlords({ limit: 10, offset: 0 }));
    } else {
      toast.error(result.payload || "Failed to add landlord");
    }
  };

  const handleRemoveLandlord = async (id: string) => {
    if (confirm("Are you sure you want to delete this landlord?")) {
      const result = await dispatch(removeLandlord({ landlordId: id }));
      if (removeLandlord.fulfilled.match(result)) {
        toast.success("Landlord removed");
        dispatch(listLandlords({ limit: 10, offset: 0 }));
      } else {
        toast.error(result.payload || "Failed to remove landlord");
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Landlord Management</CardTitle>
            <CardDescription>Add, edit, and manage landlords</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal hover:bg-teal/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Landlord
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Landlord</DialogTitle>
                <DialogDescription>Enter landlord details</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+971 50 123 4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="homeAddress">Home Address</Label>
                  <Textarea
                    id="homeAddress"
                    value={formData.homeAddress}
                    onChange={handleInputChange}
                    placeholder="Enter home address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryAddress">Delivery Address</Label>
                  <Textarea
                    id="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    placeholder="Enter delivery address"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleAddLandlord}
                  className="bg-teal hover:bg-teal/90"
                >
                  Add Landlord
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        {loading && <p>Loading landlords...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {landlords?.map((landlord:any) => (
              <TableRow key={landlord.id}>
                <TableCell className="font-medium">
                  {landlord.firstName.en} {landlord.lastName.en}
                </TableCell>
                <TableCell>{landlord.email}</TableCell>
                <TableCell>{landlord.phoneNumber}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      landlord.status === "ACTIVE"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }
                  >
                    {landlord.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemoveLandlord(landlord.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
