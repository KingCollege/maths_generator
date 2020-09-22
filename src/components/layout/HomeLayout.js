import React from 'react';
import styled from 'styled-components';
import QuestionModal from '../question/QuestionModal';
import { connect } from 'react-redux';
import { toggle_modal } from '../../redux/actions/ModalAction';
import { maths_api_request, CATEGORIES, QUESTIONS } from '../../redux/actions/MathsAPIAction';
import PRESETS from '../presets';

const Container = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-rows: 200px 1fr;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
`;

const BodyGrid = styled.div`
    display: grid;
    width: 1050px;
    height: auto;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 50px;
    column-gap: 50px;
    grid-template-rows: repeat(${(props) => (props.rows ? props.rows : 3)}, 1fr);

    @media only screen and (max-width: 1050px) {
        grid-template-columns: 1fr;
        width: auto;
        height: auto;
        margin-left: 15px;
        margin-right: 15px;
    }
`;

const Category = styled.div`
    display: grid;
    width: 500px;
    height: 100px;

    grid-template-columns: 100px 1fr;
    @media only screen and (max-width: 1050px) {
        width: auto;
        height: auto;
    }
`;

const IconContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const CategoryIcon = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: ${PRESETS.icon_backgroundcolor};
    ${(props) => (props.icon ? `background: url(${props.icon});` : '')}
`;

const CategoryDescriptionContainer = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-rows: 50px 1fr;
`;

const CategoryDescription = styled.p`
    font-size: ${PRESETS.sub_font};
    color: ${PRESETS.sub_text_color};
    padding-left: 15px;
    margin: 0;
`;

const CategoryTitle = styled.h1`
    display: flex;
    align-items: center;
    font-size: ${PRESETS.category_title_font};
    color: ${PRESETS.main_text_color};
    padding-left: 15px;
    margin: 0;

    &:hover {
        color: ${PRESETS.icon_backgroundcolor};
    }
`;

const Title = styled.h1`
    font-weight: bold;
    font-size: ${PRESETS.title_font};
    color: ${PRESETS.main_text_color};
    margin-bottom: 0;
`;

const Description = styled.h1`
    font-size: ${PRESETS.sub_font};
    color: ${PRESETS.sub_text_color};
    width: 600px;
    text-align: center;
    @media only screen and (max-width: 1050px) {
        margin-left: 15px;
        margin-right: 15px;
        width: auto;
    }
`;
class HomeLayout extends React.Component {
    constructor(props) {
        super();
        this.maths_api_category_url = 'http://192.168.0.28:8080/maths/year4/categories?pretty';
    }

    componentDidMount() {
        this.props.maths_api_request(this.maths_api_category_url, CATEGORIES);
    }

    componentDidUpdate() {}

    call_api(api) {
        this.props.maths_api_request(api, QUESTIONS);
        this.props.toggle_modal(true);
    }

    render_catergories(title, description, api) {
        return (
            <Category key={title}>
                <IconContainer>
                    <CategoryIcon />
                </IconContainer>
                <CategoryDescriptionContainer>
                    <CategoryTitle onClick={() => this.call_api(api)}>{title}</CategoryTitle>
                    <CategoryDescription>{description}</CategoryDescription>
                </CategoryDescriptionContainer>
            </Category>
        );
    }

    render() {
        return (
            <Container>
                <Header>
                    <Title>Welcome to RMATHS</Title>
                    <Description>
                        The latest tool for randomly generated maths questions for primary school students. More
                        categories/updates are coming in the near future....
                    </Description>
                </Header>
                <Body>
                    <BodyGrid className="maths_categories_container">
                        {Object.values(this.props.categories).map((c) =>
                            this.render_catergories(c.title, c.description, c.api)
                        )}
                    </BodyGrid>
                </Body>
                <QuestionModal show={this.props.modal_toggle} />
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    modal_toggle: state.modal.toggle_modal,
    categories: state.maths_api.categories,
});

const mapDispatchToProps = (dispatch) => ({
    toggle_modal: (toggle) => dispatch(toggle_modal(toggle)),
    maths_api_request: (url, type) => dispatch(maths_api_request(url, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);
