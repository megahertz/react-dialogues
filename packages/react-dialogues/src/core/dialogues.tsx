import { render } from 'react-dom';
import Portal from '../portal/Portal';
import RdState from './RdState';

export const dialogues = {
  config: {
    getContainerElement() {
      const existedDiv = document.getElementById('rd-container');
      if (existedDiv) {
        return existedDiv;
      }

      const div = document.createElement('div');
      div.setAttribute('id', 'rd-container');
      document.body.appendChild(div);
      return div;
    },
  },

  /** @internal */
  internal: {
    state: new RdState(),
    isPortalMounted: false,

    ensurePortalRendered() {
      if (!dialogues.internal.isPortalMounted) {
        render(<Portal />, dialogues.config.getContainerElement());
      }
    },

    onPortalMounted({ setPortalState }: { setPortalState: SetPortalState }) {
      dialogues.internal.isPortalMounted = true;
      dialogues.internal.setPortalState = setPortalState;
    },

    onPortalUnmounted() {
      dialogues.internal.isPortalMounted = false;
      dialogues.internal.setPortalState = () => {};
    },

    setPortalState: (() => {}) as SetPortalState,
  },
};

main();

function main() {
  dialogues.internal.state.onChange((state) => {
    dialogues.internal.setPortalState(state.clone());
  });
}

export type SetPortalState = (state: RdState) => void;
