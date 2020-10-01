import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toggle_modal } from '../../redux/actions/ModalAction';
import PRESETS from '../presets';
import QuestionPainter from './QuestionPainter';

const Background = styled.div`
    position: absolute;
    display: ${(props) => (props.show ? 'block' : 'none')};
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 80%;
    z-index: 2;
`;

const Container = styled.div`
    position: absolute;
    display: ${(props) => (props.show ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const ModalHeader = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${PRESETS.colors.grey};
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`;

const ModalHeaderContent = styled.div`
    height: 92%;
    width: 95%;
    background-color: ${PRESETS.colors.white};
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
`;

const ModalHeaderTitle = styled.h1`
    font-size: ${PRESETS.font_size.title}px;
    color: ${PRESETS.colors.grey};
    margin: 0;
    padding: 5px 15px 5px 15px;
    border-radius: 0px 15px 15px 0px;
    -moz-border-radius: 0px 15px 15px 0px;
    -webkit-border-radius: 0px 15px 15px 0px;
    border: 1px solid ${PRESETS.colors.light_grey};
    @media only screen and (max-width: ${PRESETS.minimum_modal_width * 2}px) {
        font-size: ${(props) => props.modal_width * (PRESETS.font_size.title / (PRESETS.minimum_modal_width * 2))}px;
    }
`;

const ModalCloseButton = styled.button`
    background: transparent;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid ${PRESETS.colors.light_grey};
    text-shadow: 0px 0px 0px transparent;
    font-size: ${PRESETS.font_size.title}px;
    color: ${PRESETS.colors.grey};

    @media only screen and (max-width: ${PRESETS.minimum_modal_width * 2}px) {
        font-size: ${(props) => props.modal_width * (PRESETS.font_size.title / (PRESETS.minimum_modal_width * 2))}px;
    }

    &:hover {
        background: transparent;
        box-shadow: 0px 0px 0px transparent;
        border: 0px solid transparent;
        text-shadow: 0px 0px 0px transparent;
    }

    &:active {
        outline: none;
        border: none;
    }

    &:focus {
        outline: 0;
    }
`;

const Modal = styled.div`
    display: grid;
    grid-template-rows: 60px 1fr;
    position: relative;
    width: ${PRESETS.minimum_modal_width * 2}px;
    min-width: ${PRESETS.minimum_modal_width}px;
    height: 100%;
    background-color: ${PRESETS.colors.white};
    -webkit-box-shadow: 10px 10px 25px -10px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 25px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 10px 25px -10px rgba(0, 0, 0, 0.75);
    z-index: 3;

    @media only screen and (max-width: ${PRESETS.minimum_modal_width * 2}px) {
        grid-template-rows: ${(props) => props.modal_width * (60 / (PRESETS.minimum_modal_width * 2))}px 1fr;
    }
`;

const ModalBody = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 100px 1fr;
    @media only screen and (max-width: ${PRESETS.minimum_modal_width * 2}px) {
        grid-template-rows: ${(props) => props.modal_width * (100 / (PRESETS.minimum_modal_width * 2))}px 1fr;
    }
    overflow: hidden;
`;

const ModalBodyIntro = styled.p`
    font-size: ${PRESETS.font_size.text}px;
    font-family: Arial, Helvetica, sans-serif;
    color: ${PRESETS.colors.black};
    margin-left: 45px;
    margin-right: 45px;
    margin-bottom: 0;
    margin-top: 45px;
    height: fit-content;
    @media only screen and (max-width: ${PRESETS.minimum_modal_width * 2}px) {
        font-size: ${(props) => props.modal_width * (PRESETS.font_size.text / (PRESETS.minimum_modal_width * 2))}px;
    }
    @media only screen and (max-height: ${PRESETS.minimum_modal_height}px) {
        font-size: ${(props) => props.modal_height * (PRESETS.font_size.text / (PRESETS.minimum_modal_width * 2))}px;
    }
`;

class QuestionModal extends React.Component {
    constructor(props) {
        super();
        this.modal_ref = React.createRef();
        this.canvas_ref = React.createRef();
        this.window_resize = this.window_resize.bind(this);
        this.state = {
            modal_width: 0,
            modal_height: 0,
            max_modal_width: false,
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.window_resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.window_resize);
    }

    componentDidUpdate(pre_props, pre_state) {
        // console.log(this.props.questions);
        if (pre_props.show !== this.props.show) {
            // console.log(this.canvas_ref.current);
            this.setState({
                modal_width: this.modal_ref.current.offsetWidth,
                modal_height: this.modal_ref.current.offsetHeight,
                max_modal_width: this.modal_ref.current.offsetWidth >= PRESETS.minimum_modal_width * 2,
            });
        }
    }

    // Only resize when modal is shown
    window_resize() {
        if (
            this.props.show &&
            window.innerWidth < PRESETS.minimum_modal_width * 2 &&
            window.innerWidth >= PRESETS.minimum_modal_width
        ) {
            this.setState({
                modal_width: this.modal_ref.current.offsetWidth,
                modal_height: this.modal_ref.current.offsetHeight,
                max_modal_width: this.modal_ref.current.offsetWidth >= PRESETS.minimum_modal_width * 2,
            });
        } else if (
            this.props.show &&
            ((window.innerWidth >= PRESETS.minimum_modal_width * 2 && !this.state.max_modal_width) ||
                this.state.modal_height < PRESETS.maximum_modal_height)
        ) {
            this.setState({
                modal_width: PRESETS.minimum_modal_width * 2,
                modal_height: this.modal_ref.current.offsetHeight,
                max_modal_width: this.modal_ref.current.offsetWidth >= PRESETS.minimum_modal_width * 2,
            });
        }
    }

    render() {
        return (
            <>
                <Container show={this.props.modal_toggle}>
                    <Modal ref={this.modal_ref} modal_width={this.state.modal_width}>
                        <ModalHeader>
                            <ModalHeaderContent>
                                <ModalHeaderTitle modal_width={this.state.modal_width}>
                                    RMaths practice paper
                                </ModalHeaderTitle>
                                <ModalCloseButton
                                    onClick={() => this.props.toggle_modal(false)}
                                    modal_width={this.state.modal_width}
                                >
                                    X
                                </ModalCloseButton>
                            </ModalHeaderContent>
                        </ModalHeader>
                        <ModalBody>
                            <ModalBodyIntro modal_width={this.state.modal_width} modal_height={this.state.modal_height}>
                                <strong>Question Type: {this.props.questions.code}</strong>
                                <br />
                                This is a maths practice paper, all questions are randomly generated. Do not close if
                                you want to keep the questions.
                            </ModalBodyIntro>
                            <QuestionPainter
                                modal_width={this.state.modal_width}
                                modal_height={this.state.modal_height}
                            />
                        </ModalBody>
                    </Modal>
                </Container>
                <Background show={this.props.modal_toggle} onClick={() => this.props.toggle_modal(false)} />
            </>
        );
    }
}

// <Canvas
//     ref={this.canvas_ref}
//     width={this.state.modal_width}
//     height={this.state.modal_height}
// />;

const mapStateToProps = (state) => ({
    modal_toggle: state.modal.toggle_modal,
    questions: state.maths_api.questions,
});

const mapDispatchToProps = (dispatch) => ({
    toggle_modal: (toggle) => dispatch(toggle_modal(toggle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionModal);
