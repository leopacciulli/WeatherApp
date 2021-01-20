import React, { useEffect } from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { weatherConditions } from '../utils/Conditions';

interface Props {
	condition: string
}

export const Background: React.FC<Props> = ({ condition }) => {

  return (
    <Image source={weatherConditions[condition] && weatherConditions[condition].image} style={[styles.image, { width: Dimensions.get('window').width, height: Dimensions.get('window').height }]} />
  );
}

const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        bottom: 0,
      },
});
