import React, { useEffect, useState } from 'react';
import { paises } from './data/paisesData.js'
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { Clima } from './components/Clima';
import { Form } from './components/Form';


const App: () => React$Node = () => {

  const [datosClima, setDatosClima] = useState({
    country: '',
    city: ''
  });
  const [data] = useState(paises);
  const [consultaApi, setConsultaApi] = useState(false);
  const [dataApi, setDataApi] = useState({});
  const [bgColor, setbgColor] = useState('rgb(71,149,212)');

  const { country, city } = datosClima;
  useEffect(() => {
    const weatherApi = async () => {
      if (consultaApi) {
        const apiKey = '5538ba7d76d0f58749122abb5cbfb6ab';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;
        const response = await fetch(url);
        const responseJson = await response.json();
        console.log(responseJson);
        if (responseJson.cod === 200) {
          setConsultaApi(false);
          setDataApi(responseJson);

          // Modifica los colores de fondo basado en la temperatura 

          const kelvin = 273.15; 
          const { main } = responseJson;

          const actual = main.temp - kelvin;

          if( actual < 15){
            setbgColor('rgb(130, 144, 156)')
          } else if( actual >= 15 && actual < 24){
            setbgColor('rgb(71,149,212)')
          } else if( actual > 24 ){
            setbgColor('rgb(179, 18, 12)')
          }

        } else {
          showAlert();
          setConsultaApi(false);
        }

      }
    }
    weatherApi();
  }, [consultaApi])


  const hideKeyboard = () => {
    Keyboard.dismiss();
  }

  const showAlert = () => {
    Alert.alert('Error', 'No se encontraron resultados, intente con otra ciudad o pais.', [{ text: 'Ok' }])
  }

  
  const bgColorApp = {
    backgroundColor: bgColor
  }
  return (
    <>
      <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.content}>

            <Clima dataApi={dataApi} />
            <Form
              data={data}
              datosClima={datosClima}
              setDatosClima={setDatosClima}
              setConsultaApi={setConsultaApi}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center'
  },
  content: {
    marginHorizontal: '2.5%'
  }
});

export default App;
