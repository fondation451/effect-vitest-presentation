import { Effect, HashMap, Layer, Option, pipe } from "effect";
import { User } from "./User";
import { RepositoryError, UserRepository } from "./UserRepository";

export class InMemoryUserRepository implements UserRepository {
  static Live = Layer.succeed(UserRepository, new InMemoryUserRepository());

  protected db = HashMap.empty<string, User>();

  insert = (data: User): Effect.Effect<User, RepositoryError, never> => {
    this.db = HashMap.set(data.id, data)(this.db);
    return Effect.succeed(data);
  };

  findByEmail = (email: string) =>
    pipe(
      this.db,
      HashMap.findFirst((data) => data.email === email),
      Option.match({
        onNone: () => Effect.fail(new RepositoryError("Not found")),
        onSome: ([, data]) => Effect.succeed(data),
      }),
    );
}
