import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CounterModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withCounter } from "../../hooks/counter";
import { ConnectedModelEffectsView } from "./model-effects-view";

const meta: Meta<typeof ConnectedModelEffectsView> = {
  component: ConnectedModelEffectsView,
  title: "Reactivity/Model Effects/Counter",
  tags: ["!dev", "!autodocs"],
};

export default meta;

let n = 0;

// Story apparatus: the "user" strip calls methods on the same model instance
// the view renders. It receives the model through the generated HOC too.
const Actions = withCounter(({ counter }: { id: string; counter: CounterModel }) => (
  <EventPublisher
    label="user"
    actions={[
      { label: "+", run: () => counter.increment() },
      { label: "−", run: () => counter.decrement() },
      { label: "reset", run: () => counter.reset() },
    ]}
  />
));

// extract-code model-effects-view-story
export const ModelEffectsStory: StoryObj<typeof ConnectedModelEffectsView> = {
  render: () => (
    <>
      <ConnectedModelEffectsView id="counter-effects" />
      <Actions id="counter-effects" />
    </>
  ),
};
