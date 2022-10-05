import React, { useRef, useState,useEffect } from 'react';
import { Text, View,Image,TouchableOpacity, ImageBackground, ScrollView, Alert,   KeyboardAvoidingView, Platform,Keyboard} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import styles from './styles';
import { Colors, CommonStrings } from '../../common';
import ImageIcons from '../../common/ImageIcons';
import tw from 'twrnc';
import BottomSheet from 'react-native-easy-bottomsheet';
import { HomeIcon } from "react-native-heroicons/solid";
import { VideoCameraIcon } from "react-native-heroicons/solid";
import { CashIcon } from "react-native-heroicons/solid";
import { ShoppingBagIcon } from "react-native-heroicons/solid";
import { ShoppingCartIcon } from "react-native-heroicons/solid";
import { UserIcon } from "react-native-heroicons/solid";
import InputField from '../../components/forms/inputField';
import { RoundedButton } from '../../components/forms/button';
import { phoneRegExp } from '../../services/helper';
import DropdownField from '../../components/dropdown/DropDownMenu';
import PhoneMaskInput from '../../components/forms/inputField/PhoneMaskInput';
import Loader from '../../components/modals/Loader';
import { useNavigation } from '@react-navigation/native';
import { RadioButton ,Provider ,Modal, Portal, Button,} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Footer3 = (props) => {

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        onSelection,
    } = props;

    const navigation = useNavigation();

    //Reference
    // Local states
    const [visible, setVisible] = React.useState(false);
    const [IsLogin, setIsLogin] = React.useState('');
    const [showpop, setshowpop] = React.useState(false);
    const [showaccountpop,setshowaccountpop]= React.useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalAcctVisible, setAcctModalVisible] = useState(false);

    useEffect(() => {
       getBrandUserId();
    }, [])

    const getBrandUserId = async () => {
        var getIsLogin = await AsyncStorage.getItem('userLogin');
        setIsLogin(getIsLogin);
    }

    const Showshoplinks = () => {
        return (
            <View>
                <TouchableOpacity onPress={() => { setModalVisible(true) }}>
                    <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                        <Text>
                            <ShoppingBagIcon color="#ff0000" fill="gray" size={24} />
                        </Text>
                            <Text style={tw.style('text-sm font-normal text-gray-700')}>Shop</Text>
                    </View>
                </TouchableOpacity>

                
                <BottomSheet
                    //bottomSheetTitle={'Shopping'}
                    // bottomSheetIconColor="red"
                    bottomSheetStyle={{
                        backgroundColor: 'white',
                        maxHeight: '70%',
                        minHeight: '30%',
                    }}
                    // bottomSheetTitleStyle={{color: 'red'}}
                    setBottomSheetVisible={setModalVisible}
                    bottomSheetVisible={modalVisible}>
                    <ScrollView>
                        <View onPress={() => { navigation.navigate('shop'); }}  style={tw.style('inline-block mx-4 my-5 md:px-2 md:mx-2')}>
                            <TouchableOpacity onPress={() => { navigation.navigate('shop'); }}>
                                <Text onPress={() => { navigation.navigate('shop'); }} style={tw.style('text-2xl font-bold text-gray-700')}>Shop Products</Text>
                            </TouchableOpacity>
                        </View>
                        <View onPress={() => { navigation.navigate('upcoming'); }}  style={tw.style('inline-block mx-4 mt-2 mb-5 md:px-2 md:mx-2')}>
                            <TouchableOpacity onPress={() => { navigation.navigate('upcoming'); }}>
                                <Text onPress={() => { navigation.navigate('upcoming'); }} style={tw.style('text-2xl font-bold text-gray-700',{marginBottom:20})}>View Livestreams</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </BottomSheet>
            </View>
           
        );
    }

    const Showaccountlinks = () => {
        return (
            <View>
                <TouchableOpacity onPress={() => { setAcctModalVisible(true) }}>
                    <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                        <Text>
                            <UserIcon color="#ff0000" fill="gray" size={24} />
                        </Text>
                            <Text style={tw.style('text-sm font-normal text-gray-700')}>Account</Text>
                    </View>
                </TouchableOpacity>

                
                <BottomSheet
                    // bottomSheetTitle={'Accounts'}
                    // bottomSheetIconColor="red"
                    bottomSheetStyle={{
                        backgroundColor: 'white',
                        maxHeight: '70%',
                        minHeight: '30%',
                    }}
                    // bottomSheetTitleStyle={{color: 'red'}}
                    setBottomSheetVisible={setAcctModalVisible}
                    bottomSheetVisible={modalAcctVisible}>
                    <ScrollView>
                        <View onPress={() => { navigation.navigate('shop'); }}  style={tw.style('inline-block mx-4 my-5 md:px-2 md:mx-2')}>
                            <TouchableOpacity onPress={() => { navigation.navigate('Account'); }}>
                                <Text onPress={() => { navigation.navigate('Account'); }} style={tw.style('text-2xl font-bold text-gray-700')}>My Account</Text>
                            </TouchableOpacity>
                        </View>
                        <View onPress={() => { navigation.navigate('upcoming'); }}  style={tw.style('inline-block mx-4 mt-2 mb-5 md:px-2 md:mx-2')}>
                            <TouchableOpacity onPress={() => { navigation.navigate('Overview'); }}>
                                <Text onPress={() => { navigation.navigate('Overview'); }} style={tw.style('text-2xl font-bold text-gray-700',{marginBottom:20})}>My Store</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </BottomSheet>
            </View>
           
        );
    }

    useFocusEffect(
        () => {
        getBrandUserId();
     })


    return (
        <View>

        <View style={tw.style('max-w-fit  bg-white flex h-15 px-6 py-2 md:py-4 md:px-6 sm:mx-1 md:mx-2')}>
          <View style={tw.style('flex-row justify-between')}>

          <TouchableOpacity onPress={() => { setshowaccountpop(false); setshowpop(false); navigation.navigate('watchlist'); }}>
            {onSelection==1 ?
              <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                  <Text>
                     <HomeIcon color="red" fill="#b80000" size={24} />
                  </Text>
                   <Text style={tw.style('text-sm text-right font-normal text-red-700')}>Home</Text>
              </View>
          :
              <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                  <Text>
                     <HomeIcon color="red" fill="gray" size={24} />
                  </Text>
                   <Text style={tw.style('text-sm text-right font-normal text-gray-700')}>Home</Text>
              </View>
            }
        </TouchableOpacity>

        
            {/* <TouchableOpacity onPress={() => { setshowaccountpop(false); setshowpop(s=>!s); setTimeout(function(){ setshowpop(false); },10000) }}>
            {onSelection==2 ?
            <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                <Text>
                    <ShoppingBagIcon color="red" fill="#b80000" size={24} />
                </Text>
                    <Text style={tw.style('text-sm text-right font-normal text-red-700')}>Shop</Text>
            </View>
        :
            <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                <Text>
                    <ShoppingBagIcon color="red" fill="gray" size={24} />
                </Text>
                    <Text style={tw.style('text-sm text-right font-normal text-gray-700')}>Shop</Text>
            </View>
            }
            </TouchableOpacity> */}

       
        {/* showShopLinks selection component */}
        <Showshoplinks/>


        <TouchableOpacity onPress={() => { setshowaccountpop(false); setshowpop(false); navigation.navigate("Dashlive")}} >
            {onSelection==3 ?
              <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                  <Text>
                     <ShoppingCartIcon color="red" fill="#b80000" size={24} />
                  </Text>
                   <Text style={tw.style('text-sm text-right font-normal text-red-700')}>Sell</Text>
              </View>
          :
              <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                  <Text>
                     <ShoppingCartIcon color="red" fill="gray" size={24} />
                  </Text>
                   <Text style={tw.style('text-sm text-right font-normal text-gray-700')}>Sell</Text>
              </View>
            }

        </TouchableOpacity>


            {/* <TouchableOpacity onPress={() => { setshowpop(false); setshowaccountpop(s=>!s); setTimeout(function(){ setshowaccountpop(false); },10000) }}>
            {onSelection==5 ?
            <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                <Text>
                    <UserIcon color="red" fill="#b80000" size={24} />
                </Text>
                    <Text style={tw.style('text-sm text-right font-normal text-red-700')}>Account</Text>
            </View>
        :
            <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                <Text>
                    <UserIcon color="red" fill="gray" size={24} />
                </Text>
                    <Text style={tw.style('text-sm text-right font-normal text-gray-700')}>Account</Text>
            </View>
            }
            </TouchableOpacity> */}
        
        {/* Account links selection component */}
        <Showaccountlinks/>

        </View>

        </View>
        </View>

    )
}
export default Footer3
