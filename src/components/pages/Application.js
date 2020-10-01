import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { toggle_modal } from '../../redux/actions/ModalAction';
import { maths_api_request, CATEGORIES, QUESTIONS } from '../../redux/actions/MathsAPIAction';
import presets from '../presets';

class Application extends React.Component {
    constructor(props) {
        super();
        this.maths_api_category_url = 'https://maths-generator.herokuapp.com/maths/year4/categories?pretty';
        this.state = {
            menu_options: {
                home: 'HOME',
            },
        };
    }

    componentDidMount() {
        this.props.maths_api_request(this.maths_api_category_url, CATEGORIES);
    }

    componentDidUpdate() {
        console.log(this.props.categories);
    }

    call_api(api) {
        this.props.maths_api_request(api, QUESTIONS);
        this.props.toggle_modal(true);
    }

    format_category_keys() {
        if (Object.keys(this.props.categories).length == 0) return [];
        var formatted = [];
        for (let c of Object.keys(this.props.categories)) {
            var splits = c.split('_');
            var f = '';
            for (let s of splits) {
                f +=
                    s.replace(/^[a-z]/g, (x) => {
                        return x.toUpperCase();
                    }) + ' ';
            }
            formatted.push(f.slice(0, -1));
        }
        return formatted;
    }

    render() {
        render();
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

export default connect(mapStateToProps, mapDispatchToProps)(Application);
