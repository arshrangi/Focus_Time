import React, { useState } from 'react';
import { Text, View, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { Countdown } from '../../components/Countdown';
import { colors, fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();

  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 2000);
    } else {
      Vibration.vibrate(2000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd(focusSubject);
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdownContainer}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject.charAt(0).toUpperCase() + focusSubject.slice(1)}</Text>
        <View style={{ padding: spacing.lg }}>
          <ProgressBar
            progress={progress}
            color={colors.secondaryColor}
            style={{ height: spacing.md }}
          />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.buttonWrapper}>
        <RoundedButton
          style={{marginRight: 20}}
          title="Reset"
          size={70}
          onPress={() => changeTime(DEFAULT_TIME)} />
        <RoundedButton title="Back" size={70} onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  countdownContainer: {
    alignItems: 'center',
    borderRadius: '25px',
    backgroundColor: 'rgba(94, 132, 226, 0.3)'
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: spacing.lg,
    // borderColor: '#000',
    // borderWidth: '1px',
    paddingVertical: '10px'
  },
  task: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSizes.xxl,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: '#000',
    // borderWidth: '1px',
  },
});
