import { Colors } from '@/constants/theme';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import Animated, { scrollTo, SharedValue, useAnimatedReaction, useAnimatedRef } from 'react-native-reanimated'

interface ScrollingItemsProps {
  direction: boolean,
  row: number,
  emojis: string[],
  height: number,
  scrolls: SharedValue<number>
}
const _cellGap = 5;
const _listPadding = 6;
const _cellWidth = ((Dimensions.get('screen').width - (6 * _listPadding))) / 3;
const _listHeight = 6 * _cellWidth + 5 * _cellGap + 2 * _listPadding;
const getRandomColor = (): string => {
  let i = 0, color = "#"
  while (i < 3) {

    color += Math.floor(Math.random() * 16).toString(16)
    i++;
  }
  return color
}



const ScrollingItems = ({ row, direction, emojis, height, scrolls }: ScrollingItemsProps) => {
  const maxScroll = _listHeight - height;
  const scrollRef = useAnimatedRef<Animated.FlatList>();
  useAnimatedReaction(
    () => scrolls.value,
    (v) => {
      scrollTo(scrollRef, 0, (direction ? 1 - v : v) * maxScroll, false)
    })

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={scrollRef}
        data={emojis}
        renderItem={({ item }) => <Emoji value={item} />}
        contentContainerStyle={styles.emojiList}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  )
}

const Emoji = ({ value }: { value: string }) => {
  return (
    <View style={[styles.emoji,
    { backgroundColor: getRandomColor() }]}>
      <Text style={styles.emojiText}>{value}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.light
  },
  emojiList: {
    gap: _cellGap,
    padding: _listPadding,
  },
  emoji: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  emojiText: {
    fontSize: 48
  },
});

export default ScrollingItems
//38.2 butter 37*12 444 
