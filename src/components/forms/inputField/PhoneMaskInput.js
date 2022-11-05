import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts } from '../../../common'
import PhoneInput from "react-native-phone-number-input";
//import TextInputMask from 'react-native-text-input-mask';
import styles from './styles';



const PhoneMaskInput = ({ id, theme, onCountryChange, onChangePhone, defaultValue, reference, ...others }) => {
    return (
        <View style={{
            paddingHorizontal: 15,
            marginTop: 10,
        }}>
            <Text style={[styles.phoneTitle, { color: theme === "black" ? Colors.WHITE : Colors.BLACK }]}>{"Phone Number"}</Text>
            <View style={[styles.formattedView, { backgroundColor: theme === "black" ? Colors.LIGHT_BLACK : Colors.WHITE, borderWidth: theme === "black" ? 0 : 1 }]}>
                <PhoneInput
                    key={id}
                    // disableArrowIcon={true}
                    // onChangeCountry={(countryCode) => onCountryChange(countryCode)}
                    onChangeFormattedText={(countryCode) => onCountryChange(countryCode)}
                    containerStyle={[styles.phoneContainer, { backgroundColor: theme === "black" ? Colors.LIGHT_BLACK : Colors.WHITE }]}
                    codeTextStyle={{
                        color: theme === "black" ? Colors.WHITE : Colors.LIGHT_BLACK,
                        width: '100%',
                        paddingLeft: '20%'
                    }}
                    {...others}
                // autoFocus
                />
               
            </View>
        </View>
    )
}

export default PhoneMaskInput;