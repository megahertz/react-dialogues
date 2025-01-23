import { useRef } from 'react';
import { Button, Tooltip } from 'react-dialogues';
import styles from './ScrollSample.module.css';

export function ScrollSample() {
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <div className={styles.scroll}>
      <div className={styles.scrollContent}>
        <Tooltip
          closeTriggers={['clickOutside']}
          content="Test"
          triggers={['click']}
        >
          <Button className="btn" ref={btnRef}>
            onClick
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
