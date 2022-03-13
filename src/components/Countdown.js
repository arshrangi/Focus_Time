import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { colors, fontSizes, spacing } from '../utils/sizes';

const minutesToMillis = (min) => min * 1000 * 60;

const formatTime = (time) => time < 10 ? `0${time}` : time;

export const Countdown = ({
  minutes,
  isPaused,
  onProgress,
  onEnd
}) => {

  const interval = React.useRef(null);
  const [millis, setMillis] = useState(null);

  const countDown = () => {
    setMillis((time) => {
      if(time === 0) {
        // do more stuff here
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      // report the progress
      onProgress(timeLeft / minutesToMillis(minutes));
      return timeLeft;
    })
  }

  useEffect(() => {
    setMillis(minutesToMillis(minutes))
  }, [minutes])

  useEffect(() => {
    if (isPaused){
      if(interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
  
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>{formatTime(minute)} : {formatTime(seconds)}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    borderRadius: '25px',
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg
  }
})

