import type { Meta, StoryObj } from "@storybook/react-vite";

import { EventPublisher } from "../../event-publisher";
import { ConnectedTopicCatchUpView } from "./topic-catch-up-view";

const meta: Meta<typeof ConnectedTopicCatchUpView> = {
  component: ConnectedTopicCatchUpView,
  title: "Topics/Lifecycle Race Conditions/Journal",
  tags: ["!dev", "!autodocs"],
};

export default meta;

// extract-code topic-catch-up-story
export const TopicCatchUpStory: StoryObj<typeof ConnectedTopicCatchUpView> = {
  render: () => (
    <>
      <ConnectedTopicCatchUpView id="journal-catch-up" />
      <EventPublisher
        actions={[
          { label: "another client adds a note", run: (device) => device.addObject() },
          { label: "another client removes the last note", run: (device) => device.removeObject() },
        ]}
      />
    </>
  ),
};
