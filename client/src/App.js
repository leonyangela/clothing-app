import React, { lazy, useEffect, Suspense } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import Header from './components/header/header.component.jsx';
import Spinner from './components/with-spinner/with-spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
// import HomePage from './pages/homepage/homepage.component.jsx'
// import ShopPage from './pages/shop/shop.component.jsx';
// import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
// import CheckoutPage from './pages/checkout/checkout.component.jsx';

import { GlobalStyle } from './global.styles';

const HomePage = lazy(() => import('./pages/homepage/homepage.component.jsx'));
const ShopPage = lazy(() => import('./pages/shop/shop.component.jsx'));
const SignInAndSignUpPage = lazy(() =>
  import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx')
);
const CheckoutPage = lazy(() =>
  import('./pages/checkout/checkout.component.jsx')
);

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth()
  // }

  return (
    <div>
      {/* <Header currentUser={this.state.currentUser} /> ==> Before REDUX*/}
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomePage} />

            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route
              exact
              path='/signin'
              render={() =>
                currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
              }
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
