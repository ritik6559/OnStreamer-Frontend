import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';
import { formatDistanceToNow } from 'date-fns';

interface VideoDto {
  id: number;
  title: string;
  description: string;
  url: string;
  fileSize: number;
  uploadDate: string;
}

const VideoPlayerScreen = () => {
  const { id, title, description, fileSize, uploadDate } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = 'http://192.168.32.99:8080/api/v1/videos';
  const streamingUrl = `${API_BASE_URL}/stream/${id}`;

  const formatFileSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  };

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
          resizeMode={ResizeMode.CONTAIN}
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
        {/* <Text style={styles.metadata}> */}
        {/*   {formatFileSize(Number(fileSize))} • {formatDistanceToNow(new Date(uploadDate))} ago */}
        {/* </Text> */}
        {/* <Text style={styles.description}>{description}</Text> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  videoContainer: { width: '100%', aspectRatio: 16 / 9, backgroundColor: '#000' },
  video: { width: '100%', height: '100%' },
  loadingContainer: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  detailsContainer: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  metadata: { fontSize: 14, color: '#666', marginBottom: 12 },
  description: { fontSize: 16, color: '#333', lineHeight: 24 },
});

export default VideoPlayerScreen;
