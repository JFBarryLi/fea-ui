import React from 'react';
import ConfigTable from 'components/ConfigTable';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectMaterial,
  materialAdded,
  materialDeleted,
  materialsDeleted,
  materialUpdated
} from 'slices/material';

const StrucMaterialTable = () => {
  const material = useSelector(selectMaterial);
  const data = [];
  for (const m in material) {
    data.push({
      'ele': material[m].ele,
      'E': material[m].E,
      'A': material[m].A
    });
  }

  const dispatch = useDispatch();

  const addRow = (row) => {
    dispatch(materialAdded(row));
  }

  const deleteRow = (row) => {
    dispatch(materialDeleted(row));
  }

  const deleteRows = (rows) => {
    dispatch(materialsDeleted(rows));
  }

  const updateRow = (rowNewAndOld) => {
    dispatch(materialUpdated(rowNewAndOld));
  }

  const columns = [
    {
      title: 'Element',
      field: 'ele',
      sorting: false,
      initialEditValue: 'ele',
      validate: rowData => rowData.ele !== ''
    },
    {
      title: 'Modulus',
      field: 'E',
      type: 'numeric',
      sorting: false,
      initialEditValue: 0,
      validate: rowData => !isNaN(rowData.E)
    },
    {
      title: 'Area',
      field: 'A',
      type: 'numeric',
      sorting: false,
      initialEditValue: 0,
      validate: rowData => !isNaN(rowData.A)
    }
  ];

  return (
    <ConfigTable
      title={'Material'}
      columns={columns}
      data={data}
      addRow={addRow}
      deleteRow={deleteRow}
      deleteRows={deleteRows}
      updateRow={updateRow}
    />
  );
}

export default StrucMaterialTable;
