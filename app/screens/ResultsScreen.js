import React, { useEffect, useState} from 'react';
import { FlatList, View, Image, StyleSheet } from 'react-native';

import AppButton from '../components/AppButton';
import Card from '../components/Card';
import colors from '../config/colors';
import key from '../key/key';
import location from '../util/location';
import Screen from '../components/Screen';

const ResultsScreen = ({ navigation, route }) => {
  const [ results, setResults ] = useState();

  const { addy1, addy2 } = route.params;
  const midpoint = location.midpoint(
    addy1.latitude,
    addy1.longitude,
    addy2.latitude,
    addy2.longitude,
  );

  const searchOptions = {
    lat: midpoint[0],
    lng: midpoint[1]
  }

  const fetchFromYelp = async (params) => {
    const limit = 3;

    const config = {
      headers: {
        'Authorization': `Bearer ` + key.yelpApi,
      }
    };

    const url = `https://api.yelp.com/v3/businesses/search?latitude=`
     + params.lat
     + `&longitude=`
     + params.lng
     + `&limit=`
     + limit;

    fetch(url, config)
      .then(response => response.json())
      .then(data => setResults(data.businesses));
  }

  useEffect(() => {
    fetchFromYelp(searchOptions);
  }, []);


  return (
    <Screen style={styles.container}>
      { results &&
        <View style={styles.list}>
          <FlatList 
            data={results}
            keyExtractor={results.id}
            renderItem={({ item }) => (
              <Card
                address={item.location.display_address}
                image={item.image_url} 
                name={item.name}
                onPress={() => navigation.navigate("Place", item)}
                price={item.price}/>
            )}
          />
        </View>
      }

      <View style={styles.bottomButtons}>
        <AppButton
            // onPress={handleSubmit}
            title="Filters" 
        />
        <AppButton
            color="secondary"
            onPress={() => navigation.navigate("Welcome")}
            title="New Search" 
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between'
  },
  bottomButtons: {
    backgroundColor: colors.white,
    bottom: 0,
    padding: 10,
    paddingBottom: 50,
    position: 'absolute',
    width: '100%'
  },
  list: {
    paddingBottom: 180
  }
});

export default ResultsScreen;