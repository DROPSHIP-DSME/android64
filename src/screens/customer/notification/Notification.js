import React, { useRef, useState, useEffect } from 'react';
import {
    Text, View, TouchableOpacity, FlatList,
    Image, TextInput, ImageBackground,
    ScrollView, Alert, StatusBar,
    KeyboardAvoidingView,
    Platform, Keyboard
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../../../screens/common/styles';
import { Colors, CommonStrings } from '../../../common'
import ImageIcons from '../../../common/ImageIcons'
import InputField from '../../../components/forms/inputField';
import { RoundedButton } from '../../../components/forms/button';
import { phoneRegExp } from '../../../services/helper';
import DropdownField from '../../../components/dropdown/DropDownMenu';
import PhoneMaskInput from '../../../components/forms/inputField/PhoneMaskInput';
import Loader from '../../../components/modals/Loader';
import { RadioButton, Provider, Modal, Portal, Button, } from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Footer3 from '../../../screens/common/Footer3';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import tw from 'twrnc';
import AwesomeAlert from '../../../components/modals/AlertModal';

const Notification = (props) => {

    const {
        navigation,
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;

    useEffect(() => {
        props.getallnotification(props?.loginuserid);
        props.getprofileuser(props?.loginuserid);
        props.getnotificationcount(props?.loginuserid);
        if(props?.alertmessage=='Event has been expired or not started yet'){
            setshowotherAlert(true)
            setshowalertmsg('Event has been expired or not started yet')
        }
    }, [props?.alertmessage])


    //Reference

    // Local states
    const [text1, onChangeText1] = React.useState("");
    const [City, onChangeCity] = React.useState("City");
    const [UserID, setUserID] = useState("");
    const [filterData, onfilterData] = React.useState([]);

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

    const containerStyle = { backgroundColor: 'white', padding: '7%', marginHorizontal: '5%', alignItems: 'center' };
    
    const markallread = () => {
        props.markallread(props?.loginuserid);
        setTimeout(function () {
            props.getnotificationcount(props?.loginuserid); 
            props.getallnotification(props?.loginuserid); 
        }, 1000);
    }

    const joinbroadcast = (notificationid, channelId) => {

        props.checkeventvalidity(notificationid,channelId, props.navigation);
        setTimeout(function () {
            props.getnotificationcount(props?.loginuserid);  
        }, 1000);

            // setTimeout(function () {
            //     props.navigation.navigate("Blurbackground", { isback: false, channel: itemid, isbroadcaster: false });
            // }, 1000);
        // } else {
        //     alert('Event will start at ' + moment(eventtime).format('MMM DD, hh:mm A'))
        // }
    }

    

    /*const renderItem = ({ item, index }) => {
      return (
            <View style={tw`divide-y divide-gray-300 border-b-2 border-gray-200 py-3`}>
              <View key={item.id} style={tw`py-2`}>
                <View style={tw`flex flex-row space-x-3`}>
                  <Image style={tw`h-16 w-16 rounded-full`} source={{uri: item.imageUrl}} alt="" />
                  <View style={tw`flex-1 space-y-1 ml-4`}>
                    <View style={tw`flex-row items-center justify-between`}>
                      <Text style={tw`text-sm font-medium text-gray-700`}>{item.name}</Text>
                      <Text style={tw`text-sm text-gray-500`}>{item.time}</Text>
                    </View>
                    <Text style={tw`text-sm text-gray-500`}>
                      Deployed {item.project} ({item.commit} in master) to {item.environment}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
      );
    }*/

    const renderItem = ({ item, index }) => {
      return (
            <View style={tw`divide-y divide-gray-300 border-b-2 border-gray-200 py-3`}>
              <View key={item.id} style={tw`py-2`}>
                <View style={tw`flex flex-row space-x-3`}>
                  <View style={tw`flex-1 space-y-1 ml-4`}>
                    <View style={tw`flex-row items-center justify-between`}>
                      <Text style={tw`text-sm font-medium text-gray-700`}>{props?.getprofileuserlist?.userName} {props?.getprofileuserlist?.lastName}</Text>
                      <Text style={tw`text-sm text-gray-500`}>{ moment(item.createdAt).format('MMM DD, hh:mm A') }</Text>
                    </View>
                   {item.isRead==false ?
                    <TouchableOpacity onPress={() => joinbroadcast(item._id,item.eventId)}>
                            <Text style={tw`text-sm font-bold text-gray-500`}>
                              {item.message} 
                            </Text>
                    </TouchableOpacity>
                    :
                        <TouchableOpacity>
                            <Text style={tw`text-sm text-gray-500`}>
                              {item.message} 
                            </Text>
                    </TouchableOpacity>
                    }
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
            <ScrollView onScroll={({nativeEvent}) => {

                handleScroll(nativeEvent['contentOffset'].y);
            }} keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={{ backgroundColor: '#FFFFFF' }} >
           
            <AwesomeAlert showotherAlert={showotherAlert} showalertmsg={showalertmsg} onSelect={(checked) => setshowotherAlert(checked)} />


            <View style={tw`mx-4 mt-6 mb-10`}>
                  <Text style={tw`text-3xl text-red-700 font-bold`}>Notifications</Text>
                  <TouchableOpacity onPress={() => markallread()}>
                  <View style={tw`bg-gray-200 p-2 w-45 mt-4 rounded-md mb-3`}>
                    <Text style={tw`text-sm text-center text-gray-700`}>Mark All As Read</Text>
                  </View>
                  </TouchableOpacity>
                  <View style={tw`mt-2`}>
                      <FlatList
                        data={props?.getlistnotification}
                        renderItem={renderItem}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        horizontal={false}
                      />
                  </View>
            </View>

            </ScrollView>

            <Footer3 />
        </KeyboardAvoidingView>
    )
}
export default Notification