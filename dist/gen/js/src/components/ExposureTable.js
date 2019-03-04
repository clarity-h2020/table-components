import React from "react";
import ReactDOM from 'react-dom';
import TableComponent from './commons/TableComponent';

//const ExposureTable = () => {
//    return (<img width={1058} height={578} src='../../../../../../modules/custom/map-component/src/img/03-EE-03-table.png' />);
//};


export default class ExposureTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        hazard: 'HW,PF,FL',
        elementAtRisk: "Population",
        classes: "Age group 0-14",
        values: "1.2",
        unit: "pop/km2"
      }, {
        hazard: 'HW,PF,FL',
        elementAtRisk: "Population",
        classes: "Age group 15-64",
        values: "3.2",
        unit: "pop/km2"
      }, {
        hazard: 'HW,PF,FL',
        elementAtRisk: "Population",
        classes: ">65",
        values: "3.5",
        unit: "pop/km2"
      }, {
        hazard: 'PF,FL',
        elementAtRisk: "Buildings",
        classes: "Continuous Residential (S.L. > 80%)",
        values: "2.1",
        unit: "m3/m2"
      }, {
        hazard: 'PF,FL',
        elementAtRisk: "Buildings",
        classes: "Med-Hi Density Discontinuous Res. (30% < S.L. < 80%)",
        values: "3.2",
        unit: "m3/m2"
      }, {
        hazard: 'PF,FL',
        elementAtRisk: "Buildings",
        classes: "Low Density Discontinuous Res. (S.L. < 30%)",
        values: "2.5",
        unit: "m3/m2"
      }, {
        hazard: 'PF,FL',
        elementAtRisk: "Buildings",
        classes: "Non Residential",
        values: "4.3",
        unit: "m3/m2"
      }, {
        hazard: 'PF,FL',
        elementAtRisk: "Infrastructure",
        classes: "Roads",
        values: "3.3",
        unit: "ml"
      }, {
        hazard: 'PF,FL',
        elementAtRisk: "Infrastructure",
        classes: "Railways",
        values: "3.2",
        unit: "ml"
      }],
      columns: [{
        Header: 'Hazards',
        id: 'Hazards',
        accessor: 'hazard'
      }, {
        Header: 'Element at risk',
        id: 'ElementAtRisk',
        accessor: 'elementAtRisk'
      }, {
        Header: 'Classes',
        accessor: 'classes'
      }, {
        Header: 'values',
        accessor: 'values'
      }, {
        Header: 'Unit',
        accessor: 'unit'
      }],
      expanded: ["Hazards", "ElementAtRisk"]
    };
  }

  init() {
    this.setState({
      init: true
    });
  }

  render() {
    //      const header = "The following table and the associated chart show the development of different categories' elements for several scenarios. There are always 3 scenarios considered: 1) the current today's rate development, 2) low rate development and 3) high rate development for the selected time period. The values will be used in assessing the vulnarability, risk and impact in the next steps.";
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'Exposure elements'
        )
      ),
      React.createElement(
        'div',
        null,
        React.createElement(TableComponent, {
          data: this.state.data,
          columns: this.state.columns
          //            header={header}
          , pivotBy: ["Hazards", "ElementAtRisk"]
          //            expanded={["Hazards", "ElementAtRisk"]}
        })
      )
    );
  }

}

//export default ExposureTable;

if (document.getElementById('exposure-table-container') != null) {
  ReactDOM.render(React.createElement(ExposureTable, null), document.getElementById('exposure-table-container'));
  document.getElementById('exposure-table-container').style.width = "100%";
}