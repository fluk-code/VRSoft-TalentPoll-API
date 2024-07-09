export type Either<L, R> =
  | Left<L, R>
  | (Right<L, R> & {
      value: L | R;
    });

class Left<L, R> {
  constructor(public readonly value: L) {}

  isLeft(): this is Left<L, R> {
    return true;
  }

  isRight(): this is Right<L, R> {
    return false;
  }
}

class Right<L, R> {
  constructor(public readonly value: R) {}

  isLeft(): this is Left<L, R> {
    return false;
  }

  isRight(): this is Right<L, R> {
    return true;
  }
}

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left<L, R>(value);
};

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right<L, R>(value);
};
