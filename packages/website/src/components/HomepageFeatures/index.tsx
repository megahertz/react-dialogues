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
          type="secondary"
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
  return (
    <div className={styles.feature}>
      <Heading as="h3">Toast</Heading>
      <p>
        Display notifications with auto-dismiss, progress bars, and multiple
        placements.
      </p>
      <div className={styles.buttons}>
        <Button onClick={() => Toast.success('Saved!')}>Success</Button>
        <Button onClick={() => Toast.error('Failed to save')} type="secondary">
          Error
        </Button>
        <Button
          onClick={() => Toast.info('Tip: Try clicking...')}
          type="secondary"
        >
          Info
        </Button>
      </div>
      <CodeBlock language="jsx">
        {`Toast.success('Saved!');
Toast.error('Failed to save');
Toast.info('Tip: Try clicking...');`}
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
