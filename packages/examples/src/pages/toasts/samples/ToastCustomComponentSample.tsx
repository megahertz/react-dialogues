import type { MouseEvent } from 'react';
import {
  Body,
  Button,
  CancelButton,
  Footer,
  Header,
  Toast,
  type ToastProps,
  OkButton,
} from 'react-dialogues';

export function ToastCustomComponentSample() {
  return <Button onClick={() => CustomToast.show()}>Show custom toast</Button>;
}

function CustomToast(props: ToastProps) {
  function onShowAnotherClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    Toast.info('Another toast');
  }

  return (
    <Toast empty duration={0} {...props}>
      <Header>Custom Toast</Header>
      <Body>This is a custom toast</Body>
      <Footer>
        <CancelButton type="text" />
        <OkButton onClick={onShowAnotherClick}>Show another toast</OkButton>
      </Footer>
    </Toast>
  );
}

CustomToast.show = (props?: ToastProps) => {
  Toast.showCustom(CustomToast, props);
};
