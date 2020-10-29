import styled from 'styled-components';
import presets from '../../presets';
import { Link } from 'react-router-dom';

export const NavigationButton = styled(Link)`
    text-decoration: none;
    background-color: ${presets.color_scheme.light_red};
    max-width: 200px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    -o-transform: rotate(3deg);
    -webkit-transform: rotate(3deg);
    -moz-transform: rotate(3deg);
    -moz-box-shadow: 5px 5px 7px rgba(33, 33, 33, 1);
    -webkit-box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
    box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);

    &:hover {
        background-color: ${presets.color_scheme.light_red};
        max-width: 210px;
        height: 60px;
    }

    &:active {
        background-color: ${presets.color_scheme.orange};
    }

    p {
        color: ${presets.color_scheme.white} !important;
    }

    z-index: 11;
`;
