import { Footer, Tooltip } from 'react-dialogues';
import styles from './ComplexTargetsSample.module.css';

export function ComplexTargetsSample() {
  const rows = Array.from({ length: 5 }).map((_, index) => ({
    id: index + 1,
    name: `Row ${index + 1}`,
    tooltip: `Tooltip for Row ${index + 1}`,
  }));

  return (
    <Footer align="left">
      <table className={styles.table}>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <Tooltip content={row.tooltip} key={row.id} placement="right">
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
              </tr>
            </Tooltip>
          ))}
        </tbody>
      </table>
    </Footer>
  );
}
