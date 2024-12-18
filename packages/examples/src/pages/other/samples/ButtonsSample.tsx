import { useState } from 'react';
import { Button, Footer } from 'react-dialogues';

export function ButtonsSample() {
  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <>
      <h3>Button types</h3>
      <Footer align="left">
        <Button>Primary button</Button>
        <Button type="secondary">Secondary button</Button>
        <Button type="text">Text button</Button>
      </Footer>

      <h3>Disabled</h3>
      <Footer align="left">
        <Button disabled>Primary button</Button>
        <Button disabled type="secondary">
          Secondary button
        </Button>
        <Button disabled type="text">
          Text button
        </Button>
      </Footer>

      <h3>Interaction</h3>
      <Footer align="left">
        <Button loading>Loading</Button>
        <Button
          loading={btnLoading}
          onClick={() => {
            setBtnLoading(true);
            setTimeout(() => setBtnLoading(false), 1000);
          }}
        >
          setTimeout
        </Button>
        <Button
          onClick={async () =>
            new Promise((r) => {
              setTimeout(r, 1000);
            })
          }
        >
          Async onClick handler
        </Button>
        <Button
          onClick={async () => {
            throw new Error('test');
          }}
        >
          Error handling
        </Button>
      </Footer>
    </>
  );
}
