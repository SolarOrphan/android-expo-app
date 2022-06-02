import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { React, useState } from "react";
export default function AddItem({
  show,
  changeshowmodal,
  items_chg,
  collection,
}) {
  console.log(collection)
  const [name, name_chg] = useState("");
  const [desc, desc_chg] = useState("");
  const load_items = async (ids) => {
    console.log(ids);
    await fetch("http://192.168.0.158:3000/item/get_items", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_ids: ids,
      }),
    }).then(async (res) => {
      let res_fm = res.json();
      items_chg(res_fm.data.item_ids)
    });
  };
  const add_item_submit = async (name, desc, collection) => {
    console.log(collection)
    await fetch("http://192.168.0.158:3000/item/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: desc,
        collection_id: collection._id,
      }),
    })
      .then(async (response) => {
        let res = await response.json();
        console.log(res.message);
        if (res.message == "Success") {
          name_chg("");
          desc_chg("");
        } else if (res.message == "Fail") console.log("Fail");
      })
      .catch((error) => {
        console.error(error);
      });
      load_items(collection.item_ids);
      changeshowmodal(false);
  };
  return (
    <Modal visible={show} style={styles.modalcontainer} animationType="slide">
      <View style={styles.modalform}>
        <Text style={styles.header}>Add Item</Text>
        <TextInput
          style={styles.text_box}
          placeholder="Item name"
          defaultValue={name}
          onChangeText={(new_name) => name_chg(new_name)}
        />
        <TextInput
          style={styles.text_box}
          defaultValue={desc}
          onChangeText={(new_desc) => desc_chg(new_desc)}
          placeholder="Item description"
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
            onPress={() => add_item_submit(name, desc, collection)}
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
