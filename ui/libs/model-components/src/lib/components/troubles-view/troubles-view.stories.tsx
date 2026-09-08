import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SessionModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withSession } from "../../hooks/session";
import { ConnectedTroublesView } from "./troubles-view";

const meta: Meta<typeof ConnectedTroublesView> = {
  component: ConnectedTroublesView,
  title: "Device/Troubles/Session",
  tags: ["!dev", "!autodocs"],
};

export default meta;

// Story apparatus. The backend strip asks the codex backend to raise and
// remove its trouble through the backend's trouble service; the user strip
// resolves the trouble the session sees, through the SDK's resolve flow.
const Actions = withSession(({ session }: { id: string; session: SessionModel }) => (
  <>
    <EventPublisher
      label="backend"
      actions={[
        { label: "raise the session trouble", run: (device) => device.raiseTrouble() },
        { label: "remove the session trouble", run: (device) => device.removeTrouble() },
      ]}
    />
    <EventPublisher
      label="user"
      actions={[
        { label: "resolve the first trouble", run: () => void session.troubles[0]?.resolve() },
      ]}
    />
  </>
));

// extract-code troubles-view-story
export const TroublesStory: StoryObj<typeof ConnectedTroublesView> = {
  render: () => (
    <>
      <ConnectedTroublesView id="session-troubles" />
      <Actions id="session-troubles" />
    </>
  ),
};
