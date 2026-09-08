import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SessionModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withSession } from "../../hooks/session";
import { ConnectedStateMachineView } from "./state-machine-view";

const meta: Meta<typeof ConnectedStateMachineView> = {
  component: ConnectedStateMachineView,
  title: "Lifecycle/State Machine/Session",
  tags: ["!dev", "!autodocs"],
};

export default meta;

let n = 0;

// Story apparatus: the "user" strip calls methods on the same model instance
// the view renders. It receives the model through the generated HOC too.
const Actions = withSession(({ session }: { id: string; session: SessionModel }) => (
  <EventPublisher
    label="user"
    actions={[
      { label: "START", run: () => session.start() },
      { label: "LOCK", run: () => session.lock() },
      { label: "UNLOCK", run: () => session.unlock() },
      { label: "END", run: () => session.end() },
      { label: "record (guarded)", run: () => session.record(`entry ${(n += 1)}`) },
    ]}
  />
));

// extract-code state-machine-view-story
export const StateMachineStory: StoryObj<typeof ConnectedStateMachineView> = {
  render: () => (
    <>
      <ConnectedStateMachineView id="session-fsm" />
      <Actions id="session-fsm" />
    </>
  ),
};
