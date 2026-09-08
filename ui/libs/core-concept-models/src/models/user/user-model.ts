/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type {
  IKosDataModel,
  IKosIdentifiable,
  PublicModelInterface,
  KosModelRegistrationType,
  KosCreationContext,
} from '@kosdev-code/kos-ui-sdk';
import {
  kosModel,
  kosParentAware,
  kosLoggerAware,
  KosLoggerAware,
} from '@kosdev-code/kos-ui-sdk';

import type { UserOptions } from './types';
import type { TeamModel } from '../team/team-model';

export const MODEL_TYPE = 'user-model';

export type UserModel = PublicModelInterface<UserModelImpl>;

// Interface merging for decorator type safety
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserModelImpl extends KosLoggerAware {}

// extract-code user-model
@kosModel({ modelTypeId: MODEL_TYPE, singleton: false })
// extract-code user-parent-aware
@kosParentAware()
// extract-code end user-parent-aware
@kosLoggerAware()
export class UserModelImpl implements IKosDataModel, IKosIdentifiable {
  // Registration property for type safety - actual value injected by @kosModel decorator
  static Registration: KosModelRegistrationType<UserModel, UserOptions>;

  id: string;
  name: string = '';
  role: string = 'member';
  // extract-code user-team
  private readonly kosContext: KosCreationContext['kosContext'];
  // logger property is automatically provided by @kosLoggerAware decorator

  constructor(
    modelId: string,
    options: UserOptions,
    context: KosCreationContext
  ) {
    this.id = modelId;
    this.kosContext = context.kosContext;
    // logger is automatically injected by @kosLoggerAware decorator

    if (options) {
      this.name = options.name;
      this.role = options.role;
    }
  }

  /** The owning team's id, from the key the team set on its context. */
  // extract-code user-team-id
  get teamId(): string {
    return this.kosContext.get('teamId') ?? '';
  }

  updateModel(options: UserOptions): void {
    this.name = options.name;
    this.role = options.role;
  }

  // extract-code user-team
  /** The owning team, reached through the parent context. */
  get team(): TeamModel | undefined {
    return this.kosContext.parentModel as TeamModel | undefined;
  }

  // -------------------LIFECYCLE----------------------------

  async init(): Promise<void> {
    this.logger.debug(`initializing user ${this.id}`);
  }

  async load(): Promise<void> {
    this.logger.debug(`loading user ${this.id}`);
  }
}

export const User = UserModelImpl.Registration;
