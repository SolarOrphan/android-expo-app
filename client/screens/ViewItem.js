import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { React, useState, useEffect } from "react";
import Items from "../components/Items.js";
import AddItem from "../components/AddItem.js";
const default_image = require("../assets/img/defaultimage.png");
export default function ViewItem({ route }) {
  let _id = route.params._id;
  let mounted = true;

  const [item, item_chg] = useState({});

  const delete_item = async (_id) => {
    await fetch("http://192.168.8.142:3000/item/delete_item", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
      }),
    });
  };
  const update = async (item) => {
    await fetch("http://192.168.8.142:3000/item/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item }),
    }).then(async (res) => {
      let res_fm = await res.json();
      if (mounted) {
        item_chg(res_fm.data);
      }
    });
  };

  useEffect(() => {
    const load_items_info = async (_id) => {
      await fetch("http://192.168.8.142:3000/item/get_one", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: _id,
        }),
      }).then(async (res) => {
        let res_fm = await res.json();
        if (mounted) {
          item_chg(res_fm.data);
        }
      });
    };

    load_items_info(_id);
    return () => (mounted = false);
  }, []);
  return (
    <View style={styles.container}>
      <TextInput style={styles.header}>Details </TextInput>
      <TextInput style={styles.label}>Item : {item.name}</TextInput>
      <View style={styles.image}>
        {item.image ? (
          <Image style={styles.img} src={item.image} />
        ) : (
          <Image style={styles.img} source={default_image} />
        )}
      </View>
      <TextInput style={styles.creator} placeholder="Creator">
        {item.creator}
      </TextInput>
      <TextInput style={styles.description} placeholder="Description">
        {item.description}
      </TextInput>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.btn_cancel}
          onPress={() => delete_item(item._id)}
        >
          <Text style={styles.btn_text}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn_update}>
          <Text style={styles.btn_text} onPress={() => update(item)}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#11b8f5",
    justifyContent: "flex-start",
    padding: 20,
    display: "flex",
  },
  header: {
    fontSize: 40,
    fontFamily: "sans-serif-condensed",
    // flex:2,
  },
  label: {
    // marginTop:5,
    fontSize: 18,
    // flex: 0.5,
    fontWeight: "300",
  },
  image: {
    // backgroundColor: "",

    width: 250,
    height: 250,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 50,
  },
  img: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  creator: {
    backgroundColor: "#a7a7a7",
    color: "#000",
    borderRadius: 10,
    height: 45,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
  },
  description: {
    backgroundColor: "#a7a7a7",
    color: "#000",
    borderRadius: 10,
    height: 100,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
    textAlignVertical: "top",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
  },
  btn: {
    backgroundColor: "#f00",
    height: 50,
    flex: 1,
    margin: 10,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btn_text: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#fff",
  },
  btn_cancel: {
    backgroundColor: "#f00",
    height: 50,
    flex: 1,
    margin: 10,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btn_update: {
    backgroundColor: "rgba(0,0,0,.5)",
    height: 50,
    flex: 1,
    margin: 10,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
