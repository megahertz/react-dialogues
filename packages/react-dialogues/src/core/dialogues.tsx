import { render } from 'react-dom';
import { Portal, type PortalMountedPayload } from '../portal/Portal';
import type { ThemeName } from '../utils/types';
import RdState, { type RdItem } from './RdState';

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

      internal.state.onChange((state) => {
        internal.setPortalItems(state.items.slice());
      });

      render(
        <Portal
          initItems={internal.state.items}
          onMount={onPortalMounted}
          onUnmount={onPortalUnmounted}
        />,
        dialogues.config.getContainerElement(),
      );

      function onPortalMounted({
        element,
        setPortalItems,
      }: PortalMountedPayload) {
        internal.isPortalMounted = true;
        internal.rootElement = element;
        internal.setPortalItems = setPortalItems;
      }

      function onPortalUnmounted() {
        internal.isPortalMounted = false;
        internal.rootElement = undefined;
        internal.setPortalItems = () => {};
      }
    },

    setPortalItems: (() => {}) as (items: RdItem[]) => void,
  },
};
