import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {GifListItemProps} from 'utils/types';
import ImageComponent from './ImageComponent';

const {width: screenWidth} = Dimensions.get('window');
const IMAGE_WIDTH = screenWidth - 40;

const GiphItem: React.FC<GifListItemProps> = ({item}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.titleStyle}>{`${item.title}`}</Text>
      <ImageComponent
        source={{uri: item.images.original.url}}
        style={styles.imageStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    paddingVertical: 10,
  },
  titleStyle: {
    fontSize: 14,
    fontWeight: '800',
  },
  imageStyle: {
    marginTop: 10,
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
  },
});

export default GiphItem;
