'use client'

import { User, MapPin, Lock, Edit, SaveAll } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState } from 'react'

export interface IUserProfile {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
}

interface ProfileDetailsProps {
  userProfile: IUserProfile
}

export default function ProfileDetails({ userProfile }: ProfileDetailsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<IUserProfile>(userProfile)
  const [editedProfile, setEditedProfile] = useState<IUserProfile>(userProfile)

  const handleEdit = () => {
    setEditedProfile(profile)
    setIsEditing(true)
  }

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof IUserProfile, value: string) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="lg:col-span-8 xl:col-span-9">
      <Card className="border border-border bg-card shadow-none">
        <Tabs defaultValue="personal" className="w-full">
          {/* Tab Navigation */}
          <div className="border-b border-border px-6">
            <TabsList className="h-14 bg-transparent p-0 border-0">
              <TabsTrigger value="personal" className="relative h-14 rounded-none border-0 bg-transparent px-6 pb-3 pt-3 font-medium text-muted-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary">
                <User className="h-4 w-4 mr-2" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="address" className="relative h-14 rounded-none border-0 bg-transparent px-6 pb-3 pt-3 font-medium text-muted-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary">
                <MapPin className="h-4 w-4 mr-2" />
                Address
              </TabsTrigger>
              <TabsTrigger value="security" className="relative h-14 rounded-none border-0 bg-transparent px-6 pb-3 pt-3 font-medium text-muted-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary">
                <Lock className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Personal Info */}
          <TabsContent value="personal" className="p-8 m-0">
            <SectionHeader
              title="Personal Information"
              description="Update your personal details and information"
              isEditing={isEditing}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
            />

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField
                  label="Full Name"
                  value={isEditing ? editedProfile.name : profile.name}
                  disabled={!isEditing}
                  onChange={v => handleInputChange('name', v)}
                />
                <TextField
                  label="Email Address"
                  value={isEditing ? editedProfile.email : profile.email}
                  disabled={!isEditing}
                  onChange={v => handleInputChange('email', v)}
                  type="email"
                />
              </div>
              <TextField
                label="Phone Number"
                value={isEditing ? editedProfile.phone : profile.phone}
                disabled={!isEditing}
                onChange={v => handleInputChange('phone', v)}
              />
            </div>
          </TabsContent>

          {/* Address Info */}
          <TabsContent value="address" className="p-8 m-0">
            <SectionHeader
              title="Address Information"
              description="Manage your delivery and billing addresses"
              isEditing={isEditing}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
            />

            <div className="space-y-6">
              <TextField
                label="Street Address"
                value={isEditing ? editedProfile.address : profile.address}
                disabled={!isEditing}
                onChange={v => handleInputChange('address', v)}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TextField
                  label="City"
                  value={isEditing ? editedProfile.city : profile.city}
                  disabled={!isEditing}
                  onChange={v => handleInputChange('city', v)}
                />
                <TextField
                  label="State"
                  value={isEditing ? editedProfile.state : profile.state}
                  disabled={!isEditing}
                  onChange={v => handleInputChange('state', v)}
                />
                <TextField
                  label="Pincode"
                  value={isEditing ? editedProfile.pincode : profile.pincode}
                  disabled={!isEditing}
                  onChange={v => handleInputChange('pincode', v)}
                />
              </div>
            </div>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="p-8 m-0">
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
              <p className="text-sm text-muted-foreground mt-1">Manage your password and security preferences</p>
            </div>
            <div className="space-y-6">
              <TextField label="Current Password" type="password" placeholder="Enter your current password" />
              <TextField label="New Password" type="password" placeholder="Enter your new password" />
              <TextField label="Confirm New Password" type="password" placeholder="Confirm your new password" />
              <div className="pt-4">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Update Password
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

/* Helper Components for clean structure */
const TextField = ({
  label,
  value,
  onChange,
  disabled,
  type = 'text',
  placeholder,
}: {
  label: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  type?: string
  placeholder?: string
}) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium text-foreground">{label}</Label>
    <Input
      type={type}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      className="h-10 border-border bg-muted focus:border-primary focus:ring-primary text-foreground"
    />
  </div>
)

const SectionHeader = ({
  title,
  description,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}: {
  title: string
  description: string
  isEditing: boolean
  onEdit: () => void
  onSave: () => void
  onCancel: () => void
}) => (
  <div className="flex items-center justify-between mb-8">
    <div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
    {!isEditing ? (
      <Button onClick={onEdit} variant="outline" className="bg-primary hover:bg-primary/90 text-primary-foreground border-primary">
        <Edit className="h-4 w-4 mr-2" /> Edit
      </Button>
    ) : (
      <div className="flex gap-2">
        <Button onClick={onSave} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <SaveAll className="h-4 w-4 mr-2" /> Save
        </Button>
        <Button onClick={onCancel} variant="outline" className="border-border text-foreground hover:bg-accent">
          Cancel
        </Button>
      </div>
    )}
  </div>
)
