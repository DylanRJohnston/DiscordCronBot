import * as t from "io-ts";
import { pipe } from "fp-ts/lib/pipeable";
import { fold } from "fp-ts/lib/Either";
import { identity } from "fp-ts/lib/function";
import { failure } from "io-ts/lib/PathReporter";

export const onSuccess = identity;
export const onFailure = (errors: t.Errors) => {
  throw new Error(failure(errors).join("\n"));
};

export const validate = <T>(type: t.Decoder<unknown, T>) => (
  data: unknown
): T =>
  pipe(
    data,
    type.decode,
    fold(onFailure, onSuccess)
  );
