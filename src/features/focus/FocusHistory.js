import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing, colors } from '../../utils/sizes';

export const FocusHistory = ({ history }) => {

  if (!history || !history.length) return null;

  const renderItem = ({item}) => <Text style={styles.item}>{item}</Text>;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>History</Text>
      <FlatList
        style={styles.wrapper}
        data={history}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  item: {
    fontSize: fontSizes.lg,
    paddingTop: 10,
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  wrapper: {
    width: '100%',
    flex: 0.5,
    alignContent: 'center',
  }
});