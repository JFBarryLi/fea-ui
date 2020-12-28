import React from 'react';
import ConfigTable from 'components/ConfigTable';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectLoads,
  loadAdded,
  loadDeleted,
  loadsDeleted,
  loadUpdated
} from 'slices/loads';

const StrucLoadTable = () => {
  const loads = useSelector(selectLoads);
  const data = [];
  for (const l in loads) {
    data.push({
      'node': loads[l].node,
      'u1': loads[l].u1,
      'u2': loads[l].u2,
      'u3': loads[l].u3
    });
  }

  const dispatch = useDispatch();

  const addRow = (row) => {
    dispatch(loadAdded(row));
  }

  const deleteRow = (row) => {
    dispatch(loadDeleted(row));
  }

  const deleteRows = (rows) => {
    dispatch(loadsDeleted(rows));
  }

  const updateRow = (rowNewAndOld) => {
    dispatch(loadUpdated(rowNewAndOld));
  }

  const columns = [
    {
      title: 'Node',
      field: 'node',
      sorting: false,
      initialEditValue: 'node',
      validate: rowData => rowData.id !== ''
    },
    {
      title: 'Fx',
      field: 'u1',
      type: 'numeric',
      sorting: false,
      initialEditValue: 0,
      validate: rowData => !isNaN(rowData.u1)
    },
    {
      title: 'Fy',
      field: 'u2',
      type: 'numeric',
      sorting: false,
      initialEditValue: 0,
      validate: rowData => !isNaN(rowData.u2)
    },
    {
      title: 'Fz',
      field: 'u3',
      type: 'numeric',
      sorting: false,
      initialEditValue: 0,
      validate: rowData => !isNaN(rowData.u3)
    },
  ];

  return (
    <ConfigTable
      title={'Load'}
      columns={columns}
      data={data}
      addRow={addRow}
      deleteRow={deleteRow}
      deleteRows={deleteRows}
      updateRow={updateRow}
    />
  );
}

export default StrucLoadTable;
