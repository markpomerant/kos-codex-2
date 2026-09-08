import { DeviceModel } from '@kos-codex-2/core-concept-models';
import { useDevice } from './use-device';

interface DeviceProps {
  device: DeviceModel;
}

// react HOC to provide a Device to a component
export function withDevice<T extends DeviceProps>(
  WrappedComponent: React.ComponentType<T>
) {
  const ComponentWithDevice = (props: Omit<T, keyof DeviceProps>) => {
    const { model, status, KosModelLoader } = useDevice();

    return (
      <KosModelLoader {...status}>
        <WrappedComponent {...(props as any)} device={model} />
      </KosModelLoader>
    );
  };

  ComponentWithDevice.displayName = `WithDevice(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithDevice;
}
