import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SessionModel } from "@kos-codex-2/core-concept-models";

import { getKosCompanionModel } from "@kosdev-code/kos-ui-sdk";
import { Timer, type TimerModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withSession } from "../../hooks/session";
import { ConnectedMultiFuturesView } from "./multi-futures-view";

const meta: Meta<typeof ConnectedMultiFuturesView> = {
  component: ConnectedMultiFuturesView,
  title: "Async/Multi Futures/Session",
  tags: ["!dev", "!autodocs"],
};

export default meta;

let n = 0;

// Story apparatus: the "user" strip calls methods on the same model instance
// the view renders. It receives the model through the generated HOC too.
const Actions = withSession(({ session }: { id: string; session: SessionModel }) => (
  <EventPublisher
    label="user"
    actions={[
      { label: "start short", run: () => void getKosCompanionModel<TimerModel>(session, Timer.type)?.startShort() },
      { label: "start long", run: () => void getKosCompanionModel<TimerModel>(session, Timer.type)?.startLong() },
      { label: "cancel long", run: () => void getKosCompanionModel<TimerModel>(session, Timer.type)?.cancelLong() },
    ]}
  />
));

// extract-code multi-futures-view-story
export const MultiFuturesStory: StoryObj<typeof ConnectedMultiFuturesView> = {
  render: () => (
    <>
      <ConnectedMultiFuturesView id="session-multi" />
      <Actions id="session-multi" />
    </>
  ),
};
