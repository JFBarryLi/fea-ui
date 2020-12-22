import React from 'react';
import ConfigTable from 'components/ConfigTable';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectBoundaries,
  boundaryAdded,
  boundaryDeleted,
  boundaryUpdated
} from 'slices/boundaries';

const StrucBoundaryTable = () => {
  const boundarys = useSelector(selectBoundaries);
  const data = [];
  for (const b in boundarys) {
    data.push({
      'node': boundarys[b].node,
      'u1': boundarys[b].u1,
      'u2': boundarys[b].u2,
      'u3': boundarys[b].u3
    });
  }

  const dispatch = useDispatch();

  const addData = (row) => {
    dispatch(boundaryAdded(row));
  }

  const deleteData = (row) => {
    dispatch(boundaryDeleted(row));
  }

  const updateData = (rowNewAndOld) => {
    dispatch(boundaryUpdated(rowNewAndOld));
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
      title: 'Dx',
      field: 'u1',
      type: 'boolean',
      sorting: false,
    },
    {
      title: 'Dy',
      field: 'u2',
      type: 'boolean',
      sorting: false,
    },
    {
      title: 'Dz',
      field: 'u3',
      type: 'boolean',
      sorting: false,
    },
  ];

  return (
    <ConfigTable
      title={'Restrict'}
      columns={columns}
      data={data}
      addData={addData}
      deleteData={deleteData}
      updateData={updateData}
    />
  );
}

export default StrucBoundaryTable;
