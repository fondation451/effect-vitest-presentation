import { Effect, Layer } from "effect";
import { IdFactory } from "./IdFactory";

export class IncrementalIdFactory implements IdFactory {
  static Live = Layer.succeed(IdFactory, new IncrementalIdFactory());

  constructor(private counter = 0) {}

  make = () => Effect.succeed(String(this.counter++));
}
