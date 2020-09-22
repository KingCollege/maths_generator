import React from 'react';
import styled from 'styled-components';

const euclidean = (coords) => {
    return Math.sqrt(coords.map((e) => Math.pow(e, 2)).reduce((a, b) => a + b));
};

const modulo = (x, y) => {
    return ((x % y) + y) % y;
};

const Container = styled.div`
    height: ${(props) => (props.size ? props.size : 200)}px;
    width: ${(props) => (props.size ? props.size : 200)}px;
`;
const Canvas = styled.canvas``;

class Shape extends React.Component {
    constructor(props) {
        super();
        this.canvas_ref = React.createRef();
        this.container_ref = React.createRef();
        this.state = {
            canvas_width: 0,
            canvas_height: 0,
        };
    }

    componentWillUnmount() {}

    componentDidMount() {
        const container = this.container_ref.current;
        this.setState({
            canvas_width: container.offsetWidth,
            canvas_height: container.offsetHeight,
        });
    }

    componentDidUpdate(pre_props, pre_state) {
        this.draw(this.props.shape);
    }

    draw(shape) {
        const canvas = this.canvas_ref.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        const origin = { x: 0, y: 25 };
        const scale = this.props.scale ? this.props.scale : 10;
        if (Object.keys(shape).length === 0) {
            return;
        }
        this.drawShape(shape, origin, ctx, scale);
    }

    drawShape(shape, origin, ctx, scale = 15) {
        const coordinates = Object.values(shape.coordinates);
        const angles = Object.values(shape.angles);
        const missing_angle_index = shape.missing_angle_index;
        ctx.font = '15px Monospace';
        ctx.moveTo(coordinates[0].x * scale + origin.x, coordinates[0].y * scale + origin.y);
        if (missing_angle_index !== 0) {
            ctx.fillText(
                Math.floor(angles[0]),
                coordinates[0].x * scale + origin.x + scale,
                coordinates[0].y * scale + origin.y - scale
            );
        }

        for (var i = 1; i < coordinates.length; ++i) {
            if (missing_angle_index !== i) {
                ctx.fillText(
                    Math.floor(angles[i]),
                    coordinates[i].x * scale + origin.x + scale,
                    coordinates[i].y * scale + origin.y - scale
                );
            }
            ctx.lineTo(coordinates[i].x * scale + origin.x, coordinates[i].y * scale + origin.y);
            ctx.stroke();
        }

        ctx.lineTo(coordinates[0].x * scale + origin.x, coordinates[0].y * scale + origin.y);
        ctx.stroke();
        this.draw_angle_arc(shape, origin, ctx, scale);
    }

    draw_angle_arc(shape, origin, ctx, scale = 15) {
        const coordinates = Object.values(shape.coordinates);
        const angles = Object.values(shape.angles);
        const missing_angle_index = shape.missing_angle_index;
        for (var i = 0; i < coordinates.length; ++i) {
            if (missing_angle_index !== i) {
                const AB = euclidean([
                    coordinates[i].x - coordinates[modulo(i - 1, coordinates.length)].x,
                    coordinates[i].y - coordinates[modulo(i - 1, coordinates.length)].y,
                ]);

                const AC = 1; // anything works, so long it is > 0, 1 is just easier to work with
                // AC is the length from edge(i) to edge(i).x + 1
                const CB = euclidean([
                    coordinates[i].x + AC - coordinates[modulo(i - 1, coordinates.length)].x,
                    coordinates[i].y - coordinates[modulo(i - 1, coordinates.length)].y,
                ]);
                var angle_offset = Math.acos((Math.pow(AB, 2) + Math.pow(AC, 2) - Math.pow(CB, 2)) / (2 * AB * AC));

                // If previous edge is above 0 degree (3 o Clock), we switch the direction
                if (coordinates[i].y > coordinates[modulo(i - 1, coordinates.length)].y) {
                    angle_offset = Math.PI * 2 - angle_offset;
                }

                ctx.beginPath();
                ctx.arc(
                    coordinates[i].x * scale + origin.x,
                    coordinates[i].y * scale + origin.y,
                    scale,
                    angle_offset,
                    (angles[i] * Math.PI) / 180 + angle_offset
                );
                ctx.stroke();
            }
        }
    }

    render() {
        return (
            <Container ref={this.container_ref} size={this.props.width}>
                <Canvas ref={this.canvas_ref} width={this.state.canvas_width} height={this.state.canvas_height} />
            </Container>
        );
    }
}

export default Shape;
