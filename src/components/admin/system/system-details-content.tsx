'use client'

import { useState } from 'react'
import { Mail, AlertTriangle, Database, FileSearch, Settings } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { DataTable } from '@/components/ui/data-table/data-table'
import type { ColumnDef } from '@tanstack/react-table'
import { Separator } from '@/components/ui/separator'
import SystemRecoveryCard from './system-recovery-card'
import DatabaseBackupCard from './database-backup-card'


/* ----------------- Props ----------------- */
interface AuditLog {
    id: string
    userId?: string
    userEmail?: string
    action: string
    entityType: string
    entityId?: string
    ipAddress?: string
    userAgent?: string
    createdAt: string
    details?: string
}

interface SystemSetting {
    id: string
    key: string
    value: any
    description?: string
    category: string
    type: 'string' | 'number' | 'boolean' | 'json'
}

interface EmailTemplate {
    id: string
    code: string
    name: string
    subject: string
    variables: string[]
    isActive: boolean
    lastModified: string
}

interface SystemTabsProps {
    auditLogs: AuditLog[]
    systemSettings: SystemSetting[]
    emailTemplates: EmailTemplate[]
    auditColumns: ColumnDef<AuditLog>[]
    templateColumns: ColumnDef<EmailTemplate>[]
}

const categoryColors: Record<string, string> = {
    general: "border-blue-500 text-blue-600",
    system: "border-green-500 text-green-600",
    notification: "border-yellow-500 text-yellow-600",
    commerce: "border-purple-500 text-purple-600",
    security: "border-red-500 text-red-600",
}
export default function SystemDetailsTabs({
    auditLogs,
    systemSettings,
    emailTemplates,
    auditColumns,
    templateColumns
}: SystemTabsProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [settingsCategory, setSettingsCategory] = useState('all')

    const categories = [...new Set(systemSettings.map(s => s.category))]
    const filteredSettings = systemSettings.filter(setting =>
        settingsCategory === 'all' || setting.category === settingsCategory
    )

    return (
        <Tabs defaultValue="settings" className="space-y-4">
            <Card className='border-none bg-muted-foreground/9 p-5 flex justify-between'>
                <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-transprent  rounded-lg ">
                    <TabsTrigger
                        value="settings"
                        className="flex items-center gap-2 rounded-full px-4 py-2 transition-all data-[state=active]:bg-secondary data-[state=active]:text-white hover:bg-accent hover:text-accent-foreground"
                    >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                    </TabsTrigger>

                    <TabsTrigger
                        value="audit"
                        className="flex items-center gap-2 rounded-full px-4 py-2 transition-all data-[state=active]:bg-secondary data-[state=active]:text-white hover:bg-accent hover:text-accent-foreground"
                    >
                        <FileSearch className="h-4 w-4" />
                        <span>Audit Logs</span>
                    </TabsTrigger>

                    <TabsTrigger
                        value="templates"
                        className="flex items-center gap-2 rounded-full px-4 py-2 transition-all data-[state=active]:bg-secondary data-[state=active]:text-white hover:bg-accent hover:text-accent-foreground"
                    >
                        <Mail className="h-4 w-4" />
                        <span>Email Templates</span>
                    </TabsTrigger>

                    <TabsTrigger
                        value="backup"
                        className="flex items-center gap-2 rounded-full px-4 py-2 transition-all data-[state=active]:bg-secondary  data-[state=active]:text-white hover:bg-accent hover:text-accent-foreground"
                    >
                        <Database className="h-4 w-4" />
                        <span>Backup & Recovery</span>
                    </TabsTrigger>
                </TabsList>

            </Card>


            {/* SETTINGS */}


            <TabsContent value="settings" className="space-y-4">
                <Card className='border p-5'>
                   
                        <CardHeader className='flex items-center justify-between pt-4 pb-2 px-6'>
                            <div>
                                <CardTitle className='mb-3'>Settings</CardTitle>
                                <CardDescription>Manage system configuration settings</CardDescription>
                            </div>
                            <Select value={settingsCategory} onValueChange={setSettingsCategory}>
                                <SelectTrigger className="max-w-sm">
                                    <SelectValue placeholder="Filter by category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories.map(category => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardHeader>

                    <div className="grid gap-4">
                        {filteredSettings.map(setting => (
                            <Card key={setting.id} className='dark:bg-muted-foreground/9 bg-white border border-secondary shadow-none  '>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg">{setting.key}</CardTitle>
                                            <CardDescription>{setting.description}</CardDescription>
                                        </div>
                                        <Badge variant="outline" className='text-orange-500'>{setting.category}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className='pb-2'>
                                    <div className="flex items-center space-x-4 ">
                                        {setting.type === 'boolean' && (
                                            <div className="flex items-center space-x-2">
                                                <Switch checked={setting.value} onCheckedChange={() => { }} />
                                                <Label>{setting.value ? 'Enabled' : 'Disabled'}</Label>
                                            </div>
                                        )}
                                        {setting.type === 'string' && (
                                            <Input value={setting.value} onChange={() => { }} className="max-w-sm rounded-md" />
                                        )}
                                        {setting.type === 'number' && (
                                            <Input
                                                type="number"
                                                value={setting.value}
                                                onChange={() => { }}
                                                className="max-w-sm rounded-md"
                                            />
                                        )}
                                        <Button variant="default" size="sm" className='bg-secondary text-white hover:bg-secondary-dark' >
                                            Save
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Card>
            </TabsContent>

            {/* AUDIT */}
            <TabsContent value="audit" className="space-y-4">
                {/* */}
                <div className="p-0.5 bg-gradient-to-r from-blue-50 to-indigo-50  dark:from-zinc-700 dark:to-zinc-800   rounded-xl">
                    <Card className='border-0 shadow-sm '>
                        <CardHeader className='pt-2'>
                            <CardTitle>Audit Logs</CardTitle>
                            <CardDescription>Track all system activities and user actions</CardDescription>
                        </CardHeader>
                        <div className='flex justify-start gap-3 mx-5'>
                            <Input
                                placeholder="Search audit logs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-[300px] rounded-md"
                            />
                            <Select>
                                <SelectTrigger className="max-w-sm w-[150px]">
                                    <SelectValue placeholder="Filter by action" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Actions</SelectItem>
                                    <SelectItem value="CREATE">Create</SelectItem>
                                    <SelectItem value="UPDATE">Update</SelectItem>
                                    <SelectItem value="DELETE">Delete</SelectItem>
                                    <SelectItem value="LOGIN">Login</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <CardContent className='pb-5'>

                            <DataTable columns={auditColumns} data={auditLogs} />
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

            {/* EMAIL TEMPLATES */}
            <TabsContent value="templates" className="space-y-4">
               
                <div className="p-0.5 bg-gradient-to-r from-blue-50 to-indigo-50  dark:from-zinc-700 dark:to-zinc-800  rounded-xl">
                    <Card className=' '>
                        <CardHeader className='pt-2 flex items-center justify-between'>
                            <div>
                            <CardTitle className='mb-2'>Email Templates</CardTitle>
                            <CardDescription>
                                Manage email templates for automated communications
                            </CardDescription>
                            </div>
                             <div className="flex items-center justify-end gap-6">
                    <Input placeholder="Search templates..." className="max-w-sm w-[300px] rounded-lg py-2" />
                    <Button className='bg-secondary text-white hover:bg-secondary-dark'>
                        <Mail className="h-4 w-4 mr-2" />
                        Create Template
                    </Button>
                </div>

                        </CardHeader>
                        <CardContent className='pb-5'>
                            <DataTable columns={templateColumns} data={emailTemplates} />
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

            {/* BACKUP & RECOVERY */}
            <TabsContent value="backup" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <DatabaseBackupCard />

                    <SystemRecoveryCard />
                </div>
            </TabsContent>
        </Tabs>
    )
}