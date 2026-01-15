import { type ReactNode } from 'react';
import styles from './docs.module.css';

export function DocBlock({ children }: { children: ReactNode }) {
  return <div className={styles.docBlock}>{children}</div>;
}
