import React, { useContext, useEffect, useState} from 'react';
import { FlatList, View, Image, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import ActivityIndicator from '../components/ActivityIndicator';
import AppButton from '../components/AppButton';
import Card from '../components/Card';
import colors from '../config/colors';
import FilterContext from '../context/filter_context';
import key from '../key/key';
import location from '../util/location';
import { normalize } from '../util/dimensions';
import Screen from '../components/Screen';
import NoResponse from '../components/NoResponse';

const ResultsScreen = ({ navigation, route }) => {
  const { filter, setFilter } = useContext(FilterContext);
  const [ results, setResults ] = useState();
  const [ empty, setEmpty ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const { addy1, addy2, category, open, price } = filter;

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
    setLoading(true);
    const priceStr = price.join(',');
    const limit = 5;
    const radius = '40000';

    if (priceStr) {
      const config = {
        headers: {
          'Authorization': `Bearer ` + key.yelpApi,
        }
      };
  
      const url = `https://api.yelp.com/v3/businesses/search?latitude=`
       + params.lat
       + `&longitude=`
       + params.lng
       + `&price=`
       + priceStr
       + `&radius=`
       + radius
       + `&term=`
       + category
       + `&open_now=`
       + open
       + `&limit=`
       + limit
       + `&sort_by=`
       + `distance`;
  
      fetch(url, config)
        .then(response => response.json())
        .then(data => {
          const res = data.businesses;
          res && res.length > 0 ? setEmpty(false) : setEmpty(true);
          setResults(res);
        })
        .then(() => setLoading(false));
    } else {
      setEmpty(true);
      setLoading(false)
      setResults();
    }

  }

  useEffect(() => {
    fetchFromYelp(searchOptions);
  }, [filter]);

  return (
    <Screen style={styles.container}>
      <ActivityIndicator visible={loading}   />
      { results && results.length > 0 &&
        <View style={styles.list}>
          <FlatList 
            contentContainerStyle={{ flexGrow: 1 }}
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

      { empty && <NoResponse />}

      <View style={styles.bottomButtons}>
        <AppButton
            onPress={() => navigation.navigate("Filter")}
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
    padding: normalize(20),
    height: '100%'
  },
  bottomButtons: {
    backgroundColor: colors.white,
    bottom: 0,
    padding: normalize(10),
    paddingBottom: normalize(20),
    position: 'absolute',
    width: '100%'
  },
  list: {
    paddingBottom: normalize(150)
  }
});

export default ResultsScreen;