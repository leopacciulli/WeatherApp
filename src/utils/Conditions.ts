import sunny from '../assets/sunny.jpg';
import clouds from '../assets/clouds.jpeg';
import rainy from '../assets/rainy.jpg';
import lightning from '../assets/lightning.jpg';
import snow from '../assets/snow.jpg';
import hail from '../assets/hail.jpg';
import hail2 from '../assets/hail2.jpg';
import hail3 from '../assets/hail3.jpg';

export const weatherConditions: any = {
    Rain: {
      color: '#005BEA',
      infoColor: '#518CE7',
      title: 'Chuvoso',
      icon: 'weather-rainy',
      image: rainy
    },
    Clear: {
      color: '#f7b733',
      infoColor: '#F5C561',
      title: 'Ensolarado',
      icon: 'weather-sunny',
      image: sunny
    },
    Thunderstorm: {
      color: '#616161',
      infoColor: '#828282',
      title: 'Trovoadas',
      icon: 'weather-lightning',
      image: lightning
    },
    Clouds: {
      color: '#1F1C2C',
      infoColor: '#52505A',
      title: 'Nublado',
      icon: 'weather-cloudy',
      image: clouds
    },
    Snow: {
      color: '#00d2ff',
      infoColor: '#4FD7F5',
      title: 'Nevasca',
      icon: 'weather-snowy',
      image: snow
    },
    Drizzle: {
      color: '#076585',
      infoColor: '#218CB0',
      title: 'Chuvisco',
      icon: 'weather-hail',
      image: hail
    },
    Haze: {
      color: '#66A6FF',
      infoColor: '#92B9EE',
      title: 'Nebliba',
      icon: 'weather-hail',
      image: hail2
    },
    Mist: {
      color: '#3CD3AD',
      infoColor: '#5FE7C5',
      title: 'Névoa',
      icon: 'weather-fog',
      image: hail3
    }
  };