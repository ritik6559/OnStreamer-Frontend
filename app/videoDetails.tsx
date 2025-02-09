import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { useRoute, RouteProp } from '@react-navigation/native';
import { formatDistanceToNow } from 'date-fns';

interface VideoDto {
  id: number;
  title: string;
  description: string;
  url: string;
  fileSize: number;
  uploadDate: string;
}

type RouteParams = {
  video: VideoDto;
}

const VideoPlayerScreen = (video: VideoDto) => {
  const [status, setStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Your API base URL - replace with your actual backend URL
  const API_BASE_URL = 'http://your-backend-url';
  const streamingUrl = `${API_BASE_URL}/stream/${video.id}`;

  const formatFileSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
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
          source={{
            uri: streamingUrl,
            headers: {
              // Add any required headers here
              'Content-Type': 'application/octet-stream',
            },
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={ ResizeMode.CONTAIN }
          shouldPlay={false}
          isLooping={false}
          style={styles.video}
          onPlaybackStatusUpdate={status => setStatus(() => status)}
          onLoadStart={() => setIsLoading(true)}
          onLoad={() => setIsLoading(false)}
          useNativeControls
          progressUpdateIntervalMillis={500}
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{video.title}</Text>
        <View style={styles.metadataContainer}>
          <Text style={styles.metadata}>
            {formatFileSize(video.fileSize)} • {formatDistanceToNow(new Date(video.uploadDate))} ago
          </Text>
        </View>
        <Text style={styles.description}>{video.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16/9,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  metadataContainer: {
    marginBottom: 12,
  },
  metadata: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default VideoPlayerScreen;
