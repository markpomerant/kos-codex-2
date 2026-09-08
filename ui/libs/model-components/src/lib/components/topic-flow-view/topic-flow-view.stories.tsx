import type { Meta, StoryObj } from "@storybook/react-vite";

import { EventPublisher } from "../../event-publisher";
import { ConnectedTopicFlowView } from "./topic-flow-view";

const meta: Meta<typeof ConnectedTopicFlowView> = {
  component: ConnectedTopicFlowView,
  title: "Topics/Topic Flow Control/Widget",
  tags: ["!dev", "!autodocs"],
};

export default meta;

// extract-code topic-flow-story
export const TopicFlowStory: StoryObj<typeof ConnectedTopicFlowView> = {
  render: () => (
    <>
      <ConnectedTopicFlowView id="widget-flow" />
      <EventPublisher
        actions={[
          { label: "burst 4 → batch", run: (device) => device.publishBurst("/codex/widget/flow/batch", 4, 50) },
          { label: "burst 5 → rate limit", run: (device) => device.publishBurst("/codex/widget/flow/limit", 5, 50) },
          { label: "burst 2 → retry", run: (device) => device.publishBurst("/codex/widget/flow/retry", 2, 50) },
        ]}
      />
    </>
  ),
};
