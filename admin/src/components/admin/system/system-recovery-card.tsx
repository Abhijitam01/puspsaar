import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { AlertTriangle } from 'lucide-react'

import React from 'react'

export default function SystemRecoveryCard() {
    return (
        <div className="p-0.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-700 dark:to-zinc-800   rounded-xl">
   
        <Card className='border-0 shadow-sm '>
            <CardHeader className='pb-2 py-2'>
                <CardTitle className='text-lg flex items-center gap-2'>System Recovery</CardTitle>
                <CardDescription>Restore from backup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-4">
                <div className="space-y-2">
                    <Label>Select Backup</Label>
                    <Select>
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Choose backup file" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="backup-2024-09-09">backup-2024-09-09.sql</SelectItem>
                            <SelectItem value="backup-2024-09-08">backup-2024-09-08.sql</SelectItem>
                            <SelectItem value="backup-2024-09-07">backup-2024-09-07.sql</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Recovery Notes</Label>
                    <Textarea
                        placeholder="Enter notes about this recovery..."
                        className="min-h-[80px]"
                    />
                </div>
                <div className="flex space-x-2">
                    <Button variant="destructive">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Restore Database
                    </Button>
                </div>
            </CardContent>
        </Card>
        </div>
    )
}