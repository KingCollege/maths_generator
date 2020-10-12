import React from 'react';
import styled from 'styled-components';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { Link, withRouter } from 'react-router-dom';
import background from '../../assets/background_one.png';
import presets from '../presets';

const SPToggle = (props) => {
    return (
        <SidePanelToggler onClick={() => props.onClick()} toggle_sp={props.toggle_sp}>
            {props.toggle_sp ? (
                <IoIosArrowBack color={presets.color_scheme.white} size={30} />
            ) : (
                <IoIosArrowForward color={presets.color_scheme.white} size={30} />
            )}
        </SidePanelToggler>
    );
};

const SPButton = (props) => {
    return (
        <StyledLink selected={props.selected} to={props.to} onClick={() => props.onClick()}>
            <ButtonSelectedBar selected={props.selected} />
            <ButtonTextContainer>
                <ButtonText className={window.innerWidth > 700 ? 'margin-left' : 'margin-auto'}>
                    {props.children}
                </ButtonText>
            </ButtonTextContainer>
            <ButtonTextContainer>
                <IoIosArrowForward
                    size={presets.home_layout.bt_txt_size}
                    color={props.selected ? presets.color_scheme.black : presets.color_scheme.white}
                />
            </ButtonTextContainer>
        </StyledLink>
    );
};

class HomeLayout extends React.Component {
    constructor(props) {
        super();
        this.window_resize = this.window_resize.bind(this);
        this.state = {
            toggle_sp: false,
            small_width_window: window.innerWidth <= 700,
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
        window.addEventListener('resize', this.window_resize);
        setTimeout(() => {
            this.setState({
                toggle_sp: !this.state.toggle_sp,
                selected_page: Object.values(this.state.menu_options).filter((nav) => {
                    return nav.path == this.props.location.pathname;
                })[0].name,
            });
            console.log('This will run after 1 second!');
        }, 500);
        console.log(this.props.location);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.window_resize);
    }

    window_resize() {
        if (window.innerWidth <= 700 && !this.state.small_width_window) {
            this.setState({
                small_width_window: true,
            });
        }

        if (window.innerWidth > 700 && this.state.small_width_window) {
            this.setState({
                small_width_window: false,
            });
        }
    }

    switch_selected_page(page_name) {
        this.setState({
            selected_page: page_name,
        });
    }

    toggle_side_panel() {
        this.setState({
            toggle_sp: !this.state.toggle_sp,
        });
    }

    render() {
        return (
            <Container toggle_sp={this.state.toggle_sp}>
                <SidePanel toggle_sp={this.state.toggle_sp}>
                    <SidePanelLogo />
                    <SidePanelBody category_count={2}>
                        {Object.values(this.state.menu_options).map((o) => {
                            return (
                                <SPButton
                                    key={o.name}
                                    selected={o.name == this.state.selected_page}
                                    to={o.path}
                                    onClick={() => this.switch_selected_page(o.name)}
                                >
                                    {o.name}
                                </SPButton>
                            );
                        })}
                    </SidePanelBody>
                </SidePanel>
                <ContentContainer className="hide-scroll">
                    <SPToggle
                        toggle_sp={this.state.toggle_sp}
                        onClick={() => {
                            this.toggle_side_panel();
                        }}
                    />
                    <ContentBody>{this.props.children}</ContentBody>
                </ContentContainer>
            </Container>
        );
    }
}

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: ${presets.color_scheme.grey};
`;

const ContentBody = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

`;

const ContentContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    transition: width 1s;
    -webkit-transition: width 1s;
`;

const SidePanelToggler = styled.button`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    border-radius: 25%;
    margin-left: -12.5px;
    margin-top: 12.5px;
    background-color: ${presets.color_scheme.light_red};
    z-index: 10;

    &:hover {
        background-color: ${presets.color_scheme.light_red};
    }
`;

const SidePanel = styled.div`
    display: grid;
    grid-template-rows: ${presets.home_layout.sp_heights[75]} auto 1fr;
    width: ${(props) => (props.toggle_sp ? '200' : '0')}px;
    height: 100%;
    transition: width 1s;
    -webkit-transition: width 1s;
    background-color: ${presets.color_scheme.light_red};
    @media only screen and (max-width: 700px) {
        width: ${(props) => (props.toggle_sp ? '150' : '0')}px;
    }
`;

const SidePanelLogo = styled.div`
    width: 80%;
    height: 80%;
    margin: auto;
    background-position: left center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const SidePanelBody = styled.div`
    display: grid;
    width: 100%;
    height: auto;
    margin-top: 10px;
    grid-template-rows: repeat(
        ${(props) => (props.category_count ? props.category_count : 0)},
        ${presets.home_layout.sp_heights[50]}
    );
`;

const StyledLink = styled(Link)`
    display: grid;
    grid-template-columns: 5px 1fr 20px;
    padding: 0;
    text-decoration: none;
    color: ${(props) => (props.selected ? presets.color_scheme.blue_green : presets.color_scheme.white)};
    background-color: ${(props) => (props.selected ? presets.color_scheme.white : '')};
    transition: background-color 1s;
    -webkit-transition: background-color 1s;    
    &:hover {
        background-color: ${presets.color_scheme.blue_green};
        color: ${presets.color_scheme.white};
        transition: background-color 1s;
        -webkit-transition: background-color 1s;
    }
    &:active {
        background-color: ${presets.color_scheme.grey};
        color: ${presets.color_scheme.black};
        transition: background-color 0.5s;
        -webkit-transition: background-color 0.5s;
    }
`;

const ButtonTextContainer = styled.div`
    margin: 0;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    align-items: center;
    .margin-left {
        margin-left: 15px;
    }

    .margin-auto {
        margin-left: 10px;
        margin-right: 10px;
    }
`;

const ButtonText = styled.h1`
    font-size: ${presets.home_layout.bt_txt_size};

    @media only screen and (max-width: 700px) {
        font-size: ${presets.font_size.sub_text - 1}px;
    }
`;

const ButtonSelectedBar = styled.div`
    visibility: ${(props) => (props.selected ? 'visible' : 'hidden')};
    height: 100%;
    width: 100%;
    background-color: ${presets.color_scheme.orange};
`;

export default withRouter((props) => <HomeLayout {...props} />);
// border-bottom: 1px solid ${presets.home_layout.sp_border};
// border-top: 1px solid ${presets.home_layout.sp_border};