import styled from 'styled-components';
import presets from '../../presets';

export const HandWritingTitle = styled.p`
    font-size: ${presets.font_size.hand_title}px;
    color: ${presets.color_scheme.blue_green};
    font-weight: bold;
    font-family: 'Reenie Beanie', source-code-pro, Menlo, Monaco, Consolas, 'Courier New';
    @media only screen and (max-width: 700px) {
        font-size: ${presets.font_size.hand_title - 3}px;
    }
`;

export const HandWritingText = styled.p`
    font-size: ${presets.font_size.hand_text}px;
    color: ${presets.color_scheme.blue_green};
    font-family: 'Reenie Beanie', source-code-pro, Menlo, Monaco, Consolas, 'Courier New';
    @media only screen and (max-width: 700px) {
        font-size: ${presets.font_size.hand_text - 3}px;
    }
`;

export const Title = styled.p`
    font-size: ${presets.font_size.title}px;
    color: ${presets.color_scheme.blue_green};
    font-weight: bold;
    @media only screen and (max-width: 700px) {
        font-size: ${presets.font_size.title - 3}px;
    }
`;

export const SubTitle = styled.p`
    font-size: ${presets.font_size.sub_title}px;
    color: ${presets.color_scheme.blue_green};
    font-weight: bold;
`;

export const Text = styled.p`
    font-size: ${presets.font_size.text}px;
    color: ${(props) => (props.code ? presets.color_scheme.white : presets.color_scheme.blue_green)};
    background-color: ${(props) => (props.code ? presets.color_scheme.light_red : 'transparent')};
    padding: ${(props) => (props.code ? 5 : 0)}px;
    max-width: 500px;
    word-break: ${(props) => (props.code ? 'break-all' : '')};

    @media only screen and (max-width: 700px) {
        font-size: ${presets.font_size.text - 3}px;
    }
`;

export const PreText = styled.pre`
    display: flex;
    font-size: ${presets.font_size.text}px;
    color: ${presets.color_scheme.white};
    background-color: ${presets.color_scheme.light_red};
    overflow: auto;
    padding: 5px;

    @media only screen and (max-width: 700px) {
        font-size: ${presets.font_size.text - 3}px;
    }
`;

export const SubText = styled.p`
    font-size: ${presets.font_size.sub_text}px;
    color: ${presets.color_scheme.blue_green};
    margin: 5px 0 0 0;
`;
