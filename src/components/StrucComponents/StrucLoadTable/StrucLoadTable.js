import React from 'react';
import ConfigTable from 'components/ConfigTable';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectLoads,
  loadAdded,
  loadDeleted,
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

  const addData = (row) => {
    dispatch(loadAdded(row));
  }

  const deleteData = (row) => {
    dispatch(loadDeleted(row));
  }

  const updateData = (rowNewAndOld) => {
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
      addData={addData}
      deleteData={deleteData}
      updateData={updateData}
    />
  );
}

export default StrucLoadTable;
