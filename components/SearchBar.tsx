import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  clearSearchResults,
  fetchWeatherAndForecast,
  searchCities,
} from "../redux/weatherSlice";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const results = useSelector(
    (state: RootState) => state.weather.searchResults
  );
  const status = useSelector((state: RootState) => state.weather.status);

  useEffect(() => {
    if (query.length > 2) {
      const timer = setTimeout(() => {
        dispatch(searchCities(query));
      }, 500); // Debounce
      return () => clearTimeout(timer);
    } else {
      dispatch(clearSearchResults());
    }
  }, [query, dispatch]);

  const handleSelectCity = (city: string) => {
    dispatch(fetchWeatherAndForecast({ city, days: 3 }));
    setQuery("");
    dispatch(clearSearchResults());
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={20} color="#ccc" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search city..."
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={setQuery}
          cursorColor={"white"}
        />
        {query.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setQuery("");
              dispatch(clearSearchResults());
            }}
          >
            <Ionicons name="close-circle" size={20} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>
      {results.length > 0 && (
        <View style={styles.resultsContainer}>
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelectCity(item.name)}
              >
                <Text style={styles.itemText}>
                  {item.name}, {item.region}, {item.country}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    zIndex: 1000, // Ensure dropdown is on top
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  resultsContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    maxHeight: 200,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 14,
    color: "#333",
  },
});

export default SearchBar;
