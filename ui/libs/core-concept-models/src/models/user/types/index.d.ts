import type { KosParentAware } from '@kosdev-code/kos-ui-sdk';

/** `kosParentId` comes from KosParentAware: a parent-aware model must be built with it. */
export interface UserOptions extends KosParentAware {
  name: string;
  role: 'admin' | 'member';
}
