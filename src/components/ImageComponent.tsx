import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ImageComponentProps} from 'utils/types';

const ImageComponent: React.FC<ImageComponentProps> = props => {
  const {source = null, size, style, imageStyle} = props;

  const [loading, setLoading] = useState(false);
  const [imageSource, setImageSource] = useState(source);

  useEffect(() => {
    setImageSource(source);
  }, [source]);

  return (
    <>
      <View {...props} style={[styles.container, style]}>
        <FastImage
          style={[styles.fastImageStyle, imageStyle]}
          source={imageSource ?? undefined}
          onError={() => {
            setImageSource(null);
          }}
          onLoadStart={() => {
            setLoading(true);
          }}
          onLoadEnd={() => {
            setLoading(false);
          }}
        />
        <View style={[StyleSheet.absoluteFill, styles.activityIndicatorStyle]}>
          <ActivityIndicator animating={loading} size={size ? size : 'large'} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  fastImageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  activityIndicatorStyle: {
    alignItem: 'center',
    justifyContent: 'center',
  },
});

export default ImageComponent;
