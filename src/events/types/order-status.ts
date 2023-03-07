export enum OrderStatus {
  // When the order has been created, but the
  // ticket it is trying to order has not been reserved
  // 訂單成立， 但那張票本身的狀態尚未被設定為保留狀態
  // （ 其他使用者無法購買保留狀態下的票券 ）
  Created = "created",

  // 1. The ticket the order is trying to reserve has already been reserved,
  // 2. When the user has cancelled the order.
  // 3. The order expires before payment
  Cancelled = "cancelled",

  // The order has successfully reserved the ticket
  AwaitingPayment = "awaiting:payment",

  // The order has reserved the ticket and the user has
  // provided payment successfully
  Complete = "complete",
}
