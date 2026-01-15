import Heading from '@theme/Heading';
import { Button, Modal, Toast, Tooltip } from 'react-dialogues';
import styles from './styles.module.css';

function ModalFeature() {
  function showModal() {
    Modal.show({
      title: 'Welcome',
      content: 'Modals are easy with react-dialogues!',
      buttons: ['Cancel', 'OK'],
    });
  }

  async function showConfirm() {
    const [action] = await Modal.show({
      title: 'Confirm Action',
      content: 'Are you sure you want to proceed?',
      type: 'warning',
      buttons: ['Cancel', 'OK'],
    });
    Toast.show(action === 'ok' ? 'Confirmed!' : 'Cancelled', {
      type: action === 'ok' ? 'success' : 'info',
    });
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
        <Button onClick={showConfirm} type="secondary">
          Confirm
        </Button>
      </div>
      <pre className={styles.code}>
        {`Modal.show('Hello!', { title: 'Hi' });

const [action] = await Modal.show({
  title: 'Confirm',
  buttons: ['Cancel', 'OK'],
});`}
      </pre>
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
        <Button onClick={() => Toast.success('Operation completed!')}>
          Success
        </Button>
        <Button
          onClick={() => Toast.error('Something went wrong')}
          type="secondary"
        >
          Error
        </Button>
        <Button onClick={() => Toast.info('Did you know?')} type="secondary">
          Info
        </Button>
      </div>
      <pre className={styles.code}>
        {`Toast.success('Saved!');
Toast.error('Failed to save');
Toast.info('Tip: Try clicking...');`}
      </pre>
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
      <pre className={styles.code}>
        {`<Tooltip content="Helpful hint">
  <Button>Hover me</Button>
</Tooltip>`}
      </pre>
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
