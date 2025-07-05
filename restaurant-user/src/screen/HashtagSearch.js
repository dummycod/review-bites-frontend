import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchItem from "../components/search/SearchItem";
import ScreenWrapper from "../components/ScreenWrapper";
import useApi from "../hooks/useApi";
import Spinner from "react-native-loading-spinner-overlay";

const HashtagSearch = ({ navigation, route }) => {
  const { hashtag } = route.params;

  const { data, error, loading, fetchUrl, setError, resetHookState } = useApi();

  const onSearchResultClicked = () => {
    navigation.navigate("RestaurantDashboard");
  };

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchHashtags();
  }, []);

  useEffect(() => {
    if (data) {
      setSearchResults(data);
      resetHookState();
    }

    if (error) {
      Alert.alert("Error", error, [
        {
          text: "ok",
          onPress: () => {
            setError(error);
          },
        },
      ]);
    }
  }, [data, error]);

  const fetchHashtags = () => {
    fetchUrl("/public/search-hashtag?hashtag=" + hashtag, false);
  };

  return (
    <ScreenWrapper>
      <View style={{ flex: 1 }}>
        <Spinner
          visible={loading}
          textStyle={styles.spinnerStyle}
          color={"#F6544C"}
          size={"large"}
        />
        <Text style={styles.heading}>Search Results For</Text>
        <Text style={{ ...styles.heading, color: "blue", marginTop: 5 }}>
          {`#${hashtag}`}
        </Text>
        <View style={styles.searchResults}>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SearchItem
                id={item.id}
                name={item.name}
                imageName={item.dashboardPhoto}
                address={item.address}
                onClick={() => {
                  navigation.navigate("RestaurantDashboard", {
                    restaurantId: item.restaurantId,
                  });
                }}
              />
            )}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default HashtagSearch;

const styles = StyleSheet.create({
  searchBox: {
    width: "90%",
    marginTop: 20,
    alignSelf: "center",
  },

  image: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginTop: "65%",
  },

  heading: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    marginTop: 25,
    marginHorizontal: 20,
  },
  searchResults: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
});
