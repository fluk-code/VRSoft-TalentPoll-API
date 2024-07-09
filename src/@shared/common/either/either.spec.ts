import { left, right } from './either';

describe('Either', () => {
  describe('Right', () => {
    const either = right<Error, number>(1);
    it('deve ser Right', () => {
      expect(either.isRight()).toBeTruthy();
    });

    it('não deve ser Left', () => {
      expect(either.isLeft()).toBeFalsy();
    });
  });

  describe('Left', () => {
    const either = left<Error, number>(new Error());
    it('deve ser Left', () => {
      expect(either.isLeft()).toBeTruthy();
    });

    it('não deve ser Right', () => {
      expect(either.isRight()).toBeFalsy();
    });
  });
});
