import React from "react";
import Svg, { Line, Circle } from 'react-native-svg';

export const FilterSvg = () => {
    return (
        <Svg width="26" height="17" viewBox="0 0 26 17" fill="none">
            <Line x1="8" y1="4" x2="24" y2="4" stroke="#070648" stroke-width="2" stroke-linecap="round"/>
            <Line x1="18" y1="13" x2="2" y2="13" stroke="#070648" stroke-width="2" stroke-linecap="round"/>
            <Circle cx="4" cy="4" r="3.5" stroke="#070648"/>
            <Circle cx="22" cy="13" r="3.5" transform="rotate(-180 22 13)" stroke="#070648"/>
        </Svg>

    );
}
