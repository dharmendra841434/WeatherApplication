import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function DetailScreen() {
  const { dayData } = useLocalSearchParams();

  if (!dayData || typeof dayData !== "string")
    return (
      <View>
        <Text>No data</Text>
      </View>
    );

  const day = JSON.parse(dayData);
  const date = new Date(day.date).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.date}>{date}</Text>

        <View style={styles.mainInfo}>
          <Image
            source={{ uri: `https:${day.day.condition.icon}` }}
            style={styles.icon}
          />
          <Text style={styles.condition}>{day.day.condition.text}</Text>
        </View>

        <View style={styles.tempContainer}>
          <View style={styles.tempItem}>
            <Text style={styles.tempLabel}>High</Text>
            <Text style={styles.tempValue}>
              {Math.round(day.day.maxtemp_c)}°C
            </Text>
          </View>
          <View style={styles.line} />
          <View style={styles.tempItem}>
            <Text style={styles.tempLabel}>Low</Text>
            <Text style={styles.tempValue}>
              {Math.round(day.day.mintemp_c)}°C
            </Text>
          </View>
        </View>

        <View style={styles.grid}>
          <GridItem
            icon="water-percent"
            label="Humidity"
            value={`${day.day.avghumidity}%`}
          />
          <GridItem
            icon="weather-windy"
            label="Max Wind"
            value={`${day.day.maxwind_kph} km/h`}
          />
          <GridItem
            icon="weather-rainy"
            label="Chance of Rain"
            value={`${day.day.daily_chance_of_rain}%`}
          />
          <GridItem
            icon="weather-snowy"
            label="Chance of Snow"
            value={`${day.day.daily_chance_of_snow}%`}
          />
          <GridItem
            icon="sun-wireless"
            label="UV Index"
            value={`${day.day.uv}`}
          />
          <GridItem
            icon="white-balance-sunny"
            label="Sunrise"
            value={day.astro.sunrise}
          />
          <GridItem
            icon="weather-night"
            label="Sunset"
            value={day.astro.sunset}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const GridItem = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <View style={styles.gridItem}>
    <MaterialCommunityIcons name={icon} size={24} color="#fff" />
    <Text style={styles.gridLabel}>{label}</Text>
    <Text style={styles.gridValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  date: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  mainInfo: {
    alignItems: "center",
    marginBottom: 30,
  },
  icon: {
    width: 120,
    height: 120,
  },
  condition: {
    fontSize: 24,
    color: "#fff",
    marginTop: 10,
    textTransform: "capitalize",
  },
  tempContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 30,
  },
  tempItem: {
    alignItems: "center",
  },
  tempLabel: {
    color: "#ccc",
    fontSize: 16,
  },
  tempValue: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  line: {
    width: 1,
    height: "80%",
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  gridItem: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  gridLabel: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 5,
  },
  gridValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
});
