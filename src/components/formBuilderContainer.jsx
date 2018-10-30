import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

// import FormBuilder from 'formiojs/FormBuilder';
import AllComponents from 'formiojs/lib/components';
import Components from 'formiojs/lib/components/Components';
import FormBuilder from 'formiojs/lib/FormBuilder';

Components.setComponents(AllComponents);

class FormBuilderContainer extends Component {
  static defaultProps = {
    options: {},
  };

  static propTypes = {
    form: PropTypes.object,
    options: PropTypes.object,
    onSaveComponent: PropTypes.func,
    onUpdateComponent: PropTypes.func,
    onDeleteComponent: PropTypes.func,
    onCancelComponent: PropTypes.func,
    onEditComponent: PropTypes.func,
  };

  componentDidMount = () => {
    this.initializeBuilder();
  };

  componentWillUnmount = () => {
    if (this.builder !== undefined) {
      this.builder.instance.destroy(true);
    }
  };

  initializeBuilder = () => {
    const { options, form } = this.props;

    this.builder = new FormBuilder(this.element, form, options);
    this.builderReady = this.builder.setDisplay(form.display);

    this.builderReady.then(() => {
      this.builder.instance.on('saveComponent', this.emit('onSaveComponent'));
      this.builder.instance.on(
        'updateComponent',
        this.emit('onUpdateComponent'),
      );
      this.builder.instance.on(
        'deleteComponent',
        this.emit('onDeleteComponent'),
      );
      this.builder.instance.on(
        'cancelComponent',
        this.emit('onCancelComponent'),
      );
      this.builder.instance.on('editComponent', this.emit('onEditComponent'));
      this.builder.instance.on('saveComponent', this.onChange);
      this.builder.instance.on('updateComponent', this.onChange);
      this.builder.instance.on('deleteComponent', this.onChange);
    });
  };

  componentWillReceiveProps = nextProps => {
    const { options, form } = this.props;

    if (form !== nextProps.form) {
      this.initializeBuilder();
    }

    if (options !== nextProps.options) {
      this.initializeBuilder();
    }
  };

  onChange = () => {
    if (
      this.props.hasOwnProperty('onChange') &&
      typeof this.props.onChange === 'function'
    ) {
      this.props.onChange(this.builder.instance.schema);
    }
  };

  emit = funcName => (...args) => {
    if (
      this.props.hasOwnProperty(funcName) &&
      typeof this.props[funcName] === 'function'
    ) {
      this.props[funcName](...args);
    }
  };

  render = () => {
    return <div ref={element => (this.element = element)} />;
  };
}

export default hot(module)(FormBuilderContainer);
