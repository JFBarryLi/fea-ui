import React, { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import MaterialTable from 'material-table';

const iconStyle = {
  color: '#ffa41b',
  padding: 0
}

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} style={iconStyle} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
};

const ConfigTable = (props) => {
  const localization = {
    header: {
      actions: ''
    },
    body: {
      editRow: {
        deleteText: ''
      }
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
        index % 2 === 0 ? '#ffffff' : '#f6f6f6'
    }),
    padding: 'dense'
  };

  const style = {
    boxShadow: 'none'
  };

  const handleDeleteRows = (event, rowData) => {
    let _data = [...props.data];
    rowData.forEach(rd => {
      _data = _data.filter(t => t.tableData.id !== rd.tableData.id);
    });
    props.setData(_data);
  };

  const actions = [
    {
      tooltip: 'Remove All Selected Users',
      icon: tableIcons.Delete,
      onClick: handleDeleteRows
    }
  ];

  const editable = {
    onRowAdd: newData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!newData.name) {
            reject();
          } else {
            props.setData([...props.data, newData]);

            resolve();
          }
        }, 0)
      }),
    onRowUpdate: (newData, oldData) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataUpdate = [...props.data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          props.setData([...dataUpdate]);

          resolve();
        }, 0)
      }),
    onRowDelete: oldData =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const dataDelete = [...props.data];
          const index = oldData.tableData.id;
          dataDelete.splice(index, 1);
          props.setData([...dataDelete]);

          resolve()
        }, 0)
      }),
      };

  return (
    <MaterialTable
      icons={tableIcons}
      localization={localization}
      options={options}
      columns={props.columns}
      data={props.data}
      editable={editable}
      style={style}
      actions={actions}
    />
  );
}

export default ConfigTable;
