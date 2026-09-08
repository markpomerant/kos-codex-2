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
  kosStateMachine,
  kosStateGuard,
  kosStateEntry,
  kosStateExit,
  kosTroubleAware,
  kosLogger,
  DependencyLifecycle,
  type KosContextLogger,
  type KosStateMachineAware,
  type TroubleAware,
  kosDependency,
  TroubleContainer,
  type TroubleContainerModel,
  type TroubleContainerOptions,
} from '@kosdev-code/kos-ui-sdk';

import type { SessionOptions } from './types';

// extract-code session-states
export type SessionState = 'idle' | 'active' | 'locked' | 'closed';
export type SessionEvent = 'START' | 'LOCK' | 'UNLOCK' | 'END';
// extract-code end session-states

export const MODEL_TYPE = 'session-model';

export type SessionModel = PublicModelInterface<SessionModelImpl>;

// Interface merging for decorator type safety
// eslint-disable-next-line @typescript-eslint/no-empty-interface
// With loggerProperty renamed, the merged interface declares the logger
// under that name instead of extending KosLoggerAware.
// extract-code session-logger-field
export interface SessionModelImpl
  extends KosStateMachineAware<SessionState, SessionEvent>,
    TroubleAware {
  log: KosContextLogger;
}

// extract-code session-model
@kosModel({ modelTypeId: MODEL_TYPE, singleton: false })
// extract-code session-state-machine
@kosStateMachine<SessionState, SessionEvent>(
  {
    initial: 'idle',
    initializeAt: DependencyLifecycle.READY,
    states: {
      idle: { on: { START: 'active' } },
      active: { on: { LOCK: 'locked', END: 'closed' } },
      locked: { on: { UNLOCK: 'active', END: 'closed' } },
      closed: {},
    },
  },
  { throwOnInvalid: false }
)
// extract-code session-trouble-aware
@kosTroubleAware({ pathProperty: 'path' })
// extract-code session-logger-aware
/** `loggerProperty` renames the injected logger; `loggerContext` names the
 *  logging context instead of the model type. `@kosLogger({ group })` sets the
 *  group the model's log lines are filed under. */
@kosLoggerAware({ loggerProperty: 'log', loggerContext: 'codex.session' })
// extract-code session-logger-group
@kosLogger({ group: 'codex' })
// extract-code end session-logger-group
export class SessionModelImpl implements IKosDataModel, IKosIdentifiable {
  // Registration property for type safety - actual value injected by @kosModel decorator
  static Registration: KosModelRegistrationType<SessionModel, SessionOptions>;

  id: string;
  user: string = '';
  /** The trouble interface this session reports under; see the troubles page. */
  // extract-code session-trouble-path
  path: string = 'codex.session';
  journal: string = '';
  lastRejected: string = '';
  // logger property is automatically provided by @kosLoggerAware decorator

  constructor(modelId: string, options: SessionOptions) {
    this.id = modelId;
    // logger is automatically injected by @kosLoggerAware decorator

    if (options) {
      this.user = options.user ?? this.user;
    }
  }

  updateModel(options: SessionOptions): void {
    this.user = options.user ?? this.user;
  }

  // extract-code session-log-use
  lines: number = 0;
  // extract-code session-trouble-service
  @kosDependency<TroubleContainerOptions>({
    modelType: TroubleContainer.type,
    id: 'trouble-container-model',
    options: { servicePath: '/api/troubles' },
  })
  private troubleService!: TroubleContainerModel;
  // extract-code session-log-use
  note(line: string): void {
    this.lines += 1;
    this.log.info(`[${this.id}] ${line}`);
  }

  // -------------------STATE MACHINE------------------------

  // extract-code session-transitions
  start(): void {
    this.transition('START');
  }

  lock(): void {
    this.transition('LOCK');
  }

  unlock(): void {
    this.transition('UNLOCK');
  }

  end(): void {
    this.transition('END');
  }
  // extract-code end session-transitions

  // extract-code session-guard
  /** Only an active session can record work; elsewhere the call is refused. */
  @kosStateGuard<SessionState>({
    allowedStates: ['active'],
    throwOnInvalid: false,
  })
  record(entry: string): void {
    this.journal = `${this.journal}${entry}; `;
  }

  // extract-code session-entry-exit
  @kosStateEntry<SessionState>('active')
  onActive(): void {
    this.journal = `${this.journal}[active] `;
  }

  @kosStateExit<SessionState>('active')
  onLeaveActive(): void {
    this.journal = `${this.journal}[left active] `;
  }

  @kosStateEntry<SessionState>('closed')
  onClosed(): void {
    this.journal = `${this.journal}[closed] `;
  }
  // extract-code end session-entry-exit

  // -------------------LIFECYCLE----------------------------

  async init(): Promise<void> {
    this.log.debug(`initializing session ${this.id}`);
  }

  async load(): Promise<void> {
    this.log.debug(`loading session ${this.id}`);
  }
}

export const Session = SessionModelImpl.Registration;
