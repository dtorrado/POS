import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

interface Params {
  params: { prodCode: string };
}

// GET /api/products/:prodCode
export async function GET(_req: NextRequest, { params }: Params) {
  const { data, error } = await supabaseAdmin
    .from('product')
    .select('*')
    .eq('prod_code', params.prodCode)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  }
  return NextResponse.json(data);
}

// PUT /api/products/:prodCode
export async function PUT(req: NextRequest, { params }: Params) {
  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from('product')
    .update({
      prod_name: body.prodName,
      prod_desc: body.prodDesc,
      company_id: body.companyId,
      item_type_id: body.itemTypeId,
      selling_margin: body.sellingMargin,
      available_qty: body.availableQty,
      threshold: body.threshold,
      allow_back_order: body.allowBackOrder,
      prod_link: body.prodLink,
      image_file_name: body.imageFileName,
      is_ship_required: body.isShipRequired,
      available: body.available,
      is_alert_on: body.isAlertOn,
      revision_date: new Date().toISOString(),
      updated_by: body.updatedBy ?? null,
    })
    .eq('prod_code', params.prodCode)
    .select()
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? 'Product not found.' }, { status: 404 });
  }
  return NextResponse.json(data);
}

// DELETE /api/products/:prodCode
export async function DELETE(_req: NextRequest, { params }: Params) {
  const { error } = await supabaseAdmin
    .from('product')
    .delete()
    .eq('prod_code', params.prodCode);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 409 });
  }
  return new NextResponse(null, { status: 204 });
}
