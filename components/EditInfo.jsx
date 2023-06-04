import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  TextInput,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getDatabase, ref, update, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function EditInfo(props) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userId, setUserId] = useState(null);
  const [dateQuit, setDateQuit] = useState(new Date());
  const [smokesday, setSmokesday] = useState(null);
  const [smokesPrice, setSmokesPrice] = useState(null);
  const [smokesPerPack, setSmokesPerPack] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }

      const fetchUserData = async () => {
        try {
          const auth = getAuth();
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              const userId = user.uid;
              const db = getDatabase();
              const userRef = ref(db, "users/" + userId);

              const unsubscribeSnapshot = onValue(userRef, (snapshot) => {
                const userData = snapshot.val();
                if (userData) {
                  const quitDate = new Date(userData.dateQuit);
                  const pricePerPack = userData.smokesPrice;
                  const smokesPerDay = userData.smokesday;
                  const smokesPerPack = userData.smokesPerPack;

                  setDateQuit(quitDate);
                  setSmokesday(smokesPerDay);
                  setSmokesPrice(pricePerPack);
                  setSmokesPerPack(smokesPerPack);
                }
              });

              return () => {
                unsubscribeSnapshot();
              };
            }
          });

          return () => {
            unsubscribe();
          };
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setShowDatePicker(Platform.OS === "ios");
      setDateQuit(selectedDate);
    }
  };

  const handleSmokesDay = (smokesday) => {
    setSmokesday(smokesday);
  };

  const handleSmokesPrice = (smokesPrice) => {
    setSmokesPrice(smokesPrice);
  };

  const handleSmokesPerPack = (smokesPerPack) => {
    setSmokesPerPack(smokesPerPack);
  };

  const onSave = () => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    const db = getDatabase();
    const userRef = ref(db, "users/" + userId);

    // Update the dateQuit value in the Firebase database
    update(userRef, {
      dateQuit: dateQuit.toISOString(),
      smokesday: smokesday,
      smokesPrice: smokesPrice,
      smokesPerPack: smokesPerPack,
    })
      .then(() => {
        console.log("Date quit saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving date quit:", error);
      });

    // Close the modal
  };

  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      onRequestClose={() => props.onClose()}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.info}>
            <View style={styles.date}>
              <Text style={styles.label}>Date Quit:</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>
                  {dateQuit
                    ? dateQuit.toLocaleString()
                    : "Select date and time"}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={dateQuit || new Date()}
                  mode="datetime"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>
            <View style={styles.date}>
              <Text style={styles.label}># of smokes per day:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={handleSmokesDay}
                placeholder="Enter # of smokes per day"
                value={smokesday || null}
              />
            </View>
            <View style={styles.date}>
              <Text style={styles.label}>Cost Per Pack:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={handleSmokesPrice}
                placeholder="Cost of pack"
                value={smokesPrice || null}
              />
            </View>
            <View style={styles.date}>
              <Text style={styles.label}>Number of smokes per pack:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={handleSmokesPerPack}
                placeholder="Number per pack"
                value={smokesPerPack || null}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.save} onPress={onSave}>
            <Text>Save</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#848884",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "90%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    width: "80%",
    borderWidth: 3,
    borderColor: "#F9CC0B",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    width: "100%",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  save: {
    width: "80%",
    height: 50,
    backgroundColor: "#F9CC0B",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
});
