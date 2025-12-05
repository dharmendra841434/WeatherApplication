import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchWeatherAndForecast } from "../redux/weatherSlice";

const SettingsModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCity, forecast } = useSelector(
    (state: RootState) => state.weather
  );
  const [days, setDays] = useState(
    forecast?.forecast?.forecastday?.length || 3
  );

  // Update local state if forecast changes externally (e.g. initial load)
  React.useEffect(() => {
    if (forecast?.forecast?.forecastday?.length) {
      setDays(forecast.forecast.forecastday.length);
    }
  }, [forecast]);

  const handleSave = (newDays: number) => {
    setDays(newDays);
    setModalVisible(false);
    if (selectedCity) {
      dispatch(fetchWeatherAndForecast({ city: selectedCity, days: newDays }));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="settings-outline" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Forecast Days</Text>

            <View style={styles.options}>
              {[3, 5, 7].map((d) => (
                <Pressable
                  key={d}
                  style={[
                    styles.button,
                    days === d
                      ? styles.buttonSelected
                      : styles.buttonUnselected,
                  ]}
                  onPress={() => handleSave(d)}
                >
                  <Text
                    style={[
                      styles.textStyle,
                      days === d && styles.textSelected,
                    ]}
                  >
                    {d} Days
                  </Text>
                </Pressable>
              ))}
            </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "20%",
    right: 15,
    zIndex: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  options: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    minWidth: 80,
    alignItems: "center",
  },
  buttonUnselected: {
    backgroundColor: "#f0f0f0",
  },
  buttonSelected: {
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: "#ff6b6b",
    marginTop: 10,
    width: "100%",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  textSelected: {
    color: "white",
  },
});

export default SettingsModal;
