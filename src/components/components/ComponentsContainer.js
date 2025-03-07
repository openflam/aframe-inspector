import React from 'react';
import PropTypes from 'prop-types';
import AddComponent from './AddComponent';
import Component from './Component';
import CommonComponents from './CommonComponents';
import DEFAULT_COMPONENTS from './DefaultComponents';
import Events from '../../lib/Events';

export default class ComponentsContainer extends React.Component {
  static propTypes = {
    entity: PropTypes.object
  };

  componentDidMount() {
    Events.on('entityupdate', (detail) => {
      if (detail.entity !== this.props.entity) {
        return;
      }
      if (detail.component === 'mixin') {
        this.forceUpdate();
      }
    });
  }

  render() {
    const entity = this.props.entity;
    const components = entity ? entity.components : {};
    const definedComponents = Object.keys(components).filter(function (key) {
      return key === 'way_point'; // Only show way_point component
    });

    const renderedComponents = definedComponents.sort().map(function (key) {
      return (
        <Component
          isCollapsed={definedComponents.length > 2}
          component={components[key]}
          entity={entity}
          key={key}
          name={key}
        />
      );
    });

    return (
      <div className="components">
        <CommonComponents entity={entity} />
        {renderedComponents}
      </div>
    );
  }
}
