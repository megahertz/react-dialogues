import { render } from 'react-dom';
import Portal from '../portal/Portal';
import AmodalState from './AmodalState';

export const amodal = {
  config: {
    getContainerElement() {
      const existedDiv = document.getElementById('am-container');
      if (existedDiv) {
        console.log('existed div');
        return existedDiv;
      }

      console.log('new div');
      const div = document.createElement('div');
      div.setAttribute('id', 'am-container');
      document.body.appendChild(div);
      return div;
    },
  },

  /** @internal */
  internal: {
    state: new AmodalState(),
    isPortalMounted: false,

    ensurePortalRendered() {
      console.log('Portal', Portal);

      if (!amodal.internal.isPortalMounted) {
        render(<Portal />, amodal.config.getContainerElement());
      }
    },

    onPortalMounted({ setPortalState }: { setPortalState: SetPortalState }) {
      console.log('onPortalMounted');
      amodal.internal.isPortalMounted = true;
      amodal.internal.setPortalState = setPortalState;
    },

    onPortalUnmounted() {
      console.log('onPortalUnmounted');
      amodal.internal.isPortalMounted = false;
      amodal.internal.setPortalState = () => {};
    },

    setPortalState: (() => {}) as SetPortalState,
  },
};

main();

function main() {
  amodal.internal.state.onChange((state) => {
    amodal.internal.setPortalState(state.clone());
  });
}

export type SetPortalState = (state: AmodalState) => void;
