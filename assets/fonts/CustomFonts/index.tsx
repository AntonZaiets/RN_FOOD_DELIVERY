import * as Font from 'expo-font';

export const loadFonts = async () => {

    await Font.loadAsync({
        'CustomFont-Regular': require('./HvDTrial_Brandon_Grotesque_regular-BF64a625c9311e1.otf'),
        'CustomFont-Regular-Italic': require('./HvDTrial_Brandon_Grotesque_regular_italic-BF64a625c94445e.otf'),
        'CustomFont-Black': require('./HvDTrial_Brandon_Grotesque_black-BF64a625c944b08.otf'),
        'CustomFont-Black-Italic': require('./HvDTrial_Brandon_Grotesque_black_italic-BF64a625c93406c.otf'),
        'CustomFont-Medium': require('./HvDTrial_Brandon_Grotesque_medium-BF64a625c84a521.otf'),
        'CustomFont-Medium-Italic': require('./HvDTrial_Brandon_Grotesque_medium_italic-BF64a625c928c55.otf'),
        'CustomFont-Thin': require('./HvDTrial_Brandon_Grotesque_thin-BF64a625c9034b9.otf'),
        'CustomFont-Thin-Italic': require('./HvDTrial_Brandon_Grotesque_thin_italic-BF64a625c918a96.otf'),
        'CustomFont-Bold': require('./HvDTrial_Brandon_Grotesque_bold-BF64a625c9151d5.otf'),
        'CustomFont-Bold-Italic': require('./HvDTrial_Brandon_Grotesque_bold_italic-BF64a625c93b0ce.otf'),
        'CustomFont-Light': require('./HvDTrial_Brandon_Grotesque_light-BF64a625c93e709.otf'),
        'CustomFont-Light-Italic': require('./HvDTrial_Brandon_Grotesque_light_italic-BF64a625c93ac64.otf'),
    });

};