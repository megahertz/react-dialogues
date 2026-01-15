import { type ReactNode } from 'react';
import styles from './docs.module.css';

export function SamplePreview({ children }: { children: ReactNode }) {
  return <div className={styles.samplePreview}>{children}</div>;
}
