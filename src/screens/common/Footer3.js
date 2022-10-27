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
import RBSheet from "react-native-raw-bottom-sheet";
import { HomeIcon } from "react-native-heroicons/solid";
import { VideoCameraIcon } from "react-native-heroicons/solid";
import { CashIcon } from "react-native-heroicons/solid";
import { ShoppingBagIcon } from "react-native-heroicons/solid";
import { ShoppingCartIcon } from "react-native-heroicons/solid";
import { SpeakerphoneIcon } from "react-native-heroicons/solid";
import { PresentationChartLineIcon } from "react-native-heroicons/solid";
import { UserIcon } from "react-native-heroicons/solid";
import { ChatAltIcon } from "react-native-heroicons/solid";
import { ChevronRightIcon } from "react-native-heroicons/solid";
import { TagIcon } from "react-native-heroicons/solid";
import { MenuIcon } from "react-native-heroicons/solid";
import InputField from '../../components/forms/inputField';
import { RoundedButton } from '../../components/forms/button';
import { phoneRegExp } from '../../services/helper';
import DropdownField from '../../components/dropdown/DropDownMenu';
import PhoneMaskInput from '../../components/forms/inputField/PhoneMaskInput';
import Loader from '../../components/modals/Loader';
import { useNavigation } from '@react-navigation/native';
import { RadioButton ,Provider, Modal, Portal, Button,} from 'react-native-paper';
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
        const refRBSheet = useRef();

        return (
            <View>
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
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
                    bottomSheetVisible={modalVisible}
                    modalProps={{
                        animationType: 'fade',
                        hardwareAccelerated: true,
                        onRequestClose: () => {
                            setModalVisible(false);
                        },
                    }}>
                    <ScrollView>
                        <View style={tw.style('inline-block mx-4 my-5 md:px-2 md:mx-2')}>
                            <TouchableOpacity onPress={() => { navigation.navigate('shop'); }}>
                                <Text style={tw.style('text-2xl font-bold text-gray-700')}>Shop Products</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={tw.style('inline-block mx-4 mt-2 mb-5 md:px-2 md:mx-2')}>
                            <TouchableOpacity onPress={() => { navigation.navigate('upcoming'); }}>
                                <Text style={tw.style('text-2xl font-bold text-gray-700',{marginBottom:20})}>View Livestreams</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </BottomSheet>
            </View>
        );
    }

    const Showaccountlinks = () => {
        const refRBSheet = useRef();

        return (
            <View>
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                    <View style={tw.style('inline-block items-center px-2 mx-1 md:px-2 md:mx-2')}>
                        <Text>
                            <UserIcon color="#ff0000" fill="gray" size={24} />
                        </Text>
                            <Text style={tw.style('text-sm font-normal text-gray-700')}>Account</Text>
                    </View>
                </TouchableOpacity>

                <RBSheet
                    ref={refRBSheet}
                    height={750}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'rgba(52, 52, 52, 0.8)'
                        },
                        draggableIcon: {
                            backgroundColor: "#000"
                        }
                    }}
                >
                    <ScrollView>
                        <View style={tw.style('inline-block mx-4 my-5 md:px-2 md:mx-2')}>
                            <TouchableOpacity onPress={() => { navigation.navigate('Account'); }}>
                                <Text style={tw.style('text-2xl font-bold text-gray-700')}>My Account</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={tw.style('inline-block mx-4 mt-2 mb-5 md:px-2 md:mx-2')}>
                            <TouchableOpacity onPress={() => { navigation.navigate('Overview'); }}>
                                <Text style={tw.style('text-2xl font-bold text-gray-700',{marginBottom:20})}>My Store</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw.style('flex flex-row inline-block mx-7 my-3 md:px-2 md:mx-6')}>
                            <TouchableOpacity onPress={() => {refRBSheet.current.close(); navigation.navigate('Dashorder'); }} style={tw.style(`flex-row items-center w-full`)}>
                                <Image
                                    style={tw.style(`w-5 h-5`)}
                                    source={ImageIcons.stack}
                                />
                                <Text style={tw.style('text-xl text-gray-700 ml-4')}>Orders</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw.style('flex flex-row inline-block mx-7 my-3 md:px-2 md:mx-6')}>
                            <TouchableOpacity onPress={() => {refRBSheet.current.close(); navigation.navigate('Dashsubscribe'); }} style={tw.style(`flex-row items-center w-full`)}>
                                <Image
                                    style={tw.style(`w-5 h-5`)}
                                    source={ImageIcons.stack}
                                />
                                <Text style={tw.style('text-xl text-gray-700 ml-4')}>Subcriptions</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw.style('flex flex-row inline-block mx-7 my-3 md:px-2 md:mx-6')}>
                            <TouchableOpacity onPress={() => {refRBSheet.current.close(); navigation.navigate('Dashadvertise'); }} style={tw.style(`flex-row items-center w-full`)}>
                                <SpeakerphoneIcon color="red" fill="#000000" size={24} />
                                <Text style={tw.style('text-xl text-gray-700 ml-4')}>Ads</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw.style('flex flex-row inline-block mx-7 my-3 md:px-2 md:mx-6')}>
                            <TouchableOpacity onPress={() => {refRBSheet.current.close(); navigation.navigate('Dashsale'); }} style={tw.style(`flex-row items-center w-full`)}>
                                <PresentationChartLineIcon color="red" fill="#000000" size={24} />
                                <Text style={tw.style('text-xl text-gray-700 ml-4')}>Stats</Text>
                            </TouchableOpacity>
                        </View>

                        {/* If user has store or no store these links will show for both use cases */}
                        <View style={tw.style('h-5 w-full px-4')}>
                            <View style={tw.style('border-b-2 border-gray-300')}></View>
                        </View>
                        <View style={tw.style('flex flex-row inline-block mx-7 my-3 md:px-2 md:mx-6')}>
                            <TouchableOpacity onPress={() => {refRBSheet.current.close(); navigation.navigate('Overview'); }} style={tw.style(`flex-row items-center w-full`)}>
                                <UserIcon color="red" fill="#000000" size={24} />
                                <Text style={tw.style('text-xl text-gray-700 ml-4')}>My Profile</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw.style('flex flex-row inline-block mx-7 my-3 md:px-2 md:mx-6')}>
                            <TouchableOpacity onPress={() => {refRBSheet.current.close(); navigation.navigate('Dashchats'); }} style={tw.style(`flex-row items-center w-full`)}>
                                <ChatAltIcon color="red" fill="#000000" size={24} />
                                <Text style={tw.style('text-xl text-gray-700 ml-4')}>Message</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={tw.style('flex flex-row inline-block mx-7 my-3 md:px-2 md:mx-6')}>
                            <TouchableOpacity onPress={() => {refRBSheet.current.close(); navigation.navigate('Accountorderhist'); }} style={tw.style(`flex-row items-center w-full`)}>
                                <Image
                                    style={tw.style(`w-5 h-5`)}
                                    source={ImageIcons.stack}
                                />
                                <Text style={tw.style('text-xl text-gray-700 ml-4')}>Purchases</Text>
                            </TouchableOpacity>
                        </View>


                    </ScrollView>
                </RBSheet>

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


        {/* showShopLinks selection component */}
        <Showshoplinks/>


        <TouchableOpacity onPress={() => { setshowaccountpop(false); setshowpop(false); navigation.navigate("Account")}} >
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

        {/* Account links selection component */}
        <Showaccountlinks/>

        </View>

        </View>
        </View>

    )
}
export default Footer3
