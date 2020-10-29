import React from 'react';
import styled from 'styled-components';

import presets from '../presets';
import AvatarIcon from '../../assets/avatar.svg';
import MenuBackground from '../../assets/menu_background.svg'

import {FaPlus, FaMinus, FaDivide, FaTimes, FaShapes} from 'react-icons/fa'
import { connect } from 'react-redux';
import { maths_api_request, CATEGORIES, QUESTIONS } from '../../redux/actions/MathsAPIAction';
import QuestionModal from '../question/QuestionModal'

class Home extends React.Component {
    constructor(props) {
        super();
        this.maths_api_category_url = 'https://maths-generator.herokuapp.com/maths/year4/categories?pretty';
        this.state = {
            expand: false,
        };
    }

    componentDidMount() {
        // this.props.maths_api_request(this.maths_api_category_url, CATEGORIES);
        this.callApi('https://maths-generator.herokuapp.com/maths/year4/mas?pretty');
        //this.callApi('https://maths-generator.herokuapp.com/maths/year4/sfa?pretty');
    }

    componentDidUpdate() {
        console.log(this.props.categories, this.props.questions);
    }

    callApi(api) {
        this.props.maths_api_request(api, QUESTIONS);
    }

    expandMenu() {
        this.setState({  expand: !this.state.expand  });;
    }

    render() {
        return (
            <Container className="hide-scroll">
                <MenuContainer>
                    <MenuTabContainer>
                        <Avatar src={AvatarIcon} />
                        <MenuList>
                            {Object.keys(ButtonTypes).map((type) => {
                                return ButtonTypes[type](this.expandMenu.bind(this));
                            })}
                        </MenuList>
                    </MenuTabContainer>
                    <MenuOptionContainer expand={this.state.expand}></MenuOptionContainer>
                </MenuContainer>

                <ContentContainer>
                    <div style={{ width: '100%', height: '100%', display:'flex' }}>
                        <QuestionModal />
                        <QuestionModal />
                    </div>
                </ContentContainer>
            </Container>
        );
    }
}

const Container = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    overflow: auto;

    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

const MenuContainer = styled.div`
    display: flex;
    height: 100%;
    width: fit-content;
    background-image: url(${MenuBackground});
    background-position: center center;
    background-size: cover;

    @media only screen and (max-width: 768px) {
        flex-direction: column;
        width: 100%;
        height: fit-content;
    }

    -webkit-box-shadow: 5px 0px 10px -3px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 5px 0px 10px -3px rgba(0, 0, 0, 0.5);
    box-shadow: 5px 0px 10px -3px rgba(0, 0, 0, 0.5);
`;

const Avatar = styled.img`
    width: 80px;
    height: 80px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
    @media only screen and (max-width: 768px) {
        width: 35px;
        height: 35px;
        margin: auto 0 auto 15px;
    }
`;

const MenuList = styled.ul`
    list-style-type: none;
    margin: 25px 0 0 0;
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    @media only screen and (max-width: 768px) {
        margin: 0;
        flex-direction: row;
        height: 100%;
    }
`;

const Button = styled.button`
    display: flex;
    height: auto;
    width: 100%;
    padding: 15px 0 15px 0;

    color: ${presets.color_scheme.cloud};
    align-items: center;

    @media only screen and (max-width: 768px) {
        padding: 0 15px 0 15px;
        width: fit-content;
        height: 100%;
    }

    &:hover {
        background-color: rgb(45, 156, 219, 0.75);
    }
`; 

const ButtonSpan = styled.span`
    @media only screen and (max-width: 768px) {
        display: none;
    }
`

const IconWrapper = styled.div`
    margin: 0 10px 0 5px;
    padding: 0;
    @media only screen and (max-width: 768px) {
        margin: 0;
    }
`;

const ButtonTypes = {
    plus: (onClick) => {
        return (
            <Button onClick={() => onClick()}>
                <IconWrapper>
                    <FaPlus size={15} color={presets.color_scheme.cloud} />
                </IconWrapper>
                <ButtonSpan>Addition</ButtonSpan>
            </Button>
        );
    },
    minus: (onClick) => {
        return (
            <Button onClick={() => onClick()}>
                <IconWrapper>
                    <FaMinus size={15} color={presets.color_scheme.cloud} />
                </IconWrapper>
                <ButtonSpan>Subtraction</ButtonSpan>
            </Button>
        );
    },
    divide: (onClick) => {
        return (
            <Button onClick={() => onClick()}>
                <IconWrapper>
                    <FaDivide size={15} color={presets.color_scheme.cloud} />
                </IconWrapper>
                <ButtonSpan>Division</ButtonSpan>
            </Button>
        );
    },
    multiply: (onClick) => {
        return (
            <Button onClick={() => onClick()}>
                <IconWrapper>
                    <FaTimes size={15} color={presets.color_scheme.cloud} />
                </IconWrapper>
                <ButtonSpan>Multiplication</ButtonSpan>
            </Button>
        );
    },
    shapes: (onClick) => {
        return (
            <Button onClick={() => onClick()}>
                <IconWrapper>
                    <FaShapes size={15} color={presets.color_scheme.cloud} />
                </IconWrapper>
                <ButtonSpan>Shapes</ButtonSpan>
            </Button>
        );
    },
};

const MenuTabContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 140px;
    background-color: rgb(47, 128, 237, 0.75); /* presets.color_scheme.deep_blue */
    justify-content: flex-start;
    align-items: center;
    @media only screen and (max-width: 768px) {
        height: 50px;
        width: 100%;
        flex-direction: row;
    }
`;

const MenuOptionContainer = styled.div`
    display: ${props => props.expand ? 'flex' : 'none'};
    height: 100%;
    width: 140px;
    background-color: rgb(45, 156, 219, 0.75); /* presets.color_scheme.blue */
    @media only screen and (max-width: 768px) {
        height: 50px;
        width: 100%;
    }
`;

const ContentContainer = styled.div`
    height: 100%;
    width: 100%;
    overflow: auto;
`;

const mapStateToProps = (state) => ({
    categories: state.maths_api.categories,
    questions: state.maths_api.questions,
});

const mapDispatchToProps = (dispatch) => ({
    maths_api_request: (url, type) => dispatch(maths_api_request(url, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
