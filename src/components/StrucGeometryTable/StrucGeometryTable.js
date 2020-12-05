import React from 'react';
import ConfigTable from 'components/ConfigTable';
import { useSelector, useDispatch } from 'react-redux';
import { selectNodes, updateNodes } from 'slices/trussSlice';

const StrucGeometryTable = () => {
  const nodalCoords = useSelector(selectNodes);
  const data = [];
  for (const n in nodalCoords) {
    let position = nodalCoords[n];
    position['name'] = n;
    data.push(position);
  }

  const dispatch = useDispatch();

  const setData = (tdata) => {
    const formattedData = [];
    for (const d in tdata) {
      let node = {};
      node[tdata[d].name] = {
        'x': tdata[d].x,
        'y': tdata[d].y,
        'z': tdata[d].z
      }
      formattedData.push(node);
    }
    dispatch(updateNodes(formattedData));
  }

  const columns = [
    {
      title: 'Name',
      field: 'name',
      sorting: false,
      validate: rowData => rowData.name !== ''
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
      setData={setData}
    />
  );
}

export default StrucGeometryTable;
