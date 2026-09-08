/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type {
  IKosDataModel,
  IKosIdentifiable,
  PublicModelInterface,
  KosModelRegistrationType,
} from '@kosdev-code/kos-ui-sdk';
import {
  kosModel,
  kosLoggerAware,
  KosLoggerAware,
} from '@kosdev-code/kos-ui-sdk';

import type { NoteOptions } from './types';

export const MODEL_TYPE = 'note-model';

export type NoteModel = PublicModelInterface<NoteModelImpl>;

// Interface merging for decorator type safety
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NoteModelImpl extends KosLoggerAware {}

// extract-code note-model
/** A note is meaningless without its description, so the framework refuses
 *  to create one as a dependency with no options. */
@kosModel({ modelTypeId: MODEL_TYPE, singleton: false, optionsRequired: true })
// extract-code end note-model
@kosLoggerAware()
export class NoteModelImpl implements IKosDataModel, IKosIdentifiable {
  // Registration property for type safety - actual value injected by @kosModel decorator
  static Registration: KosModelRegistrationType<NoteModel, NoteOptions>;

  id: string;
  desc: string = '';
  // logger property is automatically provided by @kosLoggerAware decorator

  constructor(modelId: string, options: NoteOptions) {
    this.id = modelId;
    // logger is automatically injected by @kosLoggerAware decorator

    if (options) {
      this.desc = options.desc;
    }
  }

  updateModel(options: NoteOptions): void {
    this.desc = options.desc;
  }

  // -------------------LIFECYCLE----------------------------

  async init(): Promise<void> {
    this.logger.debug(`initializing note ${this.id}`);
  }

  async load(): Promise<void> {
    this.logger.debug(`loading note ${this.id}`);
  }
}

export const Note = NoteModelImpl.Registration;
