import { createRoot } from 'react-dom/client';
import {
  RootContainer,
  type PortalMountedPayload,
} from '../container/RootContainer';
import type { ThemeName } from '../utils/types';
import RdState, { type RdController } from './RdState';

export const dialogues = {
  config: {
    getContainerElement() {
      const existedDiv = document.getElementById('rd-root');
      if (existedDiv) {
        return existedDiv;
      }

      const div = document.createElement('div');
      div.setAttribute('id', 'rd-root');
      document.body.appendChild(div);
      return div;
    },

    get theme(): ThemeName {
      return (
        (dialogues.internal.rootElement?.getAttribute(
          'data-theme',
        ) as ThemeName) || 'none'
      );
    },

    set theme(value: ThemeName) {
      if (value === 'none') {
        dialogues.internal.rootElement?.removeAttribute('data-theme');
        return;
      }

      let themeName = value;
      if (value === 'auto') {
        themeName = window.matchMedia?.('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
      }
      dialogues.internal.rootElement?.setAttribute('data-theme', themeName);
    },
  },

  destroyAll() {
    dialogues.internal.state.destroyAll();
  },

  /** @internal */
  internal: {
    isPortalMounted: false,
    rootElement: undefined as HTMLElement | undefined,
    state: new RdState(),

    ensurePortalRendered() {
      const { internal } = dialogues;
      if (internal.isPortalMounted) {
        return;
      }

      createRoot(dialogues.config.getContainerElement()).render(
        <RootContainer
          initControllers={internal.state.controllers}
          onMount={internal.onPortalMounted}
          onUnmount={internal.onPortalUnmounted}
        />,
      );
    },

    onPortalMounted({ element, setPortalControllers }: PortalMountedPayload) {
      dialogues.internal.isPortalMounted = true;
      dialogues.internal.rootElement = element;
      dialogues.internal.setPortalControllers = setPortalControllers;
    },

    onPortalUnmounted() {
      dialogues.internal.isPortalMounted = false;
      dialogues.internal.rootElement = undefined;
      dialogues.internal.setPortalControllers = () => {};
    },

    setPortalControllers: (() => {}) as (items: RdController[]) => void,
  },
};

dialogues.internal.state.onChange((state) => {
  dialogues.internal.setPortalControllers(state.controllers.slice());
});
