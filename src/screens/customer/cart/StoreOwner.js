import React, { useRef, useState ,useEffect} from 'react';
import { Text, View,Picker,TouchableOpacity,Image,TextInput,StatusBar, ImageBackground, ScrollView, Alert,   KeyboardAvoidingView, Platform,Keyboard} from 'react-native';
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
import { RadioButton ,Provider ,Modal, Portal, Button,} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { v4 as uuid } from "uuid";
import Footer3 from '../../../screens/common/Footer3';
import Fullwidthsortorder from '../../../components/pickers/Fullwidthsortorder';
import AwesomeAlert from '../../../components/modals/AlertModal';
import tw from 'twrnc';
import Largebutton from '../../../components/dropshipbutton/Largebutton';



const options = [
      {
        label: 'USA',
        value: 'USA'
      },
      {
        label: 'India',
        value: 'India'
      },
      {
        label: 'Ghana',
        value: 'Ghana'
      },
      {
        label: 'Canada',
        value: 'Canada'
      }
    ]

const StoreOwner = (props) => {

    const {
        navigation,
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;

    useEffect(() => {
        props.cartPrice(props?.loginuserid);
        props.getprofileuser(props?.loginuserid);
        props.getuseraddress(props?.loginuserid);
    }, [])

    //Reference
    const emailRef = useRef();
    const phoneRef = useRef();
    const bisinessnameRef = useRef();
    const fullnameRef = useRef();

    // Local states
     const [checked, setChecked] = React.useState('second');

    const [First, onChangeFirst] = React.useState(props?.getprofileuserlist?.userName);
    const [Lastname, onChangeLastname] = React.useState(props?.getprofileuserlist?.lastName);
    const [Email, onChangeEmail] = React.useState(props?.getprofileuserlist?.email);
    const [PhoneNumber, onChangePhoneNumber] = React.useState(props?.getprofileuserlist?.phone);
    const [Street, onChangeStreet] = React.useState(props?.getuseraddresslist[0]?.streetAdress);
    const [Zip, onChangeZip] = React.useState(props?.getuseraddresslist[0]?.zipCode);
    const [City, onChangeCity] = React.useState(props?.getuseraddresslist[0]?.city);
    const [Country, onChangeCountry] = React.useState("");
    const [selectedValue, setSelectedValue] = useState("USA");

    const [visible, setVisible] = React.useState(false);
    const [isSelected, setSelection] = useState(false);

    const [Paypal, onChangePaypal] = React.useState("Paypal");
    const [Debit, onChangeDebit] = React.useState("Debit Card");

    const [showotherAlert, setshowotherAlert] = React.useState(false);
    const [showalertmsg, setshowalertmsg] = React.useState('');

        const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const [wayToContact, setWayToContact] = useState("Phone");

    const openpopup = () => {
        setVisible(true)

    }
    const closepopup = () => {
          setVisible(false)
    }

    const updateorderStatus = (itemValue) => {
        setSelectedValue(itemValue)
    }

    const openpayment = () => {
        setChecked('first');
    }


    const containerStyle = {backgroundColor: 'white', padding: '7%',marginHorizontal:'5%',alignItems:'center'};

    // Vendor request submission
    const handleSendRequestSubmit = async () => {
        Keyboard.dismiss();
        if (First == "") {
            setshowotherAlert(true)
            setshowalertmsg('First Name is required')
        } else if (Lastname == "") {
            setshowotherAlert(true)
            setshowalertmsg('Last Name is required')
        } else if (Email == "") {
            setshowotherAlert(true)
            setshowalertmsg('Email is required')
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Email)) {
            setshowotherAlert(true)
            setshowalertmsg('Invalid Email')
        } else if (PhoneNumber == "") {
            setshowotherAlert(true)
            setshowalertmsg('Mobile Number is required')
        } else if (!/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(PhoneNumber)) {
            setshowotherAlert(true)
            setshowalertmsg('Invalid Number')
        } else if (Street == "") {
            setshowotherAlert(true)
            setshowalertmsg('Street Address is required')
        }  else if (Zip == "") {
            setshowotherAlert(true)
            setshowalertmsg('Zip Code is required')
        }  else if (City == "") {
            setshowotherAlert(true)
            setshowalertmsg('City Name is required')
        } else {
            let request = {
                "userId":props?.loginuserid,
                "orderNumber":props?.loginuserid+''+props?.totalcartprice,
                "orderStatus":"accepted",
                "orderAmount":props?.totalcartprice,
                "paymentMethod":"cash",
                "orderDate":new Date(),
                "firstName":First,
                "lastName":Lastname,
                "emailaddress":Email,
                "phoneNumber":PhoneNumber,
                "streetAdress":Street,
                "zipCode":Zip,
                "city":City,
                "country":selectedValue
            }
            {/*props.chekout(request, props.navigation, "vendor");
        openpopup() */}
        }

        



    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.registrationRoot}>
            <StatusBar backgroundColor={'#FFFFFF00'} barStyle="dark-content" translucent={true} />
            <ScrollView  keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={{backgroundColor:'#ffffff'}} >

            <AwesomeAlert showotherAlert={showotherAlert} showalertmsg={showalertmsg} onSelect={(checked) => setshowotherAlert(checked)} />
              <View style={tw`my-5 mx-5`}>
                <Text style={tw`text-3xl text-gray-700`}>Checkout</Text>
              </View>

             <View style={tw`mt-3 mx-[2%]`}>
                  <View style={tw`mx-[3%]`}>
                      <Text style={tw`text-lg text-gray-800`}>Personal Details</Text>
                  </View>
                    <View style={tw`mx-4`}>
                        <TextInput
                        style={tw`mt-3 px-5 border-1 border-gray-400 bg-zinc-100 text-gray-800 h-12 rounded-lg`}
                        onChangeText={onChangeFirst}
                        value={First}
                         autoCompleteType="off"
                         placeholder="First name"
                         placeholderTextColor="#b3b3b3"
                        />
                    </View>
                     <View style={tw`mx-4`}>
                        <TextInput
                        style={tw`mt-3 px-5 border-1 border-gray-400 bg-zinc-100 text-gray-800 h-12 rounded-lg`}
                        onChangeText={onChangeLastname}
                        value={Lastname}
                         autoCompleteType="off"
                         placeholder="Last name"
                         placeholderTextColor="#b3b3b3"
                        />
                    </View>
                     <View style={tw`mx-4`}>
                        <TextInput
                        style={tw`mt-3 px-5 border-1 border-gray-400 bg-zinc-100 text-gray-800 h-12 rounded-lg`}
                        onChangeText={onChangeEmail}
                        value={Email}
                         autoCompleteType="off"
                         placeholder="Email address"
                         placeholderTextColor="#b3b3b3"
                        />
                    </View>

                     <View style={tw`mx-4`}>
                        <TextInput
                        style={tw`mt-3 px-5 border-1 border-gray-400 bg-zinc-100 text-gray-800 h-12 rounded-lg`}
                        onChangeText={onChangePhoneNumber}
                        value={PhoneNumber}
                         placeholder="Phone number"
                         autoCompleteType="off"
                         keyboardType={'numeric'}
                         maxLength = {10}
                         placeholderTextColor="#b3b3b3"
                        />
                    </View>
                </View>
                 <View style={{marginHorizontal:'3%',marginTop:'5%'}}>
                  <View style={tw`mx-[3%]`}>
                      <Text style={tw`text-lg text-gray-800`}>Shipping Details</Text>
                  </View>
                     <View style={tw`mx-4`}>
                        <TextInput
                        style={tw`mt-3 px-5 border-1 border-gray-400 bg-zinc-100 text-gray-800 h-12 rounded-lg`}
                        onChangeText={onChangeStreet}
                        value={Street}
                         placeholder="Street address"
                         placeholderTextColor="#b3b3b3"
                        />
                    </View>
                     <View style={tw`mx-4`}>
                        <TextInput
                        style={tw`mt-3 px-5 border-1 border-gray-400 bg-zinc-100 text-gray-800 h-12 rounded-lg`}
                        onChangeText={onChangeZip}
                        value={Zip}
                         placeholder="Zip Code"
                         placeholderTextColor="#b3b3b3"
                        />
                    </View>
                     <View style={tw`mx-4`}>
                        <TextInput
                        style={tw`mt-3 px-5 border-1 border-gray-400 bg-zinc-100 text-gray-800 h-12 rounded-lg`}
                        onChangeText={onChangeCity}
                        value={City}
                        placeholder="City"
                        placeholderTextColor="#b3b3b3"
                        />
                    </View>

                       <View style={tw`mt-3 mx-4`}>
                          <Fullwidthsortorder text="Select Country" options={options} onSelect={(checked) => updateorderStatus(checked)}  />
                      </View>
                  <View>


    </View>
            <View style={{marginTop:'2%',flexDirection: 'row',marginLeft:'3%'}}>
            <CheckBox
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        tintColors={'#9E663C'}
                        onCheckColor={'#6F763F'}
                        onFillColor={'#4DABEC'}
                        onTintColor={'#F4DCF8'}
                     />

            <Text style={styles.checkboxtext}>Use this address always </Text>
            </View>
                <View style={{marginTop:'5%',}}>
                 <View style={tw`mx-[3%]`}>
                  <Text style={tw`text-lg text-gray-800`}>Payment method</Text>
                 </View>
                 <View style={{marginTop:'2%',flexDirection: 'row',marginLeft:'3%'}}>
                    <View style={styles.checkboxView}>
                        <TouchableOpacity onPress={() => openpayment()}>
                            <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
                               <Text style={{marginLeft:'2%',alignSelf:'center'}}>Credit Card</Text>
                                { checked=='first' ?
                                    <Image source={ImageIcons.ci_radio_filled} />
                                :
                                    <Image source={ImageIcons.ci_radio} />
                                }
                            </View>
                         </TouchableOpacity>
                    </View>

                    {/*<View style={styles.checkboxView}>
                       <Text style={{marginLeft:'2%',alignSelf:'center'}}>Affirm</Text>
                        <TouchableOpacity onPress={() => setChecked('second')}>
                        { checked=='second' ?
                            <Image source={ImageIcons.ci_radio_filled} />
                        :
                            <Image source={ImageIcons.ci_radio} />
                        }
                        </TouchableOpacity>
                    </View>*/}
                    </View>
                </View>
                <View style={{alignItems:'center',marginTop:'12%',marginBottom:'22%'}}>

                      <Largebutton text={" Pay $" + props?.totalcartprice} onPress={() => { handleSendRequestSubmit() }} />

               </View>
                </View>
                { openpopup  &&
                    <Provider>
                        <Portal>
                            <Modal visible={visible} onDismiss={closepopup} contentContainerStyle={containerStyle}>
                                <Image source={ImageIcons.sucess} style={styles.sucessimage} />
                                <Text style={styles.Modaltext}>Purchase successful</Text>
                                <Text style={styles.modalsuceestext}>You have successfully the goods in your chart. We will update you as the goods gets dispatched</Text>
                                <TouchableOpacity style={styles.modalbutton} onPress={() => props.navigation.navigate("watchlist")}>
                                    <Text style={styles.modaltouchablitytext}>Continue Shopping</Text>
                                </TouchableOpacity>
                            </Modal>
                        </Portal>
                    </Provider>
                }
                    </ScrollView>
    <Footer3 />
        </KeyboardAvoidingView>
    )
}


export default StoreOwner
