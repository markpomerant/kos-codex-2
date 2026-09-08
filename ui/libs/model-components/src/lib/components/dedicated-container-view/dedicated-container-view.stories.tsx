import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SprintModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withSprint } from "../../hooks/sprint";

import { ConnectedDedicatedContainerView } from "./dedicated-container-view";

const meta: Meta<typeof ConnectedDedicatedContainerView> = {
  component: ConnectedDedicatedContainerView,
  title: "Containers/Dedicated Container Model/Sprint",
  tags: ["!dev", "!autodocs"],
};

export default meta;

let n = 0;
const WORK = ["wire the pump", "calibrate flow", "label the valves", "write the runbook"];

// Story apparatus: the "user" strip calls methods on the same sprint the view renders.
const Actions = withSprint(({ sprint }: { id: string; sprint: SprintModel }) => (
  <EventPublisher
    label="user"
    actions={[
      { label: "add ticket", run: () => { sprint.addTicket(WORK[n++ % WORK.length]); } },
      { label: "complete next", run: () => { sprint.completeNext(); } },
    ]}
  />
));

// extract-code dedicated-container-story
export const DedicatedContainerStory: StoryObj<typeof ConnectedDedicatedContainerView> = {
  render: () => (
    <>
      <ConnectedDedicatedContainerView id="sprint-1" />
      <Actions id="sprint-1" />
    </>
  ),
};
