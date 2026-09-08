import styled from '@emotion/styled';
import { EventBus } from '@kosdev-code/kos-ui-sdk';
import type { DeviceModel } from '@kos-codex-2/core-concept-models';

import { withDevice } from '../hooks/device';

/**
 * Story apparatus, not part of any exemplar. The `device` model stands in for
 * the device: its service requests ask the codex backend to publish events and
 * out-of-band object changes, which then arrive over the real websocket.
 * `publishLocal` publishes on the in-app EventBus, which never touches the
 * socket.
 */
export const publishLocal = (topic: string, body: unknown): void => {
  EventBus.publish(topic, body);
};

export interface EventAction {
  label: string;
  run: (device: DeviceModel) => void | Promise<void>;
  /** When set, the button is disabled and this text is its tooltip. */
  disabledReason?: string;
}

const EventPublisherView = ({
  actions,
  label = 'device',
  device,
}: {
  actions: EventAction[];
  /** Who is acting: the device (events) or the user (model methods). */
  label?: string;
  device: DeviceModel;
}) => (
  <Panel>
    <span>{label}</span>
    {actions.map((a) => (
      <button
        key={a.label}
        onClick={() => void a.run(device)}
        disabled={!!a.disabledReason}
        title={a.disabledReason}
      >
        {a.label}
      </button>
    ))}
  </Panel>
);

export const EventPublisher = withDevice(EventPublisherView);

const Panel = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.75rem;
  font-size: 0.85rem;
`;
