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
import Item from "../components/Items.js";
import AddItem from "../components/AddItem.js";

export default function ViewCollection({ route, navigation }) {
  // const load_collections = route.params.load_collections;
  const collection = route.params.collection;
  const [showmodal, changeshowmodal] = useState(false);
  let mounted = true;
  const [items, items_chg] = useState([]);
  const [coll_info, coll_info_chg] = useState({});
  const delcolltext = async (id) => {
    await fetch("http://192.168.0.158:3000/collection/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    }).then(async (res) => {
      let res_mess = await res.json();
      if (res_mess.message == "Success") {
        navigation.reset({
          index: 0,
          routes: [{name: 'Dashboard'}],
        });
      }
    });
  };
  
  useEffect(() => {
    const load_items = async (item_ids) => {
      await fetch("http://192.168.0.158:3000/item/get_items", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: item_ids,
        }),
      }).then(async (res) => {
        let res_fm_items = await res.json();
        if (mounted) {
          items_chg(res_fm_items.data);
        }
      });
    };
    const load_collection_info = async (id) => {
      await fetch("http://192.168.0.158:3000/collection/get_one", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      }).then(async (res) => {
        let res_fm = await res.json();
        if (mounted) {
          coll_info_chg(res_fm.data);
          load_items(res_fm.data.item_ids);
        }
      });
    };

    load_collection_info(collection.id);
    return () => (mounted = false);
  }, []);
  if(mounted && coll_info){
    let collection = coll_info
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{coll_info.name}</Text>
      <Text style={styles.label}>Collection Items</Text>

      <ScrollView style={styles.items}>
        {items ? (
          items.map((item) => {
            return <Item key={item.id} item={item} navigation={navigation} />;
          })
        ) : (
          <View></View>
        )}
        <StatusBar style="auto" />
      </ScrollView>
      <TouchableOpacity
        style={styles.delcoll}
        onPress={() => delcolltext(coll_info.id)}
      >
        <Text style={styles.delcolltext}>Delete Collection</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addcoll}
        onPress={() => changeshowmodal(true)}
      >
        <Text style={styles.addcolltext}>Add Item</Text>
      </TouchableOpacity>
      <AddItem
        show={showmodal}
        changeshowmodal={changeshowmodal}
        items_chg={() => items_chg}
        collection={collection}
      />
      <StatusBar style="auto" />
    </View>
  );
        }
  else return <></>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#11b8f5",
    justifyContent: "center",
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
  items: {
    // flex: 9,
    flex: 9,
    // height:200,
    display: "flex",
    margin: 0,
    flexDirection: "column",
    // marginTop: -250,
    padding: 0,
  },
  item: {
    // flex:1,
    borderWidth: 1,
    height: 50,
    // marginTop: 5,
    marginBottom: 5,
    // padding: 5,
    display: "flex",
    justifyContent: "space-between",
    borderRadius: 10,
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
  delcolltext: {
    color: "white",
    fontSize: 20,
  },
  delcoll: {
    backgroundColor: "#f00",
    borderWidth: 1,
    height: 50,
    margin: 5,
    padding: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
