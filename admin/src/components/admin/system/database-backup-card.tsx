'use client'
import React from "react"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function DatabaseBackupCard() {
    return (
          <div className="p-0.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-700 dark:to-zinc-800  rounded-xl">
          
               <Card className='border-0 shadow-sm '>
                <CardHeader className="pb-2 py-3">
                    <CardTitle>Database Backup</CardTitle>
                    <CardDescription>Backup and restore database</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 pb-9">
                    <div className="space-y-4">
                        <Label>Backup Frequency</Label>
                        <Select defaultValue="daily">
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hourly">Hourly</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Retention Period</Label>
                        <Select defaultValue="30">
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7">7 days</SelectItem>
                                <SelectItem value="30">30 days</SelectItem>
                                <SelectItem value="90">90 days</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex space-x-2">
                        <Button className="bg-secondary text-white hover:bg-secondary-dark">Create Backup</Button>
                        <Button variant="outline">Download Latest</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}