/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import {
  kosModel,
  kosContainerAware,
  type KosContainerAware,
} from '@kosdev-code/kos-ui-sdk';
import {
  type KosModelRegistrationType,
  IKosDataModel,
  IKosIdentifiable,
  PublicModelInterface,
  kosLoggerAware,
  type KosLoggerAware,
} from '@kosdev-code/kos-ui-sdk';

import type { TicketContainerOptions } from './types';
import { Ticket, type TicketModel } from './ticket-model';

export const MODEL_TYPE = 'ticket-container-model';

export type TicketContainerModel =
  PublicModelInterface<TicketContainerModelImpl>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TicketContainerModelImpl
  extends KosLoggerAware,
    KosContainerAware<TicketModel> {}

// extract-code ticket-container-model
@kosModel({ modelTypeId: MODEL_TYPE, singleton: false })
// extract-code ticket-container-decorator
@kosContainerAware<TicketModel>()
// extract-code end ticket-container-decorator
@kosLoggerAware()
export class TicketContainerModelImpl
  implements IKosIdentifiable, IKosDataModel
{
  static Registration: KosModelRegistrationType<
    TicketContainerModel,
    TicketContainerOptions
  >;

  id: string;
  private nextTicket = 1;

  constructor(modelId: string, _options: TicketContainerOptions) {
    this.id = modelId;
  }

  updateModel(_options: TicketContainerOptions): void {
    return;
  }

  // -------------------COLLECTION---------------------------

  // extract-code ticket-container-logic
  addTicket(desc: string): TicketModel {
    const ticket = Ticket.instance(`${this.id}:${this.nextTicket++}`)
      .options({ desc })
      .build();
    this.addModel(ticket);
    return ticket;
  }

  completeNext(): void {
    this.data.find((ticket) => !ticket.done)?.complete();
  }

  get openCount(): number {
    return this.data.filter((ticket) => !ticket.done).length;
  }
  // extract-code end ticket-container-logic

  // -------------------LIFECYCLE----------------------------

  async init(): Promise<void> {
    this.logger.debug(`initializing ticket-container container ${this.id}`);
  }

  async load(): Promise<void> {
    this.logger.debug(`loading ticket-container container ${this.id}`);
  }
}
// extract-code end ticket-container-model

// extract-code ticket-container-related
export const TicketContainer = TicketContainerModelImpl.Registration;

TicketContainer.addRelatedModel(Ticket);
// extract-code end ticket-container-related
