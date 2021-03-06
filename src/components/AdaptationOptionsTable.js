import React from "react";
import ReactDOM from 'react-dom';
import TableComponent from './commons/TableComponent';
import BasicTable from './commons/BasicTable';

export default class AdaptationOptionsTable extends BasicTable {
    constructor(props) {
        super(props);
        this.protocol = "https://";
        var originData = [{
            "id": "adaptation-option:constructions-on-piles",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/constructions-on-piles.png",
            "variations": [{
                "hazard": "hazard:flood:pluvial-flooding",
                "variation": {
                    " local_effect": 0,
                    " vulnerability": 2
                }
            },
            {
                "hazard": "hazard:flood:river-flooding",
                "variation": {
                    "local_effect": 0,
                    "vulnerability": 3
                }
            },
            {
                "hazard": "hazard:landslide",
                "variation": {
                    "local_effect": 0,
                    "vulnerability": 3
                }
            }
            ],
            "cost": {
                "new_development": 2,
                "retroffiting": null
            },
            "co_benefits": [{
                "category": "biodiversity",
                "value": 1
            },
            {
                "category": "multifunctional-space-usage",
                "value": 2
            }
            ]
        },
        {
            "id": "adaptation-option:porous-pavements",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/porous-pavements.png",
            "variations": [{
                "hazard": "hazard:flood:pluvial-flooding",
                "variation": {
                    "local_effect": 3,
                    "vulnerability": 3
                }
            },
            {
                "hazard": "hazard:flood:river-flooding",
                "variation": {
                    "local_effect": 1,
                    "vulnerability": 1
                }
            }
            ],
            "cost": {
                "new_development": 1,
                "retroffiting": 1
            },
            "co_benefits": [{
                "category": "biodiversity",
                "value": 1
            },
            {
                "category": "multifunctional-space-usage",
                "value": 1
            }
            ]
        },
        {
            "id": "adaptation-option:improve-soil-infiltration-capacity",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/improve-soil-infiltration-capacity.png",
            "variations": [{
                "hazard": "hazard:flood:pluvial-flooding",
                "variation": {
                    " local_effect": 3,
                    " vulnerability": 0
                }
            },
            {
                "hazard": "hazard:flood:river-flooding",
                "variation": {
                    "local_effect": 1,
                    "vulnerability": 0
                }
            },
            {
                "hazard": "hazard:landslide",
                "variation": {
                    "local_effect": 1,
                    "vulnerability": 0
                }
            }
            ],
            "cost": {
                "new_development": 1,
                "retroffiting": 1
            },
            "co_benefits": [{
                "category": "biodiversity",
                "value": 1
            },
            {
                "category": "multifunctional-space-usage",
                "value": 1
            },
            {
                "category": "air-quality",
                "value": 1
            }
            ]
        },
        {
            "id": "adaptation-option:gutter",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/gutter.png",
            "variations": [{
                "hazard": "hazard:flood:pluvial-flooding",
                "variation": {
                    " local_effect": 3,
                    " vulnerability": 0
                }
            },
            {
                "hazard": "hazard:flood:river-flooding",
                "variation": {
                    "local_effect": 1,
                    "vulnerability": 0
                }
            },
            {
                "hazard": "hazard:landslide",
                "variation": {
                    "local_effect": 1,
                    "vulnerability": 0
                }
            }
            ],
            "cost": {
                "new_development": 1,
                "retroffiting": 1
            },
            "co_benefits": [{
                "category": "social-and-economic-importance",
                "value": 1
            }]
        },
        {
            "id": "adaptation-option:rainwater-harvesting-and-reuse",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/rainwater-harvesting-and-reuse.png",
            "variations": [{
                "hazard": "hazard:flood:pluvial-flooding",
                "variation": {
                    " local_effect": 3,
                    " vulnerability": 0
                }
            }],
            "cost": {
                "new_development": 2,
                "retroffiting": 2
            },
            "co_benefits": [{
                "category": "social-and-economic-importance",
                "value": 1
            },
            {
                "category": "multifunctional-space-usage",
                "value": 2
            }
            ]
        },
        {
            "id": "adaptation-option:emergency-overflow-retention-area",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/emergency-overflow-retention-area.png",
            "variations": [{
                "hazard": "hazard:flood:pluvial-flooding",
                "variation": {
                    " local_effect": 3,
                    " vulnerability": 0
                }
            },
            {
                "hazard": "hazard:flood:river-flooding",
                "variation": {
                    "local_effect": 3,
                    "vulnerability": 0
                }
            },
            {
                "hazard": "hazard:landslide",
                "variation": {
                    "local_effect": 3,
                    "vulnerability": 0
                }
            }
            ],
            "cost": {
                "new_development": 3,
                "retroffiting": 3
            },
            "co_benefits": [{
                "category": "biodiversity",
                "value": 1
            },
            {
                "category": "multifunctional-space-usage",
                "value": 2
            },
            {
                "category": "social-and-economic-importance",
                "value": 1
            }
            ]
        },
        {
            "id": "adaptation-option:rainwater-retention-ponds",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/rainwater-retention-ponds.png",
            "variations": [{
                "hazard": "hazard:flood:pluvial-flooding",
                "variation": {
                    " local_effect": 3,
                    " vulnerability": 0
                }
            },
            {
                "hazard": "hazard:flood:river-flooding",
                "variation": {
                    "local_effect": 1,
                    "vulnerability": 0
                }
            },
            {
                "hazard": "hazard:landslide",
                "variation": {
                    "local_effect": 1,
                    "vulnerability": 0
                }
            },
            {
                "hazard": "hazard:temperature:heat:heat-wave",
                "variation": {
                    "local_effect": 2,
                    "vulnerability": 0
                }
            }
            ],
            "cost": {
                "new_development": 2,
                "retroffiting": 2
            },
            "co_benefits": [{
                "category": "biodiversity",
                "value": 3
            },
            {
                "category": "air-quality",
                "value": 1
            },
            {
                "category": "multifunctional-space-usage",
                "value": 3
            },
            {
                "category": "social-and-economic-importance",
                "value": 2
            }
            ]
        },
        {
            "id": "adaptation-option:wadi",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/wadi.png",
            "variations": [{
                "hazard": "hazard:flood:pluvial-flooding",
                "variation": {
                    " local_effect": 3,
                    " vulnerability": 0
                }
            },
            {
                "hazard": "hazard:flood:river-flooding",
                "variation": {
                    "local_effect": 1,
                    "vulnerability": 0
                }
            },
            {
                "hazard": "hazard:landslide",
                "variation": {
                    "local_effect": 1,
                    "vulnerability": 0
                }
            },
            {
                "hazard": "hazard:temperature:heat:heat-wave",
                "variation": {
                    "local_effect": 3,
                    "vulnerability": 0
                }
            }
            ],
            "cost": {
                "new_development": 1,
                "retroffiting": 1
            },
            "co_benefits": [{
                "category": "biodiversity",
                "value": 3
            },
            {
                "category": "air-quality",
                "value": 1
            },
            {
                "category": "multifunctional-space-usage",
                "value": 2
            },
            {
                "category": "social-and-economic-importance",
                "value": 2
            }
            ]
        },
        {
            "id": "adaptation-option:reduced-paved-surfaces",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/reduced-paved-surfaces.png",
            "variations": [{
                "hazard": "hazard:flood:pluvial-flooding",
                "variation": {
                    " local_effect": 3,
                    " vulnerability": 3
                }
            },
            {
                "hazard": "hazard:flood:river-flooding",
                "variation": {
                    "local_effect": 1,
                    "vulnerability": 1
                }
            },
            {
                "hazard": "hazard:landslide",
                "variation": {
                    "local_effect": 1,
                    "vulnerability": 0
                }
            },
            {
                "hazard": "hazard:temperature:heat:heat-wave",
                "variation": {
                    "local_effect": 3,
                    "vulnerability": 0
                }
            }
            ],
            "cost": {
                "new_development": 2,
                "retroffiting": 2
            },
            "co_benefits": [{
                "category": "biodiversity",
                "value": 3
            },
            {
                "category": "air-quality",
                "value": 1
            },
            {
                "category": "energy-efficency",
                "value": 1
            },
            {
                "category": "multifunctional-space-usage",
                "value": 2
            },
            {
                "category": "social-and-economic-importance",
                "value": 2
            }
            ]
        },
        {
            "id": "adaptation-option:streetscape-greening",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/streetscape-greening.png",
            "variations": [{
                "hazard": "hazard:flood:pluvial-flooding",
                "variation": {
                    " local_effect": 2,
                    " vulnerability": 0
                }
            },
            {
                "hazard": "hazard:flood:river-flooding",
                "variation": {
                    "local_effect": 1,
                    "vulnerability": 0
                }
            },
            {
                "hazard": "hazard:landslide",
                "variation": {
                    "local_effect": 1,
                    "vulnerability": 0
                }
            },
            {
                "hazard": "hazard:temperature:heat:heat-wave",
                "variation": {
                    "local_effect": 3,
                    "vulnerability": 0
                }
            }
            ],
            "cost": {
                "new_development": 1,
                "retroffiting": 1
            },
            "co_benefits": [{
                "category": "biodiversity",
                "value": 2
            },
            {
                "category": "air-quality",
                "value": 1
            },
            {
                "category": "energy-efficency",
                "value": 1
            },
            {
                "category": "multifunctional-space-usage",
                "value": 1
            },
            {
                "category": "social-and-economic-importance",
                "value": 3
            }
            ]
        },
        {
            "id": "adaptation-option:groundcover-and-shrubbery",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/groundcover-and-shrubbery.png",
            "variations": [{
                "hazard": "hazard:flood:pluvial-flooding",
                "variation": {
                    " local_effect": 3,
                    " vulnerability": 0
                }
            },
            {
                "hazard": "hazard:flood:river-flooding",
                "variation": {
                    "local_effect": 1,
                    "vulnerability": 0
                }
            },
            {
                "hazard": "hazard:landslide",
                "variation": {
                    "local_effect": 1,
                    "vulnerability": 0
                }
            },
            {
                "hazard": "hazard:temperature:heat:heat-wave",
                "variation": {
                    "local_effect": 3,
                    "vulnerability": 0
                }
            }
            ],
            "cost": {
                "new_development": 2,
                "retroffiting": 2
            },
            "co_benefits": [{
                "category": "biodiversity",
                "value": 3
            },
            {
                "category": "air-quality",
                "value": 2
            },
            {
                "category": "energy-efficency",
                "value": 1
            },
            {
                "category": "multifunctional-space-usage",
                "value": 3
            },
            {
                "category": "social-and-economic-importance",
                "value": 3
            }
            ]
        },
        {
            "id": "adaptation-option:green-roofs",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/green-roofs.png",
            "variations": [{
                "hazard": "hazard:flood:pluvial-flooding",
                "variation": {
                    " local_effect": 3,
                    " vulnerability": 3
                }
            },
            {
                "hazard": "hazard:temperature:heat:heat-wave",
                "variation": {
                    "local_effect": 3,
                    "vulnerability": 0
                }
            }
            ],
            "cost": {
                "new_development": 2,
                "retroffiting": 2
            },
            "co_benefits": [{
                "category": "biodiversity",
                "value": 3
            },
            {
                "category": "air-quality",
                "value": 1
            },
            {
                "category": "energy-efficency",
                "value": 2
            },
            {
                "category": "multifunctional-space-usage",
                "value": 2
            },
            {
                "category": "social-and-economic-importance",
                "value": 2
            }
            ]
        },
        {
            "id": "adaptation-option:green-facades",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/green-facades.png",
            "variations": [{
                "hazard": "hazard:temperature:heat:heat-wave",
                "variation": {
                    "local_effect": 3,
                    "vulnerability": 0
                }
            }],
            "cost": {
                "new_development": 2,
                "retroffiting": 2
            },
            "co_benefits": [{
                "category": "biodiversity",
                "value": 3
            },
            {
                "category": "air-quality",
                "value": 1
            },
            {
                "category": "energy-efficency",
                "value": 1
            },
            {
                "category": "multifunctional-space-usage",
                "value": 2
            },
            {
                "category": "social-and-economic-importance",
                "value": 2
            }
            ]
        },
        {
            "id": "adaptation-option:green-ventilation-grids",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/green-ventilation-grids.png",
            "variations": [{
                "hazard": "hazard:temperature:heat:heat-wave",
                "variation": {
                    "local_effect": 3,
                    "vulnerability": 0
                }
            }],
            "cost": {
                "new_development": 2,
                "retroffiting": null
            },
            "co_benefits": [{
                "category": "biodiversity",
                "value": 2
            },
            {
                "category": "air-quality",
                "value": 2
            },
            {
                "category": "energy-efficency",
                "value": 1
            },
            {
                "category": "multifunctional-space-usage",
                "value": 2
            },
            {
                "category": "social-and-economic-importance",
                "value": 2
            }
            ]
        },
        {
            "id": "adaptation-option:cool-roofs",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/cool-roofs.png",
            "variations": [{
                "hazard": "hazard:temperature:heat:heat-wave",
                "variation": {
                    "local_effect": 3,
                    "vulnerability": 0
                }
            }],
            "cost": {
                "new_development": 1,
                "retroffiting": 1
            },
            "co_benefits": [{
                "category": "multifunctional-space-usage",
                "value": 1
            }]
        },
        {
            "id": "adaptation-option:cool-paving-and-building-materials",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/cool-paving-and-building-materials.png",
            "variations": [{
                "hazard": "hazard:temperature:heat:heat-wave",
                "variation": {
                    "local_effect": 3,
                    "vulnerability": 0
                }
            }],
            "cost": {
                "new_development": 1,
                "retroffiting": 1
            },
            "co_benefits": [{
                "category": "energy-efficency",
                "value": 1
            },
            {
                "category": "multifunctional-space-usage",
                "value": 1
            }
            ]
        },
        {
            "id": "adaptation-option:optimize-orientation-to-wind-and-sun",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/optimize-orientation-to-wind-and-sun.png",
            "variations": [{
                "hazard": "hazard:temperature:heat:heat-wave",
                "variation": {
                    "local_effect": 3,
                    "vulnerability": 0
                }
            }],
            "cost": {
                "new_development": 1,
                "retroffiting": 1
            },
            "co_benefits": [{
                "category": "energy-efficency",
                "value": 2
            },
            {
                "category": "multifunctional-space-usage",
                "value": 1
            }
            ]
        },
        {
            "id": "adaptation-option:pergolas-and-canvas-above-streets",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/pergolas-and-canvas-above-streets.png",
            "variations": [{
                "hazard": "hazard:temperature:heat:heat-wave",
                "variation": {
                    "local_effect": 2,
                    "vulnerability": 0
                }
            }],
            "cost": {
                "new_development": 1,
                "retroffiting": 1
            },
            "co_benefits": [{
                "category": "social-and-economic-importance",
                "value": 1
            }]
        },
        {
            "id": "adaptation-option:thermal-insulation",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/thermal-insulation.png",
            "variations": [{
                "hazard": "hazard:temperature:heat:heat-wave",
                "variation": {
                    "local_effect": 3,
                    "vulnerability": 0
                }
            }],
            "cost": {
                "new_development": 1,
                "retroffiting": 1
            },
            "co_benefits": [{
                "category": "energy-efficiency",
                "value": 2
            },
            {
                "category": "social-and-economic-importance",
                "value": 1
            }
            ]
        },
        {
            "id": "adaptation-option:narrow-streets",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/narrow-streets.png",
            "variations": [{
                "hazard": "hazard:temperature:heat:heat-wave",
                "variation": {
                    "local_effect": 3,
                    "vulnerability": 0
                }
            }],
            "cost": {
                "new_development": null,
                "retroffiting": null
            },
            "co_benefits": []
        },
        {
            "id": "adaptation-option:high-rise-buildings",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/high-rise-buildings.png",
            "variations": [{
                "hazard": "hazard:temperature:heat:heat-wave",
                "variation": {
                    "local_effect": 2,
                    "vulnerability": 0
                }
            }],
            "cost": {
                "new_development": 2,
                "retroffiting": null
            },
            "co_benefits": [{
                "category": "energy-efficiency",
                "value": 1
            },
            {
                "category": "social-and-economic-importance",
                "value": 1
            }
            ]
        },
        {
            "id": "adaptation-option:blinds",
            "image": "https://raw.githubusercontent.com/clarity-h2020/data-package/master/schemas/adaptation-options/icons/blinds.png",
            "variations": [{
                "hazard": "hazard:temperature:heat:heat-wave",
                "variation": {
                    "local_effect": 3,
                    "vulnerability": 0
                }
            }],
            "cost": {
                "new_development": 1,
                "retroffiting": 1
            },
            "co_benefits": [{
                "category": "energy-efficiency",
                "value": 1
            },
            {
                "category": "social-and-economic-importance",
                "value": 1
            },
            {
                "category": "multifunctional-space-usage",
                "value": 1
            }
            ]
        }
        ];

        this.state = {
            data: [], //this.convertData(originData),
            columns: [{
                Header: 'ADAPTATION',
                id: 'Adaptation',
                accessor: 'adaptation',
                minWidth: 300,
                width: 300,
                Cell: this.adaptationCell
            }, {
                Header: 'Targeted element at risk',
                id: 'ElementAtRisk',
                accessor: 'elementAtRisk',
            }, {
                Header: 'TOWARDS WHICH HAZARD',
                accessor: 'hazard',
            }, {
                Header: 'VARIATION ON HAZARD\'S LOCAL EFFECTS',
                accessor: 'variationLocal',
            }, {
                Header: 'VARIATION ON VULNERABILITY OF ELEMENTS AT RISK',
                accessor: 'variationVulnerability',
            }, {
                Header: 'COST',
                columns: [{
                    Header: 'NEW DEVELOPMENT',
                    accessor: 'newDevelopment'
                }, {
                    Header: 'RETROFITTING',
                    accessor: 'retrofitting'
                }]
            }],
            expanded: ["Adaptation"],
            pivot: ["Adaptation"],
            loading: true
        };
    }

    convertData(originData) {
        var data = [];
        var index = 0;

        for (var i = 0; i < originData.length; ++i) {
            data[index] = {};
            var origin = originData[i];
            data[index].adaptation = this.removeNameSpace(origin.id);
            data[index].adaptationImage = origin.image;
            data[index].newDevelopment = this.getSymbols(origin.cost.new_development, "€", "N/A");
            data[index].retrofitting = this.getSymbols(origin.cost.retrofitting, "€", "N/A");

            for (var v = 0; v < origin.variations.length; ++v) {
                if (v > 0) {
                    ++index;
                    data[index] = {};
                    data[index].adaptation = this.removeNameSpace(origin.id);
                    data[index].adaptationImage = origin.image;
                    data[index].newDevelopment = this.getSymbols(origin.cost.new_development, "€", "N/A");
                    data[index].retrofitting = this.getSymbols(origin.cost.retrofitting, "€", "N/A");
                }
                data[index].hazard = this.removeNameSpace(origin.variations[v].hazard);
                data[index].variationLocal = this.getSymbols(origin.variations[v].variation.local_effect, "+", "-");
                data[index].variationVulnerability = this.getSymbols(origin.variations[v].variation.vulnerability, "+", "-");
            }
            ++index;
        }

        return data;
    }

    setStudyURL(id, hostName) {
        super.setStudyURL(id, hostName)
        this.loadDataFromServer(hostName, id);
    }

    loadDataFromServer(server, id) {
        const obj = this;

        fetch(server + '/jsonapi/group/study?filter[id][condition][path]=id&filter[id][condition][operator]=%3D&filter[id][condition][value]=' + id, { credentials: 'include' })
            .then((resp) => resp.json())
            .then(function (data) {
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
                                        obj.convertDataFromServer(data, 'eu-gl:adaptation-options:identification');
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


    convertDataFromServer(originData, mapType) {
        var resourceArray = originData.data;
        const thisObj = this;

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
                    }
                }

                // step two: create table layers
                // e.g. mapType = eu-gl:risk-and-impact-assessment
                if (euGlStep != null && euGlStep === mapType) {
                    let tableResource = {};
                    let uom = 'pop//km2';

                    if (resource.attributes.field_url != null && resource.attributes.field_url.length > 0) {
                        fetch(resource.attributes.field_url)
                            .then((resp) => resp.json())
                            .then(function (data) {
                                thisObj.setState({
                                    data: thisObj.convertData(data),
                                    loading: false
                                });
                            })
                            .catch(function (error) {
                                console.log(JSON.stringify(error));
                            });
                    }
                } else {
                    console.warn('resource ' + i + ' is not assiged to Eu-GL step ' + mapType)
                }
            }

            // if (resource.relationships.field_analysis_context != null && resource.relationships.field_analysis_context.data != null) {
            //     var analysisContext = this.getIncludedObject(resource.relationships.field_analysis_context.data.type, resource.relationships.field_analysis_context.data.id, originData.included);

            //     if (analysisContext != null) {
            //         if (analysisContext.relationships.field_field_eu_gl_methodology != null && analysisContext.relationships.field_field_eu_gl_methodology.data != null) {
            //             var mythodologyData = this.getIncludedObject(analysisContext.relationships.field_field_eu_gl_methodology.data[0].type, analysisContext.relationships.field_field_eu_gl_methodology.data[0].id, originData.included);
            //             console.log(mythodologyData.attributes.field_eu_gl_taxonomy_id.value);

            //             if (mythodologyData.attributes.field_eu_gl_taxonomy_id.value == mapType) {
            //                 if (resource.attributes.field_url != null) {
            //                     fetch(resource.attributes.field_url)
            //                         .then((resp) => resp.json())
            //                         .then(function (data) {
            //                             thisObj.setState({
            //                                 data: thisObj.convertData(data),
            //                                 loading: false
            //                             });
            //                         })
            //                         .catch(function (error) {
            //                             console.log(JSON.stringify(error));
            //                         });
            //                 }
            //             }
            //         }
            //     }
            // }
        }
    }

    removeNameSpace(val) {
        if (val != null) {
            if (val.lastIndexOf(":") !== -1) {
                return val.substring(val.lastIndexOf(":") + 1, val.length);
            }
        }

        return val;
    }

    getSymbols(count, symbol, nothing) {
        var res = "";

        if (count != null) {
            if (count === 0) {
                return nothing;
            }
            for (var i = 0; i < count; ++i) {
                res += symbol;
            }

            return res;
        }

        return nothing;
    }

    adaptationCell(row) {
        return (<div><img width={50} height={50} className="adaptationImage" src={row.original.adaptationImage} alt="" /><div className="adaptationText"><p>{row.original.adaptation}</p></div></div>);
    }


    render() {
        window.tableCom = this;
        return (
            <div>
                <div>
                    <h1>Adaptation Options</h1>
                </div>
                <div>
                    <TableComponent
                        data={this.state.data}
                        columns={this.state.columns}
                        loading={this.state.loading}
                    //              pivotBy={this.state.pivot} //{["Hazards", "ElementAtRisk"]}
                    //              expanded={["Hazards", "ElementAtRisk"]}
                    />
                </div>
            </div>
        );
    }

}


if (document.getElementById('adaptation-options-table-container') != null) {
    ReactDOM.render(<AdaptationOptionsTable />, document.getElementById('adaptation-options-table-container'));
    document.getElementById('adaptation-options-table-container').style.width = "100%";
}
