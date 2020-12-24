import React, { useState } from 'react';
import {
    Alert,
    Animated,
    StyleSheet,
    View,
    Text,
    TextInput,
    Platform,
    TouchableWithoutFeedback,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export const Form = ({ data, datosClima, setDatosClima, setConsultaApi }) => {

    const [animacionBtn] = useState(new Animated.Value(1));

    const animacionEntrada = () => {
        Animated.spring(animacionBtn, {
            toValue: 0.8
        }).start();
    }

    const animacionSalida = () => {
        Animated.spring(animacionBtn, {
            toValue: 1,
            friction: 1,
            tension: 30
        }).start();
    }
    const handleChangeCity = (city) => {
        setDatosClima({ ...datosClima, city })
    }
    const handleChangeCountry = (country) => {
        setDatosClima({ ...datosClima, country })
    }
    const handleSubmitForm = () => {
        const { country, city } = datosClima;
        if (country.trim() === '' || city.trim() === '') {
            showAlert();
            return;
        }
        setConsultaApi(true);
    }

    const showAlert = () => {
        Alert.alert('Error', 'Campos obligatorios favor de validar', [{ text: 'Ok' }])
    }
    const estiloAnimacion = {
        transform: [{ scale: animacionBtn }]
    }
    return (
        <>
            <View style={styles.form}>
                <View>
                    <TextInput
                        value={datosClima.city}
                        style={styles.input}
                        placeholder="Ingresa tu ciudad..."
                        placeholderTextColor='#666'
                        onChangeText={(city) => { handleChangeCity(city) }}
                    />
                </View>

                <View>
                    <Picker
                        selectedValue={datosClima.country}
                        style={{ backgroundColor: '#fff' }}
                        itemStyle={{ height: 120, backgroundColor: '#fff' }}
                        onValueChange={(country) => handleChangeCountry(country)}
                    >
                        <Picker.Item label=" - Selecciona - " value="" />
                        {
                            data.map((pais, idx) => <Picker.Item key={idx} label={pais.label} value={pais.value} />)
                        }
                    </Picker>
                </View>

                <TouchableWithoutFeedback
                    onPressIn={() => animacionEntrada()}
                    onPressOut={() => animacionSalida()}
                    onPress={() => handleSubmitForm()}
                >
                    <Animated.View
                        style={[styles.searchBtn, estiloAnimacion]}
                    >
                        <Text style={styles.searchLbl}>Buscar clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    form: {
    },
    input: {
        backgroundColor: 'white',
        height: 50,
        fontSize: 20,
        marginBottom: 20,
        padding: 10,
        textAlign: 'center'
    },
    searchBtn: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    searchLbl: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase',
        textAlign: 'center',
    }
});
