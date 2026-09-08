/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type {
  IKosDataModel,
  IKosIdentifiable,
  KosCreationContext,
  PublicModelInterface,
  KosModelRegistrationType,
} from '@kosdev-code/kos-ui-sdk';
import { kosModel, kosLoggerAware, KosLoggerAware } from '@kosdev-code/kos-ui-sdk';

import type { TicketOptions } from './types';

export const MODEL_TYPE = 'ticket-model';

export type TicketModel = PublicModelInterface<TicketModelImpl>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TicketModelImpl extends KosLoggerAware {}

// extract-code ticket-model
@kosModel({ modelTypeId: MODEL_TYPE, singleton: false })
@kosLoggerAware()
export class TicketModelImpl implements IKosDataModel, IKosIdentifiable {
  static Registration: KosModelRegistrationType<TicketModel, TicketOptions>;

  id: string;
  desc: string;
  done = false;
  private readonly kosContext: KosCreationContext['kosContext'];

  constructor(
    modelId: string,
    options: TicketOptions,
    context: KosCreationContext
  ) {
    this.id = modelId;
    this.desc = options.desc;
    this.kosContext = context.kosContext;
  }

  updateModel(options: TicketOptions): void {
    this.desc = options.desc;
  }

  // extract-code ticket-sprint-id
  get sprintId(): string {
    return this.kosContext.get('sprintId') ?? '';
  }
  // extract-code end ticket-sprint-id

  complete(): void {
    this.done = true;
  }

  // -------------------LIFECYCLE----------------------------

  async init(): Promise<void> {
    this.logger.debug(`initializing ticket ${this.id}`);
  }

  async load(): Promise<void> {
    this.logger.debug(`loading ticket ${this.id}`);
  }
}
// extract-code end ticket-model

export const Ticket = TicketModelImpl.Registration;
