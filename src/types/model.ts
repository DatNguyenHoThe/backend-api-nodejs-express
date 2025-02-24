import { Decimal128, Int32 } from "mongoose";

export interface ICategoryCreate {
    category_name: string;
    description: string;
}

export interface IBrandCreate {
    brand_name: string;
    description: string;
}

export interface ICustomerCreate {
    first_name: String,
    last_name: String,
    phone: String,
    email: String,
    birthday: Date,
    street: String,
    city: String,
    state: String,
    zip_code: number
}

export interface IStaffCreate {
    first_name: String,
    last_name: String,
    phone: String,
    email: String,
    active: 0 | 1,
    store_id: Int32,
    manage_id: Int32
}

export interface IProductCreate {
    product_name: String,
    price: Decimal128,
    discount: Decimal128,
    category_id: Int32,
    brand_id: Int32,
    description: String,
    model_year: Int32,
    slug: String,
    thumbnail: String,
    stock: Int32
}

export interface IOderCreate {
    customer_id: Int32,
    order_status: Int32,
    order_date: String,
    require_date: Date,
    shipping_date: Date,
    staff_id: Int32,
    order_note: String,
    street: String,
    city: String,
    state: String,
    payment_type: Int32
}