import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import moment from 'moment';
import 'moment/locale/pt-br';

import humidityImage from '../assets/humidity.png';
import sunriseImage from '../assets/sunrise.png';
import sunsetImage from '../assets/sunset.png';
import windImage from '../assets/wind.png';
import { weatherConditions } from '../utils/Conditions';

interface Props {
	wind: string
	humidity: string
	sunrise: number
	sunset: number
	condition: string
}

export const CardInfo: React.FC<Props> = ({
	wind,
	humidity,
	sunrise,
	sunset,
	condition
}) => {
  return (
		<View style={[styles.addInfo, { backgroundColor: weatherConditions[condition] && weatherConditions[condition].infoColor }]}>
			<View style={styles.info}>
				<Image source={windImage} style={styles.imageInfo} />
				<View>
					<Text style={styles.infoTitle}>Vento</Text>
					<Text style={styles.infoTitle}>{Math.round(Number(wind))} km/h</Text>
				</View>
			</View>
			<View style={styles.info}>
				<Image source={humidityImage} style={styles.imageInfo} />
				<View>
					<Text style={styles.infoTitle}>Umidade</Text>
					<Text style={styles.infoTitle}>{Math.round(Number(humidity))}%</Text>
				</View>
			</View>
			<View style={styles.info}>
				<Image source={sunriseImage} style={styles.imageInfo} />
				<View style={{alignItems: 'center', flexDirection: 'row'}}>
					<Text style={styles.infoTitle}></Text>
					<Text style={styles.infoTitle}>{moment.unix(sunrise).format("HH:mm A")}</Text>
				</View>
			</View>
			<View style={styles.info}>
				<Image source={sunsetImage} style={styles.imageInfo} />
				<View style={{alignItems: 'center', flexDirection: 'row'}}>
					<Text style={styles.infoTitle}></Text>
					<Text style={styles.infoTitle}>{moment.unix(sunset).format("HH:mm A")}</Text>
				</View>
			</View>
		</View>
  );
}

const styles = StyleSheet.create({
  addInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 48,
    borderRadius: 16,
    padding: 8,
    opacity: 0.8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,

    elevation: 15,
  },
  imageInfo: {
    width: 40,
    height: 40,
    marginRight: 16
  },
  infoTitle: {
    color: '#FFF',
    fontSize: 16,
	},
	info: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    padding: 16,
    position: 'relative',
    width: '50%'
  },
});
