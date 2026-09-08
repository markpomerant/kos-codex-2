import type { Meta, StoryObj } from "@storybook/react-vite";

import { ConnectedCounterView } from "./counter-view";

const meta: Meta<typeof ConnectedCounterView> = {
  component: ConnectedCounterView,
  title: "Foundations/Simple Model/Counter",
  tags: ["!dev", "!autodocs"],
};

export default meta;

// extract-code counter-story
export const CounterStory: StoryObj<typeof ConnectedCounterView> = {
  render: () => <ConnectedCounterView id="codex-counter" />,
};
