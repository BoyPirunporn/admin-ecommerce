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

interface ResponseWithDataTable<T> extends BaseResponse {
    payload: T[];
    count: number;
    page: number;
    size: number;
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
    id: number | null;
    name: string;
    price: number;
    description: string | null;
    category: string;
    mainImage: string | File;
    productOptions: ProductOption[];
    createdAt: Date;
    updatedAt: Date;
}


interface Category {
    id: number;
    name: string;
    imageUrl: string | File;
    parent: Categorynumber;
    children: Category[];
}

interface ProductOption {
    id: number;
    name: string;
    enableImage: boolean;
    productOptionValues: ProductOptionValue[];
}
interface ProductOptionValue {
    id: number;
    value: string;
    image: string | File;
}

interface Order {
    id: number;
    totalAmount: number;
    discount: number;
    orderData: Date;
    orderItems: OrderItem[];
    payment: Payment;
    status: OrderStatus;
    shippingAddress: ShippingAddress;
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
    recipientName: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

interface Payment {
    id: number;
    paymentDate: Date | null;
    paymentMethod: PaymentMethod;
    payStatus: PayStatus;
}


interface Dashboard {
   monthlyRevenues: {
        date:Date;
        totalRevenue:number;
   }[];
   subscriptions:number;
   sales:number;
   totalRevenues:number;
}