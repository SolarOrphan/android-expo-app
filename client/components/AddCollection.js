import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { React, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";

export default function AddCollection({
  showmodal,
  changeshowmodal,
  load_collections,
  navigation,
}) {
  const [name, name_chg] = useState("");
  const [desc, desc_chg] = useState("");
  const storage_userid = async () => {
    try {
      return await AsyncStorage.getItem("@user_id");
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  const [load, load_chg] = useState(false);

  const add_coll_submit = async (name, desc, navigation) => {
    load_chg(true);
    storage_userid().then(async (user_id) => {
      await fetch("http://192.168.0.158:3000/collection/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: desc,
          id: user_id,
        }),
      })
        .then(async (response) => {
          let res = await response.json();
          if (res.message == "Success") {
            name_chg("");
            desc_chg("");
            load_collections(res.data.collection_ids);
            changeshowmodal(false);
            load_chg(false);
          } else if (res.message == "Fail") {
            console.log("Fail");
            load_chg(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
    navigation.navigate("Dashboard");
  };
  return (
    <Modal
      style={styles.modalcontainer}
      animationType="slide"
      visible={showmodal}
    >
      {load == true ? <Loading /> : null}
      <View style={styles.modalform}>
        <Text style={styles.header}>Add Collection</Text>
        <TextInput
          style={styles.text_box}
          placeholder="Collection name"
          defaultValue={name}
          onChangeText={(new_name) => name_chg(new_name)}
        />
        <TextInput
          style={styles.text_box}
          defaultValue={desc}
          onChangeText={(new_desc) => desc_chg(new_desc)}
          placeholder="Collection description"
        />
        <View style={styles.btncontainer}>
          <TouchableOpacity
            style={styles.Sign_in_btn}
            onPress={() => changeshowmodal(false)}
          >
            <Text style={styles.btn_label}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Sign_in_btn}
            onPress={() => add_coll_submit(name, desc, navigation)}
          >
            <Text style={styles.btn_label}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalcontainer: {},
  modalform: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 250,
  },
  header: {
    fontSize: 20,
  },
  text_box: {
    backgroundColor: "#f5f5f5",
    color: "#000",
    borderRadius: 10,
    height: 45,
    padding: 10,
    margin: 10,
    fontSize: 16,
    width: 300,
  },
  btncontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
  },
  Sign_in_btn: {
    backgroundColor: "#a5a5a5",
    height: 50,
    width: 130,
    margin: 3,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btn_label: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#fff",
  },
});
