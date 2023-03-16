import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";

export default function Dashboard() {
  const date = useSelector((state) => state.editInfo.date);

  const [timeSinceQuit, setTimeSinceQuit] = useState({
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const quitDate = date;
      const timeDiff = new Date() - quitDate;

      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30);

      setTimeSinceQuit({
        months,
        weeks: weeks % 4,
        days: days % 7,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Quit Smoking</Text>
        <Text
          style={
            (styles.header,
            {
              color: "#F9CC0B",
              fontSize: 20,
              textAlign: "center",
              fontWeight: "500",
            })
          }
        >
          Time without cigarette
        </Text>
      </View>
      <View style={styles.counter}>
        <View style={styles.timeUnit}>
          <Text style={styles.timeValue}>{timeSinceQuit.months}</Text>
          <Text style={styles.timeLabel}>MONTHS</Text>
        </View>
        <View style={styles.timeUnit}>
          <Text style={styles.timeValue}>{timeSinceQuit.weeks}</Text>
          <Text style={styles.timeLabel}>WEEKS</Text>
        </View>
        <View style={styles.timeUnit}>
          <Text style={styles.timeValue}>{timeSinceQuit.days}</Text>
          <Text style={styles.timeLabel}>DAYS</Text>
        </View>
        <View style={styles.timeUnit}>
          <Text style={styles.timeValue}>{timeSinceQuit.hours}</Text>
          <Text style={styles.timeLabel}>HOURS</Text>
        </View>
        <View style={styles.timeUnit}>
          <Text style={styles.timeValue}>{timeSinceQuit.minutes}</Text>
          <Text style={styles.timeLabel}>MINUTES</Text>
        </View>
        <View style={styles.timeUnit}>
          <Text style={styles.timeValue}>{timeSinceQuit.seconds}</Text>
          <Text style={styles.timeLabel}>SECONDS</Text>
        </View>
      </View>
      <Text
        style={
          (styles.header,
          {
            color: "#F9CC0B",
            fontSize: 20,
            textAlign: "center",
            fontWeight: "500",
            marginTop: 30,
          })
        }
      >
        Money Saved
      </Text>
      <View style={styles.money}></View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#848884",
    alignSelf: "stretch",
    width: null,
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    fontWeight: 800,
    color: "white",
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  counter: {
    borderWidth: 2,
    borderRadius: 15,
    height: 100,
    width: "85%",
    borderColor: "#F9CC0B",
    backgroundColor: "grey",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  timeUnit: {
    alignItems: "center",
  },
  timeValue: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
    marginBottom: 5,
  },
  timeLabel: {
    fontSize: 10,
    color: "white",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  money: {
    borderWidth: 2,
    borderRadius: 15,
    height: 100,
    width: "85%",
    borderColor: "#F9CC0B",
    backgroundColor: "grey",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
