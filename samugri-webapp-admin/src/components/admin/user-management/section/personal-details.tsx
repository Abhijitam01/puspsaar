'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Mail, Phone, Calendar, MapPinned, Building2, Home, Briefcase, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IUser } from '@/model/user';
import { IDeliveryAddress } from '@/model/order';

export function PersonalDetails({ user, deliveryAddresses }: { user: IUser, deliveryAddresses: IDeliveryAddress[] }) {
  // Get the default address or the first address if no default is set
  const defaultAddress = deliveryAddresses?.find(addr => addr.isDefault) || deliveryAddresses?.[0];

  const getAddressIcon = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'home':
        return <Home className="h-5 w-5 text-secondary" />;
      case 'work':
        return <Briefcase className="h-5 w-5 text-secondary" />;
      default:
        return <MapPin className="h-5 w-5 text-secondary" />;
    }
  };

  const getGenderDisplay = (gender?: string | null) => {
    switch (gender) {
      case 'MALE':
        return 'Male';
      case 'FEMALE':
        return 'Female';
      case 'OTHER':
        return 'Other';
      default:
        return 'Not specified';
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Profile Overview Card */}
      <Card className="lg:col-span-1 shadow-none border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6 text-center">
          <div className="relative">
            <Avatar className="h-32 w-32 ring-4 ring-secondary/20">
              <AvatarFallback className="text-4xl font-bold  text-secondary">
                {user.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2">
              <Badge variant="default" className="
                  rounded-full 
                  bg-purple-100 text-purple-700 
                  dark:bg-purple-900 dark:text-purple-200
                  rounded-full text-purple-600">
                {getGenderDisplay(user.gender)}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">{user.name || 'Unnamed User'}</h2>
            <p className="text-sm text-muted-foreground">Customer ID: {user.id}</p>
            <Badge
              className={`${user.status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-200 text-gray-700"
                }`}
            >
              {user.status}
            </Badge>
          </div>

          <Separator />

          <div className="w-full space-y-4">
            {user.email && (
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-100 dark:bg-muted-foreground/10">
                <Mail className="h-4 w-4 text-primary" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Email</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            )}

            {user.phone && (
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-100 dark:bg-muted-foreground/10">
                <Phone className="h-4 w-4 text-primary" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Phone</p>
                  <p className="text-sm text-muted-foreground">{user.phone}</p>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-100 dark:bg-muted-foreground/10">
              <Calendar className="h-4 w-4 text-primary" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Member Since</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Delivery Information Card */}
      <Card className="lg:col-span-2 shadow-none border">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-2">
            <MapPinned className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg font-semibold">Delivery Addresses</CardTitle>
            <Badge variant="secondary" className="ml-auto bg-green-100 text-green-800">
              {deliveryAddresses?.length || 0} Address{(deliveryAddresses?.length || 0) !== 1 ? 'es' : ''}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 ">
          {!deliveryAddresses || deliveryAddresses.length === 0 ? (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No Delivery Addresses</h3>
              <p className="text-sm text-muted-foreground">
                This user hasn&apos;t added any delivery addresses yet.
              </p>
            </div>
          ) : (
           <>
  {/* Primary Address */}
  {defaultAddress && (
    <div className="rounded-xl p-6 group hover:border-primary/40 transition-all duration-300 
                    bg-gray-100 dark:bg-muted-foreground/10">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            {getAddressIcon(defaultAddress.addressType)}
            <Badge variant="default" className="font-medium bg-secondary text-white">
              {defaultAddress.addressType || 'Other'}
            </Badge>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{defaultAddress.fullName}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">{defaultAddress.id}</p>
          </div>
        </div>
        <Badge variant="outline" className="text-xs bg-secondary text-white">
          Default Address
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
              {defaultAddress.address}
            </p>
            {defaultAddress.landmark && (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Near: {defaultAddress.landmark}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Building2 className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {defaultAddress.city}, {defaultAddress.state}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              PIN: {defaultAddress.pincode}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {defaultAddress.phoneNumber}
            </p>
            {defaultAddress.alternatePhoneNumber && (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Alt: {defaultAddress.alternatePhoneNumber}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )}

  {/* Additional Addresses */}
  {deliveryAddresses.length > 1 &&
    deliveryAddresses
      .filter(addr => !addr.isDefault)
      .map((address, index) => (
        <div
          key={address.id}
          className="rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 mb-3
                     bg-gray-100 dark:bg-muted-foreground/10"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                {getAddressIcon(address.addressType)}
                <Badge variant="secondary" className="font-medium bg-secondary text-white">
                  {address.addressType || 'Other'}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{address.fullName}</h3>
            </div>
            <Badge variant="outline" className="text-xs bg-secondary text-white">
              Address {index + 2}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
                  {address.address}
                </p>
                {address.landmark && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Near: {address.landmark}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Building2 className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {address.city}, {address.state}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  PIN: {address.pincode}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {address.phoneNumber}
                </p>
                {address.alternatePhoneNumber && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Alt: {address.alternatePhoneNumber}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
</>

          )}
        </CardContent>
      </Card>
    </div>
  )
} 