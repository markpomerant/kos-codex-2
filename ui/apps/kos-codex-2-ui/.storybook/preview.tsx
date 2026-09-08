import type { Preview } from "@storybook/react-vite";
// Dev-only entry for the provisional endpoints (see above). Deliberately a deep
// import: the mocks module is not exported from the library barrel.


// Device-side behaviour (events, out-of-band object changes) comes from the
// codex backend's test endpoints, driven by the `device` model in the stories.
// Nothing is mocked and no fixture server is involved.

// The scaffolded app already boots KOS — registration.ts calls initKosProvider()
// and exports the provider. Stories render inside that same provider rather than
// standing up a second, divergent boot path.
import { KosCoreContextProvider } from "../src/app/registration";

const preview: Preview = {
  decorators: [
    (Story) => (
      <KosCoreContextProvider>
        <Story />
      </KosCoreContextProvider>
    ),
  ],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    // Every group opens with the page that uses the defaults; pages that add
    // options or handle exceptions follow.
    options: {
      storySort: {
        order: [
          "Foundations", ["Simple Model", "Communication Patterns", "Model Relationships", "Computed Properties", "Prop Keys", "Advanced Options"],
          "Reactivity", ["Model Effects", "View Models"],
          "Containers", ["Container Models", "Dedicated Container Model", "Container Indexes", "Container Capacity", "Parent And Child"],
          "Relationships", ["Model Dependencies", "Companion Models"],
          "Services", ["Services", "Service Mapping", "Service Caching", "Service Errors"],
          "Topics", ["Topic Handlers", "Topic Filtering", "Topic Rate Control", "Topic Flow Control", "Topic Addressing", "Lifecycle Race Conditions"],
          "Async", ["Futures", "Multi Futures"],
          "Configuration", ["Config Properties", "Config Conversion"],
          "Lifecycle", ["Context And Reload", "State Machine"],
          "Diagnostics",
          "Device",
        ],
      },
    },
  },
};

export default preview;
