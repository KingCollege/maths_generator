import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import HomeLayout from './layout/HomeLayout';
import Home from './pages/Home';

const Container = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
`;

class App extends React.Component {
    render() {
        return (
            <Router>
                <Container>
                    <HomeLayout>
                        <Switch>
                            <Route path="/application">
                                <div></div>
                            </Route>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </HomeLayout>
                </Container>
            </Router>
        );
    }
}

export default App;

