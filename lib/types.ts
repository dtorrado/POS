export interface Product {
  prod_code: string;
  prod_name: string;
  prod_desc: string | null;
  company_id: number | null;
  item_type_id: number | null;
  selling_margin: number | null;
  consumed_qty: number;
  available_qty: number;
  threshold: number | null;
  allow_back_order: boolean;
  prod_link: string | null;
  image_file_name: string | null;
  is_ship_required: boolean;
  creation_date: string;
  revision_date: string | null;
  updated_by: string | null;
  available: boolean | null;
  is_alert_on: boolean | null;
}

export interface PriceScheme {
  price_scheme_id: number;
  prod_code: string;
  full_price: number | null;
  partial_price: number | null;
  currency: string | null;
  start_date: string | null;
  end_date: string | null;
}

export interface PriceRestriction {
  price_scheme_id: number;
  country_code: string;
  is_active: boolean;
}

export interface Service {
  service_id: number;
  service_type_id: number;
  price_scheme_id: number | null;
  prod_code: string;
  country_code: string | null;
  start_date: string | null;
  end_date: string | null;
  currency: string | null;
  fee: number | null;
  percentage: number | null;
  weight: number | null;
}

export interface ValidCountry {
  country_code: string;
  country_name: string | null;
  long_name: string | null;
  short_name: string | null;
  country_group: string | null;
  zip_code_flag: boolean | null;
  status_flag: boolean | null;
  nationality: string | null;
  ship_flag: boolean | null;
  iso_code: string | null;
  phone_country_code: string | null;
  op_flag: boolean | null;
  utc_flag: string | null;
  zone_flag: string | null;
  com_cheque_flag: boolean | null;
  currency: string | null;
  is_cc_allowed: boolean | null;
}

export interface ProdCategory {
  id: number;
  category_name: string | null;
  sort_order: number | null;
  img_filename: string | null;
  date_added: string | null;
  last_update: string | null;
  update_by: string | null;
}

export interface ProductCategory {
  category_type_id: number;
  category_id: number;
  level: number | null;
  parent_category_id: number | null;
  description: string | null;
  image_file_name: string | null;
  sort: number | null;
  creation_date: string;
  revision_date: string | null;
  updated_by: string | null;
}

export interface ProductCategoryDetail {
  category_type_id: number;
  category_id: number;
  prod_code: string;
  price_plan_id: number | null;
  country_code: string | null;
}

export interface ProdAttributesDesc {
  attribute_code: number;
  attribute_description: string | null;
}

export interface ProdAttributes {
  attribute_id: number;
  prod_code: string;
  attribute_code: number;
  numeric_value: number | null;
  text_value: string | null;
  remarks: string | null;
}

export interface Customer {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  phone_number: string | null;
  address: string | null;
  city: string | null;
  country_code: string | null;
  creation_date: string;
  revision_date: string | null;
  updated_by: string | null;
}

export interface Sale {
  sale_id: number;
  invoice_number: string;
  customer_id: number | null;
  sale_date: string;
  sub_total: number;
  shipping_fee_total: number;
  grand_total: number;
  payment_method: string | null;
  status: string;
  cashier_user: string | null;
  creation_date: string;
}

export interface SaleDetail {
  sale_detail_id: number;
  sale_id: number;
  prod_code: string;
  quantity: number;
  unit_price: number;
  shipping_fee: number;
  line_total: number;
}
