import React from "react";
import ReactDOM from 'react-dom';
import 'react-table/react-table.css';
import TableComponent from './commons/TableComponent';
import SimpleLegendComponent from './commons/SimpleLegendComponent';
import turf from 'turf';
import Wkt from 'wicket';

//const CharacteriseHazardTable = () => {
//    return (<img width={1058} height={578} src='../../../../../../modules/custom/map-component/src/img/01-HC-03-Table.png' />);
//};


export default class CharacteriseHazardTable extends React.Component {
  constructor(props) {
    super(props);
    this.request = {
      "type": "eu-gl:hazard-characterization",
      "bbox": [4466000.0, 2130000.0, 4491000.0, 2155000.0],
      "hazards": [{
        "hazard": "Heat Wave Duration",
        "baseline_thresholds": [{
          "name": "low",
          "lower": "13.47"
        }, {
          "name": "medium",
          "lower": "13.47",
          "upper": "15.90"
        }, {
          "name": "high",
          "upper": "15.90"
        }],
        "future_thresholds": [{
          "name": "low",
          "lower": "9.13"
        }, {
          "name": "medium",
          "lower": "9.13",
          "upper": "16.6"
        }, {
          "name": "high",
          "upper": "16.6"
        }],
        "layers": [{
          "time-period": "2011-2040",
          "layer_ids": {
            "baseline_layer_id": "clarity:Tx75p_consecutive_max_EUR-11_ICHEC-EC-EARTH_historical_r12i1p1_SMHI-RCA4_v1_day_19710101-20001231_netcdf3",
            "rcp26_layer_id": "clarity:Tx75p_consecutive_max_EUR-11_ICHEC-EC-EARTH_rcp26_r12i1p1_SMHI-RCA4_v1_day_20110101-20401231_netcdf3",
            "rcp45_layer_id": "clarity:Tx75p_consecutive_max_EUR-11_ICHEC-EC-EARTH_rcp45_r12i1p1_SMHI-RCA4_v1_day_20110101-20401231_netcdf3",
            "rcp85_layer_id": "clarity:Tx75p_consecutive_max_EUR-11_ICHEC-EC-EARTH_rcp85_r12i1p1_SMHI-RCA4_v1_day_20110101-20401231_netcdf3"
          }
        }, {
          "time-period": "2041-2070",
          "layer_ids": {
            "baseline_layer_id": "clarity:Tx75p_consecutive_max_EUR-11_ICHEC-EC-EARTH_historical_r12i1p1_SMHI-RCA4_v1_day_19710101-20001231_netcdf3",
            "rcp26_layer_id": "clarity:Tx75p_consecutive_max_EUR-11_ICHEC-EC-EARTH_rcp26_r12i1p1_SMHI-RCA4_v1_day_20410101-20701231_netcdf3",
            "rcp45_layer_id": "clarity:Tx75p_consecutive_max_EUR-11_ICHEC-EC-EARTH_rcp45_r12i1p1_SMHI-RCA4_v1_day_20410101-20701231_netcdf3",
            "rcp85_layer_id": "clarity:Tx75p_consecutive_max_EUR-11_ICHEC-EC-EARTH_rcp85_r12i1p1_SMHI-RCA4_v1_day_20410101-20701231_netcdf3"
          }
        }]
      }]
    };
    this.backupData = [{
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
      data: [],
      allData: [],

      columns: this.getColumns([]),
      legend: [{ name: 'Low: of no concern for the study', color: '#57d500' }, { name: "Medium: will probably affect some types of elements", color: '#ffbf00' }, { name: "High: will most probably affect some types of elements", color: '#ff2e00' }]
    };
  }

  getColumns(d) {
    return [{
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
      }] }];
  }

  initServer(server, id) {
    this.loadDataFromServer(server, id, this.request);
  }

  loadDataFromServer(server, id, requestData) {
    const obj = this;

    fetch(server + '/jsonapi/group/study?filter[id][condition][path]=id&filter[id][condition][operator]=%3D&filter[id][condition][value]=' + id, { credentials: 'include' }).then(resp => resp.json()).then(function (data) {
      var wktVar = new Wkt.Wkt();
      if (data.data[0].attributes.field_area != null && data.data[0].attributes.field_area.value != null) {
        //          wktVar.read(data.data[0].attributes.field_area.value);
        //          requestData.bbox = obj.getBoundsFromArea(wktVar.toJson());
        fetch("https://clarity.meteogrid.com/api/request_hazard", { method: 'POST', body: JSON.stringify(requestData), headers: { 'Content-Type': 'application/json' } }).then(resp => resp.json()).then(function (data) {
          obj.setState({
            allData: data,
            data: data,
            columns: obj.getColumns(data)
          });
          obj.changeFutureScenario();
        }).catch(function (error) {
          console.log(JSON.stringify(error));
          obj.setState({
            allData: obj.backupData,
            data: obj.backupData,
            columns: obj.getColumns(data)
          });
          obj.changeFutureScenario();
        });
      }
    }).catch(function (error) {
      console.log(JSON.stringify(error));
    });
  }

  getBoundsFromArea(area) {
    const bboxArray = turf.bbox(area);
    const corner1 = [bboxArray[1], bboxArray[0]];
    const corner2 = [bboxArray[3], bboxArray[2]];
    var bounds = [corner1, corner2];

    return bounds;
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
    window.tableCom = this;
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

//export default CharacteriseHazardTable;

if (document.getElementById('characteriseHazard-table-container') != null) {
  ReactDOM.render(React.createElement(CharacteriseHazardTable, null), document.getElementById('characteriseHazard-table-container'));
  document.getElementById('characteriseHazard-table-container').style.width = "100%";
}