import type { Meta, StoryObj } from "@storybook/react-vite";
import type { TeamModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withTeam } from "../../hooks/team";

import { ConnectedContainerModelsView } from "./container-models-view";

const meta: Meta<typeof ConnectedContainerModelsView> = {
  component: ConnectedContainerModelsView,
  title: "Containers/Container Models/Team",
  tags: ["!dev", "!autodocs"],
};

export default meta;

let n = 0;
const NAMES = ["Ada", "Grace", "Linus", "Barbara", "Ken"];

// Story apparatus: the "user" strip calls methods on the same model instance
// the view renders. It receives the model through the generated HOC too.
const Actions = withTeam(({ team }: { id: string; team: TeamModel }) => (
  <EventPublisher
    label="user"
    actions={[
      { label: "add member", run: () => { team.addMember(NAMES[n++ % NAMES.length]); } },
      {
        label: "remove last",
        run: () => {
          const last = team.data[team.data.length - 1];
          if (last) void team.removeMember(last.id);
        },
      },
    ]}
  />
));

// extract-code container-models-view-story
export const ContainerModelsStory: StoryObj<typeof ConnectedContainerModelsView> = {
  render: () => (
    <>
      <ConnectedContainerModelsView id="team-models" />
      <Actions id="team-models" />
    </>
  ),
};
