import React from 'react';
import ConfigTable from 'components/ConfigTable';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectMaterial,
  materialAdded,
  materialDeleted,
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

  const addData = (row) => {
    dispatch(materialAdded(row));
  }

  const deleteData = (row) => {
    dispatch(materialDeleted(row));
  }

  const updateData = (rowNewAndOld) => {
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
      addData={addData}
      deleteData={deleteData}
      updateData={updateData}
    />
  );
}

export default StrucMaterialTable;
