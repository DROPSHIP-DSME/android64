import React, { useRef, useState,useEffect } from 'react';
import { Text, View,TouchableOpacity,FlatList,Image,TextInput,Picker,StatusBar, ImageBackground, ScrollView, Alert,   KeyboardAvoidingView, Platform,Keyboard} from 'react-native';
import * as Yup from 'yup';
import styles from '../../../screens/common/styles';
import { Colors, CommonStrings } from '../../../common'
import ImageIcons from '../../../common/ImageIcons'
import { RadioButton ,Provider ,Modal, Portal, Button,} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import Footer3 from '../../../screens/common/Footer3';
import tw from 'twrnc';
import Largebutton from '../../../components/dropshipbutton/Largebutton';
import { CameraIcon } from "react-native-heroicons/solid";
import Help from '../../../components/help/Help';
import Largesortorder from '../../../components/pickers/Largesortorder';

const CreateStore = (props) => {

    const {
        navigation,
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;

    //Reference

    const [billImgPath, setBillImgPath] = useState("");
    const [checked, setChecked] = React.useState('first');
    const [Brand, onChangeBrand] = React.useState(props?.brandName?.brandName);
    const [AboutBrand, onChangeAboutBrand] = React.useState(props?.brandName?.aboutBrand);
    const [City, onChangeCity] = React.useState("City");
    const [visible, setVisible] = React.useState(false);
    const [managedata, setmanagedata] = React.useState(true);
    const [selectedValue, setSelectedValue] = useState("61b2e25addb2bd19c2b9532a");

    useEffect(() => {
        props.getbrandName(props?.loginuserid);
    }, [])


     const selectPhoto = async () => {
         ImagePicker.openPicker({
            width: 400,
            cropping: true,
            mediaType: 'photo',
            compressImageQuality: 0.5,
            height: 400,
        }).then(image => {
            if (image?.path) {
                let fileName = image?.path?.split('/').pop();
                let mimeType = image?.path?.split('.').pop();
                let file = {
                    'uri': image?.path,
                    'type': `image/${mimeType}`,
                    'name': fileName
                }
               // setFieldValue("couponImage", file);
                setBillImgPath(file);
            }
        }).catch((error) => {
            
        });
    }

    // Vendor request submission
    const handleSendRequestSubmit = async () => {
        Keyboard.dismiss();
        if(billImgPath == "" && props?.brandName?.brandImage=="") {
            alert('Brand Image is required')
        }else if(Brand == "" ) { 
            alert('Brand name is required')
        }else if(AboutBrand == "") {
            alert('Enter your brand details')
        }else {
            const formData = new FormData();
            formData.append("brandName", Brand);
            formData.append("aboutBrand", AboutBrand);
            formData.append("userId", props?.loginuserid);
            formData.append("brandId", props?.brandName?._id);
            formData.append("brandImage", billImgPath);
            formData.append("country", "USA");
            props.updatebrand(formData, props.navigation, "vendor");
            setTimeout(function(){props.getbrandName(props?.loginuserid);},1000);
        }
    }

    
    return (
       <KeyboardAvoidingView style={{flex:1,backgroundColor:'#F2F2F2'}}>

             <StatusBar backgroundColor={"#FFFFFF00"} barStyle="dark-content" translucent={true} />

             <View style={{marginHorizontal:'4%',marginTop:'4%',flex:1}}>
             <ScrollView  keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={{backgroundColor:'#f2f2f2'}} >

              <View style={styles.brandimagetextviewMY}>

                <View style={tw`flex flex-row justify-between mx-3 mb-10 mt-15`}>
                  <Text style={tw`text-3xl text-gray-700`}>Update Brand Info</Text>
                </View>

                <Text style={tw`text-lg text-gray-700 text-center mx-4`}>To add goods to your store for distribution, you need to create a brand first. Add details about your brand. </Text>

                <View>
                { billImgPath !== "" ?
                    <Image source={{ uri: billImgPath.uri }} style={tw`h-28 w-28 rounded-full mt-10 mb-3`} />
                :
                  <View>
                    {props?.brandName?.brandImage!="" ?
                        <TouchableOpacity  onPress={() => selectPhoto()}>
                            <Image source={{ uri: props?.brandName?.brandImage }} style={tw`h-28 w-28 rounded-full mt-10 mb-3`} />
                        </TouchableOpacity>
                    :
                        <TouchableOpacity style={tw`mt-8 w-28 h-28 rounded-full items-center justify-center bg-gray-700`} onPress={() => selectPhoto()}>
                            <CameraIcon color="#FFFFFF" fill="#FFFFFF" size={70} />
                         </TouchableOpacity>
                   }
                  </View>
                }

                </View>

                </View>

                     <View style={tw`flex flex-row pl-3 h-16 bg-zinc-200 rounded-lg rounded-md mt-8 mb-2`}>
                        <TextInput
                          style={tw`text-gray-700`}
                          onChangeText={onChangeBrand}
                          value={Brand}
                          placeholder="Brand name"
                          placeholderTextColor="#b3b3b3"
                        />
                    </View>

                     <View style={tw`pl-3 h-32 bg-zinc-200 rounded-lg my-3`}>
                        <TextInput
                          style={tw`text-gray-700 text-start`}
                          onChangeText={(text) =>onChangeAboutBrand(text)}
                          value={AboutBrand}
                          placeholder="Tell us about your brand in fewer then 150 characters"
                          placeholderTextColor="#b3b3b3"
                          numberOfLines={10}
                          multiline={managedata}
                        />
                    </View>



                  <View style={tw`my-10`}>
                   <Largebutton text="Update Brand" onPress={() => handleSendRequestSubmit()}/>
                  </View>


               </ScrollView>

               


                </View>
            <Footer3 onSelection="4"/>

        </KeyboardAvoidingView>
    )
}
export default CreateStore
