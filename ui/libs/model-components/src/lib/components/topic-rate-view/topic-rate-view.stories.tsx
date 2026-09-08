import type { Meta, StoryObj } from "@storybook/react-vite";

import { EventPublisher } from "../../event-publisher";
import { ConnectedTopicRateView } from "./topic-rate-view";

const meta: Meta<typeof ConnectedTopicRateView> = {
  component: ConnectedTopicRateView,
  title: "Topics/Topic Rate Control/Widget",
  tags: ["!dev", "!autodocs"],
};

export default meta;

// extract-code topic-rate-story
export const TopicRateStory: StoryObj<typeof ConnectedTopicRateView> = {
  render: () => (
    <>
      <ConnectedTopicRateView id="widget-rate" />
      <EventPublisher
        actions={[
          { label: "burst 5 → debounce", run: (device) => device.publishBurst("/codex/widget/burst/debounce", 5, 50) },
          { label: "burst 5 → throttle", run: (device) => device.publishBurst("/codex/widget/burst/throttle", 5, 50) },
          { label: "burst 5 → buffer", run: (device) => device.publishBurst("/codex/widget/burst/buffer", 5, 50) },
        ]}
      />
    </>
  ),
};
