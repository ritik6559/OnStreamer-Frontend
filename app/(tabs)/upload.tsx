import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { ResizeMode, Video } from 'expo-av';
import { uploadFile } from '@/app/api/videoApi'
import icons from '@/constants/icons';


const VideoUploadScreen = () => {


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState<ImagePicker.ImagePickerResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        setError('Sorry, we need camera roll permissions to select videos!');
        return false;
      }
      return true;
    }
    return true;
  };

  const pickVideo = async () => {
    try {
      const hasPermission = await requestPermission();
      if (!hasPermission){ 
          return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
        videoMaxDuration: 300, 
      });

      if (!result.canceled) {
        setVideo(result);
        setError(null);
      }
    } catch (err) {
      setError('Error selecting video. Please try again.');
    }
  };


  const handleUpload = async () => {
    if (!video || video.canceled) {
      setError('Please select a video to upload');
      return;
    }

    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await uploadFile({
          video,
          title,
          description
      });


      console.log(response);

      Alert.alert('Success', 'Video uploaded succcessfuly');


      setTitle('');
      setDescription('');
      setVideo(null);
    } catch (err) {
      setError('Error uploading video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Video</Text>

      <TouchableOpacity
        style={styles.uploadVideoContainer}
        onPress={pickVideo}
        disabled={loading}
      >
        <View>
            <Image source={icons.upload_icon} /> 
            <Text style={{ color: 'grey', fontWeight: 'bold', alignSelf: 'center'}} >
                Select file
            </Text>
        </View>
      </TouchableOpacity>

      {video && !video.canceled && video.assets && video.assets[0] && (
        <View style={styles.previewContainer}>
          <Video
            source={{ uri: video!.assets[0].uri }}
            style={styles.videoPreview}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
          <Text style={styles.fileName}>
            Duration: {Math.round(video.assets[0].duration || 0)} seconds
          </Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Enter video title"
        placeholderTextColor="grey"
        value={title}
        onChangeText={setTitle}
        maxLength={100}
        editable={!loading}
      />

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Enter video description"
        placeholderTextColor="grey"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        maxLength={500}
        editable={!loading}
      />

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <TouchableOpacity
        style={[
          styles.submitButton,
          loading && styles.disabledButton,
        ]}
        onPress={handleUpload}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Upload Video</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#420039',
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  uploadVideoContainer: {
    padding: 15,
    borderRadius: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    height: 200,
    borderWidth: 1,
    borderColor: '#FFFFFF'
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#333',
  },
  previewContainer: {
    marginBottom: 15,
  },
  videoPreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  fileName: {
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#FFFFFF',
    
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
    color: '#FFFFFF'
  },
  submitButton: {
    backgroundColor: '#12355B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto'
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
});

export default VideoUploadScreen;
