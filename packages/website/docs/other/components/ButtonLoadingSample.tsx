import { Button, Footer } from 'react-dialogues';

export function ButtonLoadingSample() {
  return (
    <Footer align="left">
      <Button loading>Loading</Button>
      <Button
        onClick={async () =>
          new Promise((resolve) => {
            setTimeout(resolve, 1000);
          })
        }
      >
        Async Handler
      </Button>
    </Footer>
  );
}
