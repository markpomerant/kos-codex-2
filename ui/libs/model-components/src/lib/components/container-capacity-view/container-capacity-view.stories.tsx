import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ProjectModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withProject } from "../../hooks/project";
import { ConnectedContainerCapacityView } from "./container-capacity-view";

const meta: Meta<typeof ConnectedContainerCapacityView> = {
  component: ConnectedContainerCapacityView,
  title: "Containers/Container Capacity/Project",
  tags: ["!dev", "!autodocs"],
};

export default meta;

let n = 0;

// Story apparatus: the "user" strip calls methods on the same model instance
// the view renders. It receives the model through the generated HOC too.
const Actions = withProject(({ project }: { id: string; project: ProjectModel }) => (
  <EventPublisher
    label="user"
    actions={[
      { label: "add open task", run: () => { project.addTask(`task ${(n += 1)}`); } },
      { label: "add done task", run: () => { project.addTask(`task ${(n += 1)}`, true); } },
    ]}
  />
));

// extract-code container-capacity-view-story
export const ContainerCapacityStory: StoryObj<typeof ConnectedContainerCapacityView> = {
  render: () => (
    <>
      <ConnectedContainerCapacityView id="project-capacity" />
      <Actions id="project-capacity" />
    </>
  ),
};
