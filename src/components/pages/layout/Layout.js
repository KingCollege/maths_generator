import React from 'react';
import styled from 'styled-components';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { Link, withRouter } from 'react-router-dom';
import presets from '../../presets';

class HomeLayout extends React.Component {
    constructor(props) {
        super();
        this.window_resize = this.window_resize.bind(this);
        this.state = {
            menu_options: {
                Home: {
                    name: 'Home',
                    path: '/',
                },
                Application: {
                    name: 'Application',
                    path: '/application',
                },
            },
            selected_page: 'Home',
        };
    }

    componentDidMount() {
        console.log(this.props.location);
    }

    componentWillUnmount() {}

    window_resize() {}

    render() {
        return <Container className="hide-scroll">{this.props.children}</Container>;
    }
}

const Container = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: ${presets.color_scheme.cloud};
    justify-content: center;
    align-items: flex-start;
    overflow: auto;
`;

export default withRouter((props) => <HomeLayout {...props} />);
