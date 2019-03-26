import React from "react";
import ReactDOM from 'react-dom';
import TableComponent from './commons/TableComponent';



export default class RiskAndImpactTable extends React.Component {
    constructor(props) {
     super(props);
     var originalData = {
      "name": "TAB Impact Results for Impact Assessment Drupal Table",
      "description": null,
      "columnnames": [
        "HAZARD_EVENT_ID",
        "HAZEVENT_NAME",
        "IMPACTCASE_ID",
        "EARTYPE_ID",
        "NAME",
        "QUANTITYUNIT",
        "VULNERABILITYCLASS_ID",
        "VULCLASS_NAME",
        "EXPOSEDQUANTITY",
        "DAMAGELEVEL1QUANTITY",
        "DAMAGELEVEL2QUANTITY",
        "DAMAGELEVEL3QUANTITY",
        "DAMAGELEVEL4QUANTITY",
        "DAMAGELEVEL5QUANTITY",
        "SZM_SZENARIO_REF"
      ],
      "rows": [
        {
          "rownum": 0,
          "values": [
            3,
            "Heat wave 32°, 6 days",
            1,
            1,
            "people",
            "number of people",
            26,
            "Age 15-65",
            337355.66,
            236277.49,
            87214.87361277906,
            12877.203135764006,
            950.6682674434248,
            35.75970062065402,
            2846
          ]
        },
        {
          "rownum": 1,
          "values": [
            1,
            "Heat wave 28°, 6 days",
            1,
            1,
            "people",
            "number of people",
            25,
            "Age<14",
            139574.36679340914,
            78366.54057476184,
            47947.42392707267,
            11734.435739422286,
            1435.9410855705933,
            90.0254665817489,
            2846
          ]
        },
        {
          "rownum": 2,
          "values": [
            2,
            "Heat wave 30°, 6 days",
            1,
            1,
            "people",
            "number of people",
            25,
            "Age<14",
            114271.6565188171,
            64159.8784423072,
            39255.28507728316,
            9607.16097850651,
            1175.6268022655902,
            73.70521845463703,
            2846
          ]
        },
        {
          "rownum": 3,
          "values": [
            2,
            "Heat wave 30°, 6 days",
            1,
            1,
            "people",
            "number of people",
            26,
            "Age 15-65",
            430805.76740318455,
            301728.1741796098,
            111374.06101790829,
            16444.286947546956,
            1214.010652542174,
            45.665411344737564,
            2846
          ]
        },
        {
          "rownum": 4,
          "values": [
            3,
            "Heat wave 32°, 6 days",
            1,
            1,
            "people",
            "number of people",
            25,
            "Age<14",
            90475.87692282363,
            50799.309664103945,
            31080.816095789913,
            7606.578400532551,
            930.8158217820096,
            58.35694061522125,
            2846
          ]
        },
        {
          "rownum": 5,
          "values": [
            4,
            "Haet wave 34°, 6 days",
            1,
            1,
            "people",
            "number of people",
            26,
            "Age 15-65",
            245296.10211014666,
            171800.72929200664,
            63415.17479802567,
            9363.197513646408,
            691.2444157463933,
            26.001386823675546,
            2846
          ]
        },
        {
          "rownum": 6,
          "values": [
            4,
            "Haet wave 34°, 6 days",
            1,
            1,
            "people",
            "number of people",
            21,
            "Age>65",
            46532.0355980936,
            19389.015125049238,
            18550.414779500396,
            7099.253075094346,
            1358.4562472507446,
            134.94290323447143,
            2846
          ]
        },
        {
          "rownum": 7,
          "values": [
            1,
            "Heat wave 28°, 6 days",
            1,
            1,
            "people",
            "number of people",
            26,
            "Age 15-65",
            525366.538832429,
            367956.74183399545,
            135820.3844516537,
            20053.766153772645,
            1480.4829064297849,
            55.688853116237475,
            2846
          ]
        },
        {
          "rownum": 8,
          "values": [
            2,
            "Heat wave 30°, 6 days",
            1,
            1,
            "people",
            "number of people",
            21,
            "Age>65",
            85802.17894101325,
            35752.13772332034,
            34205.8108544454,
            13090.581034493567,
            2504.9088120039405,
            248.8263189289384,
            2846
          ]
        },
        {
          "rownum": 9,
          "values": [
            3,
            "Heat wave 32°, 6 days",
            1,
            1,
            "people",
            "number of people",
            21,
            "Age>65",
            64833.71786210868,
            27014.978392501303,
            25846.54512919038,
            9891.485833068335,
            1892.7555592664007,
            188.01778180011516,
            2846
          ]
        },
        {
          "rownum": 10,
          "values": [
            4,
            "Haet wave 34°, 6 days",
            1,
            1,
            "people",
            "number of people",
            25,
            "Age<14",
            66266.00651339456,
            37206.24214506262,
            22764.096153520382,
            5571.181965600621,
            681.7446750098032,
            42.74157420113949,
            2846
          ]
        },
        {
          "rownum": 11,
          "values": [
            1,
            "Heat wave 28°, 6 days",
            1,
            1,
            "people",
            "number of people",
            21,
            "Age>65",
            103864.23160243589,
            43278.251888334584,
            41406.41070639549,
            15846.254222888836,
            3032.212377401513,
            301.20627164706406,
            2846
          ]
        }
      ]
    };
    this.dData = this.convertData(originalData);
     this.state = {
      loading: true,
      data: [], //this.dData,
      allData: [], //this.dData,
        columns:  [{
          Header: 'Hazards',
          id: 'Hazards',
//          Header: (<div>
//            <div>Hazards</div>
//            <select id="futureScenario-combo" onChange={this.changeHazard.bind(this)} style={{"marginLeft": '10px'}}>
//              {this.createOptions(this.convertData(originalData))}
//            </select>
//          </div>),
          accessor: 'hazard',
          minWidth: 350,
          width: 350,
          Cell: row => <div><span title={row.value}>{row.value}</span></div>
        }, {
          Header: 'Element at risk (Exposure)',
          id: 'ElementAtRisk',
          accessor: 'elementAtRisk',
          Cell: row => <div><span title={row.value}>{row.value}</span></div>
        }, {
          Header: 'Vulnerability classes',
          accessor: 'vulnerabilityClasses',
          Cell: row => <div><span title={row.value}>{row.value}</span></div>
        }, {
          Header: 'Unit',
          accessor: 'unit',
          Cell: row => <div><span title={row.value}>{row.value}</span></div>
        }, {
          Header: 'Damage Classes',
          columns: [{
            Header: () => (<span title={this.state.d1Tooltip}>D1</span>),
            accessor: 'd1',
            Cell: row => <div><span title={row.value}>{row.value}</span></div>
          }, {
            Header: () => (<span title={this.state.d2Tooltip}>D2</span>),
            accessor: 'd2',
            Cell: row => <div><span title={row.value}>{row.value}</span></div>
          }, {
            Header: () => (<span title={this.state.d3Tooltip}>D3</span>),
            accessor: 'd3',
            Cell: row => <div><span title={row.value}>{row.value}</span></div>
          }, {
            Header: () => (<span title={this.state.d4Tooltip}>D4</span>),
            accessor: 'd4',
            Cell: row => <div><span title={row.value}>{row.value}</span></div>
          }, {
            Header: () => (<span title={this.state.d5Tooltip}>D5</span>),
            accessor: 'd5',
            Cell: row => <div><span title={row.value}>{row.value}</span></div>
          }]
        }],
        expanded: ["Hazards", "ElementAtRisk"],
        pivot: ["Hazards", "ElementAtRisk"]
      };
    }

    loadDataFromServer(server) {
      const obj = this;

      fetch(server + "/jsonapi", {credentials: 'include'})
      .then((resp) => resp.json())
      .then(function(data) {

        if (data != null && data.meta != null && data.meta.links != null && data.meta.links.me != null && data.meta.links.me.href != null) {
          fetch(data.meta.links.me.href.replace('http://', 'https://'), {credentials: 'include'})
          .then((resp) => resp.json())
          .then(function(data) {
            let authInfo = null;

            if (data != null && data.data != null && data.data.attributes != null && data.data.attributes.field_basic_auth_credentials != null) {
              authInfo = data.data.attributes.field_basic_auth_credentials;
            }
          
            let headers = new Headers();
      
            if (authInfo != null) {
              headers.append('Authorization', 'Basic ' + btoa(authInfo));
            }

            fetch("https://service.emikat.at/EmiKatTst/api/scenarios/2846/feature/view.2812/table/data", {headers: headers})
            .then((resp) => resp.json())
            .then(function(data) {
              obj.setState({
                loading: false,
                allData: obj.convertData(data)
              });
              obj.loadTooltips(server, obj);
              obj.changeHazard();
            })
            .catch(function(error) {
              console.log(JSON.stringify(error));
            });         
          })
          .catch(function(error) {
            console.log(JSON.stringify(error));
          });
        }
      })
      .catch(function(error) {
        console.log(JSON.stringify(error));
      });   

      // fetch(server + "/jsonapi/user/user", {credentials: 'include'})
      // .then((resp) => resp.json())
      // .then(function(data) {
      //   let authInfo = null;

      //   if (data != null && data.data[0] != null && data.data[0].attributes.field_basic_auth_credentials != null) {
      //     authInfo = data.data[0].attributes.field_basic_auth_credentials;
      //   }
      
      //   let headers = new Headers();
  
      //   if (authInfo != null) {
      //     headers.append('Authorization', 'Basic ' + btoa(authInfo));
      //   }

      //   fetch("https://service.emikat.at/EmiKatTst/api/scenarios/2846/feature/view.2812/table/data", {headers: headers})
      //   .then((resp) => resp.json())
      //   .then(function(data) {
      //     obj.setState({
      //       allData: obj.convertData(data)
      //     });
      //     this.changeHazard();
      //   })
      //   .catch(function(error) {
      //     console.log(JSON.stringify(error));
      //   });         
      // })
      // .catch(function(error) {
      //   console.log(JSON.stringify(error));
      // });         
    }

    loadTooltips(server, thisObj) {
      var eAtRId = "element-at-risk:infrastructure:damage-class:";

      if (this.state.allData != null && this.state.allData[0] != null && this.state.allData[0].elementAtRisk != null) {
        var eAtRisk = this.state.allData[0].elementAtRisk;

        if (eAtRisk === 'people') {
          eAtRId = "element-at-risk:population:damage-class:";
        } else {
          eAtRId = "element-at-risk:" + eAtRisk + ":damage-class:";
        }

        for (var i = 1; i < 6; ++i) {
          const damageClass = i;
          fetch(server + "/jsonapi/taxonomy_term/elements_at_risk?filter[field_elements_at_risk_id][value]=" + eAtRId + "d" + i, {credentials: 'include'})
          .then((resp) => resp.json())
          .then(function(data) {
            switch (damageClass) {
              case 1: {
                thisObj.setState({
                  d1Tooltip: data.data[0].attributes.description.value.replace("<p>", "").replace("</p>", "")
                });
                break;
              }
              case 2: {
                thisObj.setState({
                  d2Tooltip: data.data[0].attributes.description.value.replace("<p>", "").replace("</p>", "")
                });
                break;
              }
              case 3: {
                thisObj.setState({
                  d3Tooltip: data.data[0].attributes.description.value.replace("<p>", "").replace("</p>", "")
                });
                break;
              }
              case 4: {
                thisObj.setState({
                  d4Tooltip: data.data[0].attributes.description.value.replace("<p>", "").replace("</p>", "")
                });
                break;
              }
              case 5: {
                thisObj.setState({
                  d5Tooltip: data.data[0].attributes.description.value.replace("<p>", "").replace("</p>", "")
                });
                break;
              }
            }
          })
          .catch(function(error) {
            console.log(JSON.stringify(error));
          });
        }
      }
    }

    createOptions(d) {
      if (d != null) {
        var options = [];
        var periods = [];
        
        for (var i = 0; i < d.length; ++i) {
          var obj = d[i];
          if ( periods.findIndex((val)=>{return val === obj.hazard;}) === -1) {
            options.push(<option key={obj.hazard} value={obj.hazard}>{obj.hazard}</option>);
            periods.push(obj.hazard);
          }
        }

        return options;
      } else {
        return null;
      }
    }

    changeHazard() {
      const combo = document.getElementById('futureScenario-combo');
      console.log('changeHazard changed: ' + combo.value);
      var selectedData = [];

      for (var i = 0; i < this.state.allData.length; ++i) {
        var obj = this.state.allData[i];
        if (obj.hazard === combo.value) {
          selectedData.push(obj);
        }
      }

      this.setState({
        data: selectedData
       }
      );
    }


    convertData(originData) {
      var data = [];
      if (originData == null) {
        originData = this.dData;
      }
      var cols = originData.columnnames;
      var colIndex = [];

      for (var i = 0; i < cols.length; ++i) {
        colIndex[cols[i]] = i;
      }

      var rows = originData.rows;

      for (let i = 0; i < rows.length; ++i) {
        data[i] = {};
        var origin = rows[i].values;
        data[i].hazard = origin[colIndex["HAZEVENT_NAME"]];
        data[i].elementAtRisk = origin[colIndex["NAME"]];
        data[i].vulnerabilityClasses = origin[colIndex["VULCLASS_NAME"]];
        data[i].unit = origin[colIndex["QUANTITYUNIT"]];
        data[i].d1 = origin[colIndex["DAMAGELEVEL1QUANTITY"]];
        data[i].d2 = origin[colIndex["DAMAGELEVEL2QUANTITY"]];
        data[i].d3 = origin[colIndex["DAMAGELEVEL3QUANTITY"]];
        data[i].d4 = origin[colIndex["DAMAGELEVEL4QUANTITY"]];
        data[i].d5 = origin[colIndex["DAMAGELEVEL5QUANTITY"]];
      }

      return data;
    }

    componentDidMount () {
      this.changeHazard();
    }

    // componentDidUpdate () {
    //   this.changeHazard();
    // }

    render() {
      window.specificTableComponent = this;
//      var dd = "data=" + this.state.data};
      return (
        <div>
          <div>
          <h1>Damage level estimates for the selected hazard</h1>
          <select id="futureScenario-combo" onChange={this.changeHazard.bind(this)} style={{"marginLeft": '10px'}}>
            {this.createOptions(this.state.allData)}
          </select>
          </div>
          <div>
            <TableComponent
            data={this.state.data}
            columns={this.state.columns}
            loading={this.state.loading}
//            pivotBy={this.state.pivot} //{["Hazards", "ElementAtRisk"]}
//            expanded={["Hazards", "ElementAtRisk"]}
            />
          </div>
        </div>
          );
    }
  
  }


if (document.getElementById('risk-and impact-table-container') != null) {
    ReactDOM.render(<RiskAndImpactTable />, document.getElementById('risk-and impact-table-container'));
    document.getElementById('risk-and impact-table-container').style.width = "100%";
}