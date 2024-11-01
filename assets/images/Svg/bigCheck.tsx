import React from "react";
import Svg, {Rect, Path } from 'react-native-svg';

export const BigCheckSvg = () => {
    return (
        <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" >
            <Rect width="40" height="40" rx="20" fill="#4CD964"/>
            <Path
                d="M27.2159 14.6414L26.2567 13.8694C25.7839 13.4894 25.5091 13.4938 25.1043 13.9938L18.1327 22.5974L14.8883 19.9018C14.4407 19.5258 14.1607 19.5458 13.7927 20.0058L13.0523 20.9698C12.6767 21.4426 12.7247 21.711 13.1687 22.0818L17.7927 25.9066C18.2687 26.3066 18.5367 26.2654 18.9047 25.8178L27.3363 15.7934C27.7323 15.3174 27.7083 15.033 27.2159 14.6414Z"
                fill="white"/>
        </Svg>
    );
}