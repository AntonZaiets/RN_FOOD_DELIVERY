import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { loadFonts } from "@/assets/fonts/CustomFonts";
const Welcome = () => {
    const router = useRouter();

    useEffect(() => {
        loadFonts().then(() => {
            console.log('Font Loaded');
        });
    }, []);
    return (
        <>
            <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/images/fruits/bgFruits.png')}
                    style={styles.top}
                    resizeMode='cover'
                >
                    <Image style={styles.topImage} source={require('../assets/images/fruits/smallFruit.png')} />
                    <Image source={require('../assets/images/fruits/firstFruitBasket.png')} />
                    <Image style={styles.shadow} source={require('../assets/images/fruits/firstImageShadow.png')} />
                </ImageBackground>
                <View style={styles.text}>
                    <Text style={[styles.title, {fontFamily: 'CustomFont-Regular'}]}>Get The Freshest Fruit Salad Combo</Text>
                    <Text style={[styles.description, {fontFamily: 'CustomFont-Light'}]}>We deliver the best and freshest fruit salad in town. Order for a combo today!!!</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={()=>{router.push('/authentication')}}>
                    <Text style={[styles.buttonText, {fontFamily: 'CustomFont-Regular'}]}>Let`s Continue</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
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
        fontWeight: 500,
        fontSize: 20,
        lineHeight: 28.6,
    },
    description: {
        width: '90%',
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 24,
    },
    text: {
        paddingVertical: 60,
        paddingHorizontal: 25
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
        marginTop: 10
    }
});

export default Welcome;