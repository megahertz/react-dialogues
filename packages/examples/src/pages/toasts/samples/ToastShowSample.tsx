import { Button, Footer, Toast } from 'react-dialogues';

export function ToastShowSample() {
  return (
    <>
      <Footer align="left">
        <Button
          onClick={async () => {
            Toast.show({
              content: 'placement: topLeft',
              placement: 'topLeft',
            });
          }}
        >
          Top left
        </Button>
        <Button
          onClick={() => {
            Toast.show({
              content: 'placement: top',
              placement: 'top',
            });
          }}
        >
          Top
        </Button>
        <Button
          onClick={() => {
            Toast.show({
              content: 'placement: topRight',
              placement: 'topRight',
            });
          }}
        >
          Top right
        </Button>
      </Footer>
      <Footer align="left">
        <Button
          onClick={() => {
            Toast.show({
              content: 'placement: bottomLeft',
              placement: 'bottomLeft',
            });
          }}
        >
          Bottom left
        </Button>
        <Button
          onClick={() => {
            Toast.show({
              content: 'placement: bottom',
              placement: 'bottom',
            });
          }}
        >
          Bottom
        </Button>
        <Button
          onClick={() => {
            Toast.show({
              content: 'placement: bottomRight',
              placement: 'bottomRight',
            });
          }}
        >
          Bottom right
        </Button>
      </Footer>
    </>
  );
}
