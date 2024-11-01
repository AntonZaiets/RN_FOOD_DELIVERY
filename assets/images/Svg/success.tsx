import React from "react";
import Svg, {Rect, Path} from 'react-native-svg';

export const SuccessSvg = () => {
    return (
        <Svg width="164" height="164" viewBox="0 0 164 164" fill="none">
            <Rect x="1" y="1" width="162" height="162" rx="81" fill="#E0FFE5" stroke="#4CD964" stroke-width="2"/>
            <Rect x="32" y="32" width="100" height="100" rx="50" fill="#4CD964"/>
            <Path
                d="M100.04 68.604L97.642 66.674C96.46 65.724 95.773 65.735 94.761 66.985L77.332 88.494L69.221 81.755C68.102 80.815 67.402 80.865 66.482 82.015L64.631 84.425C63.692 85.607 63.812 86.278 64.922 87.205L76.482 96.767C77.672 97.767 78.342 97.664 79.262 96.545L100.341 71.484C101.331 70.294 101.271 69.583 100.04 68.604Z"
                fill="white"/>
        </Svg>
    );
}
