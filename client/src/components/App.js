import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Homepage from './Homepage';
import Email from './Email';

const App = () => {
  return (
    <Router>
        <Switch>
            <Route exact path='/'>
                <Homepage />
            </Route>
            <Route exact path='/createaccount'>
                <Email created={false} />
            </Route>
            <Route exact path='/login'>
                <Email created={true} />
            </Route>
        </Switch>
    </Router>
  );
};

export default App;
