import type { Meta, StoryObj } from "@storybook/react-vite";

import type { DeviceModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { ConnectedTopicAddressingView } from "./topic-addressing-view";

const meta: Meta<typeof ConnectedTopicAddressingView> = {
  component: ConnectedTopicAddressingView,
  title: "Topics/Topic Addressing/Widget",
  tags: ["!dev", "!autodocs"],
};

export default meta;

let n = 0;

// The broker delivers a wildcard match with the concrete topic and the
// subscribed pattern in its headers; the model reads the matched path from them.
const zoneEvent = (device: DeviceModel, zone: string) =>
  device.publishEvent(`/codex/widget/zone/${zone}`, { n: (n += 1) });

// extract-code topic-addressing-story
export const TopicAddressingStory: StoryObj<typeof ConnectedTopicAddressingView> = {
  render: () => (
    <>
      <ConnectedTopicAddressingView id="widget-addressing" />
      <EventPublisher
        actions={[
          { label: "zone north/door", run: (device) => zoneEvent(device, "north/door") },
          { label: "zone south", run: (device) => zoneEvent(device, "south") },
          { label: "addressed event", run: (device) => device.publishEvent("/codex/widget/addressed", { n: (n += 1) }) },
        ]}
      />
    </>
  ),
};
