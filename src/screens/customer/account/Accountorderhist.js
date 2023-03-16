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
import Moment from 'moment';
import tw from 'twrnc';
import Sortorder from '../../../components/pickers/Sortorder';
import Help from '../../../components/help/Help';


const Accountorderhist = (props) => {

    const {
        navigation,
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;


    useEffect(() => {
       // props.getAllshop(1);
        props.getincomingtlist(props?.loginuserid);

    }, [])
    useFocusEffect(() => {
        //props.getincomingtlist(props?.loginuserid);
    })


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
    const [selectedValue, setSelectedValue] = useState("1");
    const [wayToContact, setWayToContact] = useState("Phone");
    const [showAlert, setshowAlert] = React.useState(false);

    const updateorderStatus = (itemValue) => {
        setSelectedValue(itemValue)
    }

    const [showclassName, setshowclassName] = useState("#B80000");
    const handleScroll = (pageYOffset) => {
        if (pageYOffset > 0) {
            setshowclassName('#B80000');
        } else {
            setshowclassName('#B80000');
        }
    }

    
    const checklogin = async () => {
        if (props?.loginuserstatus == "1") {
            props.navigation.navigate("watchlist")
        } else {
            setshowAlert(true)
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


    const renderItem4 = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => props.navigation.navigate("Accountorderview")} style={styles.seledataViewTODAYaccountsummary}>
                    <Text style={styles.seriestexttoday}>{item.text}</Text>
                    <Text style={styles.seriestexttoday}>{item.text1}</Text>
                    <Text style={styles.seriestexttoday}>{item.text2}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const renderItem3 = ({ item }) => {
        return (
          <View style={tw`bg-white overflow-hidden shadow rounded-md mx-1 mt-4 px-4 pt-3 pb-4`}>
            <TouchableOpacity onPress={() => props.navigation.navigate("Accountorderview", { orderNumber: item.orderNumber })}>
            <View style={tw`flex flex-row justify-between`}>
              <View>
                <Text style={tw`text-lg text-gray-900`} >{item?.productId?.productName}</Text>
                <Text style={tw`text-sm text-gray-700`} >{Moment(item.createdAt).format('MMM DD YYYY')}</Text>
              </View>
              <View style={{ marginTop: 5 }}>
                {/* need if status x the show color x */}
                <Text style={tw`items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800`} >{item.status}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
              <View style={{ width: 230, marginVertical: 3 }}>
                <Text style={tw`text-sm text-gray-900`} >Order Number:<Text style={tw`text-sm text-blue-500`} > {item.orderNumber}</Text></Text>
              </View>
              <View style={{ justifyContent: 'flex-end' }}>
                  <Image source={ImageIcons.dropDownIcon} style={{ width: 15, height: 15, marginRight: 5 }} />
              </View>
            </View>
            </TouchableOpacity>
          </View>
        )
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
            style={styles.registrationRoot}>


            <ScrollView onScroll={({ nativeEvent }) => {
                handleScroll(nativeEvent['contentOffset'].y);
            }} keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={{ backgroundColor: '#f2f2f2' }} >

                <View style={tw`mx-4 mt-[5%] mb-6`}>
                    <Text style={tw`text-2xl text-gray-700 font-bold`}>Purchase History</Text>
                </View>

                
                <View>
                    <View style={tw.style('px-3')}>
                      <View style={tw``}>
                          <FlatList
                              data={props?.getinconeorderlist || []}
                              renderItem={renderItem3}
                              keyExtractor={item => item.id}
                              showsHorizontalScrollIndicator={false}
                              horizontal={false}
                          />
                      </View>
                  </View>
                </View>
            </ScrollView>


            <Help onPress={(text1) => helpbuttonsubmit(text1)} />


            <Footer3 onSelection="5" />
        </KeyboardAvoidingView>

    )
}


export default Accountorderhist