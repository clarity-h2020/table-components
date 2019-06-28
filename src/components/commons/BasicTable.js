import React from "react";
import queryString from 'query-string';


export default class BasicTable extends React.Component {
  constructor(props) {
    super(props);
    this.protocol = 'https://';
  }

  /**
   * For standalone use, e.g.
   * http://localhost:3000//?url=https://csis.myclimateservice.eu&id=c3609e3e-f80f-482b-9e9f-3a26226a6859
   * 
   */
  componentDidMount() {
    if (this.props.location && this.props.location.search) {
      const values = queryString.parse(this.props.location.search)
      if (values.id && values.id !== null && values.url && values.url !== null) {
        this.setStudyURL(values.id, values.url);
      }
    }
  }

  setStudyURL(id, hostName) {
    console.log('loading study ' + id + ' from ' + hostName);
    this.setState({
      studyId: id,
      hname: hostName
    });
  }

  /**
   * Drupal JSON API 'deeply' inlcudes objects, e.g. &include=field_references are provided onyl onace in a separate array name 'inlcuded'.
   * This method resolves the references and extracts the inlcuded  object.
   */
  getInculdedObject(type, id, includedArray) {
    if (type != null && id != null) {
      for (let i = 0; i < includedArray.length; ++i) {
        if (includedArray[i].type === type && includedArray[i].id === id) {
          return includedArray[i];
        }
      }
    }

    return null;
  }
};
