import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { getAllVideos } from '../api/videoApi';
import { router } from 'expo-router';

interface VideoDto {
  id: number;
  title: string;
  description: string;
  url: string;
  fileSize: number;
  uploadDate: string;
}

const VideoListScreen = () => {
  const [videos, setVideos] = useState<VideoDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getAllVideos();
      setVideos(result); // Ensure API response has expected structure
    } catch (err: any) {
      setError(err.message || 'Error fetching videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const RenderVideoItem = ({ item }: { item: VideoDto }) => {
    const handlePress = () => {
      router.push({
        pathname: '/videoDetails',
        params: {
          id: item.id,
          title: item.title,
          description: item.description,
          url: item.url,
          fileSize: item.fileSize,
          uploadDate: item.uploadDate,
        },
      });
    };

    return (
      <TouchableOpacity
        style={styles.videoCard}
        onPress={handlePress}
      >
        <View style={styles.videoPreview}>
          {selectedVideo === item.id ? (
            <Video
              source={{ uri: `http://192.168.32.99:8080/api/v1/videos/stream/${item.id}` }}
              style={styles.video}
              useNativeControls
              resizeMode={ResizeMode.COVER}
              isLooping
            />
          ) : (
            <View style={styles.thumbnailContainer}>
              <Text style={styles.playIcon}>▶️</Text>
            </View>
          )}
        </View>

        <View style={styles.videoInfo}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchVideos}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>OnStreamer</Text>
      <FlatList
        data={videos}
        renderItem={({ item }) => <RenderVideoItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshing={loading}
        onRefresh={fetchVideos}
        ListEmptyComponent={<Text style={styles.emptyText}>No videos found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#420039',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 10,
    color: '#fff',
  },
  listContainer: {
    padding: 10,
  },
  videoCard: {
    backgroundColor: '#12355B',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  videoPreview: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  thumbnailContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  playIcon: {
    fontSize: 40,
  },
  videoInfo: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  errorText: {
    color: 'grey',
    marginBottom: 15,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    padding: 20,
  },
});

export default VideoListScreen;
