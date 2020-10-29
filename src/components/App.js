import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Layout from './pages/layout/Layout';
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
                    <Layout>
                        <Switch>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </Layout>
                </Container>
            </Router>
        );
    }
}

export default App;

