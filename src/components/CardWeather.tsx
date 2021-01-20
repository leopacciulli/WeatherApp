import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { weatherConditions } from '../utils/Conditions';

import moment from 'moment';
import 'moment/locale/pt-br';

interface Props {
	locationName: string,
	currentTemperature: string
	unit: string
	feels: string
	temperatureMin: string
	temperatureMax: string
	condition: string
}

export const CardWeather: React.FC<Props> = ({
	locationName,
	currentTemperature,
	unit,
	feels,
	temperatureMin,
	temperatureMax,
	condition,
}) => {

  return (
    <>
    	<View style={styles.situation}>
        <View style={styles.locationView}>
          <Ionicons name="location" color={'#fff'} size={24}/>
          <Text style={styles.locationName}>{locationName}</Text>
        </View>
        <Text style={styles.date}>{moment().locale('pt-br').format('dddd')} - {moment().format('DD/MM/YYYY HH:mm')}</Text>
        <View style={styles.weatherTemp}>
          <Text style={styles.currentTemp}>{Math.round(Number(currentTemperature))}</Text>
          <Text style={styles.measure}>{unit}</Text>
        </View>
        <Text style={styles.feels}>{Math.round(Number(temperatureMin))}{unit} / {Math.round(Number(temperatureMax))}{unit} - Sensação térmica {Math.round(Number(feels))}{unit}</Text>
      </View>

      <View style={styles.conditionTitle}>
        <Text style={styles.title}>{weatherConditions[condition] && weatherConditions[condition].title}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  situation: {
    marginTop: 24
	},
	locationView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  locationName: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
	},
	date: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 8,
    color: '#f9f9f9'
  },
  feels: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: -16,
    color: '#f9f9f9'
  },
  weatherTemp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
	},
	currentTemp: {
    color: '#FFF',
    fontSize: 112,
    fontWeight: '600'
	},
	measure: {
    color: '#FFF',
    fontSize: 20,
    paddingTop: 32
	},
  conditionTitle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#FFF',
    fontSize: 28,
  },
});
