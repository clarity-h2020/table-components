import React from "react";
import 'react-table/react-table.css';

const buildRow = value => {
  return React.createElement(
    'tr',
    { key: value.name, className: 'legend-row', style: { backgroundColor: value.color } },
    React.createElement(
      'td',
      { key: value.name + value.color },
      value.name
    )
  );
};

const SimpleLegendComponent = props => {
  const { data } = props;
  return React.createElement(
    'table',
    { className: 'table table-striped' },
    React.createElement(
      'thead',
      null,
      React.createElement(
        'tr',
        { className: 'legend-head' },
        React.createElement(
          'th',
          null,
          'Legend'
        )
      )
    ),
    React.createElement(
      'tbody',
      null,
      data.map(buildRow)
    )
  );
};

export default SimpleLegendComponent;