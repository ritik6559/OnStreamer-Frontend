# Online Video Streaming Application

An online video streaming application built using **React Native**, **AWS S3**, **MySQL**, and **Spring Boot**.

## Features
- Upload videos to AWS S3
- Stream videos directly from AWS S3
- Secure API with Spring Boot and MySQL

## Tech Stack
- **Frontend**: React Native
- **Backend**: Spring Boot
- **Database**: MySQL
- **Storage**: AWS S3

## Installation
### Frontend (React Native)
1. Navigate to the frontend folder:
   ```sh
   cd OnStreamer-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   npx expo start
   ```

## Screenshots
![Home Screen](screenshots/home.png)
![Video Player](screenshots/player.png)
![Upload Screen](screenshots/upload.png)


## API Endpoints
| Method | Endpoint           | Description                              |
|--------|--------------------|------------------------------------------|
| POST   | `/api/v1/videos/upload`        | Upload a new video           |
| GET    | `/api/v1/listvideos`           | Get all videos               |
| GET    | `/api/v1/videos/stream/{id}`   | Stream a specific video      |

## Contributing
Feel free to contribute by creating a pull request or submitting an issue.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For any inquiries, reach out to:
- **Your Name**
- **Your Email**
- **GitHub**: [ritik6559](https://github.com/ritik6559)
