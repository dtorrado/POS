import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

interface Params {
  params: { prodCode: string };
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { data: product, error: productError } = await supabaseAdmin
    .from('product')
    .select('prod_code, prod_name, available_qty')
    .eq('prod_code', params.prodCode)
    .single();

  if (productError || !product) {
    return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  }

  const { data: priceRow } = await supabaseAdmin
    .from('price_scheme')
    .select('full_price')
    .eq('prod_code', params.prodCode)
    .order('price_scheme_id', { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: feeRow } = await supabaseAdmin
    .from('service')
    .select('fee')
    .eq('prod_code', params.prodCode)
    .eq('service_type_id', 1) // TODO: confirm 1 = Shipping in your convention
    .order('service_id', { ascending: false })
    .limit(1)
    .maybeSingle();

  return NextResponse.json({
    prodCode: product.prod_code,
    prodName: product.prod_name,
    availableQty: product.available_qty,
    unitPrice: priceRow?.full_price ?? 0,
    shippingFee: feeRow?.fee ?? 0,
  });
}
