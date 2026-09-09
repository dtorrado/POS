import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/products — list all products
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('product')
    .select('*')
    .order('prod_name', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST /api/products — create a product
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.prodCode || !body.prodName) {
    return NextResponse.json(
      { error: 'prodCode and prodName are required.' },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from('product')
    .insert({
      prod_code: body.prodCode,
      prod_name: body.prodName,
      prod_desc: body.prodDesc ?? null,
      company_id: body.companyId ?? null,
      item_type_id: body.itemTypeId ?? null,
      selling_margin: body.sellingMargin ?? null,
      consumed_qty: body.consumedQty ?? 0,
      available_qty: body.availableQty ?? 0,
      threshold: body.threshold ?? null,
      allow_back_order: body.allowBackOrder ?? false,
      prod_link: body.prodLink ?? null,
      image_file_name: body.imageFileName ?? null,
      is_ship_required: body.isShipRequired ?? true,
      available: body.available ?? true,
      is_alert_on: body.isAlertOn ?? false,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 409 });
  }
  return NextResponse.json(data, { status: 201 });
}
