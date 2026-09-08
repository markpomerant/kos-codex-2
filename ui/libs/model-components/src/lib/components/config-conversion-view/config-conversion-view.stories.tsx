import type { Meta, StoryObj } from "@storybook/react-vite";
import type { WidgetModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withWidget } from "../../hooks/widget";
import { ConnectedConfigConversionView } from "./config-conversion-view";

const meta: Meta<typeof ConnectedConfigConversionView> = {
  component: ConnectedConfigConversionView,
  title: "Configuration/Config Conversion/Widget",
  tags: ["!dev", "!autodocs"],
};

export default meta;

let n = 0;

// Story apparatus: the "user" strip calls methods on the same model instance
// the view renders. It receives the model through the generated HOC too.
const Actions = withWidget(({ widget }: { id: string; widget: WidgetModel }) => (
  <EventPublisher
    label="user"
    actions={[
      { label: "unit system → si", run: () => widget.setUnitSystem("si") },
      { label: "unit system → us", run: () => widget.setUnitSystem("us") },
      { label: "volume := 12 (display unit)", run: () => widget.volume.updateProperty(12) },
      { label: "otherVolume := 12 (display unit)", run: () => widget.otherVolume.updateProperty(12) },
      { label: "rangeInterval := 21", run: () => widget.rangeInterval.updateProperty(21) },
    ]}
  />
));

// extract-code config-conversion-view-story
export const ConfigConversionStory: StoryObj<typeof ConnectedConfigConversionView> = {
  render: () => (
    <>
      <ConnectedConfigConversionView id="widget-conversion" />
      <Actions id="widget-conversion" />
    </>
  ),
};
