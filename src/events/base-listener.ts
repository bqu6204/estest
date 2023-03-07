import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

abstract class Listener<T extends Event> {
  // catagorising different events
  // 將不同的event分類
  abstract subject: T["subject"];

  // "queueGroupName" are instances group listening to the same channel,
  // this makes sure an event only send to one of the instance in the queue group at the same time
  // 將listening instance分類，一組同一時間只會有一個instance接收到event
  abstract queueGroupName: string;

  abstract onMessage(data: T["data"], msg: Message): void;
  protected client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    // Options setting functions needs to be chained after subscriptionOptions().
    // Such as subscriptionOptions().setDeliverAllAvailable().setDurableName()....
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true) // Ack short for acknowledge, acknowledge we received the event
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName); // As the system running for a period of time, there might be thousand of events, so we usually don't use this function
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string" // string or buffer
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}

export { Listener };
