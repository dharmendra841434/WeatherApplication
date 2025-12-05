import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { loadWeatherFromStorage } from "../redux/weatherSlice";

import { SafeAreaView } from "react-native-safe-area-context";
import CurrentWeather from "../components/CurrentWeather";
import ForecastList from "../components/ForecastList";
import SearchBar from "../components/SearchBar";

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error, current } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    dispatch(loadWeatherFromStorage());
  }, [dispatch]);

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <SearchBar />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {status === "loading" && (
            <View style={styles.center}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}

          {status === "failed" && (
            <View style={styles.center}>
              <Text style={styles.errorText}>Error: {error}</Text>
            </View>
          )}

          {status === "succeeded" && current && (
            <>
              <CurrentWeather />
              <ForecastList />
            </>
          )}

          {status === "idle" && (
            <View style={styles.center}>
              <Text style={styles.welcomeText}>
                Search for a city to get started
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 18,
    textAlign: "center",
  },
  welcomeText: {
    color: "#ddd",
    fontSize: 18,
  },
});
