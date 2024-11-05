import { Effect, Layer } from "effect";
import { InvalidPasswordError, PasswordValidator } from "./PasswordValidator";

export class SimplePasswordValidator implements PasswordValidator {
  static Live = Layer.succeed(PasswordValidator, new SimplePasswordValidator());

  assertValid = (password: string) => {
    if (password.length < 8) {
      return Effect.fail(new InvalidPasswordError("Password is too short"));
    }

    return Effect.void;
  };
}
