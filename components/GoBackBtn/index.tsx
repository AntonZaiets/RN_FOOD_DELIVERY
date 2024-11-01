import React, {useEffect} from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {GoBackSvg} from "@/assets/images/Svg/goBack";
import {loadFonts} from "@/assets/fonts/CustomFonts";
import {router} from "expo-router";

export const GoBackBtn = () => {

    useEffect(() => {
        loadFonts().then(() => console.log('Font Loaded'));
    }, []);

    return(
        <>
            <TouchableOpacity style={styles.container} onPress={() => {router.back()}}>
                <GoBackSvg />
                <Text style={[styles.text, {fontFamily: 'CustomFont-Regular'}]}>Go back</Text>
            </TouchableOpacity>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    text: {
        color: '#27214D',
        fontSize: 16,
        lineHeight: 21,
    }
});