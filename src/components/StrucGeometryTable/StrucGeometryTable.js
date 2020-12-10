import React from 'react';
import ConfigTable from 'components/ConfigTable';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectNodes,
  nodeAdded,
  nodeDeleted,
  nodeUpdated
} from 'slices/nodes';

const StrucGeometryTable = () => {
  const nodalCoords = useSelector(selectNodes);
  const data = [];
  for (const n in nodalCoords) {
    data.push({
      'id': nodalCoords[n].id,
      'x': nodalCoords[n].x,
      'y': nodalCoords[n].y,
      'z': nodalCoords[n].z
    });
  }

  const dispatch = useDispatch();

  const addData = (row) => {
    dispatch(nodeAdded(row));
  }

  const deleteData = (row) => {
    dispatch(nodeDeleted(row));
  }

  const updateData = (rowNewAndOld) => {
    dispatch(nodeUpdated(rowNewAndOld));
  }

  const columns = [
    {
      title: 'Name',
      field: 'id',
      sorting: false,
      validate: rowData => rowData.id !== ''
    },
    {
      title: 'X',
      field: 'x',
      type: 'numeric',
      sorting: false,
      initialEditValue: 0,
      validate: rowData => !isNaN(rowData.x)
    },
    {
      title: 'Y',
      field: 'y',
      type: 'numeric',
      sorting: false,
      initialEditValue: 0,
      validate: rowData => !isNaN(rowData.y)
    },
    {
      title: 'Z',
      field: 'z',
      type: 'numeric',
      sorting: false,
      initialEditValue: 0,
      validate: rowData => !isNaN(rowData.z)
    },
  ];

  return (
    <ConfigTable
      columns={columns}
      data={data}
      addData={addData}
      deleteData={deleteData}
      updateData={updateData}
    />
  );
}

export default StrucGeometryTable;
