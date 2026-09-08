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
  kosContainerAware,
  type KosContainerAwareWithProp,
  kosDependency,
  createPropKey,
  DependencyLifecycle,
  KosDependencyTypes,
  kosFuture,
  kosFutureAware,
  type ExternalFutureInterface,
  type FutureAwareContainer,
  type IFutureModel,
  executeServiceRequest,
} from '@kosdev-code/kos-ui-sdk';

import type { ProjectOptions } from './types';
import { Task, type TaskModel } from '../task/task-model';
import { Team, type TeamModel } from '../team/team-model';
import { Counter, type CounterModel } from '../counter/counter-model';
import { Widget, type WidgetModel } from '../widget/widget-model';
import {
  type ProjectOperationProgress,
  ProjectEndpoints,
  toStartSyncData,
  type StartSyncCtx,
  type StartSyncData,
} from './services';
import { serviceRequest } from '../../utils/services/codex/v1/service';

export const MODEL_TYPE = 'project-model';

export type ProjectModel = PublicModelInterface<ProjectModelImpl> &
  ExternalFutureInterface<ProjectOperationProgress>;

// Interface merging for decorator type safety
// eslint-disable-next-line @typescript-eslint/no-empty-interface
// extract-code project-interface
export interface ProjectModelImpl
  extends KosLoggerAware,
    KosContainerAwareWithProp<TaskModel, 'tasks'>,
    ExternalFutureInterface<ProjectOperationProgress> {
  // extract-code ignore project-interface
  // extract-code project-future-handler
  /** The future handler, declared under the name `handlerProperty` gives it. */
  syncHandler: FutureAwareContainer<ProjectOperationProgress>;
}

// extract-code project-model
@kosModel({ modelTypeId: MODEL_TYPE, singleton: false })
// extract-code project-future-aware
@kosFutureAware({ handlerProperty: 'syncHandler' })
// extract-code tasks-container
@kosContainerAware<TaskModel>({
  containerProperty: 'tasks',
  containerOptions: {
    sortKey: 'name',
    // extract-code ignore start tasks-container
    // A project keeps at most five tasks. When a sixth arrives the container
    // evicts — and destroys — up to two of the ones already marked done.
    // extract-code tasks-capacity
    maxCapacity: 5,
    evictionBatchSize: 2,
    // extract-code end tasks-capacity
    // extract-code tasks-eviction
    evictionStrategy: 'custom',
    customEvictionFilter: (tasks) => tasks.filter((t) => t.done),
    // extract-code end tasks-eviction
    // extract-code ignore end tasks-container
  },
})
// extract-code end tasks-container
@kosLoggerAware()
export class ProjectModelImpl implements IKosDataModel, IKosIdentifiable {
  // Registration property for type safety - actual value injected by @kosModel decorator
  static Registration: KosModelRegistrationType<ProjectModel, ProjectOptions>;

  id: string;
  name: string = '';
  // extract-code project-widget-dependency
  /** A widget whose temperature arrives on a topic; the project only reads it.
   *  The widget is not a singleton, so the id says which widget. */
  @kosDependency({ modelType: Widget.type, id: 'widget-computed' })
  private widget!: WidgetModel;

  // extract-code project-dependency
  /** A team the framework resolves for us: created with these options if no
   *  model with this id exists yet, before init() runs. */
  @kosDependency<{ name: string }>({
    modelType: Team.type,
    // The id is a PropKey: it is read from this model's `teamKey` property
    // when the dependency is resolved, so each project can name its own team.
    id: createPropKey<ProjectModelImpl>('teamKey'),
    options: { name: 'Codex Team' },
  })
  private team!: TeamModel;

  // extract-code project-dependency-optional
  /** An optional dependency: if no counter with this id exists it stays
   *  undefined instead of being created, and the project still boots. Nothing
   *  in init() or load() reads it, so it is resolved when the project readies. */
  @kosDependency({
    modelType: Counter.type,
    id: 'project-counter',
    resolutionPolicy: KosDependencyTypes.DependencyResolutionPolicy.CONTINUE,
    // extract-code project-dependency-lifecycle
    lifecycle: DependencyLifecycle.READY,
  })
  private counter?: CounterModel;
  // extract-code end project-dependency-optional
  // logger property is automatically provided by @kosLoggerAware decorator

  constructor(modelId: string, options: ProjectOptions) {
    this.id = modelId;
    // logger is automatically injected by @kosLoggerAware decorator

    if (options) {
      this.name = options.name ?? this.name;
      this.teamKey = options.teamKey ?? this.teamKey;
    }
  }

  // extract-code computed-temperature-band
  get temperatureBand(): 'cold' | 'warm' | 'hot' {
    // The widget stores the device's value in tenths of a degree.
    const tenths = this.widget?.temperature ?? 0;
    return tenths >= 300 ? 'hot' : tenths >= 200 ? 'warm' : 'cold';
  }

  // extract-code computed-parity
  get counterParity(): 'even' | 'odd' {
    return (this.counter?.count ?? 0) % 2 === 0 ? 'even' : 'odd';
  }

  updateModel(options: ProjectOptions): void {
    this.name = options.name ?? this.name;
  }

  // extract-code project-dependency-reads
  /** Cross-model reads are computed getters over the dependency. */
  get teamId(): string {
    return this.team?.id ?? '';
  }

  // extract-code computed-team-size
  get teamSize(): number {
    return this.team?.data.length ?? 0;
  }

  // extract-code computed-counter-state
  get counterState(): string {
    return this.counter
      ? `count ${this.counter.count}`
      : 'no counter (CONTINUE)';
  }
  // extract-code end project-dependency-reads

  // extract-code project-add-task
  private taskSeq = 0;
  evicted = 0;
  // extract-code end project-add-task

  // extract-code project-add-task
  addTask(name: string, done = false): TaskModel {
    this.taskSeq += 1;
    const task = Task.instance(`${this.id}:task-${this.taskSeq}`)
      .options({ name })
      .build();
    task.done = done;
    const before = this.tasks.data.length;
    this.addModel(task);
    this.evicted += Math.max(0, before + 1 - this.tasks.data.length);
    return task;
  }

  // -------------------LIFECYCLE----------------------------

  async init(): Promise<void> {
    this.logger.debug(`initializing project ${this.id}`);
  }

  async load(): Promise<void> {
    this.logger.debug(`loading project ${this.id}`);
  }

  // extract-code project-future-update
  lastSync: string = '';
  teamKey: string = 'project-team';

  /**
   * Optional: Custom Future update handling
   * Called whenever the Future state changes (progress, status, completion, etc.)
   */
  // extract-code project-future-update
  onFutureUpdate?(update: IFutureModel<ProjectOperationProgress>): void {
    if (update.endState) {
      this.lastSync = `${update.status} at ${new Date().toLocaleTimeString()}`;
    }
  }

  // extract-code project-future
  /** The same Studio operation the task runs, now tracked on the project. */
  @kosFuture({ trackerPolicy: 'context' })
  @serviceRequest(ProjectEndpoints.startSync, { transform: toStartSyncData })
  async startSync(
    numOfItems: number,
    $ctx?: StartSyncCtx
  ): Promise<StartSyncData | undefined> {
    const data = await executeServiceRequest(this, $ctx, {
      pathParams: { numOfItems },
      requestOptions: { tracker: $ctx?.$tracker },
    });
    return data ?? undefined;
  }
}

export const Project = ProjectModelImpl.Registration;
