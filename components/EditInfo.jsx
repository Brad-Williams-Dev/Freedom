import React, { useState } from "react";
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
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  updateDate,
  updateShow,
  updateSmokesDay,
  updateCigsPack,
  updatePricePack,
  editInfoSlice,
} from "../redux/editInfoSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import store from "../redux/store";

export default function EditInfo(props) {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.editInfo.date);
  const show = useSelector((state) => state.editInfo.show);
  const smokesDay = useSelector((state) => state.editInfo.smokesDay);
  const cigsPack = useSelector((state) => state.editInfo.cigsPack);
  const pricePack = useSelector((state) => state.editInfo.pricePack);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const onClose = () => {
    dispatch(updateDate(date));
    dispatch(updateShow(false));
    dispatch(updateSmokesDay(smokesDay));
    dispatch(updateCigsPack(cigsPack));
    dispatch(updatePricePack(pricePack));
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    dispatch(updateDate(currentDate));
    setShowDatePicker(false);
  };

  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      onRequestClose={() => onClose()}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableOpacity onPress={() => props.onClose()}>
            <View style={styles.handle} />
          </TouchableOpacity>
          <View>
            <Text style={styles.header}>Edit User Info</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>Quit Date</Text>
            <Text onPress={() => setShowDatePicker(true)}>
              {date.toLocaleString("en-US", { timeZone: "UTC" })}
            </Text>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode={"datetime"}
                is24Hour={true}
                display="default"
                onChange={onChange}
                style={styles.datePicker}
              />
            )}
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Num of Smokes in a day</Text>
            <TextInput
              style={styles.input}
              value={smokesDay}
              onChangeText={(text) => dispatch(updateSmokesDay(text))}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.text}>Num of cigarettes in a pack</Text>
            <TextInput
              style={styles.input}
              value={cigsPack}
              onChangeText={(text) => dispatch(updateCigsPack(text))}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>Price of Pack</Text>
            <TextInput
              style={styles.input}
              value={pricePack}
              onChangeText={(text) => dispatch(updatePricePack(text))}
              keyboardType="numeric"
            />
          </View>
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
    marginTop: -150,
  },
  header: {
    fontSize: 25,
    fontWeight: 600,
    color: "#F9CC0B",
  },
  item: {
    borderWidth: 2,
    borderColor: "#F9CC0B",
    borderRadius: 10,
    width: "85%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  input: {
    height: 30,
    width: 80,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    textAlign: "center",
    backgroundColor: "snow",
  },
  text: {
    fontSize: 15,
    fontWeight: 600,
    color: "#F9CC0B",
  },
  datePicker: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: -100,
    marginTop: 100,
  },
});
