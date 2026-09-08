import type { Meta, StoryObj } from "@storybook/react-vite";
import type { TaskModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withTask } from "../../hooks/task";
import { ConnectedFuturesView } from "./futures-view";

const meta: Meta<typeof ConnectedFuturesView> = {
  component: ConnectedFuturesView,
  title: "Async/Futures/Task",
  tags: ["!dev", "!autodocs"],
};

export default meta;

let n = 0;

// Story apparatus: the "user" strip calls methods on the same model instance
// the view renders. It receives the model through the generated HOC too.
const Actions = withTask(({ task }: { id: string; task: TaskModel }) => (
  <EventPublisher
    label="user"
    actions={[
      { label: "start (5 items)", run: () => void task.startAdditionalData(5) },
      { label: "cancel", run: () => void task.cancelFuture() },
    ]}
  />
));

// extract-code futures-view-story
export const FuturesStory: StoryObj<typeof ConnectedFuturesView> = {
  render: () => (
    <>
      <ConnectedFuturesView id="task-futures" />
      <Actions id="task-futures" />
    </>
  ),
};
