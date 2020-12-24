import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export const Clima = ({ dataApi }) => {

    const { name, main, weather } = dataApi;

    if (!name) return null;
    const kelvin = 273.15;
    //console.log(dataApi)
    return (
        <View style={styles.clima}>
            <Text style={[styles.text, styles.current]}>
                {parseInt(main.temp - kelvin)}
                <Text style={styles.temp}>
                    &#x2103;
                </Text>
                <Image
                    style={{ width: 60, height: 60 }}
                    source={{ uri: `https://openweathermap.org/img/w/${weather[0].icon}.png` }}
                />
            </Text>

            <View style={styles.temps}>
                <Text style={styles.text}> Max: {' '}
                    <Text style={styles.temp}>
                        {parseInt(main.temp_max - kelvin)} &#x2103;
                    </Text>
                </Text>

                <Text style={styles.text}> Min: {' '}
                    <Text style={styles.temp}>
                        {parseInt(main.temp_max - kelvin)} &#x2103;
                    </Text>
                </Text>
            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    clima: {
        marginBottom: 20
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginRight: 30
    },
    current: {
        fontSize: 80,
        marginRight: 0,
        fontWeight: 'bold'
    },
    temp: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    temps: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
});