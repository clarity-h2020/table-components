import React from "react";
import ReactDOM from 'react-dom';
import 'react-table/react-table.css';
import TableComponent from './commons/TableComponent';
import SimpleLegendComponent from './commons/SimpleLegendComponent';

//const HazardLocalEffectsTable = () => {
//    return (<img width={1058} height={578} src='../../../../../../modules/custom/map-component/src/img/04-VA-03-table.png' />);
//};


export default class HazardLocalEffectsTable extends React.Component {
  constructor(props) {
    super(props);
    var d = [{
      hazard: 'Heat Wave Duration',
      baseline: "Medium",
      earlyResponseScenario: "Low",
      effectiveMeasuresScenario: "Medium",
      businessAsUsualScenario: "High",
      period: "2030-2040"
    }, {
      hazard: 'River Flooding',
      baseline: "Medium",
      earlyResponseScenario: "Medium",
      effectiveMeasuresScenario: "Medium",
      businessAsUsualScenario: "Medium",
      period: "2030-2040"
    }, {
      hazard: 'Heat Wave Duration',
      baseline: "Medium",
      earlyResponseScenario: "Low",
      effectiveMeasuresScenario: "Medium",
      businessAsUsualScenario: "High",
      period: "2041-2070"
    }, {
      hazard: 'River Flooding',
      baseline: "Medium",
      earlyResponseScenario: "High",
      effectiveMeasuresScenario: "Medium",
      businessAsUsualScenario: "High",
      period: "2041-2070"
    }];
    this.state = {
      data: d,
      allData: d,

      columns: [{
        Header: ' ',
        columns: [{
          Header: 'Hazard',
          accessor: 'hazard'
        }] }, {
        Header: 'Current (1971 - 2000)',
        columns: [{
          Header: 'Baseline',
          accessor: 'baseline',
          Cell: this.rowWithColor
        }] }, {
        Header: React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            null,
            'Future Climate (change compared to baseline)'
          ),
          React.createElement(
            'select',
            { id: 'futureScenario-combo', onChange: this.changeFutureScenario.bind(this), style: { "marginLeft": '10px' } },
            this.createOptions(d)
          )
        ),
        columns: [{
          Header: 'RCP 2.6 (Early Response Scenario)',
          accessor: 'earlyResponseScenario',
          Cell: this.rowWithColor
        }, {
          Header: 'RCP 4.5 (Effective Measures Scenario)',
          accessor: 'effectiveMeasuresScenario',
          Cell: this.rowWithColor
        }, {
          Header: 'RCP 8.5 (Business as Usual Scenario)',
          accessor: 'businessAsUsualScenario',
          Cell: this.rowWithColor
        }] }],
      legend: [{ name: 'Low: of no concern for the study', color: '#57d500' }, { name: "Medium: will probably affect some types of elements", color: '#ffbf00' }, { name: "High: will most probably affect some types of elements", color: '#ff2e00' }]
    };
  }

  createOptions(d) {
    var options = [];
    var periods = [];

    for (var i = 0; i < d.length; ++i) {
      var obj = d[i];
      if (periods.findIndex(val => {
        return val === obj.period;
      }) === -1) {
        options.push(React.createElement(
          'option',
          { value: obj.period },
          obj.period
        ));
        periods.push(obj.period);
      }
    }

    return options;
  }

  rowWithColor(row) {
    return React.createElement(
      'span',
      { style: {
          color: row.value === 'High' ? '#ff2e00' : row.value === 'Medium' ? '#ffbf00' : '#57d500'
        } },
      row.value
    );
  }

  componentDidMount() {
    this.changeFutureScenario();
  }

  changeFutureScenario() {
    const combo = document.getElementById('futureScenario-combo');
    console.log('scenario changed: ' + combo.value);
    var selectedData = [];

    for (var i = 0; i < this.state.allData.length; ++i) {
      var obj = this.state.allData[i];
      if (obj.period === combo.value) {
        selectedData.push(obj);
      }
    }

    this.setState({
      data: selectedData
    });
  }

  render() {
    const header = "The following table shows the previously selected hazards, their indices and their current situation for the selected period, as well as their probable occurances for the three future scenarios (early response, effective measures and business as usual).";
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          'Hazard estimates'
        )
      ),
      React.createElement(
        'div',
        null,
        React.createElement(TableComponent, {
          data: this.state.data,
          columns: this.state.columns,
          header: header
        })
      ),
      React.createElement(
        'div',
        null,
        React.createElement(SimpleLegendComponent, {
          data: this.state.legend
        })
      )
    );
  }

}

//export default HazardLocalEffectsTable;

if (document.getElementById('hazardLocalEffects-table-container') != null) {
  ReactDOM.render(React.createElement(HazardLocalEffectsTable, null), document.getElementById('hazardLocalEffects-table-container'));
  document.getElementById('hazardLocalEffects-table-container').style.width = "100%";
}