import { Context, Effect } from "effect";
import { User } from "./User";

export class RepositoryError extends Error {
  readonly _tag = "RepositoryError";
}

export interface UserRepository {
  insert: (data: User) => Effect.Effect<User, RepositoryError>;

  findByEmail(email: string): Effect.Effect<User, RepositoryError>;
}

export const UserRepository = Context.GenericTag<UserRepository>("UserRepository");
