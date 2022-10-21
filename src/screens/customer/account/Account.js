import React, { useRef, useState, useEffect } from 'react';
import { Text, View, Image, FlatList, Dimensions, StatusBar, Picker, TextInput, ImageBackground, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../../../screens/common/styles';
import styl from '../../../screens/common/styledrop';
import { Colors, CommonStrings } from '../../../common'
import ImageIcons from '../../../common/ImageIcons'
import InputField from '../../../components/forms/inputField';
import { RoundedButton } from '../../../components/forms/button';
import { phoneRegExp } from '../../../services/helper';
import DropdownField from '../../../components/dropdown/DropDownMenu';
import PhoneMaskInput from '../../../components/forms/inputField/PhoneMaskInput';
import Loader from '../../../components/modals/Loader';
import Footer3 from '../../../screens/common/Footer3';
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

const Account = (props) => {

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

    const renderItem1 = ({ item, index }) => {
      return (
        <View>
          {index == 0 &&
            <View style={tw`pb-2`}>
              <View style={tw`flex flex-row`}>
                <TouchableOpacity style={tw`flex-row items-center`} onPress={() => props.navigation.navigate("Accountbrand")}>
                  <View>
                    <Image source={{ uri: item.brandImage }} style={styles.produtbrandimage2} />
                  </View>
                  <View style={tw`ml-3`}>
                    <Text style={styles.droptxttt}>{item.brandName} - Store</Text>

                    <View style={tw`flex-row items-center`}>
                      <View style={tw.style('flex-row items-center mr-1')}>
                        <ShoppingBagIcon color="red" fill="#b80000" size={20} />
                        <Text style={styles.optext}>0 products</Text>
                      </View>
                      <View style={tw.style('flex-row items-center ml-1')}>
                        <TagIcon color="red" fill="#b80000" size={20} />
                        <Text style={styles.optext}>0 sales</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex-row top-4`} onPress={() => props.navigation.navigate("Accountbrand")}>
                  <ChevronRightIcon color="red" fill="#b80000" size={48} />
                </TouchableOpacity>
              </View>

            </View>
          }
        </View>
      );
    }

    const handleEmpty = () => {
      return (
        <View style={tw`pb-1 px-2`}>
          <View style={tw`flex flex-row`}>
            <TouchableOpacity style={tw`flex-row items-center justify-between w-full`} onPress={() => props.navigation.navigate("Accountbrandlist")}>
              <Text style={tw`text-lg text-red-700`}>Start Selling Today</Text>
              <View style={tw`right-1`}>
                <ChevronRightIcon color="red" fill="#b80000" size={48} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    // //     const renderItem = ({


    //    return(

    //     <View style={styles.maincartviewshop}>
    //         <TouchableOpacity  onPress={() => {props.navigation.navigate("NameStore",{shopId:item._id, shopName:item.shopName}) }}>

    //          <View style={styles.comingViewflatshop}>
    //            <Image source={{uri: item.shopImage}} style={styles.storeimageflat} />
    //            <View>
    //                <View style={{flexDirection:'row',marginTop:'10%',width:160,justifyContent:'center'}}>
    //                     <Text style={[styles.namestoretext,{ textAlign:'center', justifyContent:'center'}]} numberOfLines={1}>{item.shopName}</Text>
    //                     <Image source={ImageIcons.brandicon} style={styles.bagimage} />
    //                 </View>
    //             <Text style={styles.storedropship}>{item.shopName}.dropship.com</Text>
    //            </View>

    //         </View>

    //         </TouchableOpacity>

    //     </View>

    //   );
    // }
    //  <View style={{marginHorizontal:'3%', marginBottom:90}}>
    //            <FlatList
    //                 data={props?.getlistshop || []}
    //                 renderItem={renderItem}
    //                 keyExtractor={item => item.id}
    //                 showsHorizontalScrollIndicator={false}
    //                 numColumns={2}
    //                 />
    //         </View>

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={tw`flex-1 justify-center`}>


            <ScrollView onScroll={({ nativeEvent }) => {
                handleScroll(nativeEvent['contentOffset'].y);
            }} keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={tw.style('bg-gray-100')} >
                <View style={tw.style('mx-4 pt-3')}>
                    <Text style={tw.style('text-3xl text-gray-900 pt-3 mt-4 mb-4', {fontFamily:'hintedavertastdsemibold'})}>My Account</Text>
                </View>

                {/* TODO: remove the current account store summary a move to its own component */}
                <View style={tw.style('bg-white overflow-hidden shadow rounded-md mx-4 my-3')}>
                  <View style={tw.style('px-2 py-5')}>
                    <FlatList
                      ListEmptyComponent={handleEmpty}
                      data={props?.Brandlistdata || []}
                      renderItem={renderItem1}
                      keyExtractor={item => item.id}
                      showsHorizontalScrollIndicator={false}
                      numColumns={1}
                    />
                  </View>
                </View>
                {/* TODO: remove the current account store summary a move to its own component */}


                <View style={tw.style('flex flex-row justify-between mx-4 px-8 pt-5')}>
                    <Text style={tw.style('text-lg text-gray-900', {fontFamily:'hintedavertastdsemibold'})}>Personal Details</Text>
                  {/*
                    <TouchableOpacity onPress={() => props.navigation.navigate("Accountstore")}>
                        <Text style={tw`text-base text-gray-400`}>My store</Text>
                    </TouchableOpacity>
                  */}
                    <TouchableOpacity onPress={() => props.navigation.navigate("Accountsum")}>
                        <Text style={tw`text-base text-gray-400`}>Order Summary</Text>
                    </TouchableOpacity>
                </View>

                <View style={tw.style('flex flex-row mx-4 my-2')}>
                    <View style={tw.style('border-b-2 border-gray-500 w-[35%]')}></View>
                    <View style={tw.style('border-b-2 border-gray-500 w-[65%]')}></View>
                </View>

                <View style={tw.style('bg-white overflow-hidden shadow rounded-md mx-4 my-5')}>
                  <View style={tw.style('px-2 py-5')}>
                    <View style={tw.style('flex flex-row justify-between mx-4 items-center mb-3')}>
                        <View>
                            <Text style={tw.style('flex flex-row text-2xl text-gray-900',{fontFamily:'hintedavertastdsemibold'})}>My Profile</Text>
                        </View>
                            <Editbutton navigation={props.navigation} page='editprofile'  />
                    </View>

                    <View style={tw.style('flex flex-row justify-between mx-4 my-2 items-center')}>
                        <View>
                            <Text style={tw`text-base text-gray-700`}>First Name</Text>
                        </View>
                        <View>
                            <Text style={tw`text-lg text-gray-900`}>{props?.getprofileuserlist?.userName}</Text>
                        </View>
                    </View>
                    <View style={tw.style('border-b mt-2 mx-4 border-gray-500')}></View>
                    <View style={tw.style('flex flex-row justify-between mx-4 my-2 items-center')}>
                        <View>
                            <Text style={tw`text-base text-gray-900`}>Last Name</Text>
                        </View>
                        <View>
                            <Text style={tw`text-lg text-gray-900`}>{props?.getprofileuserlist?.lastName}</Text>
                        </View>
                    </View>
                    <View style={tw.style('border-b mt-2 mx-4 border-gray-500')}></View>
                    <View style={tw.style('flex flex-row justify-between mx-4 my-2 items-center')}>
                        <View>
                            <Text style={tw`text-base text-gray-700`}>Email</Text>
                        </View>
                        <View>
                            <Text style={tw`text-lg text-gray-900`}>{props?.getprofileuserlist?.email}</Text>
                        </View>
                    </View>
                    <View style={tw.style('border-b mt-2 mx-4 border-gray-500')}></View>
                    <View style={tw.style('flex flex-row justify-between mx-4 my-2 items-center')}>
                        <View>
                            <Text style={tw`text-base text-gray-700`}>Number</Text>
                        </View>
                        <View>
                            <Text style={tw`text-base text-gray-900`}>{props?.getprofileuserlist?.phone}</Text>
                        </View>
                    </View>
                  </View>
                </View>


                <View style={tw.style('bg-white overflow-hidden shadow rounded-md mx-4 my-5')}>
                  <View style={tw.style('px-2 py-5')}>
                      <View style={tw.style('flex flex-row justify-between mx-4 mt-2 mb-3')}>
                          <View>
                              <Text style={tw.style('flex flex-row text-2xl text-gray-900',{fontFamily:'hintedavertastdsemibold'})}>My Address</Text>
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

                <View style={tw.style('bg-white overflow-hidden shadow rounded-md mx-4 my-5')}>
                  <View style={tw.style('px-2 py-5')}>
                      <View style={tw.style('flex flex-row justify-between mx-4 mt-4')}>
                          <View>
                              <Text style={tw.style('flex flex-row text-2xl text-gray-900',{fontFamily:'hintedavertastdsemibold'})}>Payment Details</Text>
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
                </View>


                <View style={tw.style('bg-white overflow-hidden shadow rounded-md mx-4 my-5')}>
                  <View style={tw.style('px-2 py-5')}>

                    <View style={tw.style('flex flex-row justify-between mx-4 mt-1 mb-5x')}>
                        <Text style={tw.style('flex flex-row text-xl text-gray-900',{fontFamily:'hintedavertastdsemibold'})}>Saved Items</Text>
                    </View>

                    <TouchableOpacity onPress={() => props.navigation.navigate("Accountfav1")} style={tw.style('flex flex-row justify-between mx-4 items-center')}>
                        <View style={tw`my-3`}>
                            <Text style={tw.style('text-base text-gray-800')}>My Favourites</Text>
                        </View>
                        <ArrowRightIcon color="red" fill="gray" size={24} />
                    </TouchableOpacity>
                    {/*<View style={tw.style('border-b mx-4 border-gray-500')}></View> 
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

                  </View>
                </View>


                <View style={tw.style('bg-white overflow-hidden shadow rounded-md mx-4')}>
                  <View style={tw.style('px-2 py-5')}>
                      <View style={tw.style('flex flex-row justify-between mx-4 mt-4 mb-5')}>
                          <View>
                              <Text style={tw.style('flex flex-row text-2xl text-gray-900',{fontFamily:'hintedavertastdsemibold'})}>Account Settings</Text>
                          </View>

                      </View>

                      <TouchableOpacity onPress={() => props.navigation.navigate("Dashsupportacc")} style={tw.style('flex flex-row justify-between mx-4 my-2 items-center')}>
                          <View style={tw.style('my-1')}>
                              <Text style={tw.style('text-base font-normal text-gray-900')}>Customer Support</Text>
                          </View>
                          <View>
                              <ArrowRightIcon color="red" fill="gray" size={24} />
                          </View>
                      </TouchableOpacity>
                      <View style={tw.style('border-b mt-1 mx-4 border-gray-500')}></View>
                      <TouchableOpacity onPress={() => props.navigation.navigate("editpassword")} style={tw.style('flex flex-row justify-between mx-4 my-2 items-center')}>
                          <View style={tw.style('my-1')}>
                              <Text style={tw.style('text-base font-normal text-gray-900')}>Change Password</Text>
                          </View>
                          <View>
                              <ArrowRightIcon color="red" fill="gray" size={24} />
                          </View>
                      </TouchableOpacity>
                      <View style={tw.style('border-b mt-1 mx-4 border-gray-500')}></View>
                      <TouchableOpacity onPress={() => deleetaccount() } style={tw.style('flex flex-row justify-between mx-4 my-2 items-center')}>
                          <View style={tw.style('my-1')}>
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
                            <LogoutIcon color="gray" fill="white" size={24} />
                        </View>

                        <View style={tw.style('my-4')}>
                            <TouchableOpacity onPress={() => props.navigation.navigate("Golive")}>
                                <Text style={tw.style('text-xl text-gray-900',{fontFamily:'hintedavertastdsemibold'})}>
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

export default Account
