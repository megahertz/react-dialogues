import { useState } from 'react';
import {
  Button,
  Footer,
  Toast,
  ToastProps,
  type RdController,
} from 'react-dialogues';

export function ToastItemMethodsSample() {
  const [toast1, setToast1] = useState<RdController<ToastProps>>();
  const [toast2, setToast2] = useState<RdController<ToastProps>>();

  return (
    <>
      <Footer align="left">
        <Button
          onClick={() => {
            setToast1(
              Toast.show({
                children: 'Toast 1',
                onClose: () => setToast1(undefined),
              }),
            );
          }}
        >
          Show Toast 1
        </Button>
        <Button
          onClick={() => {
            setToast2(
              Toast.show({
                children: 'Toast 2',
                role: 'status',
                onClose: () => setToast2(undefined),
              }),
            );
          }}
        >
          Show Toast 2
        </Button>
      </Footer>
      <Footer align="left">
        <Button
          disabled={!toast1}
          onClick={() => {
            toast1?.destroy('apiClose');
          }}
        >
          Close Toast 1
        </Button>
        <Button
          disabled={!toast2}
          onClick={() => {
            toast2?.update({
              duration: 40000,
              children: 'Duration is set to 40 seconds.',
            });
          }}
        >
          Update Toast 2
        </Button>
        <Button
          disabled={!toast1 && !toast2}
          onClick={() => {
            Toast.destroyAll('apiClose');
          }}
        >
          Close All Toasts
        </Button>
      </Footer>
    </>
  );
}
