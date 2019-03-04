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
      return (
        <div>
          <main>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={RiskAndImpactTable} />
              <Route exact path="/CharacteriseHazardTable/" component={CharacteriseHazardTable} />
              <Route exact path="/ExposureTable/" component={ExposureTable} />
              <Route exact path="/HazardLocalEffectsTable/" component={HazardLocalEffectsTable} />
              <Route exact path="/RiskAndImpactTable/" component={RiskAndImpactTable} />
              <Route exact path="/VulnerabilityTable/" component={VulnerabilityTable} />
              <Route exact path="/AdaptationOptionsTable/" component={AdaptationOptionsTable} />

              <Route component={RiskAndImpactTable} />
            </Switch>
            </BrowserRouter>
          </main>
        </div>
      );
    }
}