import styled from "styled-components";

// Row
export const RowBase = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 24px;
`;

export const Row = styled(RowBase)`
  & > *:not(:last-child) {
    margin-right: 16rem;
  }
`;

// Column
export const ColumnBase = styled.div`
  display: flex;
  flex: none;
  flex-direction: column;
`;

export const Column = styled(ColumnBase)`
  & > *:not(:last-child) {
    margin-bottom: 0.75rem;
  }
`;
