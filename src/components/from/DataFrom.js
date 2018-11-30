import React from 'react';
import TreeList, { Column, ColumnChooser, HeaderFilter, SearchPanel, Selection, Lookup, Editing } from 'devextreme-react/tree-list';
import { employees, priorities, tasks } from './data.js';

class DataFrom extends React.Component {
  constructor(props) {

    super(props);
    this.state = { events: [] };
    this.logEvent = this.logEvent.bind(this);
    this.onEditingStart = this.EditingStart.bind(this);
    this.onInitNewRow = this.onInitNewRow.bind(this);
    this.onRowUpdating = this.onRowUpdating.bind(this);
    this.onRowUpdated = this.onRowUpdated.bind(this);
    //this.onValueChanged = this.onValueChanged.bind(this);
        /*
    this.onRowInserting = this.onRowInserting.bind(this);
    this.onRowInserted = this.onRowInserted.bind(this);

    this.onRowRemoving = this.onRowRemoving.bind(this);
    this.onRowRemoved = this.onRowRemoved.bind(this);
    */
    this.clearEvents = this.clearEvents.bind(this);

  }

  logEvent(eventName) {

    this.setState((state) => {
      return { events: [eventName].concat(state.events) };
    });
  }

  onChange = (e) => {
    console.log(e)
  }

  EditingStart = (e) => {
    console.log(e)
  }

  onRowUpdating = (e) => {
    console.log(e.data)
  }

  onRowUpdated = (e) => {
    console.log(e.data)
  }

  onInitNewRow = (e) => {

console.log(e.data)
      e.data.Task_Status = "Not Started";
      e.data.Task_Status = "Not Started";
      e.data.Task_Start_Date = new Date();
      e.data.Task_Due_Date = new Date();
  }
  clearEvents() {
    this.setState({ events: [] });
  }

  render() {
    return (
      <TreeList
        showBorders={true}
        columnAutoWidth={true}
        wordWrapEnabled={true}
        keyExpr={'Task_ID'}
        parentIdExpr={'Task_Parent_ID'}
        id={'gridContainer'}
        dataSource={dataSourceOptions}
        allowColumnReordering={true}
        onEditingStart={this.onEditingStart}
        onInitNewRow={this.onInitNewRow}
        onRowInserting={this.onRowInserting}
        onRowInserted={this.onRowInserted}
        onRowUpdating={this.onRowUpdating}
        onRowUpdated={this.onRowUpdated}
        onRowRemoving={this.onRowRemoving}
        onRowRemoved={this.onRowRemoved}
      >
        <Editing
          mode={'cell'}
          allowAdding={true}
          allowUpdating={true}
          allowDeleting={true}
        >
        </Editing>
        <SearchPanel visible={true} width={250} />
        <HeaderFilter visible={true} />
        <Selection mode={'multiple'} />
        <ColumnChooser enabled={true} />
        <Column dataField={'Task_Subject'} width={300} />
        <Column
          dataField={'Task_Status'}
          caption={'Status'}
          minWidth={100}
        >
          <Lookup dataSource={statuses} />
        </Column>
        <Column
          dataField={'Task_Priority'}
          caption={'Priority'}
          visible={false}
        >
          <Lookup dataSource={priorities} valueExpr={'id'} displayExpr={'value'} />
        </Column>
        <Column
          dataField={'Task_Completion'}
          caption={'% Completed'}
          minWidth={100}
          customizeText={customizeTaskCompletionText}
          visible={false}
        />
        <Column
          dataField={'Task_Start_Date'}
          caption={'Start Date'}
          dataType={'date'}
        />
        <Column
          dataField={'Task_Due_Date'}
          caption={'Due Date'}
          dataType={'date'}
        />

      </TreeList>
    );
  }
}

const dataSourceOptions = tasks;



function customizeTaskCompletionText(cellInfo) {
  return `${cellInfo.valueText}%`;
}

const statuses = [
  'Not Started',
  'Need Assistance',
  'In Progress',
  'Deferred',
  'Completed'
];

export default DataFrom;
