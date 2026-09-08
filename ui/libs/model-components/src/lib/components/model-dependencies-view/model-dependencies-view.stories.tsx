import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ProjectModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withProject } from "../../hooks/project";
import { ConnectedModelDependenciesView } from "./model-dependencies-view";

const meta: Meta<typeof ConnectedModelDependenciesView> = {
  component: ConnectedModelDependenciesView,
  title: "Relationships/Model Dependencies/Project",
  tags: ["!dev", "!autodocs"],
};

export default meta;

let n = 0;

// Story apparatus: the "user" strip calls methods on the same model instance
// the view renders. It receives the model through the generated HOC too.
const Actions = withProject((_: { id: string; project: ProjectModel }) => (
  <EventPublisher
    label="user"
    actions={[
      { label: "(dependencies resolve at init; nothing to press)", run: () => undefined },
    ]}
  />
));

// extract-code model-dependencies-view-story
export const ModelDependenciesStory: StoryObj<typeof ConnectedModelDependenciesView> = {
  render: () => (
    <>
      <ConnectedModelDependenciesView id="project-deps" />
      <Actions id="project-deps" />
    </>
  ),
};
