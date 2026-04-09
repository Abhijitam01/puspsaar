import { db } from '@/db';
import { orders as ordersTable } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default async function AdminOrdersPage() {
  // Fetch orders
  const orders = await db.query.orders.findMany({
    orderBy: [desc(ordersTable.createdAt)],
  });

  const formatDate = (dateStr: string | Date | null) => {
    if (!dateStr) return 'N/A';
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(new Date(dateStr));
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Customer Orders</h1>
          <p className="text-muted-foreground mt-1">Monitor purchases and fulfillment status.</p>
        </div>
      </div>

      <div className="rounded-xl border overflow-hidden bg-card">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer Info</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Payment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-xs">
                    {(order.id as string).split('-')[0].toUpperCase()}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{order.customerName || 'Guest'}</p>
                    <p className="text-xs text-muted-foreground">{order.customerEmail || 'N/A'}</p>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">₹{Number(order.totalAmount).toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={order.status === 'Completed' ? 'default' : 'outline'} className={order.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/20' : ''}>
                      {order.status || 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary" className="text-xs font-mono">
                      CASH_ON_DELIVERY
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No orders have been placed yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
