import React from 'react';
import axios from 'axios';
import { StyleSheet, View, ScrollView, Dimensions, Text} from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import {mockResult} from './helpers/mocks/mockResultWithGeo';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -23.5489,
          longitude: -46.6388,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsMyLocationButton={false}
        showsUserLocation={true}
        followsUserLocation={true}
        style={styles.mapView}
        showsPointsOfInterest={false}
      >
        {mock.map(m => (
          <Marker
            coordinate={{
              latitude: m.lat,
              longitude: m.lng,
            }}
          >
            <Callout>
              <View style={styles.callout}>
                <Text style={{fontSize:16, fontWeight: 'bold'}}>Fuel - R$ {m.salePrice.toString().replace(',', '.')}</Text>
                <Text>{m.address}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <ScrollView
          style={styles.infoContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        >
          <View style={styles.info}>
            <Text style={styles.infoCh}>Cheaper</Text>
            <Text style={styles.infoCh, styles.infoPriceCh}>R$ {cheaper.price}</Text>
            <Text style={styles.infoCh}>{cheaper.address}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoEx}>Expensive</Text>
            <Text style={styles.infoEx, styles.infoPriceEx}>R$ {moreExpensive.price}</Text>
            <Text style={styles.infoEx}>{geoInfos}</Text>
          </View>
        </ScrollView>
    </View>
  );
}

const width = Dimensions.get('window').width;
let numbers = [];

const mock = axios.get(`https://localhost:44359/api/price/mun?latlng=true`)
      .then(res => {
        console.log("passou no axios");
        return res;
      })

const moreExpensive = {
  address: mock.filter(m => m.salePrice == Math.max(...numbers).toString().replace('.',','))[0].address,
  price: Math.max(...numbers)
};
const cheaper = {
  address: mock.filter(m => m.salePrice == Math.min(...numbers).toString().replace('.',','))[0].address,
  price: Math.min(...numbers)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  footer: {
    backgroundColor: '#fffffff2',
    width: '100%',
    height: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    bottom: 0
  },

  icon: {
    paddingHorizontal: 10
  },

  mapView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0 ,
    right: 0
  },

  infoContainer: {
    width: '100%',
    maxHeight: 130
  },

  info: {
    width: width - 80,
    maxHeight: 200,
    backgroundColor: '#fffffff2',
    marginHorizontal: 40,
    display: 'flex',
    alignContent: 'center',
    alignItems:'center',
    justifyContent: 'space-between',
    paddingVertical: 30,
    paddingHorizontal: 8
  },

  infoEx: {
    color: '#480101f2'
  },

  infoCh: {
    color: '#014003'
  },

  infoPriceCh: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#014003'
  },

  infoPriceEx: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#480101f2'
  },

  callout: {
    fontSize: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
