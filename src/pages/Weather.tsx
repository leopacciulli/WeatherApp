import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Switch } from 'react-native-switch';
import { CardInfo } from '../components/CardInfo';
import { CardWeather } from '../components/CardWeather';
import { Weather } from '../service/api';
import { weatherConditions } from '../utils/Conditions';

import splashImage from '../assets/splash.jpg';
import { Background } from '../components/Background';

export const WeatherApp = () => {
  const api = new Weather()

  const [measure, setMeasure] = useState('metric')
  const [currentTemperature, setCurrentTemperature] = useState('')
  const [locationName, setLocationName] = useState('')
  const [temperatureMin, setTemperatureMin] = useState('')
  const [temperatureMax, setTemperatureMax] = useState('')
  const [sunrise, setSunrise] = useState(0)
  const [sunset, setSunset] = useState(0)
  const [feels, setTemperatureFeels] = useState('')
  const [condition, setCondition] = useState('')
  const [wind, setWind] = useState('')
  const [humidity, setHumidity] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [initLoading, setInitLoading] = useState(false)

  useEffect(() => {
    setInitLoading(true)
    initWeather(measure);
  }, []);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        return setErrorMsg('Para continuar é necessário permitir a sua localização');
      }
    } catch(error) {
       console.log(error)
    }
  }

  const initWeather = async (unitMeasure: string) => {
    setLoading(true)
    await getLocation()
    setErrorMsg('')

    const location = await Location.getCurrentPositionAsync({});
    const weather: any = await api.getWeather(location, unitMeasure)
    console.log("Dkko we", weather.data)

    setCurrentTemperature(weather.data.main.temp)
    setTemperatureMin(weather.data.main.temp_min)
    setTemperatureMax(weather.data.main.temp_max)
    setTemperatureFeels(weather.data.main.feels_like)
    setLocationName(weather.data.name)
    setSunrise(weather.data.sys.sunrise)
    setSunset(weather.data.sys.sunset)
    setWind(weather.data.wind.speed)
    setHumidity(weather.data.main.humidity)
    setCondition(weather.data.weather[0].main)
    setMeasure(unitMeasure)
    setErrorMsg('')
    setLoading(false)
    setInitLoading(false)
  }

  const changeMeasure = () => {
    const unitMeasure = measure === 'metric' ? 'imperial' : 'metric'
    initWeather(unitMeasure)
  }

  const unit = measure === 'metric' ? '°C' : '°F'

  if (errorMsg) {
    return (
      <View style={[styles.noPermission, { backgroundColor: '#5396e9'}]}>
        <Text style={styles.errorMsg}>{errorMsg}</Text>
        <TouchableOpacity style={styles.permission} onPress={() => initWeather(measure)}>
          <Text style={styles.textPermission}>Permitir</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (initLoading) {
    return (
      <View style={[styles.loading, { width: Dimensions.get('window').width, height: Dimensions.get('window').height }]}>
        <Image source={splashImage} resizeMode={'cover'} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }} />
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: '#5396e9'}]}>
      {loading &&
        <View style={[styles.loading, { width: Dimensions.get('window').width, height: Dimensions.get('window').height }]}>
          <ActivityIndicator size="large" color="#0864ee" />
        </View>
      }
      
      <Background condition={condition} />

      <View style={styles.header}>
        <View/>
        <TouchableOpacity onPress={() => initWeather(measure)}>
          <EvilIcons name="refresh" color={'#fff'} size={38}/>
        </TouchableOpacity>
      </View>

      <CardWeather 
        locationName={locationName}
        currentTemperature={currentTemperature}
        unit={unit}
        feels={feels}
        temperatureMin={temperatureMin}
        temperatureMax={temperatureMax}
        condition={condition}
      />

      <CardInfo 
        wind={wind}
        humidity={humidity}
        sunrise={sunrise}
        sunset={sunset}
        condition={condition}
      />

      <View style={styles.switch}>
        <Switch
            value={measure === 'metric'}
            onValueChange={() =>changeMeasure()}
            disabled={false}
            activeText={'°C'}
            inActiveText={'°F'}
            activeTextStyle={{ fontSize: 16 }}
            inactiveTextStyle={{ fontSize: 16 }}
            circleSize={30}
            circleBorderWidth={0}
            backgroundActive={'#95BFF4'}
            backgroundInactive={'#95BFF4'}
            circleActiveColor={'#255aeb'}
            circleInActiveColor={'#255aeb'}
          />
      </View>

      <View style={styles.weatherIcon}>
        <MaterialCommunityIcons
          size={300}
          name={weatherConditions[condition] && weatherConditions[condition].icon}
          color={'#fff'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noPermission: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorMsg: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 32,
  },
  permission: {
    backgroundColor: '#4b75e9',
    borderRadius: 8,
    width: '70%',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  textPermission: {
    color: '#FFF',
    fontSize: 18
  },
  loading: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#a3c4ec',
    bottom: 0,
    zIndex: 9999,
    elevation: 20,
    opacity: 0.5
  },
  container: {
    flex: 1,
    padding: 16
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32
  },
  weatherIcon: {
    opacity: 0.1,
    position: 'absolute',
    top: 480,
    left: -70
  },
  switch: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: 16,
    marginRight: 16
  }
});
