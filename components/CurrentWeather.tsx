import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const CurrentWeather = () => {
  const { current, selectedCity } = useSelector(
    (state: RootState) => state.weather
  );

  if (!current) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{current.location.name}</Text>
      <Text style={styles.date}>
        {new Date(current.location.localtime).toDateString()}
      </Text>

      <View style={styles.weatherInfo}>
        <Image
          source={{ uri: `https:${current.current.condition.icon}` }}
          style={styles.icon}
        />
        <Text style={styles.temp}>{Math.round(current.current.temp_c)}°</Text>
      </View>
      <Text style={styles.condition}>{current.current.condition.text}</Text>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="weather-windy" size={20} color="#fff" />
          <Text style={styles.detailText}>{current.current.wind_kph} km/h</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="water-percent" size={20} color="#fff" />
          <Text style={styles.detailText}>{current.current.humidity}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  city: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  date: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 20,
  },
  weatherInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 100,
    height: 100,
  },
  temp: {
    fontSize: 80,
    fontWeight: "200",
    color: "#fff",
  },
  condition: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
    textTransform: "capitalize",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 50,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  detailText: {
    color: "#fff",
    marginLeft: 5,
  },
});

export default CurrentWeather;
