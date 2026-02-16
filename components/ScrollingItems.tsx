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
const _cellGap = 6;
const _listPadding = 10;
const _cellWidth = ((Dimensions.get('screen').width - (6 * _listPadding))) / 3;
const _listHeight = 6 * _cellWidth + 5 * _cellGap + 2 * _listPadding;



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
    <View style={styles.emoji}>
      <Text style={styles.emojiText}>{value}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff33aa',
    width: '100%',
  },
  emojiList: {
    gap: 6,
    padding: 10,
  },
  emoji: {
    width: '100%',
    backgroundColor: 'orange',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  emojiText: {
    fontSize: 48
  },
});

export default ScrollingItems
//38.2 butter 37*12 444 
