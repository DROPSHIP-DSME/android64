import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import tw from 'twrnc';

const Smallbutton = ({text, onPress}) => {

    return (

      <View
        style={tw.style('w-auto items-center px-6 py-2.5 border border-transparent rounded-full shadow-sm text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500')}
      >
      <TouchableOpacity
          onPress={onPress}>
          <Text style={tw.style('text-sm text-white')}>{text}</Text>
        </TouchableOpacity>
      </View>

    );
}

export default Smallbutton
