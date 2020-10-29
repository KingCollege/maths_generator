import React from 'react';
import styled from 'styled-components';


import background from '../../assets/background_one.png';
import {NavigationButton} from './styles/ButtonStyles'
import { connect } from 'react-redux';
import { maths_api_request, CATEGORIES, QUESTIONS } from '../../redux/actions/MathsAPIAction';
import presets from '../presets';

// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
// https://code.tutsplus.com/tutorials/create-a-sticky-note-effect-in-5-easy-steps-with-css3-and-html5--net-13934

class Application extends React.Component {
    constructor(props) {
        super();
        this.maths_api_category_url = 'https://maths-generator.herokuapp.com/maths/year4/categories?pretty';
        this.state = {
            window_height: null,
            window_width: null,
        };
        this.window_scale = this.window_scale.bind(this)
    }

    componentDidMount() {
        window.addEventListener('resize', this.window_scale())
        // this.props.maths_api_request(this.maths_api_category_url, CATEGORIES);
    }

    componentDidUpdate() {
        // console.log(this.props.categories);
    }

    window_scale() {
    }

    call_api(api) {
        // this.props.maths_api_request(api, QUESTIONS);
    }

    random(min, max) {
        return ~~(Math.random() * (max - min + 1) + min);
    }

    random_color() {
        var colors = ['#f4a261', '#e76f51', '#e9c46a', '#2a9d8f', '#264653'];
        return colors[this.random(0, colors.length)];
    }

    render() {
        return (
            <Container>
                <ContentContainer>
                    <QuestionContainer>
                        <QuestionStickyNote
                            rotate={this.random(-5, 3)}
                            color={this.random_color()}
                        ></QuestionStickyNote>
                    </QuestionContainer>
                </ContentContainer>
            </Container>
        );
    }
}



const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const ContentContainer = styled.div`
    width: ${220 * 5}px;
    margin-left: 50px;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    background-color: transparent;
`;

const QuestionContainer = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 200px 200px;
    grid-template-columns: repeat(5, 200px);
    row-gap: 20px;
    column-gap: 20px;
`;

const QuestionStickyNote = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${(props) => (props.color ? props.color : presets.color_scheme.yellow)};
    -o-transform: rotate(${(props) => (props.rotate ? props.rotate : 5)}deg);
    -webkit-transform: rotate(${(props) => (props.rotate ? props.rotate : 5)}deg);
    -moz-transform: rotate(${(props) => (props.rotate ? props.rotate : 5)}deg);
    -moz-box-shadow: 5px 5px 7px rgba(33, 33, 33, 1);
    -webkit-box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
    box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
`;

const mapStateToProps = (state) => ({
    categories: state.maths_api.categories,
});

const mapDispatchToProps = (dispatch) => ({
    maths_api_request: (url, type) => dispatch(maths_api_request(url, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
