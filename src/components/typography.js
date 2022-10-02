import React from 'react'
import { Text, Platform, StyleSheet } from 'react-native';
import tw from 'twrnc';

export const typography = () => {
  const oldTextRender = Text.render
  Text.render = function(...args) {
    const origin = oldTextRender.call(this, ...args)
    return React.cloneElement(origin, {
      style: [styles.titleText, styles.baseText, origin.props.style],
    })
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'hintedavertastdregular',
  },
  titleText: {
    fontFamily: 'hintedavertastdsemibold'
  }
});
