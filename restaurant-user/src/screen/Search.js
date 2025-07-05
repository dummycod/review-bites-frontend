import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import SearchInput from "../components/SearchInput";
import SearchItem from "../components/search/SearchItem";
import ScreenWrapper from "../components/ScreenWrapper";
import useApi from "../hooks/useApi";

const Search = ({ navigation }) => {
  const { data, loading, error, fetchUrl, setError } = useApi();

  const onSearchResultClicked = () => {
    navigation.navigate("RestaurantDashboard");
  };

  const [input, setInput] = useState("");
  const pollingRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);

  const startLongPolling = (query) => {
    if (!pollingRef.current) {
      pollingRef.current = setInterval(() => fetchResults(query), 5000);
    }
  };

  const stopLongPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  useEffect(() => {
    let timeoutId;

    const debouncedPoll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fetchResults(input), 500);
    };

    if (input) {
      debouncedPoll();
    }

    return () => clearTimeout(timeoutId);
  }, [input]);

  useEffect(() => {
    if (data) {
      setSearchResults(data);
      console.log(data);
    }
  }, [data, error]);

  const fetchResults = (query) => {
    fetchUrl("/public/search-restaurant?query=" + query, false);
  };

  return (
    <ScreenWrapper>
      <View style={{ flex: 1 }}>
        <SearchInput style={styles.searchBox} handleTextChange={setInput} />

        {loading ? (
          <View style={styles.loaderRoot}>
            <ActivityIndicator
              color={"#F6544C"}
              style={styles.loader}
              size="large"
            />
            <Text style={styles.loaderText}>Fetching Search Results</Text>
          </View>
        ) : searchResults.length == 0 ? (
          <View style={styles.loaderRoot}>
            <Image
              style={styles.image}
              source={require("../../assets/images/no-results.png")}
            />
            <Text style={styles.noResultText}>No Results</Text>
          </View>
        ) : (
          <FlatList
            style={styles.searchResults}
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
        )}

        <View style={styles.searchResults}></View>
      </View>
    </ScreenWrapper>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchBox: {
    width: "90%",
    marginTop: 20,
    alignSelf: "center",
  },

  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },

  noResultText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 24,
  },

  text: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 22,
    alignSelf: "center",
    marginTop: 20,
  },
  searchResults: {
    width: "90%",
    alignSelf: "center",
  },
  loaderRoot: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    marginBottom: 30,
  },
  loaderText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 15,
  },
});
