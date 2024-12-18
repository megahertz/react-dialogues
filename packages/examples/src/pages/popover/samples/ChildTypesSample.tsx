import { Component } from 'react';
import { Button, ButtonProps, Footer, Tooltip } from 'react-dialogues';
import styles from './ChildTypesSample.module.css';

export function ChildTypesSample() {
  return (
    <>
      <Footer align="left">
        <Tooltip content="Tooltip" placement="bottom">
          <Button>Forward ref</Button>
        </Tooltip>
        <Tooltip content="Tooltip" placement="bottom">
          Text
        </Tooltip>
        <Tooltip content="Tooltip" placement="bottom">
          <FunctionalComponent>Functional component</FunctionalComponent>
        </Tooltip>
        <Tooltip content="Tooltip" placement="bottom">
          <ClassComponent>Class component</ClassComponent>
        </Tooltip>
      </Footer>
      <Footer align="left">
        <TableRowSample />
      </Footer>
    </>
  );
}

function FunctionalComponent(props: ButtonProps) {
  return <Button {...props} />;
}

// eslint-disable-next-line react/prefer-stateless-function
class ClassComponent extends Component {
  render() {
    return <Button {...this.props} />;
  }
}

export function TableRowSample() {
  const rows = Array.from({ length: 5 }).map((_, index) => ({
    id: index + 1,
    name: `Row ${index + 1}`,
    tooltip: `Tooltip for Row ${index + 1}`,
  }));

  return (
    <table className={`${styles.table} test-hidden`}>
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
  );
}
