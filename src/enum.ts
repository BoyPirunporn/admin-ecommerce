
export enum PaymentMethod {
    CREDIT_CARD = "CREDIT_CARD",
    BANK_TRANSFER = "BANK_TRANSFER",
    CASH = "CASH"
}
export enum PaymentStatus {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    PAILED = "PAILED",
    REFUNDED = "REFUNDED"
}
export enum OrderStatus {
    PENDING_PAYMENT = "PENDING_PAYMENT",
    PAID = "PAID",
    PROCESSING = "PROCESSING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}