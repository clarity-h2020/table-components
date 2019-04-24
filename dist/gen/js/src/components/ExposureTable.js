import React from "react";
import ReactDOM from 'react-dom';
import TableComponent from './commons/TableComponent';
import turf from 'turf';
import Wkt from 'wicket';
import proj4 from 'proj4';

export default class ExposureTable extends React.Component {
  constructor(props) {
    super(props);
    this.protocol = "https://";
    this.layerParams = ['COVERAGEID', 'layers'];
    this.request = {
      "type": "eu-gl:exposure-evaluation",
      "epsg": "EPSG:3035",
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

  initServer(server, id) {
    this.loadDataFromServer(server, id, this.request);
  }

  sendRequestToRestApi(requestData) {
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

  loadDataFromServer(server, id, request) {
    const obj = this;

    fetch(server + '/jsonapi/group/study?filter[id][condition][path]=id&filter[id][condition][operator]=%3D&filter[id][condition][value]=' + id, { credentials: 'include' }).then(resp => resp.json()).then(function (data) {
      var wktVar = new Wkt.Wkt();
      if (data.data[0].attributes.field_area != null && data.data[0].attributes.field_area.value != null) {
        wktVar.read(data.data[0].attributes.field_area.value);
        var studyAreaBbox = obj.getBoundsFromArea(wktVar.toJson());
        request.bbox = [studyAreaBbox[0][0], studyAreaBbox[0][1], studyAreaBbox[1][0], studyAreaBbox[1][1]];
      }
      if (data != null && data.data[0] != null && data.data[0].relationships.field_data_package.links.related != null) {
        fetch(data.data[0].relationships.field_data_package.links.related.href.replace('http://', obj.protocol), { credentials: 'include' }).then(resp => resp.json()).then(function (data) {
          if (data.data.relationships.field_resources.links.related != null) {
            var includes = 'include=field_analysis_context.field_field_eu_gl_methodology,field_analysis_context.field_hazard,field_analysis_context.field_exposure_category,field_analysis_context.field_vulnerability_classes';
            var separator = data.data.relationships.field_resources.links.related.href.indexOf('?') === -1 ? '?' : '&';

            fetch(data.data.relationships.field_resources.links.related.href.replace('http://', obj.protocol) + separator + includes, { credentials: 'include' }).then(resp => resp.json()).then(function (data) {
              obj.convertDataFromServer(data, 'eu-gl:exposure-evaluation');
            }).catch(function (error) {
              console.log(JSON.stringify(error));
            });
          }
        }).catch(function (error) {
          console.log(JSON.stringify(error));
        });
      }
    }).catch(function (error) {
      console.log(JSON.stringify(error));
    });
  }

  getBoundsFromArea(area) {
    const bboxArray = turf.bbox(area);
    const targetProj = 'PROJCS["ETRS89 / LAEA Europe",  GEOGCS["ETRS89", DATUM["European_Terrestrial_Reference_System_1989", SPHEROID["GRS 1980",6378137,298.257222101, AUTHORITY["EPSG","7019"]], TOWGS84[0,0,0,0,0,0,0], AUTHORITY["EPSG","6258"]], PRIMEM["Greenwich",0, AUTHORITY["EPSG","8901"]], UNIT["degree",0.0174532925199433, AUTHORITY["EPSG","9122"]], AUTHORITY["EPSG","4258"]], PROJECTION["Lambert_Azimuthal_Equal_Area"], PARAMETER["latitude_of_center",52], PARAMETER["longitude_of_center",10], PARAMETER["false_easting",4321000], PARAMETER["false_northing",3210000], UNIT["metre",1, AUTHORITY["EPSG","9001"]], AUTHORITY["EPSG","3035"]]';
    const corner1 = proj4(targetProj, [bboxArray[0], bboxArray[1]]);
    const corner2 = proj4(targetProj, [bboxArray[2], bboxArray[3]]);
    var bounds = [corner1, corner2];

    return bounds;
  }

  convertDataFromServer(originData, mapType) {
    var resourceArray = originData.data;
    const thisObj = this;
    var dataFromDP = [];

    for (var i = 0; i < resourceArray.length; ++i) {
      const resource = resourceArray[i];

      if (resource.relationships.field_analysis_context != null && resource.relationships.field_analysis_context.data != null) {
        //analysisContext = eu_fg type
        var analysisContext = this.getIncludedObject(resource.relationships.field_analysis_context.data.type, resource.relationships.field_analysis_context.data.id, originData.included);

        if (analysisContext != null) {
          if (analysisContext.relationships.field_field_eu_gl_methodology != null && analysisContext.relationships.field_field_eu_gl_methodology.data != null) {
            var mythodologyData = this.getIncludedObject(analysisContext.relationships.field_field_eu_gl_methodology.data[0].type, analysisContext.relationships.field_field_eu_gl_methodology.data[0].id, originData.included);
            console.log(mythodologyData.attributes.field_eu_gl_taxonomy_id.value);

            if (mythodologyData.attributes.field_eu_gl_taxonomy_id.value == mapType) {
              if (resource.attributes.field_url != null) {
                let obj = {};

                //get hazards
                if (analysisContext.relationships.field_hazard != null && analysisContext.relationships.field_hazard.data != null && analysisContext.relationships.field_hazard.data.length > 0) {
                  obj.hazard = "";
                  for (let i = 0; i < analysisContext.relationships.field_hazard.data.length; ++i) {
                    var hazard = this.getIncludedObject(analysisContext.relationships.field_hazard.data[i].type, analysisContext.relationships.field_hazard.data[i].id, originData.included);
                    if (hazard != null) {
                      if (obj.hazard === "") {
                        obj.hazard = hazard.attributes.name;
                      } else {
                        obj.hazard = obj.hazard + ', ' + hazard.attributes.name;
                      }
                    }
                  }
                }

                //get elements at risk
                if (analysisContext.relationships.field_exposure_category != null && analysisContext.relationships.field_exposure_category.data != null && analysisContext.relationships.field_exposure_category.data.length > 0) {
                  obj.elementAtRisk = "";
                  for (let i = 0; i < analysisContext.relationships.field_exposure_category.data.length; ++i) {
                    var elAtRisk = this.getIncludedObject(analysisContext.relationships.field_exposure_category.data[i].type, analysisContext.relationships.field_exposure_category.data[i].id, originData.included);
                    if (elAtRisk != null) {
                      if (obj.elementAtRisk === "") {
                        obj.elementAtRisk = elAtRisk.attributes.name;
                      } else {
                        obj.elementAtRisk = obj.elementAtRisk + ', ' + elAtRisk.attributes.name;
                      }
                    }
                  }
                }

                //get vulnerability classes
                if (analysisContext.relationships.field_vulnerability_classes != null && analysisContext.relationships.field_vulnerability_classes.data != null && analysisContext.relationships.field_vulnerability_classes.data.length > 0) {
                  obj.vulnerabilityClasses = "";
                  for (let i = 0; i < analysisContext.relationships.field_vulnerability_classes.data.length; ++i) {
                    var vulClasses = this.getIncludedObject(analysisContext.relationships.field_vulnerability_classes.data[i].type, analysisContext.relationships.field_vulnerability_classes.data[i].id, originData.included);
                    if (vulClasses != null) {
                      if (obj.vulnerabilityClasses === "") {
                        obj.vulnerabilityClasses = vulClasses.attributes.name;
                      } else {
                        obj.vulnerabilityClasses = obj.vulnerabilityClasses + ', ' + vulClasses.attributes.name;
                      }
                    }
                  }
                }

                obj.layer = this.extractLayers(resource.attributes.field_url);
                obj.unit = 'pop//km2';
                dataFromDP.push(obj);
              }
            }
          }
        }
      }
    }

    this.request.data = dataFromDP;
    this.sendRequestToRestApi(this.request);
  }

  getIncludedObject(type, id, includedArray) {
    if (type != null && id != null) {
      for (let i = 0; i < includedArray.length; ++i) {
        if (includedArray[i].type === type && includedArray[i].id === id) {
          return includedArray[i];
        }
      }
    }

    return null;
  }

  extractLayers(url) {
    for (let i = 0; i < this.layerParams.length; ++i) {
      let paramKey = this.layerParams[i];

      if (url.indexOf(paramKey + '=') != -1) {
        var layerParam = url.substring(url.indexOf(paramKey + '=') + paramKey.length + 1);
        return layerParam.indexOf('&') !== -1 ? layerParam.substring(0, layerParam.indexOf('&')) : layerParam;
      }
    }

    return url;
  }

  render() {
    window.tableCom = this;
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
          loading: this.state.loading,
          pivotBy: ["Hazards", "ElementAtRisk"]
        })
      )
    );
  }

}

if (document.getElementById('exposure-table-container') != null) {
  ReactDOM.render(React.createElement(ExposureTable, null), document.getElementById('exposure-table-container'));
  document.getElementById('exposure-table-container').style.width = "100%";
}