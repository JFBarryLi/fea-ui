import React from 'react';
import ConfigTable from 'components/ConfigTable';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectElements,
  elementAdded,
  elementDeleted,
  elementUpdated
} from 'slices/elements';

const StrucConnectivityTable = () => {
  const elements = useSelector(selectElements);
  const data = [];
  for (const e in elements) {
    data.push({
      'id': elements[e].id,
      'i': elements[e].i,
      'j': elements[e].j
    });
  }

  const dispatch = useDispatch();

  const addData = (row) => {
    dispatch(elementAdded(row));
  }

  const deleteData = (row) => {
    dispatch(elementDeleted(row));
  }

  const updateData = (rowNewAndOld) => {
    dispatch(elementUpdated(rowNewAndOld));
  }

  const columns = [
    {
      title: 'Name',
      field: 'id',
      sorting: false,
      validate: rowData => rowData.id !== ''
    },
    {
      title: 'Node i',
      field: 'i',
      sorting: false,
      validate: rowData => rowData.id !== ''
    },
    {
      title: 'Node j',
      field: 'j',
      sorting: false,
      validate: rowData => rowData.id !== ''
    },
  ];

  return (
    <ConfigTable
      title={'Connectivity'}
      columns={columns}
      data={data}
      addData={addData}
      deleteData={deleteData}
      updateData={updateData}
    />
  );
}

export default StrucConnectivityTable;
