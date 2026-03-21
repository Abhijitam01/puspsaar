import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, Package, ShoppingBag, AlertTriangle, Users, TrendingUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // 1. Fetch Orders for Revenue, Count, and Recent Sales
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('id, total_amount, status, customer_name, customer_email, created_at')
    .order('created_at', { ascending: false });

  const totalOrders = orders?.length || 0;
  const totalRevenue = orders?.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0) || 0;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  // Unique customers based on email
  const uniqueEmails = new Set(orders?.map(o => o.customer_email).filter(Boolean));
  const totalCustomers = uniqueEmails.size;

  const recentOrders = orders?.slice(0, 5) || [];

  // 2. Fetch Products for Total Count & Low Stock
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, stock_quantity');

  const totalProducts = products?.length || 0;
  const lowStockCount = products?.filter(p => p.stock_quantity < 10).length || 0;

  return (
    <div className="p-8 space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold font-serif text-foreground" style={{ fontFamily: 'Georgia, serif' }}>Dashboard</h1>
          <p className="text-muted-foreground mt-2">Administrative overview of Puspsaar's performance.</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Last Updated</p>
          <p className="text-sm font-medium">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Revenue */}
        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-[#C6A969]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-emerald-500 font-medium mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12.5% vs last month
            </p>
          </CardContent>
        </Card>

        {/* Orders */}
        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-[#C6A969]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">Completed purchases</p>
          </CardContent>
        </Card>

        {/* Customers */}
        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Customers</CardTitle>
            <Users className="h-4 w-4 text-[#C6A969]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground mt-1">Unique guest checkouts</p>
          </CardContent>
        </Card>

        {/* AOV */}
        <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#C6A969]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{Math.round(avgOrderValue).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Average per transaction</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Sales Table */}
        <Card className="lg:col-span-4 border-none shadow-sm bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-serif" style={{ fontFamily: 'Georgia, serif' }}>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="pl-6 text-[10px] uppercase tracking-wider font-bold">Customer</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-wider font-bold">Status</TableHead>
                  <TableHead className="text-right pr-6 text-[10px] uppercase tracking-wider font-bold">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="pl-6">
                        <div className="font-medium">{order.customer_name}</div>
                        <div className="text-xs text-muted-foreground">{order.customer_email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[10px] font-bold ${
                          order.status === 'completed' ? 'border-emerald-500/50 text-emerald-500' : 
                          order.status === 'pending' ? 'border-amber-500/50 text-amber-500' : 'text-muted-foreground'
                        }`}>
                          {order.status?.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6 font-semibold">
                        ₹{order.total_amount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-12 text-muted-foreground italic">
                      No recent sales recorded yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="p-4 bg-muted/20 border-t flex justify-center">
              <Link href="/admin/order" className="text-xs text-[#C6A969] hover:text-[#C6A969]/80 font-bold uppercase tracking-widest">
                View All Orders
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Secondary Metrics / Quick Stats */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-serif" style={{ fontFamily: 'Georgia, serif' }}>Inventory Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#C6A969]/10">
                    <Package className="h-4 w-4 text-[#C6A969]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Fragrances</p>
                    <p className="text-xs text-muted-foreground">Unique SKU count</p>
                  </div>
                </div>
                <div className="text-xl font-bold">{totalProducts}</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${lowStockCount > 0 ? 'bg-amber-500/10' : 'bg-emerald-500/10'}`}>
                    <AlertTriangle className={`h-4 w-4 ${lowStockCount > 0 ? 'text-amber-500' : 'text-emerald-500'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Low Stock Items</p>
                    <p className="text-xs text-muted-foreground">Action required</p>
                  </div>
                </div>
                <div className={`text-xl font-bold ${lowStockCount > 0 ? 'text-amber-500' : 'text-emerald-500'}`}>{lowStockCount}</div>
              </div>

              <div className="pt-4 flex justify-end">
                <Link href="/admin/inventory">
                  <Button variant="outline" size="sm" className="text-xs border-muted-foreground/20">
                    Manage Inventory
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
