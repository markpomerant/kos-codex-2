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
  kosLoggerAware,
  KosLoggerAware,
  kosContainerAware,
  type KosContainerAware,
  kosChild,
} from '@kosdev-code/kos-ui-sdk';

import type { TeamOptions } from './types';
import { User, type UserModel } from '../user/user-model';

export const MODEL_TYPE = 'team-model';

export type TeamModel = PublicModelInterface<TeamModelImpl>;

// Interface merging for decorator type safety
// extract-code team-container-type
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TeamModelImpl
  extends KosLoggerAware,
    KosContainerAware<UserModel> {}

// extract-code team-model
@kosModel({ modelTypeId: MODEL_TYPE, singleton: false })
// extract-code team-container
// extract-code team-indexes
@kosContainerAware<UserModel>({
  // extract-code ignore start team-container
  containerOptions: {
    indexMap: {
      byRole: 'role',
      byInitial: (user) => user.name.charAt(0).toUpperCase(),
    },
    // extract-code ignore team-indexes
    // extract-code team-sort-key
    sortKey: 'name',
  },
  // extract-code ignore end team-container
})
// extract-code end team-container
// extract-code end team-indexes
@kosLoggerAware()
export class TeamModelImpl implements IKosDataModel, IKosIdentifiable {
  // Registration property for type safety - actual value injected by @kosModel decorator
  static Registration: KosModelRegistrationType<TeamModel, TeamOptions>;

  id: string;
  name: string = '';
  // extract-code team-lead
  @kosChild
  private lead!: UserModel;
  // logger property is automatically provided by @kosLoggerAware decorator

  // extract-code team-context-key
  constructor(
    modelId: string,
    options: TeamOptions,
    context: KosCreationContext
  ) {
    this.id = modelId;
    // extract-code ignore start team-context-key
    // logger is automatically injected by @kosLoggerAware decorator

    if (options) {
      this.name = options.name;
    }
    // extract-code ignore end team-context-key
    // Set once here; every model created under this team resolves it.
    context.kosContext.set('teamId', this.id);
  }

  updateModel(options: TeamOptions): void {
    this.name = options.name;
  }

  // -------------------LIFECYCLE----------------------------

  // extract-code team-init
  // extract-code team-enroll-child
  async init(): Promise<void> {
    // extract-code ignore team-enroll-child
    this.logger.debug(`initializing team ${this.id}`);
    // The lead is an OWNED child: created by the team, destroyed with it.
    this.lead = User.instance(`${this.id}:lead`)
      .options({ kosParentId: this.id, name: 'Lead', role: 'admin' })
      .build();
  }

  async load(): Promise<void> {
    this.logger.debug(`loading team ${this.id}`);
  }

  // -------------------MEMBERS------------------------------

  // extract-code team-add-member
  // extract-code team-enroll-child
  addMember(name: string, role: 'admin' | 'member' = 'member'): UserModel {
    const user = User.instance(`${this.id}:${name.toLowerCase()}`)
      .options({ kosParentId: this.id, name, role })
      .build();
    this.addModel(user);
    return user;
  }

  // extract-code team-remove-member
  async removeMember(id: string): Promise<void> {
    await this.removeAndDestroy(id);
  }

  // extract-code team-lead-name
  get leadName(): string {
    return this.lead?.name ?? '';
  }

  // extract-code team-index-by-role
  /** Every member with the given role: one index bucket lookup, reactive. */
  membersByRole(role: 'admin' | 'member'): UserModel[] {
    return this.container.getIndexByKey('byRole', role);
  }

  // extract-code team-index-keys
  /** The initials present in the container, from the function-based index. */
  get initials(): string[] {
    return this.container.getIndexKeys('byInitial');
  }
}

export const Team = TeamModelImpl.Registration;
