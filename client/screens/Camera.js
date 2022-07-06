import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";

export default function App() {
  let cameraRef = useRef()
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState(null);
  const save_image = async () => {
    let options = { 
      quality:1,
      base64:true,
      exif:false
    }

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    
    console.log(newPhoto.base64)
  }
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => save_image()}
          >
            <Text style={styles.text}> Capture </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = {
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    // justifyContent: "center",
    // alignContent:"center"
  },
  camera: {
    // height: "50%",
    // width: "50%",
    flex: 9,
  },
  buttonContainer: {
    height: "20%",
    width: "100%",
    // flex: 1,
    top: "70%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  },
  button: {
    marginTop:5,
    backgroundColor: "#fff",
    height: "40%",
    width: "40%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20
  },
  text: {},
};
