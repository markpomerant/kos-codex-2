import type { Meta, StoryObj } from "@storybook/react-vite";

import { EventPublisher, publishLocal } from "../../event-publisher";
import { ConnectedTopicHandlersView } from "./topic-handlers-view";

const meta: Meta<typeof ConnectedTopicHandlersView> = {
  component: ConnectedTopicHandlersView,
  title: "Topics/Topic Handlers/Widget",
  tags: ["!dev", "!autodocs"],
};

export default meta;

let ping = 0;

// extract-code topic-handlers-story
export const TopicHandlersStory: StoryObj<typeof ConnectedTopicHandlersView> = {
  render: () => (
    <>
      <ConnectedTopicHandlersView id="widget-handlers" />
      <EventPublisher
        actions={[
          {
            label: "socket event: temperature",
            run: (device) =>
              device.publishEvent("/codex/widget/temperature", {
                value: Math.round(150 + Math.random() * 200),
              }),
          },
          {
            label: "local event: ping",
            run: () => publishLocal("/codex/widget/ping", { n: (ping += 1) }),
          },
          {
            label: "socket event: raw",
            run: (device) =>
              device.publishEvent("/codex/widget/raw", { at: new Date().toISOString() }),
          },
        ]}
      />
    </>
  ),
};
