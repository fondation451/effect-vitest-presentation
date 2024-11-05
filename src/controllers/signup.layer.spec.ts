import { Effect, Exit, Layer, pipe } from "effect";
import { expect } from "vitest";
import { layer } from "@effect/vitest";
import { signup } from "./signup";
import { UserRepository } from "../repository/user/UserRepository";
import { InMemoryUserRepository } from "../repository/user/InMemoryUserRepository";
import {
  InvalidPasswordError,
  mockPasswordValidator,
  PasswordValidator,
} from "../libs/PasswordValidator/PasswordValidator";
import { IdFactory, mockIdFactory } from "../libs/IdFactory/IdFactory";

layer(
  Layer.mergeAll(
    Layer.succeed(UserRepository, new InMemoryUserRepository()),
    Layer.succeed(PasswordValidator, mockPasswordValidator()),
    Layer.succeed(IdFactory, mockIdFactory()),
  ),
)("signup", (it) => {
  it.effect(`should create a new user if the password is valid`, () =>
    Effect.gen(function* () {
      const email = "EMAIL";
      const password = "PASSWORD_LONGER_THAN_8";
      const firstName = "FIRST_NAME";
      const lastName = "LAST_NAME";

      const user = yield* signup({ email, password, firstName, lastName });

      expect(user).toMatchObject({ email, password, firstName, lastName });
    }),
  );

  it.effect(`should fail the password is not valid`, () =>
    Effect.gen(function* () {
      const email = "EMAIL";
      const password = "PASSWORD_LONGER_THAN_8";
      const firstName = "FIRST_NAME";
      const lastName = "LAST_NAME";
      const passwordValidator = mockPasswordValidator({
        assertValid: () => Effect.fail(new InvalidPasswordError("Invalid password")),
      });

      const result = yield* pipe(
        signup({ email, password, firstName, lastName }),
        Effect.provideService(PasswordValidator, passwordValidator),
        Effect.exit,
      );

      expect(result).toStrictEqual(Exit.fail(expect.any(InvalidPasswordError)));
    }),
  );
});
