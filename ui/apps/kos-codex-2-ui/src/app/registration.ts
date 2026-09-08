import {
  DispenseExtensionManager,
  KosModelRegistry,
} from '@kosdev-code/kos-dispense-sdk';

import { initKosProvider } from '@kosdev-code/kos-ui-sdk';
import { Counter } from '@kos-codex-2/core-concept-models';
import { Widget } from '@kos-codex-2/core-concept-models';
import { Document } from '@kos-codex-2/core-concept-models';
import { Note } from '@kos-codex-2/core-concept-models';
import { Team } from '@kos-codex-2/core-concept-models';
import { User } from '@kos-codex-2/core-concept-models';
import { Project } from '@kos-codex-2/core-concept-models';
import { Task } from '@kos-codex-2/core-concept-models';
import { Session } from '@kos-codex-2/core-concept-models';
import { Timer } from '@kos-codex-2/core-concept-models';
import { Device } from '@kos-codex-2/core-concept-models';
import { Journal } from '@kos-codex-2/core-concept-models';

// extract-code registration-chain
KosModelRegistry.dispense
  .models()
  .model(Counter)
  .model(Widget)
  .model(Document)
  .model(Note)
  .model(Team)
  .model(User)
  .model(Project)
  .model(Task)
  .model(Session)
  .model(Timer)
  .model(Device)
  .model(Journal)
  // extract-code registration-companion
  // A companion is registered against its parent's type: whenever a Session is
  // created, the framework creates its Timer alongside it.
  .companion(Session.type, Timer.type);

// Exemplar models are registered here by the `register_model` MCP tool, which
// upserts an import plus a model entry into this chain. The file is
// declared in this project's .kos.json under `registration.file`.
//
// Do NOT use `autoRegister` (being deprecated), and do NOT preload — preload is
// for bootstrap/essential models only; everything else loads on demand.

// The codex runs against KOS Studio, whose config and region services live at
// /api/config and /api/regions rather than the device paths the SDK models
// default to. The extension manager maps them once, at boot.
const dispenseExtensionManager = new DispenseExtensionManager();
dispenseExtensionManager.core
  .registerConfigServicePathMapper(() => '/api/config')
  .registerRegionServicePathMapper(() => '/api/regions');

const { KosCoreContextProvider } = initKosProvider();

export { KosCoreContextProvider };
