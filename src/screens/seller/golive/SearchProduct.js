import React, { useRef, useState,useEffect } from 'react';
import { Text, View,TouchableOpacity,FlatList,
    Image,TextInput, ImageBackground,
     ScrollView, Alert,
      KeyboardAvoidingView,
      Platform,Keyboard} from 'react-native';
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
import { Rating, AirbnbRating } from 'react-native-ratings';
import Footer3 from '../../../screens/common/Footer3';
import AsyncStorage from '@react-native-community/async-storage';
import tw from 'twrnc';
import Smallbutton from '../../../components/dropshipbutton/Smallbutton';

const SearchProduct = (props) => {

    const {
        navigation,
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;

     useEffect(() => {
        props.getAllproduct(props?.loginuserid);
        getalreadyadded();
    }, [])


    const getalreadyadded = async () => {
        for (var i = 0; i < props?.livedetail[0].products?.length; i++) {
            alreadycheckedId.push(props?.livedetail[0].products[i]._id);
            setalreadycheckedId(alreadycheckedId)
        }
        setTimeout(function(){ showatochecked();},1000);
    }

    const showatochecked = async () => {
        for (var i = 0; i < props?.getlistproduct?.length; i++) {
            if(alreadycheckedId.indexOf(props.getlistproduct[i]._id) > -1) {
                checkedId.push(props.getlistproduct[i]._id);
                setcheckedId(checkedId)
            }
        }
        if(props?.getlistproduct?.length>checkedId.length){
            setshowall(false)
        }else {
            setshowall(true)
        }
    }

    const onlyUnique = async (value, index, self) => {
      return self.indexOf(value) === index;
    }

   
    // Local states
    const [checked, setChecked] = React.useState('first');
    const [UserID, setUserID] = useState("");
    //Reference
    const eventId = props?.route?.params?.eventId;
    const pageName = props?.route?.params?.pageName;
    // Local states
    const [showall, setshowall] = React.useState(false);
    const [checkedId, setcheckedId] = React.useState([]);
    const [alreadycheckedId, setalreadycheckedId] = React.useState([]);

    
    const saveproducttoevent = async () => {
        //for (var i = 0; i < checkedId?.length; i++) {
            var unique = checkedId.filter(onlyUnique);
            //props.addproducttoevent(eventId, unique,props?.loginuserid);
        //}
        setTimeout(function(){ props.navigation.navigate(pageName,{selectedProduct:unique}); },1000);
    }

    const selectAll = async () => {
        if(showall==false){
            setshowall(true)
            for (var i = 0; i < props?.getlistproduct?.length; i++) {
                checkedId.push(props.getlistproduct[i]._id);
                setcheckedId(checkedId)
            }
           // console.log('newcheckedId',checkedId)
        }else {
            setshowall(false)
            setcheckedId([])
            
        }
    }

    const callAction = async (value) => {
        props.selectAllproduct(props?.getlistproduct);
        for (var i = 0; i < props?.getlistproduct?.length; i++) {
            if(props.getlistproduct[i]._id==value){
                if(checkedId.indexOf(value) > -1) {
                  var index = checkedId.indexOf(value);
                  checkedId.splice(index, 1);
                  setcheckedId(checkedId)
                } else {
                    checkedId.push(value);
                    setcheckedId(checkedId)
                }
            }
        }
        if(props?.getlistproduct?.length>checkedId.length){
            setshowall(false)
        }else {
            setshowall(true)
        }
    }

    const renderItem = ({ item }) => {
        console.log('renderItem',checkedId)
        console.log('item._id',item._id)
      return(
        <View style={tw.style(`mr-2 w-1/3 overflow-hidden`)}>
            {/* <TouchableOpacity onPress={() =>callAction(item._id)}>
                <View>
                    <View style={styles.tickmarkview}>
                       {( checkedId.indexOf(item._id) > -1) &&
                        <Image source={ImageIcons.tickmark}  style={styles.tickmarkicon} />
                       }
                    </View>
                    <Image source={{uri: item.productImage}} style={styles.jeansimgshop} />
                    <View>
                       <Text style={styles.boldnewproduct}>{item.productName}</Text>
                       <Text style={styles.salesnewtext}>${item.productPrice}</Text>
                    </View>
                </View>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() =>callAction(item._id)}>
            <View>
                    <View style={tw.style(`w-5 h-5 top-3 left-3 border-2 border-white absolute z-1001`)}>
                       {( checkedId.indexOf(item._id) > -1) &&
                        <Image source={ImageIcons.tickmark}  style={styles.tickmarkicon} />
                       }
                    </View>
                    <Image source={{uri: item.productImage}} style={tw.style(`h-35 max-h-50 w-full rounded-lg object-center`)} />
                    <View>
                        <Text style={tw.style(`mt-1 text-base text-gray-700`)}>{item.productName}</Text>
                        <Text style={tw.style(`text-xl text-gray-700 font-bold`)}>${item.productPrice}</Text>
                    </View>
            </View>
            </TouchableOpacity>
        </View>

      );
    }





    return (
         <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.registrationRoot}>
            <ScrollView  keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={{backgroundColor:'#ffffff',marginBottom:0}} >

             <View style={tw.style('flex flex-1 mx-1 pt-[2%')}>
                <View style={styles.bagimageView}>
                    <View style={{alignItems:'center'}}>
                       <Text style={tw.style(`text-2xl text-grey-700`)}>Products</Text>
                    </View>
                    <Smallbutton
                          text="Save"
                          onPress={() => saveproducttoevent()} />
                    </View>
                <View>

                    
                    <View style={tw.style('flex mt-5')}>
                        <View style={tw.style(`flex-row justify-between items-center`)}>
                            <Text style={tw.style(`text-xl text-grey-700 mx-3`)}>Suggested Products</Text>
                            <TouchableOpacity onPress={() =>selectAll()}>
                                <View style={{flexDirection:'row',alignItems:'center',marginTop:'1%'}}>
                                        <View style={{width:15,height:15,borderWidth:2,borderColor:'#585858'}}>
                                            { showall==true &&
                                                <Image source={ImageIcons.tickmark}  style={styles.tickmarkicon} />
                                            }

                                        </View>
                                    <Text style={tw.style(`text-lg text-gray-700 mx-3`)}>Select all</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                       
                       <View style={tw`mt-3 mb-5 mx-3`}>
                            <FlatList
                                data={props?.getlistproduct || []}
                                renderItem={renderItem}
                                keyExtractor={item => item._id}
                                showsHorizontalScrollIndicator={false}
                                numColumns={3}
                                extraData={checkedId}
                            />
                        </View>
                   </View>

               </View>

            </View>
            </ScrollView>
            <Footer3 onSelelection="3" />
        </KeyboardAvoidingView>
    )
}

export default SearchProduct