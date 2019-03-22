import React from "react";
import ReactDOM from 'react-dom';
import TableComponent from './commons/TableComponent';

//const ExposureTable = () => {
//    return (<img width={1058} height={578} src='../../../../../../modules/custom/map-component/src/img/03-EE-03-table.png' />);
//};


export default class ExposureTable extends React.Component {
  constructor(props) {
    super(props);
    this.request = {
      "type": "eu-gl:exposure-evaluation",
      "bbox": [4650000.0, 1950000.0, 4675000.0, 1975000.0],
      "data": [{
        "hazard": "HW,PF,FL",
        "elementAtRisk": "Population",
        "vulnerabilityClasses": "Age group 0-14",
        "layer": "Exposure:Population_men15_naples",
        "unit": "pop/km2"
      }, {
        "hazard": "HW,PF,FL",
        "elementAtRisk": "Population",
        "vulnerabilityClasses": "Age group 15-64",
        "layer": "Exposure:Population_15to65_naples",
        "unit": "pop/km2"
      }, {
        "hazard": "HW,PF,FL",
        "elementAtRisk": "Population",
        "vulnerabilityClasses": ">65",
        "layer": "Exposure:Population_mayor65_naples",
        "unit": "pop/km2"
      }]
    };

    this.backupData = [{
      hazard: 'HW,PF,FL',
      elementAtRisk: "Population",
      vulnerabilityClasses: "Age group 0-14",
      values: "1.2",
      unit: "pop/km2"
    }, {
      hazard: 'HW,PF,FL',
      elementAtRisk: "Population",
      vulnerabilityClasses: "Age group 15-64",
      values: "3.2",
      unit: "pop/km2"
    }, {
      hazard: 'HW,PF,FL',
      elementAtRisk: "Population",
      vulnerabilityClasses: ">65",
      values: "3.5",
      unit: "pop/km2"
    }, {
      hazard: 'PF,FL',
      elementAtRisk: "Buildings",
      vulnerabilityClasses: "Continuous Residential (S.L. > 80%)",
      values: "2.1",
      unit: "m3/m2"
    }, {
      hazard: 'PF,FL',
      elementAtRisk: "Buildings",
      vulnerabilityClasses: "Med-Hi Density Discontinuous Res. (30% < S.L. < 80%)",
      values: "3.2",
      unit: "m3/m2"
    }, {
      hazard: 'PF,FL',
      elementAtRisk: "Buildings",
      vulnerabilityClasses: "Low Density Discontinuous Res. (S.L. < 30%)",
      values: "2.5",
      unit: "m3/m2"
    }, {
      hazard: 'PF,FL',
      elementAtRisk: "Buildings",
      vulnerabilityClasses: "Non Residential",
      values: "4.3",
      unit: "m3/m2"
    }, {
      hazard: 'PF,FL',
      elementAtRisk: "Infrastructure",
      vulnerabilityClasses: "Roads",
      values: "3.3",
      unit: "ml"
    }, {
      hazard: 'PF,FL',
      elementAtRisk: "Infrastructure",
      vulnerabilityClasses: "Railways",
      values: "3.2",
      unit: "ml"
    }];

    this.state = {
      data: [],
      loading: true,
      columns: [{
        Header: 'Hazards',
        id: 'Hazards',
        accessor: 'hazard',
        Cell: row => React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { title: row.value },
            row.value
          )
        )
      }, {
        Header: 'Element at risk',
        id: 'ElementAtRisk',
        accessor: 'elementAtRisk',
        Cell: row => React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { title: row.value },
            row.value
          )
        )
      }, {
        Header: 'Classes',
        accessor: 'vulnerabilityClasses',
        Cell: row => React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { title: row.value },
            row.value
          )
        )
      }, {
        Header: 'values',
        accessor: 'values',
        Cell: row => React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { title: row.value },
            row.value
          )
        )
      }, {
        Header: 'Unit',
        accessor: 'unit',
        Cell: row => React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { title: row.value },
            row.value
          )
        )
      }],
      expanded: ["Hazards", "ElementAtRisk"]
    };
  }

  init() {
    this.setState({
      init: true
    });
  }

  initServer(server) {
    this.loadDataFromServer(server, this.request);
  }

  loadDataFromServer(server, requestData) {
    const obj = this;

    fetch("https://clarity.meteogrid.com/api/request_exposure", { method: 'POST', body: JSON.stringify(requestData), headers: { 'Content-Type': 'application/json' } }).then(resp => resp.json()).then(function (data) {
      obj.setState({
        allData: data,
        data: data,
        loading: false
      });
    }).catch(function (error) {
      console.log(JSON.stringify(error));
      obj.setState({
        allData: obj.backupData,
        data: obj.backupData
      });
    });
  }

  render() {
    window.tableCom = this;
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
          columns: this.state.columns,
          loading: this.state.loading
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