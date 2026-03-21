"use client"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useState } from "react"
import { CheckCheck, MapPin, Package, Phone, Truck } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface AssignDeliverySheetProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    orderId: string
}

// Mock data - In real app, this would come from props or API
const orderData = {
    id: "ORD001",
    customer: "John Doe",
    items: [
        { name: "iPhone 15 Pro", quantity: 1, price: "$999" },
        { name: "AirPods Pro", quantity: 1, price: "$249" },
    ],
    total: "$1,248",
    shippingAddress: "123 Main St, New York, NY 10001",
    orderDate: "2024-03-20"
}

const deliveryPersons = [
    {
        id: "DP001",
        name: "Mike Wilson",
        phone: "+1 234-567-8900",
        area: "Manhattan",
        status: "Available",
        rating: "4.8",
        deliveries: "156"
    },
    {
        id: "DP002",
        name: "Sarah Johnson",
        phone: "+1 234-567-8901",
        area: "Brooklyn",
        status: "Available",
        rating: "4.9",
        deliveries: "203"
    }
]

export function AssignDeliverySheet({
    open,
    onOpenChange,
    orderId
}: AssignDeliverySheetProps) {
    const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState<string | null>(null)

    const handleAssign = () => {
        if (!selectedDeliveryPerson) return
        console.log("Assigning delivery:", {
            orderId,
            deliveryPersonId: selectedDeliveryPerson
        })
        onOpenChange(false)
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-[400px] sm:w-[540px] dark:bg-zinc-950 dark:border-zinc-800 overflow-y-auto p-2">
                <div className="flex flex-col h-full">
                    <SheetHeader className="space-y-2">
                        <SheetTitle className="dark:text-zinc-200 flex gap-3 ">Assign Delivery<CheckCheck className="text-green-600 bg-muted-forground/30" /></SheetTitle>
                        <SheetDescription className="dark:text-zinc-400">
                            Select a delivery person to assign this order
                        </SheetDescription>
                    </SheetHeader>
                    <Separator className="mb-3"/>

                        <div className="space-y-6 p-2">
                            {/* Order Details Card */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium dark:text-zinc-300 flex items-center">
                                    <Package className="w-4 h-4 mr-2 text-yellow-500" />
                                    Order Details
                                </h3>
                                <Card className="dark:bg-muted-foreground/5 border shadow-none bg-gray-40">
                                    <CardContent className="p-4 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-muted-foreground dark:text-zinc-300">{orderData.customer}</p>
                                                <p className="text-xs text-zinc-500">{orderData.orderDate}</p>
                                            </div>
                                            <Badge variant="secondary" className=" text-white rounded-full">
                                                {orderData.total}
                                            </Badge>
                                        </div>
                                        <Separator className="" />
                                        <div className="space-y-2">
                                            {orderData.items.map((item, index) => (
                                                <div key={index} className="flex justify-between text-sm">
                                                    <span className="dark:text-zinc-400 text-muted-foreground">
                                                        {item.quantity}x {item.name}
                                                    </span>
                                                    <span className="dark:text-zinc-300 text-green-600">{item.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-start gap-2 text-xs text-zinc-400">
                                            <MapPin className="w-4 h-4 dark:text-zinc-500  text-blue-400 flex-shrink-0" />
                                            <p>{orderData.shippingAddress}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Separator className="" />

                            {/* Delivery Persons */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium dark:text-zinc-300 flex items-center">
                                    <Truck className="w-4 h-4 mr-2 text-purple-500" />
                                    Available Delivery Persons
                                </h3>
                                <div className="space-y-3">
                                    {deliveryPersons.map((person) => (
                                        <Card
                                            key={person.id}
                                            className={`dark:bg-muted-foreground/5 border-none bg-gray-50 ${selectedDeliveryPerson === person.id
                                                    ? "border-green-800"
                                                    : "border-zinc-800 hover:border-zinc-700"
                                                }`}
                                            onClick={() => setSelectedDeliveryPerson(person.id)}
                                        >
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="space-y-3">
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="text-sm font-medium dark:text-zinc-300 text-gray-500">{person.name}</h4>
                                                                <Badge variant="secondary" className="dark:bg-green-900/30 bg-green-900/300 text-green-400 text-xs rounded-full">
                                                                    {person.status}
                                                                </Badge>
                                                            </div>
                                                            <div className="flex items-center gap-3 text-xs text-zinc-500">
                                                                <span className="flex items-center gap-1">
                                                                    <Phone className="w-3 h-3 text-blue-500 dark:text-zinc-300" />
                                                                    {person.phone}
                                                                </span>
                                                                <span className="flex items-center gap-1">
                                                                    <MapPin className="w-3 h-3 text-blue-500 dark:text-zinc-300" />
                                                                    {person.area}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-3 text-xs">
                                                            <span className="text-zinc-400">Rating: <span className="text-zinc-500">{person.rating}⭐</span></span>
                                                            <span className="text-zinc-400">Deliveries: <span className="text-zinc-500">{person.deliveries}</span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                   


                    <div className="pt-4 mt-auto">
                        <Separator className=" -mx-6 mb-4" />
                        <SheetFooter className="sm:justify-end">
                            <div className="flex justify-between w-full">
                                <SheetClose asChild>
                                    <Button
                                        variant="outline"
                                        className="border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-200"
                                    >
                                        Cancel
                                    </Button>
                                </SheetClose>
                                <Button
                                    onClick={handleAssign}
                                    className="bg-green-800 text-white hover:bg-green-700"
                                    disabled={!selectedDeliveryPerson}
                                >
                                    Assign Order
                                </Button>
                            </div>
                        </SheetFooter>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
} 