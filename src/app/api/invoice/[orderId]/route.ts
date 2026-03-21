import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
// jsPDF will be dynamically imported to avoid SSR issues
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: object) => jsPDF;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const supabase = await createClient();
    const { orderId } = await params;

    // Fetch order with items
    const { data: order, error } = await supabase
      .from('orders')
      .select(`*, order_items (*)`)
      .eq('id', orderId)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Generate PDF
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    // --- Header ---
    doc.setFillColor(15, 15, 15); // obsidian
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(198, 169, 105); // gold
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('PUSPSAAR', 15, 20);

    doc.setTextColor(245, 245, 245);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Premium Fragrances', 15, 28);
    doc.text('https://puspsaar.com', 15, 34);

    doc.setTextColor(198, 169, 105);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', 195, 20, { align: 'right' });

    // --- Order Meta ---
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');

    const metaY = 50;
    doc.setFont('helvetica', 'bold');
    doc.text('Order Details', 15, metaY);
    doc.setFont('helvetica', 'normal');
    doc.text(`Order ID: ${order.id}`, 15, metaY + 7);
    doc.text(`Date: ${new Date(order.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}`, 15, metaY + 14);
    doc.text(`Status: ${order.status.toUpperCase()}`, 15, metaY + 21);

    doc.setFont('helvetica', 'bold');
    doc.text('Shipping Details', 115, metaY);
    doc.setFont('helvetica', 'normal');
    doc.text(`${order.shipping_name}`, 115, metaY + 7);
    doc.text(`Phone: ${order.shipping_phone}`, 115, metaY + 14);
    const addressLines = doc.splitTextToSize(order.shipping_address || '', 80);
    doc.text(addressLines, 115, metaY + 21);

    // --- Divider ---
    doc.setDrawColor(198, 169, 105);
    doc.setLineWidth(0.5);
    doc.line(15, metaY + 35, 195, metaY + 35);

    // --- Items table ---
    const tableHead = [['#', 'Product', 'Volume', 'Qty', 'Unit Price', 'Total']];
    const tableBody = (order.order_items || []).map((item: {
      product_name: string;
      volume: string;
      quantity: number;
      price: number;
    }, idx: number) => [
      idx + 1,
      item.product_name,
      item.volume || '—',
      item.quantity,
      `₹${Number(item.price).toLocaleString('en-IN')}`,
      `₹${(Number(item.price) * item.quantity).toLocaleString('en-IN')}`,
    ]);

    doc.autoTable({
      head: tableHead,
      body: tableBody,
      startY: metaY + 40,
      theme: 'grid',
      headStyles: {
        fillColor: [15, 15, 15],
        textColor: [198, 169, 105],
        fontStyle: 'bold',
        fontSize: 9,
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [50, 50, 50],
      },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 70 },
        2: { cellWidth: 25 },
        3: { cellWidth: 15 },
        4: { cellWidth: 30 },
        5: { cellWidth: 30 },
      },
      margin: { left: 15, right: 15 },
    });

    // --- Totals ---
    const finalY = (doc as any).lastAutoTable.finalY + 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 15, 15);
    doc.text('Total Amount:', 140, finalY);
    doc.setTextColor(198, 169, 105);
    doc.text(`₹${Number(order.total_amount).toLocaleString('en-IN')}`, 195, finalY, { align: 'right' });

    // Delivery note
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('✓ Free delivery included', 15, finalY);

    // --- Footer ---
    const pageHeight = doc.internal.pageSize.height;
    doc.setFillColor(15, 15, 15);
    doc.rect(0, pageHeight - 20, 210, 20, 'F');
    doc.setTextColor(198, 169, 105);
    doc.setFontSize(8);
    doc.text('Thank you for shopping with Puspsaar | All fragrances are 100% authentic', 105, pageHeight - 8, { align: 'center' });

    const pdfBuffer = doc.output('arraybuffer');

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="puspsaar-invoice-${orderId.slice(0, 8)}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Failed to generate invoice' }, { status: 500 });
  }
}
