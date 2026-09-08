import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ProjectModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withProject } from "../../hooks/project";
import { ConnectedProjectSyncView } from "./project-sync-view";

const meta: Meta<typeof ConnectedProjectSyncView> = {
  component: ConnectedProjectSyncView,
  title: "Async/Futures/Project",
  tags: ["!dev", "!autodocs"],
};

export default meta;

// Story apparatus: the "user" strip calls methods on the same model instance
// the view renders. It receives the model through the generated HOC too.
const Actions = withProject(({ project }: { id: string; project: ProjectModel }) => (
  <EventPublisher
    label="user"
    actions={[
      { label: "sync (3 items)", run: () => void project.startSync(3) },
      { label: "cancel", run: () => void project.cancelFuture() },
    ]}
  />
));

// extract-code project-sync-story
export const ProjectSyncStory: StoryObj<typeof ConnectedProjectSyncView> = {
  render: () => (
    <>
      <ConnectedProjectSyncView id="project-sync" />
      <Actions id="project-sync" />
    </>
  ),
};
