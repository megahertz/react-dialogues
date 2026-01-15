import { Button, Modal } from 'react-dialogues';

export function ModalWithContentSample() {
  return (
    <Button
      onClick={() => {
        Modal.show({
          title: 'Rich Content',
          content: (
            <div>
              <p>
                This modal contains <strong>rich JSX content </strong>.
              </p>
              <ul>
                <li>Item one</li>
                <li>Item two</li>
                <li>Item three</li>
              </ul>
            </div>
          ),
        });
      }}
    >
      Show Rich Content Modal
    </Button>
  );
}
