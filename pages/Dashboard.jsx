import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
  const [timeSinceQuit, setTimeSinceQuit] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const intervalIdRef = useRef(null);
  const quitDateRef = useRef(null);
  const [smokesPerPackValue, setSmokesPerPackValue] = useState(0);
  const [moneySaved, setMoneySaved] = useState(0);
  const [smokesPerDay, setSmokesPerDay] = useState(0);
  const [pricePerPack, setPricePerPack] = useState(0);

  const millisecondsPerSecond = 1000;
  const millisecondsPerMinute = 60 * millisecondsPerSecond;
  const millisecondsPerHour = 60 * millisecondsPerMinute;
  const millisecondsPerDay = 24 * millisecondsPerHour;
  const millisecondsPerWeek = 7 * millisecondsPerDay;
  const millisecondsPerMonth = 30 * millisecondsPerDay;
  const millisecondsPerYear = 365 * millisecondsPerDay;

  const durationInMilliseconds =
    timeSinceQuit[0] * millisecondsPerYear +
    timeSinceQuit[1] * millisecondsPerMonth +
    timeSinceQuit[2] * millisecondsPerWeek +
    timeSinceQuit[3] * millisecondsPerDay +
    timeSinceQuit[4] * millisecondsPerHour +
    timeSinceQuit[5] * millisecondsPerMinute +
    timeSinceQuit[6] * millisecondsPerSecond;

  useEffect(() => {
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
              if (userData && userData.dateQuit) {
                const newQuitDate = new Date(userData.dateQuit);
                quitDateRef.current = newQuitDate;
                const retrievedSmokesPerDay = parseInt(userData.smokesday);
                const retrievedPricePerPack = parseFloat(userData.smokesPrice);
                const retrievedSmokesPerPack = parseInt(userData.smokesPerPack);
                setSmokesPerPackValue(retrievedSmokesPerPack);
                setSmokesPerDay(retrievedSmokesPerDay);
                setPricePerPack(retrievedPricePerPack);
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
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const timeDifference = currentDate - quitDateRef.current;
      const newTimeSinceQuit = formatTimeDuration(timeDifference);
      setTimeSinceQuit(newTimeSinceQuit);

      const saved = calculateMoneySaved(
        smokesPerDay,
        pricePerPack,
        durationInMilliseconds
      );
      setMoneySaved(saved);
    }, 500);

    return () => clearInterval(intervalId);
  }, [smokesPerDay, pricePerPack, durationInMilliseconds]);

  const calculateMoneySaved = (smokesPerDay, pricePerPack, timeSinceQuit) => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    // Calculate the number of whole days since quitting
    const wholeDays = Math.floor(timeSinceQuit / millisecondsPerDay);

    // Calculate the fraction of a day
    const fractionOfDay =
      (timeSinceQuit % millisecondsPerDay) / millisecondsPerDay;

    // Calculate the total number of cigarettes not smoked
    const cigarettesNotSmoked =
      wholeDays * smokesPerDay + smokesPerDay * fractionOfDay;

    // Calculate the total amount of money saved
    const saved = cigarettesNotSmoked * (pricePerPack / smokesPerPackValue);

    return saved;
  };

  const formatTimeDuration = (duration) => {
    // Calculate the years, months, weeks, days, hours, minutes, and seconds from the duration
    // Implement your own logic here based on your specific requirements
    // Example implementation:
    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute = 60 * millisecondsPerSecond;
    const millisecondsPerHour = 60 * millisecondsPerMinute;
    const millisecondsPerDay = 24 * millisecondsPerHour;
    const millisecondsPerWeek = 7 * millisecondsPerDay;
    const millisecondsPerMonth = 30 * millisecondsPerDay;
    const millisecondsPerYear = 365 * millisecondsPerDay;

    const years = Math.floor(duration / millisecondsPerYear);
    duration %= millisecondsPerYear;

    const months = Math.floor(duration / millisecondsPerMonth);
    duration %= millisecondsPerMonth;

    const weeks = Math.floor(duration / millisecondsPerWeek);
    duration %= millisecondsPerWeek;

    const days = Math.floor(duration / millisecondsPerDay);
    duration %= millisecondsPerDay;

    const hours = Math.floor(duration / millisecondsPerHour);
    duration %= millisecondsPerHour;

    const minutes = Math.floor(duration / millisecondsPerMinute);
    duration %= millisecondsPerMinute;

    const seconds = Math.floor(duration / millisecondsPerSecond);

    const milliseconds = Math.floor(duration % millisecondsPerSecond);

    return [years, months, weeks, days, hours, minutes, seconds, milliseconds];
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Quit Smoking</Text>
      </View>
      <Text
        style={{
          color: "#F9CC0B",
          fontSize: 20,
          textAlign: "center",
          fontWeight: "500",
          marginTop: 30,
        }}
      >
        Time Smoke Free
      </Text>
      <View style={styles.money}>
        <View style={styles.timeSection}>
          <Text style={styles.timeSinceQuit}>{timeSinceQuit[0]}</Text>
          <Text style={styles.timeSinceQuitTitle}>Years</Text>
        </View>
        <View style={styles.timeSection}>
          <Text style={styles.timeSinceQuit}>{timeSinceQuit[1]}</Text>
          <Text style={styles.timeSinceQuitTitle}>Months</Text>
        </View>
        <View style={styles.timeSection}>
          <Text style={styles.timeSinceQuit}>{timeSinceQuit[2]}</Text>
          <Text style={styles.timeSinceQuitTitle}>Weeks</Text>
        </View>
        <View style={styles.timeSection}>
          <Text style={styles.timeSinceQuit}>{timeSinceQuit[3]}</Text>
          <Text style={styles.timeSinceQuitTitle}>Days</Text>
        </View>
      </View>
      <View style={styles.money}>
        <View style={styles.timeSection}>
          <Text style={styles.timeSinceQuit}>{timeSinceQuit[4]}</Text>
          <Text style={styles.timeSinceQuitTitle}>Hours</Text>
        </View>
        <View style={styles.timeSection}>
          <Text style={styles.timeSinceQuit}>{timeSinceQuit[5]}</Text>
          <Text style={styles.timeSinceQuitTitle}>Minutes</Text>
        </View>
        <View style={styles.timeSection}>
          <Text style={styles.timeSinceQuit}>{timeSinceQuit[6]}</Text>
          <Text style={styles.timeSinceQuitTitle}>Seconds</Text>
        </View>
        <View style={styles.timeSection}>
          <Text style={styles.timeSinceQuit}>{timeSinceQuit[7]}</Text>
          <Text style={styles.timeSinceQuitTitle}>Milisec</Text>
        </View>
      </View>
      <Text
        style={{
          color: "#F9CC0B",
          fontSize: 20,
          textAlign: "center",
          fontWeight: "500",
          marginTop: 30,
        }}
      >
        Money Saved
      </Text>
      <View style={styles.money}>
        <Text style={styles.moneySaved}>${moneySaved.toFixed(2)}</Text>
      </View>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#17181a",
    alignSelf: "stretch",
    width: null,
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    fontWeight: "800",
    color: "white",
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  money: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 15,
    height: 100,
    width: "85%",
    borderColor: "#070808",
    backgroundColor: "#070808",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  timeSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "25%", // Adjust the width based on your desired spacing and layout
  },
  timeSinceQuit: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    width: "48%", // Adjust the width based on your desired spacing and layout
    marginBottom: 10,
    marginTop: 10,
  },
  timeSinceQuitTitle: {
    color: "grey",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  moneySaved: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%", // Adjust the width based on your desired spacing and layout
    marginTop: 15, // Add margin to create spacing between items
  },
});
