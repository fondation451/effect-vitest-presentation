import { Context, Effect } from "effect";

export class InvalidPasswordError extends Error {
  readonly _tag = "InvalidPasswordError";
}

export interface PasswordValidator {
  assertValid(password: string): Effect.Effect<void, InvalidPasswordError>;
}

export const PasswordValidator = Context.GenericTag<PasswordValidator>("PasswordValidator");

export const mockPasswordValidator = (mocks: Partial<PasswordValidator> = {}): PasswordValidator => {
  return {
    assertValid: () => Effect.void,
    ...mocks,
  };
};
