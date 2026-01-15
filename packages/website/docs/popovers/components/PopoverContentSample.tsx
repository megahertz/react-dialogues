import { Button, Dialog, Footer, Popover, TextField } from 'react-dialogues';

export function PopoverContentSample() {
  return (
    <Footer align="left">
      <Popover
        content={
          <Dialog
            buttons={['Cancel', 'Save']}
            close={null}
            title="Edit Name"
            style={{ width: '240px' }}
          >
            <TextField label="Name:" />
          </Dialog>
        }
        placement="bottom-start"
        triggers={['click']}
      >
        <Button>Edit</Button>
      </Popover>
    </Footer>
  );
}
