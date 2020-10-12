import styled from 'styled-components';
import presets from '../../presets';

export const NavigationButton = styled.button`
    border: 1px solid ${presets.color_scheme.grey};
    background-color: ${presets.color_scheme.light_red};
    max-width: 200px;
    &:hover {
        background-color: ${presets.color_scheme.light_red};
        border: 1px solid ${presets.color_scheme.grey};
    }

    &:active {
        background-color: ${presets.color_scheme.orange};
        border: 1px solid ${presets.color_scheme.grey};
    }

    p {
        color: ${presets.color_scheme.white} !important;
    }
`;
