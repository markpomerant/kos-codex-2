import type { Meta, StoryObj } from "@storybook/react-vite";
import type { TeamModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withTeam } from "../../hooks/team";

import { ConnectedContainerIndexesView } from "./container-indexes-view";

const meta: Meta<typeof ConnectedContainerIndexesView> = {
  component: ConnectedContainerIndexesView,
  title: "Containers/Container Indexes/Team",
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
      { label: "add admin", run: () => { team.addMember(NAMES[n++ % NAMES.length], "admin"); } },
      { label: "add member", run: () => { team.addMember(NAMES[n++ % NAMES.length], "member"); } },
    ]}
  />
));

// extract-code container-indexes-view-story
export const ContainerIndexesStory: StoryObj<typeof ConnectedContainerIndexesView> = {
  render: () => (
    <>
      <ConnectedContainerIndexesView id="team-indexes" />
      <Actions id="team-indexes" />
    </>
  ),
};
