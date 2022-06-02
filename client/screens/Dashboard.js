import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { React, useState, useEffect } from "react";
import CollectionItem from "../components/Collections.js";
import AddCollection from "../components/AddCollection.js";

export default function Dashboard({ navigation }) {
  const [showmodal, changeshowmodal] = useState(false);

  const [collections, collections_chg] = useState([]);
  let mounted = true;
  const load_collections = async () =>
    await fetch("http://192.168.0.158:3000/collection/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      let res_fm = await res.json();
      if (mounted) {
        collections_chg(res_fm.data);
      }
    });
  useEffect(() => {
    load_collections();
    return () => (mounted = false);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome</Text>
      <Text style={styles.label}>My Collections</Text>
      <ScrollView style={styles.collections}>
        {collections ? (
          collections.map((collection) => {
            return (
      
      <CollectionItem key={collection._id}  collection={collection} navigation={navigation} load_collections={load_collections}/>
            );
          })
        ) : (
          <View>
            <Text>Press on the button below to add a collection</Text>
          </View>
        )}
        <StatusBar style="auto" />
      </ScrollView>
      <TouchableOpacity
        style={styles.addcoll}
        onPress={()=>changeshowmodal()}
      >
        <Text style={styles.addcolltext}>Add Collection</Text>
      </TouchableOpacity>
      <AddCollection showmodal={showmodal}
      changeshowmodal={changeshowmodal}
      load_collections={load_collections}

       />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#11b8f5",
    // justifyContent: "center",
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
  screens: {
    // flex: 10,
  },
  screen_item: {
    height: 50,
    backgroundColor: "rgba(0,0,0,.5)",
    padding: 2,
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // borderBottomColor:"rgba(0,0,0,.5)",
  },
  sub_head: {
    fontSize: 25,
    fontWeight: "500",
    borderRadius: 40,
    // color:"#fff",
  },
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: "#000",
  },
  collections: {
    flex: 9,
    // height:200,
    display: "flex",
    margin:0,
    flexDirection: "column",
    // marginTop: -250,
    padding:0,
  },
  addcoll: {
    borderWidth: 1,
    height: 50,
    margin: 5,
    padding: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "black",
  },
  addcolltext: {
    color: "white",
    fontSize: 20,
  },
  modalcontainer: {
    height: 50,
    width: 50,
    backgroundColor: "black",
  },
  modalform: {},
});
