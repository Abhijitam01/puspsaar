'use client';
import { User, UserCheck, UserX, UserCog, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { StatCard } from './user-stars-card';


export function UserStats() {
  // Static data for user statistics
  const USER_STATS = [
    {
      title: 'Total Users',
      icon: Users,
      value: '1,254',
      subtext: 'From last week',
      color: 'blue'
    },
    {
      title: 'Active Users',
      icon: UserCheck,
      value: '984',
      subtext: '78% of total users',
      color: 'green'
    },
    {
      title: 'Inactive Users',
      icon: User,
      value: '187',
      subtext: 'Not logged in recently',
      color: 'orange'
    },
    {
      title: 'Suspended Users',
      icon: UserX,
      value: '83',
      subtext: 'Requires review',
      color: 'red'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {false ? ( 
        // Loading state
        Array(4).fill(0).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))
      ) : (
        // Actual stats cards
        USER_STATS.map((stat, i) => (
          <StatCard
            key={i}
            title={stat.title}
            icon={stat.icon}
            value={stat.value}
            subtext={stat.subtext}
            color={stat.color as any}
          />
        ))
      )}
    </div>
  );
}