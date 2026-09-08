/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type {
  IKosDataModel,
  IKosIdentifiable,
  KosCreationContext,
  PublicModelInterface,
  KosModelRegistrationType,
} from '@kosdev-code/kos-ui-sdk';
import {
  kosModel,
  kosLoggerAware,
  KosLoggerAware,
  kosChild,
} from '@kosdev-code/kos-ui-sdk';

import type { SprintOptions } from './types';
import {
  TicketContainer,
  type TicketContainerModel,
} from '../ticket/ticket-container-model';
import type { TicketModel } from '../ticket/ticket-model';

export const MODEL_TYPE = 'sprint-model';

export type SprintModel = PublicModelInterface<SprintModelImpl>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SprintModelImpl extends KosLoggerAware {}

// extract-code sprint-model
@kosModel({ modelTypeId: MODEL_TYPE, singleton: false })
@kosLoggerAware()
export class SprintModelImpl implements IKosDataModel, IKosIdentifiable {
  static Registration: KosModelRegistrationType<SprintModel, SprintOptions>;

  id: string;
  name: string;

  // extract-code sprint-child
  @kosChild
  private tickets!: TicketContainerModel;
  // extract-code end sprint-child

  constructor(
    modelId: string,
    options: SprintOptions,
    context: KosCreationContext
  ) {
    this.id = modelId;
    this.name = options?.name ?? modelId;
    // extract-code sprint-context-key
    context.kosContext.set('sprintId', this.id);
    // extract-code end sprint-context-key
  }

  updateModel(options: SprintOptions): void {
    this.name = options?.name ?? this.name;
  }

  // -------------------LIFECYCLE----------------------------

  // extract-code sprint-build-child
  async init(): Promise<void> {
    this.logger.debug(`initializing sprint ${this.id}`);
    this.tickets = TicketContainer.instance(`${this.id}:tickets`)
      .options({})
      .build();
  }
  // extract-code end sprint-build-child

  async load(): Promise<void> {
    this.logger.debug(`loading sprint ${this.id}`);
  }

  // -------------------TICKETS------------------------------

  // extract-code sprint-delegate
  addTicket(desc: string): TicketModel {
    return this.tickets.addTicket(desc);
  }

  completeNext(): void {
    this.tickets.completeNext();
  }

  get ticketList(): TicketModel[] {
    return this.tickets.data;
  }

  get openCount(): number {
    return this.tickets.openCount;
  }
  // extract-code end sprint-delegate
}
// extract-code end sprint-model

export const Sprint = SprintModelImpl.Registration;
