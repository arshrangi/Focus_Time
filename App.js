import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { colors } from './src/utils/sizes';

export default function App() {
  const [focusSubject, setFocusSubject] = useState('');
  const [history, setHistory] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={(subject) => {setHistory([...history, subject])}}
          clearSubject={() => {setFocusSubject(null)}}
        />
      ) : (
        <View style={styles.wrapper}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory history={history}/>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.primaryColor,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: '#000',
    // borderWidth: '1px',
  }
});
