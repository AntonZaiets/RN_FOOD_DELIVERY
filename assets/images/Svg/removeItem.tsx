import React from "react";
import Svg, { Rect, Line } from 'react-native-svg';

export const RemoveItemSvg = () => {
    return (
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <Rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#333333"/>
            <Line x1="8" y1="16.3333" x2="24" y2="16.3333" stroke="#333333" stroke-width="2"/>
        </Svg>
    );
}
