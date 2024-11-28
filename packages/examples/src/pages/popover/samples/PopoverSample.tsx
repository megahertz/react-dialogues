import { Button, Dialog, Footer, Popover, TextField } from 'react-dialogues';

export function PopoverSample() {
  return (
    <Footer align="left">
      <Popover
        content={
          <Dialog
            buttons={['Cancel', 'Save']}
            close={null}
            title="Popover sample"
          >
            <TextField label="Name:" />
          </Dialog>
        }
        placement="top-start"
        triggers={['click']}
      >
        <Button>onClick</Button>
      </Popover>
    </Footer>
  );
}
