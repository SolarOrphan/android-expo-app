import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  RefreshControl,
} from "react-native";
import { React, useState, useEffect } from "react";
import CollectionItem from "../components/Collections.js";
import AddCollection from "../components/AddCollection.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";

export default function Dashboard({ navigation }) {
  const [showmodal, changeshowmodal] = useState(false);
  const [succreq, succreq_chg] = useState(false);
  const [user_obj, user_obj_chg] = useState(null);
  const [load, load_chg] = useState(false);

  const change_user_obj = (userobj) => {
    user_obj_chg(userobj);
  };
  const [collections, collections_chg] = useState([]);
  let mounted = true;
  const load_collections = async (ids_retreived) => {
    load_chg(true);

    await fetch("http://192.168.8.142:3000/collection/get_collections", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ids: ids_retreived,
      }),
    }).then(async (res) => {
      let res_fm = await res.json();
      if (mounted) {
        succreq_chg(true);
        collections_chg(res_fm.data);
        load_chg(false);
      }
    });
  };
  const get_user = async (id_user) =>
    await fetch("http://192.168.8.142:3000/user/get_user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id_user,
      }),
    })
      .then(async (res) => {
        let response = await res.json();
        if (response.message == "Success") {
          return {
            ids: response.data.user.collection_ids,
            user_obj: response.data.user,
          };
        } else {
          navigation.navigate("Login");
          return {
            ids: null,
          };
        }
      })
      .catch((e) => console.log(e));
  const storage_userid = async () => {
    try {
      return await AsyncStorage.getItem("@user_id");
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  const refresh_dash = () =>
    storage_userid().then(async (user_id) => {
      load_chg(true);

      await get_user(user_id)
        .then(({ ids, user_obj }) => {
          change_user_obj(user_obj);
          if (ids != null) {
            load_collections(ids);

            console.log(collections);
          }
          return () => (mounted = false);
        })
        .catch((e) => {
          console.log(e);
          navigation.navigate("Login");
        });
    });
  useEffect(() => {
    storage_userid().then(async (user_id) => {
      if (user_id != null) {
        load_chg(true);

        await get_user(user_id)
          .then(({ ids, user_obj }) => {
            change_user_obj(user_obj);
            if (ids != null) {
              load_collections(ids);

              console.log(collections);
            }
            return () => (mounted = false);
          })
          .catch((e) => {
            console.log(e);
            navigation.navigate("Login");
            AsyncStorage.removeItem("@user_id");
          });
      } else {
        navigation.navigate("Login");
        AsyncStorage.removeItem("@user_id");
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      {load == true && succreq == false ? <Loading /> : null}
      <Text style={styles.header}>
        Welcome back {user_obj ? user_obj.username : null}
      </Text>
      <Text style={styles.label}>My Collections</Text>
      <ScrollView style={styles.collections}>
        {collections ? (
          collections.map((collection) => {
            return (
              <CollectionItem
                key={collection.id}
                collection={collection}
                navigation={navigation}
                load_collections={load_collections}
              />
            );
          })
        ) : (
          <View>
            {succreq == false ? (
              <Text>
                Your collections failed to load. Please refresh or try again in
                a few minutes.
              </Text>
            ) : (
              <Text>Press on the button below to add a collection</Text>
            )}
          </View>
        )}
        <StatusBar style="auto" />
      </ScrollView>
      <TouchableOpacity
        style={styles.addcoll}
        onPress={() => changeshowmodal()}
      >
        <Text style={styles.addcolltext}>Add Collection</Text>
      </TouchableOpacity>
      <AddCollection
        showmodal={showmodal}
        changeshowmodal={changeshowmodal}
        load_collections={load_collections}
        navigation={navigation}
      />
      <TouchableOpacity
        style={styles.Sign_in_btn}
        onPress={() => refresh_dash()}
      >
        <Text style={styles.btn_label}>Refresh</Text>
      </TouchableOpacity>
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
    margin: 0,
    flexDirection: "column",
    // marginTop: -250,
    padding: 0,
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
  btncontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
  },
  Sign_in_btn: {
    backgroundColor: "#a5a5a5",
    height: 50,
    margin: 3,
    // marginLeft: "auto",
    // marginRight: "auto",
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
