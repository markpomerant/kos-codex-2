import type { Meta, StoryObj } from "@storybook/react-vite";
import type { TeamModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withTeam } from "../../hooks/team";

import { ConnectedParentAndChildView } from "./parent-and-child-view";

const meta: Meta<typeof ConnectedParentAndChildView> = {
  component: ConnectedParentAndChildView,
  title: "Containers/Parent And Child/Team",
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
    ]}
  />
));

// extract-code parent-and-child-view-story
export const ParentAndChildStory: StoryObj<typeof ConnectedParentAndChildView> = {
  render: () => (
    <>
      <ConnectedParentAndChildView id="team-parent" />
      <Actions id="team-parent" />
    </>
  ),
};
