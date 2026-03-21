'use client';
import { User2, UserCheck2, Banknote, HomeIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { EmployeeStatCard } from './employee-stars-card';

export function EmployeeStats() {
  // Static data for UI demonstration
  const DASHBOARD_STATS = [
    {
      title: 'Total Employee ',
      icon: User2,
      value: '12',
      change: {
        value: '0.00',
        trend: 'up' as const,
      },
      subtext: '+1 Pending',
      color: 'from-blue-500 to-blue-400'
    },
    {
      title: 'Active Employee',
      icon: UserCheck2,
      value: '10',
      change: {
        value: '0',
        trend: 'up' as const,
      },
      subtext: '83% of total',
      color: 'from-purple-500 to-purple-400'
    },
    {
      title: 'Department',
      icon: HomeIcon,
      value: '6',
      change: {
        value: '0 ',
        trend: 'up' as const,
      },
      subtext: 'Across 5 roles',
      color: 'from-emerald-500 to-emerald-400'
    },
    {
        title: 'Inactive',
        icon: Banknote,
        value: '1',
        change: {
            value: '0   ',
            trend: 'up' as const,
          },
          subtext: 'Need attention',
          color: 'from-orange-500 to-orange-400'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
     
      {false ? ( 
        Array(3).fill(0).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))
      ) : (
        /* Actual stats cards */
        DASHBOARD_STATS.map((stat, i) => (
          <EmployeeStatCard
            key={i}
            title={stat.title}
            icon={stat.icon}
            value={stat.value}
            change={stat.change}
            subtext={stat.subtext}
            color={
              // Map gradient color strings to allowed color names
              stat.color === 'from-purple-500 to-purple-400'
                ? 'purple'
                : stat.color === 'from-emerald-500 to-emerald-400'
                ? 'green'
                : 'default'
            }
          />
        ))
      )}
    </div>
  );
}