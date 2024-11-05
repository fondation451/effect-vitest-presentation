import { Effect } from "effect";
import { UserRepository } from "../repository/user/UserRepository";
import { PasswordValidator } from "../libs/PasswordValidator/PasswordValidator";
import { IdFactory } from "../libs/IdFactory/IdFactory";

export const signup = (params: { email: string; password: string; firstName: string; lastName: string }) =>
  Effect.gen(function* () {
    const userRepository = yield* UserRepository;
    const passwordValidator = yield* PasswordValidator;
    const idFactory = yield* IdFactory;

    yield* passwordValidator.assertValid(params.password);
    const user = yield* userRepository.insert({
      id: yield* idFactory.make(),
      createdAt: new Date().toISOString(),
      email: params.email,
      password: params.password,
      firstName: params.firstName,
      lastName: params.lastName,
    });

    return user;
  });
