import React, { useRef, useState, useEffect } from 'react';
import {
  Text, View, TouchableOpacity,
  Image, TextInput, ImageBackground,
  ScrollView, Alert, Dimensions,
  FlatList, StatusBar, Picker,
  KeyboardAvoidingView, Platform,
  Keyboard
} from 'react-native';
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
import { RadioButton, Provider, Portal, Button, } from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Footer3 from '../../../screens/common/Footer3';
import * as Progress from 'react-native-progress';
import RnIncrementDecrementBtn from
  'react-native-increment-decrement-button';
import Modal from 'react-native-modal';
import Moment from 'moment';
import tw from 'twrnc';
import Help from '../../../components/help/Help';

const Accountorderview = (props) => {

  const {
    navigation,
    values,
    errors,
    handleChange,
    handleSubmit,
  } = props;

  //Reference
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  const emailRef = useRef();
  const phoneRef = useRef();
  const bisinessnameRef = useRef();
  const fullnameRef = useRef();

  const shopId = props?.route?.params?.shopId;
  const shopName = props?.route?.params?.shopName;
  const orderNumber = props?.route?.params?.orderNumber;
  // Local states

  const [text3, onChangeText3] = React.useState("");
  const [helppopup1, sethelppopup1] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [starCount, setstarCount] = useState(3);
  const [visiblebag, setVisiblebag] = React.useState(false);
  const [couponcode, setcouponcode] = React.useState(false);
  const [showclassName, setshowclassName] = useState("#B80000");

  useEffect(() => {
    props.shopproduct(shopId);
    props.shopsellcount(shopId);
    props.getincomingtlist(props?.loginuserid);
    props.getorderdetail(orderNumber);
  }, [])
  const openpopup = () => {
    setVisible(true)
  }
  const closepopup = () => {
    setVisible(false)
  }


  const closebagpopup = () => {
    setVisiblebag(false)
  }

  const handleScroll = (pageYOffset) => {
    if (pageYOffset > 0) {
      setshowclassName('#B80000');
    } else {
      setshowclassName('#B80000');
    }
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
    

  const containerStyle = { backgroundColor: '#FFFFFF', padding: '3%', borderRadius: 10 };
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
  };
  const renderItem = ({ item, index }) => {
    return (
      <View style={tw.style('bg-white overflow-hidden shadow border-2 border-gray-200 rounded-md')}>
        <View style={tw.style('py-2')}>
            <View style={tw`flex`}>
              <View style={tw`flex-row items-center ml-3`}>
                <Image source={{ uri: item?.productId?.productImage }} style={tw`w-28 h-28 rounded-lg`} />
                <View style={tw`ml-4`}>

                    <View style={tw`flex-row`}>
                      <Text style={tw`text-base font-bold text-gray-900`}>Name: </Text>
                      <Text style={tw`text-base text-gray-700`}>{item?.productId?.productName}</Text>
                    </View>

                    <View style={tw`flex-row`}>
                      <Text style={tw`text-base font-bold text-gray-900`}>Price: </Text>
                      <Text style={tw`text-base text-gray-700`}>{item.productPrice}</Text>
                    </View>


                    <View style={tw`flex-row`}>
                      <Text style={tw`text-base font-bold text-gray-900`}>Size: </Text>
                      <Text style={tw`text-base text-gray-700`}>{item.productSize}</Text>
                    </View>

                    <View style={tw`flex-row`}>
                      <Text style={tw`text-base font-bold text-gray-900`}>Quantity: </Text>
                      <Text style={tw`text-base text-gray-700`}>{item.productQuantity}</Text>
                    </View>

                </View>
              </View>
            </View>

        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.registrationRoot}>


      <ScrollView onScroll={({ nativeEvent }) => {
        handleScroll(nativeEvent['contentOffset'].y);
      }} keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={{ backgroundColor: '#FFFFFF' }} >


        <View style={tw`flex flex-row justify-between mx-4 mt-[5%] mb-4`}>
          <Text style={tw`text-2xl font-bold text-gray-900`}>View Order</Text>
        </View>

        <View style={tw`flex flex-row relative mx-4 mt-1 mb-2 shadow-sm`}>
            <TouchableOpacity onPress={() => props.navigation.navigate("Accountorderview")} style={tw.style('w-2/4')}>
              <View
                type="button"
                style={tw`relative inline-flex items-center px-4 py-3 rounded-l-md border border-gray-200 bg-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500`}
              >
                  <Text style={tw`text-base font-medium text-gray-700`}>Details</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate("Shippingdetails")} style={tw.style('w-2/4')}>
              <View
                type="button"
                style={tw`-ml-px relative inline-flex items-center px-4 py-3 rounded-r-md border border-red-200 bg-red-700 hover:bg-red-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500`}
              >
                  <Text style={tw`text-base font-bold text-white`}>Shipping</Text>
              </View>
            </TouchableOpacity>
        </View>


        <View style={tw`mx-4 mt-4 mb-2`}>
          <View>
            <View style={tw`flex flex-row items-center`}>
              <Text style={tw`text-base font-medium text-gray-900`}>Order No: </Text>
              <Text style={tw`text-base font-medium text-blue-700`}>{props?.getorderlist?.data?.orderNumber}</Text>
            </View>
            <View style={{ alignItems: "center", marginTop: "1%", flexDirection: 'row', }}>
              <Text style={tw`text-base font-medium text-gray-800`}>Date: </Text>
              <Text style={tw`text-base text-gray-600`}>{Moment(props?.getinconeorderlist?.createdAt).format('MMM DD YYYY')}</Text>
            </View>
            <View style={tw.style(tw`flex flex-row my-3`)}>
                <TouchableOpacity style={tw`px-4 py-2 rounded-full bg-blue-100`}>
                  <Text style={tw`text-xs font-medium text-blue-900`} >{props?.getorderlist?.data?.orderStatus}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`ml-3 px-4 py-2 rounded-full bg-red-700`}>
                  <Text style={tw`text-xs font-medium text-white`} >Cancel Order</Text>
                </TouchableOpacity>
            </View>
            
          </View>
        </View>

        {/*<View style={{ flexDirection: 'row', marginTop: '5%', marginHorizontal: '4%' }}>
           <View style={{ backgroundColor: '#b80000', width: '32%', borderRadius: 15, padding: 8, marginLeft: '4%' }}>
            <Text style={[styles.totalincometodayWIDRO, { color: '#ffffff' }]}>CANCEL ORDER</Text>
          </View>
        </View>*/}

        <View style={tw`mx-4 my-2`}>
          <FlatList
            data={props?.getorderlist?.ItemList || []}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
          />
        </View>

        {/* Order Details */}
        <View style={tw.style('bg-white overflow-hidden border-2 border-gray-200 shadow rounded-lg mx-4 mt-3')}>
          <View style={tw.style('px-3 py-1')}>
            <View style={tw`mt-4 mb-1`}>
                <Text style={tw`text-xl text-gray-900`}>Order Summary</Text>
              </View>

              <View style={tw`flex flex-row justify-between items-center`}>
                <Text style={tw`text-base text-gray-900`}>Subtotal</Text>
                <Text style={tw`text-base text-blue-900`}>${props?.getorderlist?.data?.orderAmount}</Text>
              </View>
              <View style={tw`flex flex-row justify-between items-center`}>
                <Text style={tw`text-base text-gray-900`}>Taxes</Text>
                <Text style={tw`text-base text-blue-900`}>US$0</Text>
              </View>
              <View style={tw`flex flex-row justify-between items-center`}>
                <Text style={tw`text-base text-gray-900`}>Shipping</Text>
                <Text style={tw`text-base text-blue-900`}>US$0</Text>
              </View>


              <View style={tw`border-b-2 border-gray-400 my-3`}></View>
              <View style={tw`mb-2 mt-1`}>
                <View style={tw`flex flex-row justify-between`}>
                  <Text style={tw`text-lg font-bold text-gray-900`}>Grand Total:</Text>
                  <Text style={tw`text-2xl font-bold text-gray-800`}>${props?.getorderlist?.data?.orderAmount}</Text>
                </View>
              </View>

          </View>
        </View>

        <View style={tw.style('bg-white overflow-hidden border-2 border-gray-200 shadow rounded-lg mx-4 mt-5')}>
          <View style={tw.style('px-3 py-1')}>
              <View style={tw`mt-3`}>
                <Text style={tw`text-xl text-gray-900`}>Personal Details</Text>
              </View>

              <View style={tw`flex`}>
                  <View style={tw`flex-row justify-between items-center mt-2`}>
                    <Text style={tw`text-base text-gray-800`}>Name: </Text>
                    <Text style={tw`text-base text-gray-900 leading-1.2`}>{props?.getorderlist?.data?.firstName} {props?.getorderlist?.data?.lastName}</Text>
                  </View>

                  <View style={tw`flex-row justify-between`}>
                    <Text style={tw`text-lg text-gray-800`}>Address: </Text>
                    <Text style={tw`text-base text-gray-900 leading-1.2`}>{props?.getorderlist?.data?.streetAdress}{"\n"}{props?.getorderlist?.data?.city}, {props?.getorderlist?.data?.zipCode} {"\n"}{props?.getorderlist?.data?.country}</Text>
                  </View>

                  <View style={tw`flex-row justify-between`}>
                    <Text style={tw`text-lg text-gray-800`}>Email: </Text>
                    <Text style={tw`text-base text-gray-900 leading-1.2`}>{props?.getorderlist?.data?.email}{props?.getorderlist?.data?.phoneNumber}</Text>
                  </View>

                  <View style={tw`flex-row justify-between`}>
                    <Text style={tw`text-lg text-gray-800`}>Phone: </Text>
                    <Text style={tw`text-base text-gray-900 leading-1.2`}>{props?.getorderlist?.data?.phoneNumber}</Text>
                  </View>

                  
              </View>
          </View>
        </View> 

        <View style={tw.style('bg-white overflow-hidden border-2 border-gray-200 shadow rounded-lg mx-4 mt-5')}>
          <View style={tw.style('px-3 py-1 pb-4')}>
            <View style={tw`mt-3`}>
              <Text style={tw`text-xl text-black`}>Shipping Information</Text>
            </View>
            
            <View style={tw`flex`}>
              <View style={tw`flex-row justify-between items-center mt-1`}>
                <Text style={tw`text-base font-bold text-gray-900`}>Shipping Method: </Text>
                <Text style={tw`text-base text-gray-700 leading-1.2`}>Standard Shipping</Text>
              </View>
              <View style={tw`flex-row justify-between items-centern mt-1`}>
                <Text style={tw`text-base font-bold text-black`}>Address: </Text>
                <Text style={tw`text-base text-gray-900 leading-1.2`}>{props?.getorderlist?.data?.streetAdress}{"\n"}{props?.getorderlist?.data?.city}, {props?.getorderlist?.data?.zipCode}{"\n"}{props?.getorderlist?.data?.country}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={tw.style('bg-white overflow-hidden border-2 border-gray-200 shadow rounded-lg mx-4 mt-5')}>
          <View style={tw.style('px-3 py-1 pb-4')}>
            <View style={tw`mt-3`}>
              <Text style={tw`text-xl text-black`}>Payment Details</Text>
            </View>
            <View style={tw`flex`}>
              <View style={tw`flex-row justify-between items-center mt-1`}>
                <Text style={tw`text-base font-bold text-gray-900`}>Payment Method</Text>
                <Text style={tw`text-base text-gray-700 leading-1.2`}>Pay by credit/debit card</Text>
              </View>
            </View>
          </View>
        </View> 

        <View>
          {openpopup &&
            <Provider>
              <Portal>
                <Modal visible={visible} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', marginHorizontal: -20, marginVertical: -5 }} onDismiss={closepopup} contentContainerStyle={containerStyle}>
                  <View style={{ marginTop: 40, position: 'absolute', textAlign: 'center', justifyContent: 'center', alignItems: 'center', top: 10, left: 0, right: 0 }}>
                    <View style={{ width: 320, borderRadius: 10, backgroundColor: '#f2f2f2', borderColor: '#999', borderWidth: 2 }}>
                      <View style={{ width: deviceWidth / 1.15, backgroundColor: '#f2f2f2', padding: '5%', alignSelf: 'center', marginTop: '3%', borderRadius: 15, }}>
                        <TouchableOpacity onPress={() => closepopup()} style={{ height: 40, width: 40, backgroundColor: '#e6e6e6', borderRadius: 4, padding: 8, alignSelf: 'flex-end' }}>
                          <Image source={ImageIcons.closetoday} style={{ height: 12, width: 12, marginTop: 5, alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, fontFamily: 'AvertaStd-Semibold', color: '#1a1a1a', marginTop: '3%' }}>Select a shipping address:</Text>
                        <View style={{ borderWidth: 2, borderColor: '#b80000', padding: 4, borderRadius: 15, marginVertical: '5%', backgroundColor: '#ffffff' }}>
                          <View style={{ backgroundColor: '#d0e3fb', width: '45%', borderRadius: 10, padding: 8, marginHorizontal: '2%', marginVertical: '3%' }}>
                            <Text style={styles.totalincometodayWIDROprocess}>DEFAULT ADDRESS</Text>
                          </View>
                          <Text style={{ fontSize: 18, fontFamily: "AvertaStd-Regular-Regular", color: "#1A1A1A", marginHorizontal: '2%' }}>Standard Shipping {"\n"}{props?.getorderlist?.data?.zipCode}, {"\n"}{props?.getorderlist?.data?.city},{props?.getorderlist?.data?.country}{"\n"}
                            {props?.getorderlist?.data?.streetAdress}</Text>
                        </View>
                        <View style={{ padding: 4, marginVertical: '5%', elevation: 0.5, backgroundColor: '#ffffff', borderRadius: 5 }}>
                          <Text style={{ fontSize: 18, fontFamily: "AvertaStd-Regular-Regular", color: "#1A1A1A", marginHorizontal: '2%', marginTop: '2%' }}>Marry Davis {"\n"}2501 Stevens Ev{"\n"}Miniapolis MN,54404{"\n"}
                            USA{"\n"}</Text>
                        </View>

                        <View style={{ padding: '4%', elevation: 0.5, marginTop: '5%', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffffff', borderRadius: 5 }}>
                          <Text style={{ fontSize: 18, fontFamily: "AvertaStd-Semibold", alignSelf: 'center' }}>Add a New Addresss</Text>
                          <TouchableOpacity onPress={() => closepopup()} style={{ height: 40, width: 40, backgroundColor: '#e6e6e6', borderRadius: 4, padding: 8, }}>
                            <Image source={ImageIcons.addwhytoday} style={{ height: 15, width: 15, marginTop: 5, alignSelf: 'center' }} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>
              </Portal>
            </Provider>
          }
        </View>
      </ScrollView>


      <Help onPress={(text1) => helpbuttonsubmit(text1)} />

      {visiblebag == true &&
        <View style={{ flex: 1, backgroundColor: '#ffffff', paddingVertical: 10, borderRadius: 10, zIndex: 4001, position: 'absolute', bottom: '20%', margin: "5%" }}>

          <TouchableOpacity style={{ position: 'absolute', right: 15 }} onPress={() => closebagpopup()}>
            <Image source={ImageIcons.closepopup} style={styles.sendmsg2} />
          </TouchableOpacity>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: "1%", marginVertical: "3%" }}>
            <View style={{ marginTop: '3%', }}>
              <Image source={ImageIcons.teashop} style={{ width: 177, height: 183, borderRadius: 10 }} />
            </View>
            <View style={{ marginTop: '3%', marginLeft: "2%" }}>
              <Image source={ImageIcons.teashop} style={{ width: 177, height: 183, borderRadius: 10 }} />
            </View>
          </View>

          <View style={{ marginLeft: "2%" }}>
            <Text style={{ fontSize: 18, fontStyle: 'normal', marginVertical: '2%', fontFamily: 'AvertaStd-Regular-Regular', color: '#1A1A1A' }}>Ribbed Knit Bardot Crossover Top</Text>
          </View>

          <View style={{ marginLeft: "2%" }}>
            <Text style={{ fontSize: 20, fontStyle: 'normal', fontWeight: "bold", marginVertical: '2%', fontFamily: 'AvertaStd-Regular-Regular', color: '#1A1A1A' }}>$0</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View>
              <View style={{ flexDirection: 'row', marginHorizontal: '4%', marginTop: '4%' }}>
                <Text style={{ fontSize: 18, fontFamily: 'AvertaStd-Semibold', }}>Color :</Text>
                <Text style={{ fontSize: 18, fontFamily: 'AvertaStd-Regular-Regular', marginLeft: 5 }}>White</Text>
              </View>

              <View style={{ flexDirection: 'row', marginHorizontal: '4%', marginVertical: '2%' }}>
                <View style={{ height: 20, width: 20, borderRadius: 10, backgroundColor: '#b3b3b3' }}></View>
                <View style={{ height: 20, width: 20, borderRadius: 10, backgroundColor: '#363e4d', marginLeft: '4%' }}></View>
                <View style={{ height: 20, width: 20, borderRadius: 10, backgroundColor: '#40b7c8', marginLeft: '4%' }}></View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: 100 }}>
              <View style={{ marginHorizontal: '4%', marginVertical: '3%' }}>
                <Text style={{ fontSize: 18, fontFamily: 'AvertaStd-Semibold', }}>Size</Text>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ height: 40, width: 40, backgroundColor: '#e6e6e6', borderRadius: 4, padding: 9, }}>
                    <Text style={{ textAlign: 'center', color: '#4d4d4d', fontSize: 16, fontFamily: 'AvertaStd-Semibold' }}>XS</Text>
                  </View>
                  <View style={{ height: 40, width: 40, backgroundColor: '#e6e6e6', borderRadius: 4, padding: 9, marginLeft: 8 }}>
                    <Text style={{ textAlign: 'center', color: '#4d4d4d', fontSize: 16, fontFamily: 'AvertaStd-Semibold' }}>S</Text>
                  </View>
                  <View style={{ height: 40, width: 40, backgroundColor: '#8B0000', borderRadius: 4, padding: 9, marginLeft: 8 }}>
                    <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 16, fontFamily: 'AvertaStd-Semibold' }}>L</Text>
                  </View>

                </View>
                <View style={{ height: 40, width: 40, backgroundColor: '#999999', borderRadius: 4, padding: 9, marginTop: "2%" }}>
                  <Text style={{ textAlign: 'center', color: '#4d4d4d', fontSize: 16, fontFamily: 'AvertaStd-Semibold' }}>XL</Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={() => { setVisiblebag(false); setcouponcode(true) }} style={{ width: deviceWidth / 1.3, backgroundColor: "#B80000", borderRadius: 30, marginTop: "10%", height: 38, marginHorizontal: "3%" }} >
            <Text style={{ textAlign: 'center', color: "#FFFFFF", fontWeight: 'bold', fontSize: 18, top: 8 }}>UPDATE</Text>
          </TouchableOpacity>
        </View>
      }

      <Footer3 onSelection="5" />

    </KeyboardAvoidingView>
  )
}



export default Accountorderview
