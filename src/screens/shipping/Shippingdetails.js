import React, { useRef, useState, useEffect } from 'react';
import { Text, View, Image, FlatList, Dimensions, StatusBar, Picker, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import styles from '../../screens/common/styles';
import Loader from '../../components/modals/Loader';
import Footer3 from '../../screens/common/Footer3';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import tw from 'twrnc';

import Help from '../../components/help/Help';

const Shippingdetails = (props) => {
    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;

    const {
        navigation,
        values,
        errors,
        handleChange,
        handleSubmit,
    } = props;

    //Vertical Steps setup
    const data = [
        { title: 'Processing', letter: 'A', isCurrent: true, subtitle: "Your order is being processed by the brand and will be updated shortly." },
        { title: 'Shipped', letter: 'B', isCurrent: true, subtitle: "Your order has been shipped, and will arrive at its destination in the estimated time."  },
        { title: 'Delivered', letter: 'C', isCurrent: false, subtitle: "Your order has arrived and is ready to be picked up!"  },
        { title: 'Complete', letter: 'D', isCurrent: false, subtitle: "Your order is complete! Thank you for shopping with Dropship."  },
      ];
    
      const MapProgress = (props) => {
        if (!props.data || props.data.lenght === 0) return null;
      
        const firstItem = props.data.shift();
        return (
          <View style={tw.style('flex-1 h-full ml-5 mr-8')}>
            <View style={tw.style('w-1 bg-gray-200 h-[95%] absolute ml-5 mt-10')}></View>
            <View style={tw.style('justify-between')}>
              <View style={tw.style('flex-row items-center mb-4')}>
                <View style={tw.style('bg-red-800 h-5 w-5 ml-3 rounded-full')}></View>
                <View style={tw.style(`ml-4 my-4 mr-6`)}>
                  <Text style={tw.style('text-xl text-gray-800')}>{firstItem.title}</Text>
                  <Text style={tw.style('text-base text-gray-600')}>{firstItem.subtitle}</Text>
                </View>
              </View>
      
              {props.data.map((item) => (
                <View>
                  {item.isCurrent == true ? 
                    <View style={tw.style('flex-row w-full h-20 items-center mb-7')}>
                      <View style={tw.style('bg-red-800 h-5 w-5 ml-3 items-center rounded-full')}></View>
                      <View style={tw.style('ml-4 mr-8')}>
                        <Text style={ tw.style('text-2xl font-bold text-green-800') }>
                          {item.title}
                        </Text>
                        <Text style={tw.style('text-base text-gray-600')}>{item.subtitle}</Text>
                      </View>
                    </View>
                  :
                    <View style={tw.style('flex-row w-full h-20 items-center mb-7')}>
                      <View style={tw.style('bg-gray-300 h-5 w-5 ml-3 items-center rounded-full')}></View>
                      <View style={tw.style('ml-4 mr-8')}>
                        <Text style={tw.style('text-2xl text-gray-300')}>
                          {item.title}
                        </Text>
                        <Text style={tw.style('text-base text-gray-300')}>{item.subtitle}</Text>
                      </View>
                    </View>
                  }
                </View>

              ))}
            </View>
          </View>
        );
      };
    
    // Vertical Steps setup

    // Local states
    const [showclassName, setshowclassName] = useState("#B80000");
    const handleScroll = (pageYOffset) => {
        if (pageYOffset > 0) {
            setshowclassName('#B80000');
        } else {
            setshowclassName('#B80000');
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.registrationRoot}>

            <ScrollView onScroll={({ nativeEvent }) => {
                handleScroll(nativeEvent['contentOffset'].y);
            }} keyboardShouldPersistTaps="handled" persistentScrollbar={true} style={tw.style('bg-gray-100')} >
            
            <View style={tw.style('flex flex-row')}>
                    <View style={tw.style('mx-4 mt-[5%] mb-6')}>
                        <Text style={tw.style('text-2xl text-gray-700 font-bold')}>Shipping Details</Text>
                    </View>
            </View>

            <View style={tw.style('flex')}>
              <MapProgress data={data} />
            </View>

                
            </ScrollView>
            <Help onPress={(text1) => helpbuttonsubmit(text1)} />


            <Footer3 onSelection="5" />
        </KeyboardAvoidingView>

    )
}


export default Shippingdetails