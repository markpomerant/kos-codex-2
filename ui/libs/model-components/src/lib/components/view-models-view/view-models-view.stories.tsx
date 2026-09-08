import type { Meta, StoryObj } from "@storybook/react-vite";
import type { WidgetModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withWidget } from "../../hooks/widget";
import { ConnectedViewModelsView } from "./view-models-view";

const meta: Meta<typeof ConnectedViewModelsView> = {
  component: ConnectedViewModelsView,
  title: "Reactivity/View Models/Widget",
  tags: ["!dev", "!autodocs"],
};

export default meta;

let n = 0;

// Story apparatus: the "user" strip calls methods on the same model instance
// the view renders. It receives the model through the generated HOC too.
const Actions = withWidget((_props: { id: string; widget: WidgetModel }) => (
  <EventPublisher
    label="user"
    actions={[
      { label: "socket event: temperature 215", run: (device) => device.publishEvent("/codex/widget/temperature", { value: 215 }) },
      { label: "socket event: temperature 340", run: (device) => device.publishEvent("/codex/widget/temperature", { value: 340 }) },
    ]}
  />
));

// extract-code view-models-view-story
export const ViewModelsStory: StoryObj<typeof ConnectedViewModelsView> = {
  render: () => (
    <>
      <ConnectedViewModelsView id="widget-vm" />
      <Actions id="widget-vm" />
    </>
  ),
};
