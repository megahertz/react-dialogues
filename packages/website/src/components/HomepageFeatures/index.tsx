import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';
import { Button, Modal, Toast, Tooltip } from 'react-dialogues';
import styles from './styles.module.css';

function ModalFeature() {
  function showModal() {
    Modal.show('Hello!', { title: 'Hi' });
  }

  async function showConfirm() {
    const [action] = await Modal.show({
      title: 'Confirm',
      content: 'Click OK to confirm',
      buttons: ['Cancel', 'OK'],
    });
    if (action === 'ok') {
      Toast.success('OK clicked');
    }
  }

  return (
    <div className={styles.feature}>
      <Heading as="h3">Modal</Heading>
      <p>
        Show dialogs with a single function call. Get user responses via
        Promises.
      </p>
      <div className={styles.buttons}>
        <Button onClick={showModal}>Basic Modal</Button>
        <Button
          onClick={() => {
            showConfirm();
          }}
        >
          Confirm
        </Button>
      </div>
      <CodeBlock language="jsx">
        {`Modal.show('Hello!', { title: 'Hi' });

const [action] = await Modal.show({
  title: 'Confirm',
  content: 'Click OK to confirm',
  buttons: ['Cancel', 'OK'],
});

if (action === 'ok') {
  Toast.success('OK clicked');
}`}
      </CodeBlock>
    </div>
  );
}

function ToastFeature() {
  async function deleteWithUndo() {
    const [action] = await Toast.info('Item deleted', {
      duration: 5000,
      buttons: ['Undo', <Button value="new">Create new</Button>],
    });

    if (action === 'undo') {
      Toast.success('Restored!');
    } else if (action === 'new') {
      Toast.success('New item created!');
    }
  }

  return (
    <div className={styles.feature}>
      <Heading as="h3">Toast</Heading>
      <p>
        Display notifications with auto-dismiss, progress bars, and multiple
        placements.
      </p>
      <div className={styles.buttons}>
        <Button onClick={() => Toast.success('Saved!')}>Success</Button>
        <Button onClick={() => Toast.warning('Failed to save')}>Warning</Button>
        <Button onClick={deleteWithUndo}>Delete Item</Button>
      </div>
      <CodeBlock language="jsx">
        {`Toast.success('Saved!');

// Await user action with buttons
const [action] = await Toast.info('Item deleted', {
  duration: 5000,
  buttons: ['Undo', <Button value="new">Create new</Button>],
});

if (action === 'undo' && await undo()) {
  Toast.success('Restored!');
} else if (action === 'new') {
  createNewItem();
}`}
      </CodeBlock>
    </div>
  );
}

function TooltipFeature() {
  return (
    <div className={styles.feature}>
      <Heading as="h3">Tooltip & Popover</Heading>
      <p>Add contextual hints with tooltips or rich content with popovers.</p>
      <div className={styles.buttons}>
        <Tooltip content="I'm a tooltip!" placement="top">
          <Button>Hover me</Button>
        </Tooltip>
        <Tooltip content="Bottom tooltip" placement="bottom">
          <Button type="secondary">Bottom</Button>
        </Tooltip>
        <Tooltip content="Click also works" triggers={['click']}>
          <Button type="secondary">Click me</Button>
        </Tooltip>
      </div>
      <CodeBlock language="jsx">
        {`<Tooltip content="I'm a tooltip!">
  <Button>Hover me</Button>
</Tooltip>`}
      </CodeBlock>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.grid}>
          <ModalFeature />
          <ToastFeature />
          <TooltipFeature />
        </div>
      </div>
    </section>
  );
}
