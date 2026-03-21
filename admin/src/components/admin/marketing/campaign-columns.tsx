'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { EmailCampaign } from '@/app/admin/marketing/page'


export const campaignColumns: ColumnDef<EmailCampaign>[] = [
  {
    accessorKey: 'name',
    header: 'Campaign',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue('name')}</div>
        <div className="text-sm text-muted-foreground">{row.original.subject}</div>
      </div>
    )
  },
  {
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const status = row.getValue<string>('status')

    // Map status to background and text color
    const statusColors: Record<string, string> = {
      SENT: 'bg-green-100 text-green-800',
      SENDING: 'bg-blue-100 text-blue-800',
      SCHEDULED: 'bg-yellow-100 text-yellow-800',
      FAILED: 'bg-red-100 text-red-800'
    }

    const bgClass = statusColors[status] || 'bg-gray-100 text-gray-800'

    return (
      <Badge className={`text-xs font-medium px-2 py-1 rounded-full ${bgClass}`}>
        {status}
      </Badge>
    )
  }
},

  {
    accessorKey: 'recipientCount',
    header: 'Recipients',
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue<number>('recipientCount').toLocaleString()}
      </div>
    )
  },
  {
    accessorKey: 'openRate',
    header: 'Open Rate',
    cell: ({ row }) => (
      <div className="text-center">
        <div className="font-medium">{row.getValue('openRate')}%</div>
        <div className="text-xs text-muted-foreground">
          {row.original.sentCount > 0 ? 'of sent' : 'pending'}
        </div>
      </div>
    )
  },
  {
    accessorKey: 'clickRate',
    header: 'Click Rate',
    cell: ({ row }) => (
      <div className="text-center">
        <div className="font-medium">{row.getValue('clickRate')}%</div>
        <div className="text-xs text-muted-foreground">
          {row.original.sentCount > 0 ? 'of opened' : 'pending'}
        </div>
      </div>
    )
  },
  {
    accessorKey: 'sentAt',
    header: 'Sent/Scheduled',
    cell: ({ row }) => {
      const sentAt = row.original.sentAt
      const scheduledAt = row.original.scheduledAt
      const date = sentAt || scheduledAt

      return date ? (
        <div className="text-sm">{new Date(date).toLocaleDateString()}</div>
      ) : (
        <span className="text-muted-foreground">-</span>
      )
    }
  }
]