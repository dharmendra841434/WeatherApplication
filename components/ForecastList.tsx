import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ForecastList = () => {
  const { forecast } = useSelector((state: RootState) => state.weather);
  const router = useRouter();

  if (!forecast) return null;

  const handlePress = (day: any) => {
    // Navigate to detail screen
    // We can pass data via params stringified or just ID if we had stored it relationally.
    // simpler is to encode it.
    router.push({
      pathname: "/detail",
      params: { dayData: JSON.stringify(day) },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>3-Day Forecast</Text>
      <FlatList
        horizontal
        data={forecast.forecast.forecastday}
        keyExtractor={(item) => item.date}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.day}>
              {new Date(item.date).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </Text>
            <Image
              source={{ uri: `https:${item.day.condition.icon}` }}
              style={styles.icon}
            />
            <Text style={styles.temp}>
              {Math.round(item.day.maxtemp_c)}° /{" "}
              {Math.round(item.day.mintemp_c)}°
            </Text>
            <Text style={styles.condition}>{item.day.condition.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingLeft: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  listContent: {
    paddingRight: 16,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    marginRight: 15,
    width: 120,
  },
  day: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  icon: {
    width: 50,
    height: 50,
  },
  temp: {
    fontSize: 16,
    color: "#fff",
    marginVertical: 5,
  },
  condition: {
    fontSize: 12,
    color: "#eee",
    textAlign: "center",
  },
});

export default ForecastList;
