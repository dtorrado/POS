import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

interface CheckoutItem {
  prodCode: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const items: CheckoutItem[] = body.items ?? [];

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ errors: ['Cart is empty.'] }, { status: 409 });
  }

  // All validation, stock decrement, and the sale/sale_detail inserts happen
  // inside this one Postgres function call — a single real transaction.
  // If anything fails partway (bad code, insufficient stock), Postgres rolls
  // the whole thing back automatically. No compensating updates needed.
  const { data, error } = await supabaseAdmin.rpc('checkout', {
    p_items: items.map((i) => ({ prod_code: i.prodCode, quantity: i.quantity })),
    p_customer_id: body.customerId ?? null,
    p_payment_method: body.paymentMethod ?? null,
    p_cashier_user: body.cashierUser ?? null,
  });

  if (error) {
    return NextResponse.json({ errors: [error.message] }, { status: 409 });
  }

  return NextResponse.json(data, { status: 200 });
}
