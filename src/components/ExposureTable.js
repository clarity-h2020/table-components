import React from "react";
import ReactDOM from 'react-dom';
import TableComponent from './commons/TableComponent';
import BasicTable from './commons/BasicTable';
import turf from 'turf';
import Wkt from 'wicket';
import proj4 from 'proj4';

export default class ExposureTable extends BasicTable {
  constructor(props) {
    super(props);
    this.protocol = "https://";
    this.layerParams = ['COVERAGEID', 'layers'];
    this.request = {
      "type": "eu-gl:exposure-evaluation",
      "epsg": "EPSG:3035",
      "bbox": [4650000.0, 1950000.0, 4675000.0, 1975000.0],
      "data": [
        {
          "hazard": "HW,PF,FL",
          "elementAtRisk": "Population",
          "vulnerabilityClasses": "Age group 0-14",
          "layer": "Exposure:Population_men15_naples",
          "unit": "pop/km2"
        },
        {
          "hazard": "HW,PF,FL",
          "elementAtRisk": "Population",
          "vulnerabilityClasses": "Age group 15-64",
          "layer": "Exposure:Population_15to65_naples",
          "unit": "pop/km2"
        },
        {
          "hazard": "HW,PF,FL",
          "elementAtRisk": "Population",
          "vulnerabilityClasses": ">65",
          "layer": "Exposure:Population_mayor65_naples",
          "unit": "pop/km2"
        }
      ]
    };

    this.backupData = [
      {
        hazard: 'HW,PF,FL',
        elementAtRisk: "Population",
        vulnerabilityClasses: "Age group 0-14",
        values: "1.2",
        unit: "pop/km2"
      },
      {
        hazard: 'HW,PF,FL',
        elementAtRisk: "Population",
        vulnerabilityClasses: "Age group 15-64",
        values: "3.2",
        unit: "pop/km2"
      },
      {
        hazard: 'HW,PF,FL',
        elementAtRisk: "Population",
        vulnerabilityClasses: ">65",
        values: "3.5",
        unit: "pop/km2"
      },
      {
        hazard: 'PF,FL',
        elementAtRisk: "Buildings",
        vulnerabilityClasses: "Continuous Residential (S.L. > 80%)",
        values: "2.1",
        unit: "m3/m2"
      },
      {
        hazard: 'PF,FL',
        elementAtRisk: "Buildings",
        vulnerabilityClasses: "Med-Hi Density Discontinuous Res. (30% < S.L. < 80%)",
        values: "3.2",
        unit: "m3/m2"
      },
      {
        hazard: 'PF,FL',
        elementAtRisk: "Buildings",
        vulnerabilityClasses: "Low Density Discontinuous Res. (S.L. < 30%)",
        values: "2.5",
        unit: "m3/m2"
      },
      {
        hazard: 'PF,FL',
        elementAtRisk: "Buildings",
        vulnerabilityClasses: "Non Residential",
        values: "4.3",
        unit: "m3/m2"
      },
      {
        hazard: 'PF,FL',
        elementAtRisk: "Infrastructure",
        vulnerabilityClasses: "Roads",
        values: "3.3",
        unit: "ml"
      },
      {
        hazard: 'PF,FL',
        elementAtRisk: "Infrastructure",
        vulnerabilityClasses: "Railways",
        values: "3.2",
        unit: "ml"
      }
    ]

    this.state = {
      data: [],
      loading: true,
      columns: [{
        Header: 'Hazards',
        id: 'Hazards',
        accessor: 'hazard',
        Cell: row => <div><span title={row.value}>{row.value}</span></div>
      }, {
        Header: 'Element at risk',
        id: 'ElementAtRisk',
        accessor: 'elementAtRisk',
        Cell: row => <div><span title={row.value}>{row.value}</span></div>
      }, {
        Header: 'Classes',
        accessor: 'vulnerabilityClasses',
        Cell: row => <div><span title={row.value}>{row.value}</span></div>
      }, {
        Header: 'values',
        accessor: 'values',
        Cell: row => <div><span title={row.value}>{row.value}</span></div>
      }, {
        Header: 'Unit',
        accessor: 'unit',
        Cell: row => <div><span title={row.value}>{row.value}</span></div>
      }],
      expanded: ["Hazards", "ElementAtRisk"]
    };
  }

  init() {
    this.setState({
      init: true
    });
  }

  setStudyURL(id, hostName) {
    super.setStudyURL(id, hostName)
    this.initServer(hostName, id);
  }

  initServer(server, id) {
    this.loadDataFromServer(server, id, this.request);
  }

  sendRequestToRestApi(requestData) {
    const obj = this;

    // FIXME: load this URI from data Package
    // See https://github.com/clarity-h2020/table-components/issues/3#issuecomment-506718558
    fetch("https://clarity.meteogrid.com/api/request_exposure", { method: 'POST', body: JSON.stringify(requestData), headers: { 'Content-Type': 'application/json' } })
      .then((resp) => resp.json())
      .then(function (data) {
        obj.setState({
          allData: data,
          data: data,
          loading: false
        });
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
        obj.setState({
          allData: obj.backupData,
          data: obj.backupData
        });
      });
  }


  loadDataFromServer(server, id, request) {
    const obj = this;

    fetch(server + '/jsonapi/group/study?filter[id][condition][path]=id&filter[id][condition][operator]=%3D&filter[id][condition][value]=' + id, { credentials: 'include' })
      .then((resp) => resp.json())
      .then(function (data) {
        var wktVar = new Wkt.Wkt();
        if (data.data[0].attributes.field_area != null && data.data[0].attributes.field_area.value != null) {
          wktVar.read(data.data[0].attributes.field_area.value);
          var studyAreaBbox = obj.getBoundsFromArea(wktVar.toJson());
          request.bbox = [studyAreaBbox[0][0], studyAreaBbox[0][1], studyAreaBbox[1][0], studyAreaBbox[1][1]];
        }
        if (data != null && data.data[0] != null && data.data[0].relationships.field_data_package.links.related != null) {
          fetch(data.data[0].relationships.field_data_package.links.related.href.replace('http://', obj.protocol), { credentials: 'include' })
            .then((resp) => resp.json())
            .then(function (data) {
              if (data.data.relationships.field_resources.links.related != null) {
                var includes = 'include=field_resource_tags,field_map_view,field_grid_info.field_bands';
                var separator = (data.data.relationships.field_resources.links.related.href.indexOf('?') === - 1 ? '?' : '&');

                fetch(data.data.relationships.field_resources.links.related.href.replace('http://', obj.protocol) + separator + includes, { credentials: 'include' })
                  .then((resp) => resp.json())
                  .then(function (data) {
                    obj.convertDataFromServer(data, 'eu-gl:exposure-evaluation');
                  })
                  .catch(function (error) {
                    console.log(JSON.stringify(error));
                  });
              }
            })
            .catch(function (error) {
              console.log(JSON.stringify(error));
            });
        }
      })
      .catch(function (error) {
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

    //iterate resources
    for (var i = 0; i < resourceArray.length; ++i) {
      const resource = resourceArray[i];

      // iterate resource tags
      if (resource.relationships.field_resource_tags != null && resource.relationships.field_resource_tags.data != null
        && resource.relationships.field_resource_tags.data.length > 0) {
        console.debug('inspecting ' + resource.relationships.field_resource_tags.data.length + ' tags of resource #' + i + ': ' + resource.attributes.field_description);
        var euGlStep, elementsAtRisk, vulnerabilityClass;
        var hazards = null;
        
        for (var j = 0; j < resource.relationships.field_resource_tags.data.length; ++j) {
          // step one: extract relevant tags
          if (resource.relationships.field_resource_tags.data[j].type === 'taxonomy_term--eu_gl') {
            let tag = this.getIncludedObject(resource.relationships.field_resource_tags.data[j].type, resource.relationships.field_resource_tags.data[j].id, originData.included);
            euGlStep = tag.attributes.field_eu_gl_taxonomy_id.value;
          } else if (resource.relationships.field_resource_tags.data[j].type === 'taxonomy_term--elements_at_risk') {
            let tag = this.getIncludedObject(resource.relationships.field_resource_tags.data[j].type, resource.relationships.field_resource_tags.data[j].id, originData.included);
            if (tag.attributes.field_elements_at_risk_id != null && tag.attributes.field_elements_at_risk_id.startsWith('element-at-risk:')) {
              elementsAtRisk = tag.attributes.name;
            } else if (tag.attributes.field_elements_at_risk_id != null && tag.attributes.field_elements_at_risk_id.startsWith('vulnerability-class:')) {
              vulnerabilityClass = tag.attributes.name;
            }
          } if (resource.relationships.field_resource_tags.data[j].type === 'taxonomy_term--hazards') {
            let tag = this.getIncludedObject(resource.relationships.field_resource_tags.data[j].type, resource.relationships.field_resource_tags.data[j].id, originData.included);
            if (hazards === null) {
              hazards = tag.attributes.name;
            } else {
              hazards = hazards + ',' + tag.attributes.name;
            }
          }
        }

        // step two: create table layers
        // e.g. mapType = eu-gl:risk-and-impact-assessment
        if (euGlStep != null && euGlStep === mapType) {
          let tableResource = {};
          let uom = 'pop//km2';

          if (resource.relationships.field_grid_info != null && resource.relationships.field_grid_info.data != null && resource.relationships.field_grid_info.data.type != null) {
            let gridInfo = this.getIncludedObject(resource.relationships.field_grid_info.data.type, resource.relationships.field_grid_info.data.id, originData.included);

            if (gridInfo != null && gridInfo.field_bands != null && gridInfo.field_bands.data != null && gridInfo.field_bands.data.length > 0) {
              for (let i = 0; i < gridInfo.field_bands.data.length; ++i) {
                let band = this.getIncludedObject(gridInfo.field_bands.data[i].type, gridInfo.field_bands.data[i].id, originData.included);

                if (band != null && band.attributes != null && band.attributes.field_uom != null) {
                  uom = band.attributes.field_uom;
                }
              }
            }
          }
          tableResource.layer = this.extractLayers(resource.attributes.field_url);
          tableResource.elementAtRisk = elementsAtRisk;
          tableResource.vulnerabilityClasses = vulnerabilityClass;
          tableResource.hazard = hazards;
          tableResource.unit = uom;
          dataFromDP.push(tableResource);
        } else {
          console.warn('resource ' + i + ' is not assiged to Eu-GL step ' + mapType)
        }
      }
    }

    this.request.data = dataFromDP;
    this.sendRequestToRestApi(this.request);
  }

  extractLayers(url) {
    for (var urlIndex = 0; urlIndex < url.length; ++urlIndex) {
      for (let i = 0; i < this.layerParams.length; ++i) {
        let paramKey = this.layerParams[i];

        if (url[urlIndex].indexOf(paramKey + '=') != -1) {
          var layerParam = url[urlIndex].substring(url[urlIndex].indexOf(paramKey + '=') + paramKey.length + 1)
          return (layerParam.indexOf('&') !== -1 ? layerParam.substring(0, layerParam.indexOf('&')) : layerParam);
        }
      }
    }

    return url;
  }

  render() {
    window.tableCom = this;
    return (
      <div>
        <div>
          <h1>Exposure elements</h1>
        </div>
        <div>
          <TableComponent
            data={this.state.data}
            columns={this.state.columns}
            loading={this.state.loading}
            pivotBy={["Hazards", "ElementAtRisk"]}
          />
        </div>
      </div>
    );
  }

}


if (document.getElementById('exposure-table-container') != null) {
  ReactDOM.render(<ExposureTable />, document.getElementById('exposure-table-container'));
  document.getElementById('exposure-table-container').style.width = "100%";
}