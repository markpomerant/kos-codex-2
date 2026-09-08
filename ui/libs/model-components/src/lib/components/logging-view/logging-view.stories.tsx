import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SessionModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withSession } from "../../hooks/session";
import { ConnectedLoggingView } from "./logging-view";

const meta: Meta<typeof ConnectedLoggingView> = {
  component: ConnectedLoggingView,
  title: "Diagnostics/Logging/Session",
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
      { label: "log a line", run: () => session.note(`line ${(n += 1)}`) },
    ]}
  />
));

// extract-code logging-view-story
export const LoggingStory: StoryObj<typeof ConnectedLoggingView> = {
  render: () => (
    <>
      <ConnectedLoggingView id="session-logging" />
      <Actions id="session-logging" />
    </>
  ),
};
