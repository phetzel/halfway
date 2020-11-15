import React, { useContext, useEffect, useState} from 'react';
import { FlatList, View, Image, StyleSheet } from 'react-native';

import ActivityIndicator from '../components/ActivityIndicator';
import AppButton from '../components/AppButton';
import Card from '../components/Card';
import colors from '../config/colors';
import FilterContext from '../context/filter_context';
import key from '../key/key';
import location from '../util/location';
import Screen from '../components/Screen';
import NoResponse from '../components/NoResponse';

const ResultsScreen = ({ navigation, route }) => {
  const { filter, setFilter } = useContext(FilterContext);
  const [ results, setResults ] = useState();
  const [ loading, setLoading ] = useState(false);

  console.log(filter);

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
    const limit = 3;
    const radius = '40000';

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
      .then(data => setResults(data.businesses))
      .then(() => setLoading(false));
  }

  useEffect(() => {
    fetchFromYelp(searchOptions);
  }, [filter]);

  const renderEmpty = () => <NoResponse />;


  return (
    <Screen style={styles.container}>
      <ActivityIndicator visible={loading}   />
      { results &&
        <View style={styles.list}>
          <FlatList 
            contentContainerStyle={{ flexGrow: 1 }}
            data={results}
            keyExtractor={results.id}
            ListEmptyComponent={renderEmpty()}
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
    padding: 10,
    height: '100%'
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