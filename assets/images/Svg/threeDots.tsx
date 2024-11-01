import React from "react";
import Svg, {Rect, Path, Circle } from 'react-native-svg';

export const ThreeDotsSvg = () => {
    return (
        <Svg width="40" height="8" viewBox="0 0 40 8" fill="none">
            <Circle cx="36" cy="4" r="4" fill="#FFE3C9"/>
            <Circle cx="20" cy="4" r="4" fill="#FFE3C9"/>
            <Circle cx="4" cy="4" r="4" fill="#FFE3C9"/>
        </Svg>
    );
}
