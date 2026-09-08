import type { Meta, StoryObj } from "@storybook/react-vite";

import { EventPublisher } from "../../event-publisher";
import { ConnectedTopicFilteringView } from "./topic-filtering-view";

const meta: Meta<typeof ConnectedTopicFilteringView> = {
  component: ConnectedTopicFilteringView,
  title: "Topics/Topic Filtering/Widget",
  tags: ["!dev", "!autodocs"],
};

export default meta;

let first = 0;

// extract-code topic-filtering-story
export const TopicFilteringStory: StoryObj<typeof ConnectedTopicFilteringView> = {
  render: () => (
    <>
      <ConnectedTopicFilteringView id="widget-filtering" />
      <EventPublisher
        actions={[
          { label: "alert 25 (below threshold)", run: (device) => device.publishEvent("/codex/widget/alert", { value: 25 }) },
          { label: "alert 35 (above threshold)", run: (device) => device.publishEvent("/codex/widget/alert", { value: 35 }) },
          { label: "samples 1..6", run: (device) => device.publishBurst("/codex/widget/sample", 6) },
          { label: "first event", run: (device) => device.publishEvent("/codex/widget/first", { n: (first += 1) }) },
          { label: "reading 215", run: (device) => device.publishEvent("/codex/widget/reading", { value: 215 }) },
          { label: "reading 340", run: (device) => device.publishEvent("/codex/widget/reading", { value: 340 }) },
        ]}
      />
    </>
  ),
};
