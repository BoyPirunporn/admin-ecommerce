import { OrderStatus, PaymentMethod, PayStatus } from "@/enum";

interface BaseResponse {
    status: number;
}

interface ResponseMessage extends BaseResponse {
    message: string;
}

interface ResponseWithPayload<T> extends BaseResponse {
    payload: T;
}


interface ProductVariant {
    id: number;
    sku: string;
    price: number;
    stock: number;
    variantImage: VariantImage;
    productVariantOptions: ProductVariantOption[];

}

interface ProductVariantOption {
    id: number;
    productOptionValue: ProductOptionValue;
}
interface VariantImage {
    id: number;
    url: string | File;
}
interface VariantSelectOption {
    optionId: number;
    choiceValue: string;
}

interface VariantItem {
    value: string;
    stock: number;
}


interface OptionChoice {
    id: number;
    value: string;
    image?: string | null;
}
interface Option {
    id: number;
    name: string;
    choices: OptionChoice[];
}


interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    mainImage: string;
    productVariants: ProductVariant[];
}

interface Category {
    id: number;
    name: string;
}

interface ProductOption {
    id: number;
    name: string;
    productOptionValues: ProductOptionValue[];
}
interface ProductOptionValue {
    id: number;
    value: string;
}

interface Order {
    id: number;
    totalAmount: number;
    discount: number;
    orderData: Date;
    orderItems: OrderItem[];
    payment: Payment;
    status:OrderStatus;
    shippingAddress:ShippingAddress;
    createdAt: Date;
    updatedAt: Date;
    
}

interface OrderItem {
    id: number;
    productVariant: ProductVariant;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
    
}

interface ShippingAddress {
    recipientName:string;
    phoneNumber:string;
    addressLine1:string;
    addressLine2:string;
    city:string;
    state:string;
    postalCode:string;
    country:string;
}

interface Payment {
    id: number;
    paymentDate: Date | null;
    paymentMethod: PaymentMethod;
    payStatus: PayStatus;
}