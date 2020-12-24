import React from 'react';
import ConfigTable from 'components/ConfigTable';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectElements,
  elementAdded,
  elementDeleted,
  elementsDeleted,
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

  const addRow = (row) => {
    dispatch(elementAdded(row));
  }

  const deleteRow = (row) => {
    dispatch(elementDeleted(row));
  }

  const deleteRows = (rows) => {
    dispatch(elementsDeleted(rows));
  }

  const updateRow = (rowNewAndOld) => {
    dispatch(elementUpdated(rowNewAndOld));
  }

  const columns = [
    {
      title: 'Element',
      field: 'id',
      sorting: false,
      initialEditValue: 'ele',
      validate: rowData => rowData.id !== ''
    },
    {
      title: 'Node i',
      field: 'i',
      sorting: false,
      validate: rowData => rowData.i !== ''
    },
    {
      title: 'Node j',
      field: 'j',
      sorting: false,
      validate: rowData => rowData.j !== ''
    },
  ];

  return (
    <ConfigTable
      title={'Connectivity'}
      columns={columns}
      data={data}
      addRow={addRow}
      deleteRow={deleteRow}
      deleteRows={deleteRows}
      updateRow={updateRow}
    />
  );
}

export default StrucConnectivityTable;
