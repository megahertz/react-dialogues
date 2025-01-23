import { Button, Tooltip } from 'react-dialogues';
import styles from './PlacementSample.module.css';

export function PlacementSample() {
  return (
    <div className={styles.root}>
      <div className={styles.centeredRow}>
        <Tooltip content="Tooltip" placement="top-start">
          <Button type="secondary">top-start</Button>
        </Tooltip>
        <Tooltip content="Tooltip" placement="top">
          <Button type="secondary">top</Button>
        </Tooltip>
        <Tooltip content="Tooltip" placement="top-end">
          <Button type="secondary">top-end</Button>
        </Tooltip>
      </div>
      <div className={styles.sidedRow}>
        <Tooltip content="Tooltip" placement="left-start">
          <Button type="secondary">left-start</Button>
        </Tooltip>
        <Tooltip content="Tooltip" placement="right-start">
          <Button type="secondary">right-start</Button>
        </Tooltip>
      </div>
      <div className={styles.sidedRow}>
        <Tooltip content="Tooltip" placement="left">
          <Button type="secondary">left</Button>
        </Tooltip>
        <Tooltip content="Tooltip" placement="right">
          <Button type="secondary">right</Button>
        </Tooltip>
      </div>
      <div className={styles.sidedRow}>
        <Tooltip content="Tooltip" placement="left-end">
          <Button type="secondary">left-end</Button>
        </Tooltip>
        <Tooltip content="Tooltip" placement="right-end">
          <Button type="secondary">right-end</Button>
        </Tooltip>
      </div>
      <div className={styles.centeredRow}>
        <Tooltip content="Tooltip" placement="bottom-start">
          <Button type="secondary">bottom-start</Button>
        </Tooltip>
        <Tooltip content="Tooltip" placement="bottom">
          <Button type="secondary">bottom</Button>
        </Tooltip>
        <Tooltip content="Tooltip" placement="bottom-end">
          <Button type="secondary">bottom-end</Button>
        </Tooltip>
      </div>
    </div>
  );
}
