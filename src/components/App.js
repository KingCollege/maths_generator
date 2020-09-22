import React from 'react';
import styled from 'styled-components';
import HomeLayout from './layout/HomeLayout';
import Shape from './geometry/Shape';

const Container = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
`;

class App extends React.Component {
    render() {
        return (
            <Container>
                <HomeLayout />
            </Container>
        );
    }
}

export default App;

// DEBUG
// <Shape
//     shape={{
//         questions: [
//             {
//                 coordinates: {
//                     p0: {
//                         x: 4.561533482676271,
//                         y: 2.084962849375518,
//                     },
//                     p1: {
//                         x: 3.115179598502114,
//                         y: 12.95160881522097,
//                     },
//                     p2: {
//                         x: 12.991993793995222,
//                         y: 13.613262297768806,
//                     },
//                     p3: {
//                         x: 10.848167558260759,
//                         y: 2.4639803338084807,
//                     },
//                 },
//                 angles: {
//                     p1p0p3: 94.13137180557617,
//                     p2p1p0: 86.25102641674764,
//                     p3p2p1: 75.28324237664302,
//                     p0p3p2: 104.33435940103321,
//                 },
//                 missing_angle_index: 0,
//             },
//         ],
//         code: 'mas',
//     }}
// />;
