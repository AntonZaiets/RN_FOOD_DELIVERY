import React from "react";
import Svg, {Rect, Path } from 'react-native-svg';

export const SmallCheckSvg = () => {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
            <Rect width="24" height="24" rx="12" fill="#4CD964"/>
            <Path
                d="M16.3296 8.78495L15.7541 8.32175C15.4704 8.09375 15.3055 8.09639 15.0627 8.39639L10.8797 13.5585L8.93306 11.9412C8.6645 11.7156 8.4965 11.7276 8.2757 12.0036L7.83146 12.582C7.6061 12.8657 7.6349 13.0267 7.9013 13.2492L10.6757 15.5441C10.9613 15.7841 11.1221 15.7593 11.3429 15.4908L16.4019 9.47615C16.6395 9.19055 16.6251 9.01991 16.3296 8.78495Z"
                fill="white"/>
        </Svg>
    );
}
