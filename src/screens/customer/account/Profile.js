import React, { useRef, useState, useEffect } from 'react';
import { Text, View, Image, FlatList, Dimensions, StatusBar, Picker, TextInput, ImageBackground, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../../common/styles';
import styl from '../../common/styledrop';
import { Colors, CommonStrings } from '../../../common'
import ImageIcons from '../../../common/ImageIcons'
import InputField from '../../../components/forms/inputField';
import { RoundedButton } from '../../../components/forms/button';
import { phoneRegExp } from '../../../services/helper';
import DropdownField from '../../../components/dropdown/DropDownMenu';
import PhoneMaskInput from '../../../components/forms/inputField/PhoneMaskInput';
import Loader from '../../../components/modals/Loader';
import Footer3 from '../../common/Footer3';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import tw from 'twrnc';
import { ArrowRightIcon } from "react-native-heroicons/solid";
import Editbutton from '../../../components/pickers/Editbutton';
import Smallbutton from '../../../components/dropshipbutton/Smallbutton';
import { ShoppingBagIcon } from "react-native-heroicons/solid";
import { ChevronRightIcon } from "react-native-heroicons/solid";
import { TagIcon } from "react-native-heroicons/solid";
import { LogoutIcon } from "react-native-heroicons/outline";
import moment from 'moment';
import Help from '../../../components/help/Help';
import AwesomeAlert from 'react-native-awesome-alerts';
import CustomAwesomeAlert from '../../../components/modals/AlertModal';
import ImagePicker from 'react-native-image-crop-picker';

const Profile = (props) => {

    const {
        navigation,
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;

    //Reference
    const userId = props?.route?.params?.userId;
    const brandId = props?.route?.params?.brandId;
        const [billImgPath, setBillImgPath] = useState("");

    useEffect(() => {
        //alert(props?.loginuserid)
        props.getprofileuser(props?.loginuserid);
        props.getuseraddress(props?.loginuserid);
        props.getusercard(props?.loginuserid);
        props.getsupportlist(props?.loginuserid);
        props.Brandslist(props?.loginuserid);

    }, [])

    
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;

    //Reference
    const emailRef = useRef();
    const phoneRef = useRef();
    const bisinessnameRef = useRef();
    const fullnameRef = useRef();

    // Local states
    const [text1, onChangeText1] = React.useState("");
    const [starCount, setstarCount] = useState(5);
    const [selectedValue, setSelectedValue] = useState("java");
    const [wayToContact, setWayToContact] = useState("Phone");
    const [showAlert, setshowAlert] = React.useState(false);
    const [showotherAlert, setshowotherAlert] = React.useState(false);
    const [showalertmsg, setshowalertmsg] = React.useState('');
    const [showclassName, setshowclassName] = useState("#B80000");
    const handleScroll = (pageYOffset) => {
        if (pageYOffset > 0) {
            setshowclassName('#B80000');
        } else {
            setshowclassName('#B80000');
        }
    }

    const deleetaccount = () => {
        setshowAlert(true);
    }

    const deleteapidataaccount = () => {
        setshowAlert(false);
        props.deleteUseraccount(props.loginuserid)
        setshowotherAlert(true)
        setshowalertmsg('Account deleted successfully')
        props.navigation.navigate("Golive")
    }

    const helpbuttonsubmit = async (textval) => {
        if(textval!=''){
            let request = {
                "userId": props?.loginuserid,
                "message": textval,
                "msgDate": new Date()
            }
            props.support(request, props.navigation, "vendor");
        }
    }

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
                const formData = new FormData();
                formData.append("userId", props?.loginuserid);
                formData.append("profileImage", billImgPath);
                props.updateprofile(formData, '', '');

            }
        }).catch((error) => {

        });
    }

    const renderItem6 = ({ item }) => {
        return (
            <View>
                {item.userId.userName == 'Admin' ?
                    <View>
                        <View style={styles.chatrightView}>
                            <Text style={styles.hellotext}>{item.message}</Text>
                        </View>
                        <Text style={styles.chattingtime}>{moment(item.msgDate).format('hh:mm A')}</Text>
                    </View>
                    :
                    <View>
                        <View style={styles.chatlongView}>
                            <Text style={styles.chattingtext}>{item.message}</Text>
                        </View>
                        <Text style={styles.chattingtime2}>{moment(item.msgDate).format('hh:mm A')}</Text>
                    </View>

                }
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={tw`flex-1 justify-center`}>


            <ScrollView onScroll={({ nativeEvent }) => {
                handleScroll(nativeEvent['contentOffset'].y);
            }} keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={tw.style('bg-gray-100')} >
                <View style={tw.style('px-6 py-5 items-center')}>
                   
                     { billImgPath !== "" ?
                        <TouchableOpacity onPress={() => selectPhoto()}>
                            <Image
                                style={tw.style(`mt-8 h-28 w-28 rounded-full border-2 border-gray-400`)}
                                source={{uri: billImgPath.uri }}
                            />
                        </TouchableOpacity>
                     :
                        <TouchableOpacity onPress={() => selectPhoto()}>
                            {props?.getprofileuserlist && props?.getprofileuserlist?.profileImage!="" ?
                                <Image
                                    style={tw.style(`mt-8 h-28 w-28 rounded-full border-2 border-gray-400`)}
                                    source={{uri: props?.getprofileuserlist?.profileImage}}
                                />
                            :
                                <View style={tw.style(`mt-8 h-28 w-28 items-center rounded-full border-2 border-gray-400`)}>
                                   <Text style={{fontSize:60,width:50, height:80,marginTop:5,textAlign:'center'}}>{props?.getprofileuserlist?.userName}</Text>
                                </View>
                            }
                        </TouchableOpacity>
                    }
                    <Text style={tw.style('mt-4 text-xl text-gray-900 text-center', {fontFamily:"AvertaStd-Semibold"})}>{props?.getprofileuserlist?.userName}</Text>
                    <Text style={tw.style('text-base text-gray-900 text-center', {fontFamily:"AvertaStd-Semibold"})}>{props?.getprofileuserlist?.email}</Text>
                </View>


                <View style={tw.style('bg-white overflow-hidden shadow rounded-md mx-4 my-2')}>
                  <View style={tw.style('px-2 py-5')}>
                      <View style={tw.style('flex flex-row justify-between mx-4 mt-2 mb-3')}>
                          <View>
                              <Text style={tw.style('flex flex-row text-2xl text-gray-900',{fontFamily:'AvertaStd-Semibold'})}>My Address</Text>
                          </View>
                          <Editbutton navigation={props.navigation} page='editaddress' />
                      </View>

                      <View style={tw.style('flex flex-row justify-between mx-4 mt-4')}>
                          <View>
                              <Text style={tw`text-base text-gray-700`}>Address line1</Text>
                          </View>
                          {(props?.getuseraddresslist && props?.getuseraddresslist?.length > 0) &&
                              <View>
                                  <Text style={tw`text-lg text-gray-900`}>{props?.getuseraddresslist[0]?.streetAdress}</Text>
                              </View>
                          }
                      </View>
                      <View style={tw.style('flex flex-row justify-between mx-4')}>
                          <View>
                              <Text style={tw`text-base text-gray-700`}>Address line2</Text>
                          </View>
                          {(props?.getuseraddresslist && props?.getuseraddresslist?.length > 0) &&
                              <View>
                                  <Text style={tw`text-lg text-gray-900`}>{props?.getuseraddresslist[0]?.phoneNumber}</Text>
                              </View>
                          }
                      </View>
                      <View style={tw.style('border-b mt-2 mx-4 border-gray-500')}></View>
                      <View style={tw.style('flex flex-row justify-between mx-4 mt-4')}>
                          <View>
                              <Text style={tw`text-base text-gray-700`}>City</Text>
                          </View>
                          {(props?.getuseraddresslist && props?.getuseraddresslist?.length > 0) &&
                              <View>
                                  <Text style={tw`text-lg text-gray-900`}>{props?.getuseraddresslist[0]?.city}</Text>
                              </View>
                          }
                      </View>
                      <View style={tw.style('border-b mt-2 mx-4 border-gray-500')}></View>
                      <View style={tw.style('flex flex-row justify-between mx-4 mt-4')}>
                          <View>
                              <Text style={tw.style('text-base font-normal text-gray-900')}>Zipcode</Text>
                          </View>
                          {(props?.getuseraddresslist && props?.getuseraddresslist?.length > 0) &&
                              <View>
                                  <Text style={tw.style('text-base font-normal text-gray-900')}>{props?.getuseraddresslist[0]?.zipCode}</Text>
                              </View>
                          }
                      </View>
                  </View>
                </View>

                {/* <View style={tw.style('bg-white overflow-hidden shadow rounded-md mx-4 my-2')}>
                  <View style={tw.style('px-2 py-5')}>
                      <View style={tw.style('flex flex-row justify-between mx-4 mt-4')}>
                          <View>
                              <Text style={tw.style('flex flex-row text-2xl text-gray-900',{fontFamily:'AvertaStd-Semibold'})}>Payment Details</Text>
                          </View>

                      </View>

                      <View style={tw.style('flex flex-row justify-between mx-4 mt-4')}>
                          <View>
                              <Text style={tw.style('text-base font-normal text-gray-900')}>Stripe Id</Text>
                          </View>
                           <View>
                                  <Text style={tw.style('text-base font-normal text-gray-900')}>{props?.loginCredentials?.stripe_id}</Text>
                           </View>
                        
                      </View>
                      <View style={tw.style('border-b mt-2 mx-4 border-gray-500')}></View>
                      
                  </View>
                </View>*/}


                <View style={tw.style('bg-white overflow-hidden shadow rounded-md mx-4 my-5')}>
                  <View style={tw.style('px-2 py-4')}>

                        {/* <View style={tw.style('flex flex-row justify-between mx-4 mt-1 mb-5x')}>
                            <Text style={tw.style('flex flex-row text-xl text-gray-900',{fontFamily:'AvertaStd-Semibold'})}>Saved Items</Text>
                        </View> */}
                    <TouchableOpacity onPress={() => props.navigation.navigate("editprofile")} style={tw.style('flex flex-row justify-between mx-4 items-center')}>
                        <View style={tw`my-3`}>
                            <Text style={tw.style('text-base text-gray-800')}>Edit Profile</Text>
                        </View>
                        <ArrowRightIcon color="red" fill="gray" size={24} />
                    </TouchableOpacity>
                    <View style={tw.style('border-b mx-4 border-gray-500')}></View> 

                    <TouchableOpacity onPress={() => props.navigation.navigate("Accountfav1")} style={tw.style('flex flex-row justify-between mx-4 items-center')}>
                        <View style={tw`my-3`}>
                            <Text style={tw.style('text-base text-gray-800')}>My Favourites</Text>
                        </View>
                        <ArrowRightIcon color="red" fill="gray" size={24} />
                    </TouchableOpacity>
                   {/* <View style={tw.style('border-b mx-4 border-gray-500')}></View> 
                    <TouchableOpacity onPress={() => props.navigation.navigate("Accountdata")} style={tw.style('flex flex-row justify-between mx-4 items-center')}>
                        <View style={tw`my-4`}>
                            <Text style={tw.style('text-base text-gray-800')}>Bookmarks</Text>
                        </View>
                        <ArrowRightIcon color="red" fill="gray" size={24} />
                    </TouchableOpacity>*/}
                    <View style={tw.style('border-b mx-4 border-gray-500')}></View>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Accountfollow")} style={tw.style('flex flex-row justify-between mx-4 items-center')}>
                        <View style={tw`my-4`}>
                            <Text style={tw.style('text-base text-gray-800')}>Following</Text>
                        </View>
                          <ArrowRightIcon color="red" fill="gray" size={24} />
                    </TouchableOpacity>
                    <View style={tw.style('border-b mx-4 border-gray-500')}></View>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Dashorder")} style={tw.style('flex flex-row justify-between mx-4 items-center')}>
                        <View style={tw`my-4`}>
                            <Text style={tw.style('text-base text-gray-800')}>Orders</Text>
                        </View>
                          <ArrowRightIcon color="red" fill="gray" size={24} />
                    </TouchableOpacity>
                    <View style={tw.style('border-b mx-4 border-gray-500')}></View>
                    {/* Account Settings Section */}
                    <TouchableOpacity onPress={() => props.navigation.navigate("Dashsupportacc")} style={tw.style('flex flex-row justify-between mx-4 items-center')}>
                          <View style={tw.style('my-4')}>
                              <Text style={tw.style('text-base font-normal text-gray-900')}>Customer Support</Text>
                          </View>
                          <View>
                              <ArrowRightIcon color="red" fill="gray" size={24} />
                          </View>
                      </TouchableOpacity>
                      <View style={tw.style('border-b mt-1 mx-4 border-gray-500')}></View>
                      <TouchableOpacity onPress={() => props.navigation.navigate("editpassword")} style={tw.style('flex flex-row justify-between mx-4 items-center')}>
                          <View style={tw.style('my-4')}>
                              <Text style={tw.style('text-base font-normal text-gray-900')}>Change Password</Text>
                          </View>
                          <View>
                              <ArrowRightIcon color="red" fill="gray" size={24} />
                          </View>
                      </TouchableOpacity>
                      <View style={tw.style('border-b mt-1 mx-4 border-gray-500')}></View>
                      <TouchableOpacity onPress={() => deleetaccount() } style={tw.style('flex flex-row justify-between mx-4 items-center')}>
                          <View style={tw.style('my-4')}>
                              <Text style={tw.style('text-base font-normal text-gray-900')}>Delete Account</Text>
                          </View>
                          <View>
                              <ArrowRightIcon color="red" fill="gray" size={24} />
                          </View>
                      </TouchableOpacity>

                  </View>
                </View>

                <View style={tw.style('bg-white overflow-hidden shadow rounded-md mx-4 mt-8 mb-20')}>
                  <View style={tw.style('px-2 py-1')}>
                    <View style={tw.style('flex flex-row rounded-md bg-white items-center')}>
                        <View style={tw.style('mx-4 my-4')}>
                            <LogoutIcon color="gray" fill="#FFFFFF" size={24} />
                        </View>

                        <View style={tw.style('my-4')}>
                            <TouchableOpacity onPress={() => props.navigation.navigate("Golive")}>
                                <Text style={tw.style('text-xl text-gray-900',{fontFamily:'AvertaStd-Semibold'})}>
                                    Sign Out
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                  </View>
                </View>



            </ScrollView>

            <CustomAwesomeAlert showotherAlert={showotherAlert} showalertmsg={showalertmsg} onSelect={(checked) => setshowotherAlert(checked)} />


            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="DROPSHIP"
                message="Are you sure you want to delete this account?"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Cancel"
                confirmText="Delete"
                confirmButtonColor="#E22020"
                onCancelPressed={() => {
                    setshowAlert(false)
                }}
                onConfirmPressed={() => {
                    deleteapidataaccount()
                }}
            />


            <Help onPress={(text1) => helpbuttonsubmit(text1)} />

            <Footer3 onSelection="5" />
        </KeyboardAvoidingView>
    )
}

export default Profile
