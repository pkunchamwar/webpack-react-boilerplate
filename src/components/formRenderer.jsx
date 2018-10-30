import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import Form from 'formiojs/lib/Form';
import AllComponents from 'formiojs/lib/components';
import Components from 'formiojs/lib/components/Components';

Components.setComponents(AllComponents);

class FormRenderer extends Component {
    static defaultProps = {
      options: {},
    };
  
    static propTypes = {
      src: PropTypes.string,
      url: PropTypes.string,
      form: PropTypes.object,
      submission: PropTypes.object,
      options: PropTypes.shape({
        readOnly: PropTypes.boolean,
        noAlerts: PropTypes.boolean,
        i18n: PropTypes.object,
        template: PropTypes.string,
        templates: PropTypes.any,
      }),
      onPrevPage: PropTypes.func,
      onNextPage: PropTypes.func,
      onChange: PropTypes.func,
      onCustomEvent: PropTypes.func,
      onSubmit: PropTypes.func,
      onSubmitDone: PropTypes.func,
      onFormLoad: PropTypes.func,
      onError: PropTypes.func,
      onRender: PropTypes.func,
    };
  
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    componentDidMount() {
      this.src = 'https://jbicqxpiokjgovv.form.io/reactcontactformssample';
      this.options = {};
      this.createPromise = new Form(this.element, this.src, this.options)
        .render()
        .then(formio => {
          this.formio = formio;
          this.formio.src = this.src;
        });
      this.initializeFormio();
    }
  
    componentWillReceiveProps(nextProps) {
      const { options, src, form, submission } = this.props;
  
      if (src !== nextProps.src) {
        this.createPromise = new Form(this.element, nextProps.src, options).render().then(
          formio => {
            this.formio = formio;
            this.formio.src = nextProps.src;
          },
        );
        this.initializeFormio();
      }
      if (form !== nextProps.form) {
        this.createPromise = new Form(this.element, nextProps.form, options).render().then(
          formio => {
            this.formio = formio;
            this.formio.form = form;
          },
        );
        this.initializeFormio();
      }
  
      if (submission !== nextProps.submission && this.formio) {
        this.formio.submission = nextProps.submission;
      }
    }
  
    initializeFormio() {
      if (this.createPromise) {
        this.createPromise.then(() => {
          if (this.props.submission) {
            this.formio.submission = this.props.submission;
          }
  
          // this.formio.on('prevPage', this.emit('onPrevPage'));
          // this.formio.on('nextPage', this.emit('onNextPage'));
          // this.formio.on('change', this.emit('onChange'));
          // this.formio.on('customEvent', this.emit('onCustomEvent'));
          // this.formio.on('formLoad', this.emit('onFormLoad'));
          // this.formio.on('submit', this.emit('onSubmit'));
          // this.formio.on('submitDone', this.emit('onSubmitDone'));
          // this.formio.on('error', this.emit('onError'));
          // this.formio.on('render', this.emit('onRender'));
        });
      }
    }
  
    emit = funcName => (...args) => {
      if (
        this.props.hasOwnProperty(funcName) &&
        typeof this.props[funcName] === 'function'
      ) {
        this.props[funcName](...args);
      }
    };

    render() {
      return <div ref={element => (this.element = element) } />;
    }
}
export default hot(module)(FormRenderer);
