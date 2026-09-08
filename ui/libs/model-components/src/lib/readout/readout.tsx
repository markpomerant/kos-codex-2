import styled from '@emotion/styled';

/** A label/value table for model state. Presentational; values are passed in. */
export const Readout = ({ rows }: { rows: [string, unknown][] }) => (
  <Table>
    <tbody>
      {rows.map(([label, value]) => (
        <tr key={label}>
          <th>{label}</th>
          <td data-testid={label}>{String(value)}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const Table = styled.table`
  border-collapse: collapse;
  font-family: system-ui, sans-serif;
  th {
    text-align: left;
    font-weight: 500;
    padding: 0.2rem 1rem 0.2rem 0;
    opacity: 0.7;
  }
  td {
    font-variant-numeric: tabular-nums;
    padding: 0.2rem 0;
    min-width: 6rem;
  }
`;
