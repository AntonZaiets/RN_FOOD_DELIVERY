import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { loadFonts } from "@/assets/fonts/CustomFonts";

const Authentication = () => {
    const router = useRouter();
    const [inputValue, setInputValue] = useState('');
    const [inputName, setInputName] = useState('');

    const handleChangeText = (text: string) => {
        setInputValue(text);
    };

    const handleOrdering = () => {
        if(inputValue.length !== 0){
            setInputName(inputValue);
            router.push({
                pathname: '/home',
                params: { inputName: inputValue },
            });
        }
    };

    useEffect(() => {
        loadFonts().then(() => {
            console.log('Font Loaded');
        });
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/fruits/bgFruits.png')}
                style={styles.top}
                resizeMode='cover'
            >
                <Image style={styles.topImage} source={require('../assets/images/fruits/smallFruit.png')} />
                <Image source={require('../assets/images/fruits/secondFruitBasket.png')} />
                <Image style={styles.shadow} source={require('../assets/images/fruits/firstImageShadow.png')} />
            </ImageBackground>
            <View style={styles.text}>
                <Text style={[styles.title, { fontFamily: 'CustomFont-Regular' }]}>What is your firstname?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Tony'
                    placeholderTextColor='#C2BDBD'
                    value={inputValue}
                    onChangeText={handleChangeText}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleOrdering}>
                <Text style={[styles.buttonText, {fontFamily: 'CustomFont-Regular'}]}>Start Ordering</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF'
    },
    top: {
        paddingTop: 100,
        paddingBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 450
    },
    topImage: {
        alignSelf: 'flex-end',
        marginRight: '10%',
    },
    title: {
        width: '100%',
        fontWeight: '500',
        fontSize: 20,
        lineHeight: 28.6,
        marginBottom: 20,
    },
    text: {
        paddingVertical: 30,
        paddingHorizontal: 25,
    },
    button: {
        color: 'white',
        backgroundColor: '#FFA451',
        padding: 25,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        position: 'absolute',
        bottom: 100
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 24,
    },
    shadow: {
        marginTop: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#F3F1F1',
        borderRadius: 15,
        padding: 20,
        fontSize: 16,
        color: 'black',
        backgroundColor: '#F3F1F1'
    },
});

export default Authentication;
