import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import CharacteriseHazardTable from "./components/CharacteriseHazardTable";
import ExposureTable from "./components/ExposureTable";
import HazardLocalEffectsTable from "./components/HazardLocalEffectsTable";
import RiskAndImpactTable from "./components/RiskAndImpactTable";
import VulnerabilityTable from "./components/VulnerabilityTable";
import AdaptationOptionsTable from "./components/AdaptationOptionsTable";
//import ReactLoading from "react-loading";

export default class App extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    //    console.log("............................................................................................")
    //    console.log("....................... TopicMaps Wuppertal ("+getTopicMapVersion()+")")
    //    console.log("....................... BuildNumber: "+getTopicMapHash())
    //    console.log("............................................................................................")

    //    persistStore(store, null, () => {
    //      let thisHere = this;
    //      setTimeout(() => {
    //        thisHere.setState({ rehydrated: true });
    //      }, 1);
    //    });
  }

  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "main",
        null,
        React.createElement(
          BrowserRouter,
          null,
          React.createElement(
            Switch,
            null,
            React.createElement(Route, { exact: true, path: "/", component: RiskAndImpactTable }),
            React.createElement(Route, { exact: true, path: "/CharacteriseHazardTable/", component: CharacteriseHazardTable }),
            React.createElement(Route, { exact: true, path: "/ExposureTable/", component: ExposureTable }),
            React.createElement(Route, { exact: true, path: "/HazardLocalEffectsTable/", component: HazardLocalEffectsTable }),
            React.createElement(Route, { exact: true, path: "/RiskAndImpactTable/", component: RiskAndImpactTable }),
            React.createElement(Route, { exact: true, path: "/VulnerabilityTable/", component: VulnerabilityTable }),
            React.createElement(Route, { exact: true, path: "/AdaptationOptionsTable/", component: AdaptationOptionsTable }),
            React.createElement(Route, { component: RiskAndImpactTable })
          )
        )
      )
    );
  }
}