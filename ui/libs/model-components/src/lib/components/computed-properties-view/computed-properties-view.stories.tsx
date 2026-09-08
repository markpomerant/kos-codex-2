import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CounterModel, TeamModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withCounter } from "../../hooks/counter";
import { withTeam } from "../../hooks/team";
import { ConnectedComputedPropertiesView } from "./computed-properties-view";

const meta: Meta<typeof ConnectedComputedPropertiesView> = {
  component: ConnectedComputedPropertiesView,
  title: "Foundations/Computed Properties/Project",
  tags: ["!dev", "!autodocs"],
};

export default meta;

let n = 0;

// Story apparatus: every strip acts on a SOURCE model the project depends on,
// never on the project. The project's readout follows on its own.
const TeamActions = withTeam(({ team }: { id: string; team: TeamModel }) => (
  <EventPublisher
    label="team"
    actions={[{ label: "add a member", run: () => void team.addMember(`member-${(n += 1)}`) }]}
  />
));
const CounterActions = withCounter(({ counter }: { id: string; counter: CounterModel }) => (
  <EventPublisher
    label="counter"
    actions={[
      { label: "increment", run: () => counter.increment() },
      { label: "reset", run: () => counter.reset() },
    ]}
  />
));

// extract-code computed-properties-story
export const ComputedPropertiesStory: StoryObj<typeof ConnectedComputedPropertiesView> = {
  render: () => (
    <>
      <ConnectedComputedPropertiesView id="project-computed" />
      <TeamActions id="project-team" />
      <CounterActions id="project-counter" />
      <EventPublisher
        actions={[
          { label: "temperature event 15.0", run: (device) => device.publishEvent("/codex/widget/temperature", { value: 150 }) },
          { label: "temperature event 25.0", run: (device) => device.publishEvent("/codex/widget/temperature", { value: 250 }) },
          { label: "temperature event 34.0", run: (device) => device.publishEvent("/codex/widget/temperature", { value: 340 }) },
        ]}
      />
    </>
  ),
};
