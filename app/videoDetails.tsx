import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';

const VideoPlayerScreen = () => {
  const { id, title, description, fileSize, uploadDate } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = process.env.EXPO_PUBLIC_VIDEO_URL;;
  const streamingUrl = `${API_BASE_URL}/stream/${id}`;


  return (
    <ScrollView style={styles.container}>
      <View style={styles.videoContainer}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}

        <Video
          source={{ uri: streamingUrl }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={ResizeMode.COVER}
          shouldPlay={true}
          isLooping={false}
          style={styles.video}
          onLoadStart={() => setIsLoading(true)}
          onLoad={() => setIsLoading(false)}
          useNativeControls
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
         {/* <Text style={styles.metadata}>  */}
         {/*   {formatFileSize(Number(fileSize))} • {formatDistanceToNow(} ago */}
         {/* </Text>  */}
        <Text style={styles.description}>{description}</Text> 
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
      flex: 1, 
      backgroundColor: '#420039',
      flexDirection: 'column'
  },
  videoContainer: { 
      width: '100%', 
      aspectRatio: 16 / 9, 
      backgroundColor: '#000' 
  },
  video: { 
      width: '100%', 
      height: 500 
  },
  loadingContainer: { 
      ...StyleSheet.absoluteFillObject, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  detailsContainer: { 
      padding: 16,
      marginTop: 10
  },
  title: { 
      fontSize: 20, 
      fontWeight: 'bold', 
      color: '#fff'
  },
  metadata: { 
      fontSize: 14, 
      color: '#fff', 
      marginBottom: 12 
  },
  description: { 
      fontSize: 16, 
      color: 'grey', 
      lineHeight: 24 
  },
});

export default VideoPlayerScreen;
