import type { Meta, StoryObj } from "@storybook/react-vite";

import { EventPublisher } from "../../event-publisher";
import { ConnectedPropKeysView } from "./prop-keys-view";

const meta: Meta<typeof ConnectedPropKeysView> = {
  component: ConnectedPropKeysView,
  title: "Foundations/Prop Keys/Widget",
  tags: ["!dev", "!autodocs"],
};

export default meta;

let n = 0;

// extract-code prop-keys-story
export const PropKeysStory: StoryObj<typeof ConnectedPropKeysView> = {
  render: () => (
    <>
      <ConnectedPropKeysView id="widget-north" />
      <ConnectedPropKeysView id="widget-south" />
      <EventPublisher
        actions={[
          { label: "reading for widget-north", run: (device) => device.publishEvent("/codex/widget/widget-north/reading", { value: 215 }) },
          { label: "reading for widget-south", run: (device) => device.publishEvent("/codex/widget/widget-south/reading", { value: 180 }) },
          { label: "status for zone north", run: (device) => device.publishEvent("/codex/zone/north/status", { n: (n += 1) }) },
          { label: "status for zone south", run: (device) => device.publishEvent("/codex/zone/south/status", { n: (n += 1) }) },
        ]}
      />
    </>
  ),
};
