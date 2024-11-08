# 📷 ESP32 Image Analysis Server

Welcome to the ESP32 Image Analysis Server! This project is designed to work with an ESP32 device that captures images and sends them to this server for analysis. The results are then displayed on an LCD screen connected to the ESP32. This repository is private and intended for collaboration among classmates and viewing by teachers.

## 🚀 Features

- **Image Upload**: The ESP32 device uploads images to the server for analysis.
- **AI-Powered Analysis**: Utilizes OpenAI's GPT-4o model to categorize waste objects in images.
- **JSON Response**: Returns a structured JSON response indicating the waste category.
- **Local Storage**: Images are temporarily stored in the `uploads` directory for processing.

## 📂 Project Structure

- **server.js**: Main server file handling image uploads and AI analysis.
- **uploads/**: Directory for storing uploaded images. The directory is tracked by git, but its contents are ignored.
- **.env**: Environment variables, including the OpenAI API key.
- **.gitignore**: Specifies files and directories to be ignored by git.

## 🛠️ Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/youpv/server-waste-sorter.git
   cd server-waste-sorter
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add your OpenAI API key:
     ```
     OPENAI_API_KEY=your-api-key-here
     ```

4. **Run the Server**:
   ```bash
   node server.js
   ```

5. **Access the Server**:
   - The server runs on `http://localhost:3000`.

## 📡 API Endpoints

- **GET /api/connect**: Test endpoint to check server connectivity.
- **POST /api/upload**: Endpoint for uploading images. Accepts a single image file with the key `image`.

## 🤝 Contributing

- **Classmates**: Feel free to fork the repository and submit pull requests for improvements or bug fixes.
- **Teachers**: You can view the project and provide feedback.

## 📜 License

This project is for educational purposes and is not intended for commercial use.

## 📧 Contact

For any questions or issues, please contact Youp Verkooijen at [github.com/youpv](https://github.com/youpv).

---

Thank you for being a part of this project! 🎉
