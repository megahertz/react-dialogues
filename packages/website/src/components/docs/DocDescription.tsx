import { type ReactNode } from 'react';
import styles from './docs.module.css';

export function DocDescription({ children }: { children: ReactNode }) {
  return <div className={styles.docDescription}>{children}</div>;
}
