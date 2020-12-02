import React, { forwardRef, useState } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from 'material-table'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const ConfigTable = (props) => {
  const columns = [
    {
      title: 'Name',
      field: 'name',
      editable: 'never',
      sorting: false,
      initialEditValue: 'node',
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

  const [data, setData] = useState([
    { name: 'node1', x: 0, y: 0, z: 0 },
  ]);

  const localization = {
    header: {
      actions: ''
    }
  };

  const options = {
    search: false,
    draggable: false,
    showTitle: false,
    pageSizeOptions: [],
    selection: true,
    rowStyle: (rowData, index) => ({
      backgroundColor:
        index % 2 === 0 ? "#ffffff" : "#f6f6f6"
    })
  };

  const style = {
    boxShadow: 'none'
  };

  const actions = [
    {
      tooltip: 'Remove All Selected Users',
      icon: tableIcons.Delete,
      onClick: (evt, data) => console.log(data)
    }
  ];

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          setData([...data, newData]);

          resolve();
        }, 0)
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);

          resolve();
        }, 0)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataDelete = [...data];
          const index = oldData.tableData.id;
          dataDelete.splice(index, 1);
          setData([...dataDelete]);

          resolve()
        }, 0)
      }),
      };

  return (
    <MaterialTable
      icons={tableIcons}
      localization={localization}
      options={options}
      columns={columns}
      data={data}
      editable={editable}
      style={style}
      actions={actions}
    />
  );
}

export default ConfigTable;
