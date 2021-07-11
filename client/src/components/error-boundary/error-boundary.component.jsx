import React from 'react';

import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText,
} from './error.boundary.styles';

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    // Process the error

    // Some object that will set the state inside of this class.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return <ErrorImageOverlay>
          <ErrorImageContainer imageUrl='https://i.imgur.com/g3hgqe8.png' />
          <ErrorImageText>Sorry this page is broken. </ErrorImageText> 
      </ErrorImageOverlay>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
