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
import Loading from "../components/Loading";

const default_image = require("../assets/img/defaultimage.png");
export default function ViewItem({ route, navigation }) {
  let id = route.params.id;
  let mounted = true;
  const [item, item_chg] = useState({});
  const [load, load_chg] = useState(false);
  const showCamera = () => {
    navigation.navigate("Camera");
  };
  const delete_item = async (id) => {
    await fetch("http://192.168.0.158:3000/item/delete_item", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
  };
  const update = async (item) => {
    await fetch("http://192.168.0.158:3000/item/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: item }),
    }).then(async (res) => {
      let res_fm = await res.json();
      if (mounted) {
        item_chg(res_fm.data);
      }
    });
  };

  const load_items_info = async (id) => {
    load_chg(true);

    await fetch("http://192.168.0.158:3000/item/get_one", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(async (res) => {
        let res_fm = await res.json();
        if (mounted) {
          item_chg(res_fm.data);
          load_chg(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    load_items_info(id);
    return () => (mounted = false);
  }, []);
  if (mounted && item) {
    let item_info = item;
    return (
      <View style={styles.container}>
        {load == true ? <Loading /> : null}
        <Text style={styles.header}>Details </Text>
        <TextInput
          style={styles.label}
          placeholder={`Item : ${item_info.name ? item_info.name : ""}`}
        />
        <View style={styles.image}>
          {item_info.image ? (
            <Image style={styles.img} src={item_info.image} />
          ) : (
            <Image style={styles.img} source={default_image} />
          )}
          <TouchableOpacity onPress={() => showCamera()}>
            <Text>Upload Image</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.creator}
          placeholder={`Creator : ${
            item_info.creator ? item_info.creator : ""
          }`}
        />
        <TextInput
          style={styles.description}
          placeholder={`Description : ${
            item_info.description ? item_info.description : ""
          }`}
        />
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.btn_cancel}
            onPress={() => delete_item(item_info.id)}
          >
            <Text style={styles.btn_text}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn_update}
            onPress={() => update(item_info)}
          >
            <Text style={styles.btn_text}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else return <></>;
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
    fontSize: 20,
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
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "flex-start",
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
