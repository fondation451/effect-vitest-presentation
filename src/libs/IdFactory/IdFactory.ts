import { Context, Effect } from "effect";

export interface IdFactory {
  make(): Effect.Effect<string>;
}

export const IdFactory = Context.GenericTag<IdFactory>("IdFactory");

export const mockIdFactory = (mocks: Partial<IdFactory> = {}): IdFactory => {
  return {
    make: () => Effect.succeed("MOCK_ID"),
    ...mocks,
  };
};
