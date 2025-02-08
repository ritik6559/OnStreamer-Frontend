import { ImagePickerResult } from "expo-image-picker";

const BASE_URL = process.env.EXPO_PUBLIC_VIDEO_URL;

interface VideoUploadScreenProps {
    video: ImagePickerResult;
    title: string;
    description: string;
}

export const uploadFile = async ({ video, title, description } : VideoUploadScreenProps) => {
    const API_URL = `${BASE_URL}/upload`;
    const formData = new FormData();
    
    if(!video.assets?.[0]?.uri){
        throw new Error('Invalid video file');
    }

    const uri = video.assets[0].uri;
    const fileType = uri.substring(uri.lastIndexOf(".") + 1 );

    formData.append('file', {
        uri: uri,
        type: `video/${fileType}`,
        name: `video.${fileType}`,
    } as any );

    formData.append("title", title);
    formData.append("description", description);

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    });

    const result = await response.json();

    if(!response.ok){
        console.error(result.message);
        throw new Error(result.message || 'Upload failed');
    }

    return response;
}
