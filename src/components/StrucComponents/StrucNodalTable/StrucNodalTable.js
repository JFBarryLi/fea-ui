import React from 'react';
import ConfigTable from 'components/ConfigTable';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectNodes,
  nodeAdded,
  nodeDeleted,
  nodesDeleted,
  nodeUpdated
} from 'slices/nodes';
import { selectElements } from 'slices/elements';

const StrucNodalTable = () => {
  const nodalCoords = useSelector(selectNodes);
  const elements = useSelector(selectElements);
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

  const addRow = (row) => {
    dispatch(nodeAdded(row));
  }

  const associateElements = (rows) => {
    const associatedEles = rows;
    if (associatedEles.length === undefined) {
      associatedEles['eles'] = elements.filter(e => e['i'] === rows['id'] || e['j'] === rows['id']);
      return associatedEles;
    }
    associatedEles.forEach(row => {
      row['eles'] = elements.filter(e => e['i'] === row['id'] || e['j'] === row['id']);
    });
    return associatedEles;
  }

  const deleteRow = (row) => {
    row = associateElements(row);
    dispatch(nodeDeleted(row));
  }

  const deleteRows = (rows) => {
    rows = associateElements(rows);
    dispatch(nodesDeleted(rows));
  }

  const updateRow = (rowNewAndOld) => {
    dispatch(nodeUpdated(rowNewAndOld));
  }

  const columns = [
    {
      title: 'Node',
      field: 'id',
      sorting: false,
      initialEditValue: 'node',
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
      title={'Nodal'}
      columns={columns}
      data={data}
      addRow={addRow}
      deleteRow={deleteRow}
      deleteRows={deleteRows}
      updateRow={updateRow}
    />
  );
}

export default StrucNodalTable;
