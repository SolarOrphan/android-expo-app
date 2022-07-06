import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { React, useState } from "react";

const logo = require("../assets/img/logo.png");

export default function CreateAccount({ navigation }) {
  const [username, username_chg] = useState("");
  const [password, password_chg] = useState("");
  const [confirm, confirm_chg] = useState("");
  const create_submit = async (username, password, confirm) => {
    if (username > "" && password > "" && confirm > "" && confirm == password)
      await fetch("http://192.168.0.158:3000/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then(async (response) => {
          let res = await response.json();
          if (res.message == "Success") {
            username_chg("");
            password_chg("");
            confirm_chg("");
            navigation.navigate("Login");
          } else if (res.message == "User already exists") console.log("exist");
        })
        .catch((error) => {
          console.error(error);
        });
    else return null;
  };
  return (
    <View style={styles.container}>
      <View style={styles.top_section}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.bottom_section}>
        <Text style={styles.header}>Create Account</Text>
        <Text style={styles.msg}>
          Please enter your details to create your account.
        </Text>
        <TextInput
          style={styles.text_box}
          placeholder="Username"
          defaultValue={username}
          onChangeText={(new_username) => username_chg(new_username)}
        />
        <TextInput
          style={styles.text_box}
          placeholder="Password"
          defaultValue={password}
          secureTextEntry={true}
          onChangeText={(new_password) => password_chg(new_password)}
        />
        <TextInput
          style={styles.text_box}
          secureTextEntry={true}
          placeholder="Confirm password"
          defaultValue={confirm}
          onChangeText={(new_confirm) => confirm_chg(new_confirm)}
        />
        <TouchableOpacity
          style={styles.Sign_in_btn}
          onPress={() => create_submit(username, password, confirm)}
        >
          <Text style={styles.btn_label}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgot_btn}>
          <Text style={styles.forgot_btn_label}>Forgot Passowrd</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#11b8f5",
    justifyContent: "center",
    padding: 20,
    display: "flex",
  },
  top_section: {
    // backgroundColor: "",
  },
  bottom_section: {
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  logo: {
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 50,
  },
  header: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  msg: {
    textAlign: "center",
    fontSize: 17,
  },
  text_box: {
    backgroundColor: "#a7a7a7",
    color: "#000",
    borderRadius: 10,
    height: 45,
    padding: 10,
    margin: 10,
    fontSize: 16,
  },
  Sign_in_btn: {
    backgroundColor: "#f00",
    height: 50,
    width: 180,
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
  forgot_btn_label: {
    fontWeight: "100",
    fontSize: 15,
    color: "#59d3ff",
    textAlign: "center",
  },
});
