import React from "react";
import 'react-table/react-table.css';
import ReactTable from "react-table";

const buildRow = (row, i) => {
  let td = Object.keys(row).map((k, j) => {
    return React.createElement(
      "td",
      { key: j },
      row[k]
    );
  });
  return React.createElement(
    "tr",
    { key: i },
    td
  );
};

const buildHeader = header => {
  let th = header.map((k, j) => {
    return React.createElement(
      "th",
      { key: j },
      k
    );
  });
  return React.createElement(
    "tr",
    null,
    th
  );
};

const SimpleTableComponent = props => {
  const { data } = props;
  return React.createElement(
    "table",
    { className: "table table-striped" },
    React.createElement(
      "thead",
      null,
      buildHeader(Object.keys(data[0]))
    ),
    React.createElement(
      "tbody",
      null,
      data.map(buildRow)
    )
  );
};

export default class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: props.expanded
    };
  }

  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        null,
        this.props.header
      ),
      React.createElement("br", null),
      React.createElement(ReactTable, {
        loading: this.props.loading,
        LoadingComponent: this.props.LoadingComponent,
        data: this.props.data,
        columns: this.props.columns,
        defaultPageSize: 10,
        pivotBy: this.props.pivotBy,
        expanded: this.state.expanded
      }),
      React.createElement("br", null),
      React.createElement(
        "div",
        null,
        this.props.footer
      )
    );
  }

}

//export default SimpleLegendTableComponent;