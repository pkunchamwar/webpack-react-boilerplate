import React, { Fragment, Component } from 'react';
import { hot } from 'react-hot-loader';
import FormRenderer from './components/FormRenderer';
import FormBuilderContainer from './components/FormBuilderContainer';

class App extends Component {
  render() {
    return (
      <Fragment>
        <p> Building a Form </p>
        <FormBuilderContainer form={{display: 'form'}} onChange={(schema) => console.log(schema)} />
        <p> Render a Form </p>
        <FormRenderer />
      </ Fragment>
    );
  }
}

export default hot(module)(App);
