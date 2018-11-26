import React, {Component} from 'react';

class ErrorBoundary extends Component {
	constructor(props){
		super(props);
		this.state = {
		hasError: true
		}
	}
	
	static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  render() {
  	return (<p>Something went wrong</p>)
  }
}

export default ErrorBoundary;