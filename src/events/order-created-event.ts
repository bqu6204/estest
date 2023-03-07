import { Subjects } from "./subjects";
import { OrderStatus } from "./types/order-status";

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    version: number;
    status: OrderStatus;
    userId: string;
    expiresAt: string; // data would be send as JSON, so even though originally it's a Date(), in here still needs to consider as a string
    ticket: {
      id: string;
      price: number;
    };
  };
}
