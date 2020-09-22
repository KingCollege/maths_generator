import React from 'react';
import styled from 'styled-components';
import MathJax from 'react-mathjax2';
import PRESETS from '../presets';
import Shape from '../geometry/Shape';
import { connect } from 'react-redux';

const QuestionListContainer = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 40px;
    @media only screen and (max-width: ${PRESETS.minimum_modal_width * 2}px) {
        grid-template-rows: 1fr ${(props) => props.modal_width * (40 / (PRESETS.minimum_modal_width * 2))}px;
    }
    overflow: hidden;
`;

const OrderedQuestions = styled.ol`
    height: 80%;
    width: 80%;
    margin: auto;
    font-size: ${PRESETS.font_size.text}px;
    font-family: Arial, Helvetica, sans-serif;
    color: ${PRESETS.colors.black};
    padding-inline-start: 0;
    @media only screen and (max-width: ${PRESETS.minimum_modal_width * 2}px) {
        font-size: ${(props) => props.modal_width * (PRESETS.font_size.text / (PRESETS.minimum_modal_width * 2))}px;
    }
    overflow: hidden;
`;

const QuestionsFooter = styled.div`
    height: 100%;
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${PRESETS.font_size.text}px;

    @media only screen and (max-width: ${PRESETS.minimum_modal_width * 2}px) {
        font-size: ${(props) => props.modal_width * (PRESETS.font_size.text / (PRESETS.minimum_modal_width * 2))}px;
    }
`;

const Questions = styled.li`
    height: ${(props) => props.height}px;
    list-style-type: none;
`;

const PageController = styled.button`
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 1px solid ${PRESETS.colors.black};
    text-shadow: 0px 0px 0px transparent;
    font-size: inherit;
    color: ${PRESETS.colors.grey};
    border-radius: 5px;

    @media only screen and (max-width: ${PRESETS.minimum_modal_width * 2}px) {
        font-size: ${(props) => props.modal_width * (PRESETS.font_size.text / (PRESETS.minimum_modal_width * 2))}px;
    }

    &:hover {
        background: ${PRESETS.colors.light_grey};
        box-shadow: 0px 0px 0px transparent;
        border: 1px solid ${PRESETS.colors.black};
        text-shadow: 0px 0px 0px transparent;
    }

    &:active {
        background: transparent;
        outline: none;
        border: 1px solid ${PRESETS.colors.black};
    }

    &:focus {
        outline: 0;
    }
`;

class QuestionPainter extends React.Component {
    constructor(props) {
        super();
        this.options = {
            sfa: (questions) => {
                return this.render_simple_fraction_arithmetic(questions);
            },
            mas: (questions) => {
                return this.render_missing_angle_shapes(questions);
            },
        };
        this.container_ref = React.createRef();
        this.max_page = 1;
        this.q_per_page = 4;
        this.state = {
            page: 0,
        };
    }

    componentDidUpdate(pre_props) {
        if (this.props.modal_toggle !== pre_props.modal_toggle) {
            this.setState({
                page: 0,
            });
            this.max_page = 1;
            this.q_per_page = 4;
        }
    }

    turn_page(dir) {
        if (dir === undefined) return;
        if (dir < 0) {
            this.setState({ page: this.state.page - 1 });
        } else {
            this.setState({ page: this.state.page + 1 });
        }
    }

    question_size(questions) {
        const container_height = this.container_ref.current.offsetHeight;
        if (container_height === 0) return -1;
        const question_height = Math.round(this.container_ref.current.offsetHeight / this.q_per_page);
        this.max_page = Math.ceil(questions.length / this.q_per_page);
        return question_height;
    }

    paint(questions) {
        if (Object.keys(questions).length === 0) return <div />;

        const paint_func = this.options[questions.code];
        if (paint_func !== undefined) {
            const view = paint_func(questions.questions);
            return view;
        }
        return <div />;
    }

    // Add rendering methods here

    render_simple_fraction_arithmetic(questions) {
        this.q_per_page = 4;
        const format_operands = (operands, operator) => {
            var formatted = '';
            for (let operand of operands) {
                formatted += ' ' + operand.numerator + '/' + operand.denominator + ' ' + operator;
            }
            return formatted.slice(0, -1);
        };
        const question_height = this.question_size(questions);
        if (question_height < 0) return <div />;

        const formatted = questions
            .slice(this.state.page * this.q_per_page, this.state.page * this.q_per_page + this.q_per_page)
            .map((q, i) => {
                return (
                    <Questions key={i} height={question_height}>
                        {i + 1 + this.state.page * this.q_per_page}) What is{' '}
                        <MathJax.Node>{format_operands(q.operands, q.operator)}</MathJax.Node> ?
                    </Questions>
                );
            });

        return formatted;
    }

    render_missing_angle_shapes(questions) {
        this.q_per_page = 2;
        const question_height = this.question_size(questions);
        if (question_height < 0) return <div />;
        return questions
            .slice(this.state.page * this.q_per_page, this.state.page * this.q_per_page + this.q_per_page)
            .map((q, i) => {
                return (
                    <Questions key={i} height={question_height}>
                        {i + 1 + this.state.page * this.q_per_page}) Find the missing angle. <br />
                        <Shape shape={q} scale={this.props.modal_width * (10 / (PRESETS.minimum_modal_width * 2))} />
                    </Questions>
                );
            });
    }

    render() {
        return (
            <QuestionListContainer>
                <MathJax.Context input="ascii">
                    <OrderedQuestions modal_width={this.props.modal_width} ref={this.container_ref}>
                        {this.paint(this.props.questions)}
                    </OrderedQuestions>
                </MathJax.Context>
                <QuestionsFooter modal_width={this.props.modal_width}>
                    <PageController disabled={this.state.page === 0 ? true : false} onClick={() => this.turn_page(-1)}>
                        BACK
                    </PageController>
                    <PageController
                        disabled={this.state.page === this.max_page - 1 ? true : false}
                        onClick={() => this.turn_page(1)}
                    >
                        NEXT
                    </PageController>
                </QuestionsFooter>
            </QuestionListContainer>
        );
    }
}

const mapStateToProps = (state) => ({
    modal_toggle: state.modal.toggle_modal,
    questions: state.maths_api.questions,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPainter);
