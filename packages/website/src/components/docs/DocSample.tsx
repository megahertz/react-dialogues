import { type ReactNode } from 'react';
import styles from './docs.module.css';

export function DocSample({ children }: { children: ReactNode }) {
  return <div className={styles.docSample}>{children}</div>;
}
