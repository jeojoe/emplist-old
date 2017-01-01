import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
// Import Components
import Helmet from 'react-helmet';
// import DevTools from './components/DevTools';
import Navbar from './components/Navbar';
// Import Style
// Import Actions

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  render() {
    return (
      <div>
        {/* this.state.isMounted &&
          !window.devToolsExtension &&
          process.env.NODE_ENV === 'development' &&
          <DevTools /> */}
        <div>
          {/* titleTemplate="%s - Blog App" */}
          <Helmet
            title="emplist : simple finding jobs"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Navbar />
          <div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

// Retrieve data from store as props
// function mapStateToProps(store) {
//   return {
//     intl: store.intl,
//   };
// }

// export default connect(mapStateToProps)(App);
export default App;
