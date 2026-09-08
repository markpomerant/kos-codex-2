import type { Meta, StoryObj } from "@storybook/react-vite";
import type { WidgetModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withWidget } from "../../hooks/widget";
import { ConnectedConfigPropertiesView } from "./config-properties-view";

const meta: Meta<typeof ConnectedConfigPropertiesView> = {
  component: ConnectedConfigPropertiesView,
  title: "Configuration/Config Properties/Widget",
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
      { label: "toggle enabled", run: () => widget.enabled.updateProperty(!widget.enabled.value) },
      { label: "colors → HIGH_CONTRAST", run: () => widget.colors.updateProperty("HIGH_CONTRAST") },
      { label: "colors → DEFAULT", run: () => widget.colors.updateProperty("DEFAULT") },
    ]}
  />
));

// extract-code config-properties-view-story
export const ConfigPropertiesStory: StoryObj<typeof ConnectedConfigPropertiesView> = {
  render: () => (
    <>
      <ConnectedConfigPropertiesView id="widget-config" />
      <Actions id="widget-config" />
    </>
  ),
};
