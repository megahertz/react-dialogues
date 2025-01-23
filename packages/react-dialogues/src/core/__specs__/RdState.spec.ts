import { describe, expect, it } from 'vitest';
import RdState from '../RdState';

describe(RdState.name, () => {
  describe(RdState.prototype.add.name, () => {
    it('should set actionMode based on button count', () => {
      const state = new RdState();

      expect(
        state.add({
          actionMode: 'full',
          component: () => null,
          controllerType: 'modal',
          props: { buttons: ['ok'] },
        }).actionMode,
      ).toBe('full');

      expect(
        state.add({
          component: () => null,
          controllerType: 'modal',
          props: { actionMode: 'full', buttons: ['ok'] },
        }).actionMode,
      ).toBe('full');

      expect(
        state.add({
          component: () => null,
          controllerType: 'modal',
          props: { buttons: ['ok'] },
        }).actionMode,
      ).toBe('okClose');

      expect(
        state.add({
          component: () => null,
          controllerType: 'modal',
          props: { buttons: ['ok', 'cancel'] },
        }).actionMode,
      ).toBe('okClose');

      expect(
        state.add({
          component: () => null,
          controllerType: 'modal',
          props: { buttons: ['yes', 'no', 'cancel'] },
        }).actionMode,
      ).toBe('simplified');
    });
  });
});
