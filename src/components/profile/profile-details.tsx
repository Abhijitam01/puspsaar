'use client'

import { User, MapPin, Lock, Edit, SaveAll } from 'lucide-react'
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
  const [activeTab, setActiveTab] = useState<'personal' | 'address' | 'security'>('personal')
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

  const tabs = [
    { id: 'personal' as const, label: 'Personal Info', icon: User },
    { id: 'address' as const, label: 'Address', icon: MapPin },
    { id: 'security' as const, label: 'Security', icon: Lock },
  ]

  return (
    <div className="border border-[#E0E0E0] bg-white">
      {/* Tab Navigation */}
      <div className="border-b border-[#E0E0E0] flex">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => { setActiveTab(id); setIsEditing(false) }}
            className={`flex items-center gap-2 px-6 py-4 text-xs font-semibold uppercase tracking-[0.1em] border-b-2 transition-colors ${
              activeTab === id
                ? 'border-[#1C1C1C] text-[#1C1C1C]'
                : 'border-transparent text-[#6B6B6B] hover:text-[#1C1C1C]'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      <div className="p-8">
        {/* Personal Info */}
        {activeTab === 'personal' && (
          <>
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
          </>
        )}

        {/* Address Info */}
        {activeTab === 'address' && (
          <>
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
          </>
        )}

        {/* Security */}
        {activeTab === 'security' && (
          <>
            <div className="mb-8">
              <h3 className="text-base font-bold text-[#1C1C1C] uppercase tracking-[0.05em]">Security Settings</h3>
              <p className="text-sm text-[#6B6B6B] mt-1">Manage your password and security preferences</p>
            </div>
            <div className="space-y-6">
              <TextField label="Current Password" type="password" placeholder="Enter your current password" />
              <TextField label="New Password" type="password" placeholder="Enter your new password" />
              <TextField label="Confirm New Password" type="password" placeholder="Confirm your new password" />
              <div className="pt-4">
                <button className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#1C1C1C] transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

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
  <div className="space-y-1.5">
    <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C]">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      className="w-full border border-[#E0E0E0] px-4 py-2.5 text-sm text-[#1C1C1C] placeholder:text-[#ABABAB] focus:outline-none focus:border-black transition-colors disabled:bg-[#F5F5F5] disabled:text-[#6B6B6B]"
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
      <h3 className="text-base font-bold text-[#1C1C1C] uppercase tracking-[0.05em]">{title}</h3>
      <p className="text-sm text-[#6B6B6B] mt-1">{description}</p>
    </div>
    {!isEditing ? (
      <button
        onClick={onEdit}
        className="border border-[#1C1C1C] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C] hover:bg-black hover:text-white transition-colors flex items-center gap-2"
      >
        <Edit className="h-3.5 w-3.5" /> Edit
      </button>
    ) : (
      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="bg-black text-white px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] hover:bg-[#1C1C1C] transition-colors flex items-center gap-2"
        >
          <SaveAll className="h-3.5 w-3.5" /> Save
        </button>
        <button
          onClick={onCancel}
          className="border border-[#E0E0E0] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1C1C1C] hover:border-black transition-colors"
        >
          Cancel
        </button>
      </div>
    )}
  </div>
)
