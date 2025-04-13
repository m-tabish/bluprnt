Here's your updated project description with all the requested additions, formatting improvements, and relevant tags for your AMU Hacks 4.0 submission:

---

# 🚀 Bluprnt  
### **🏆Built for AMU Hacks 4.0 by Team Heckers**  
### **🤝Team Members: Mohd Tabish Khan, Abhay Singh, Pratham Mohan and Aayushmaan Saxena**
# Visit  [🔹BluPrnt🔹](https://www.bluprnt.tech/)
### Backend hosted on Render:  [https://heckers-amuhacks4-0.onrender.com](https://heckers-amuhacks4-0.onrender.com)



## Project Overview  

**Bluprnt** is a web application designed for **AMU Hacks 4.0** that leverages the power of the [Gemini API](https://gemini.com) to generate structured JSON responses. These responses are then dynamically rendered as interactive flowcharts on the frontend using [React Flow](https://reactflow.dev/). The goal is to help users visualize processes, learning roadmaps, and system workflows with ease.  

---

## Installation 🛠️  

### Prerequisites  

Ensure the following are installed before proceeding:  
- **Node.js**: [Download here](https://nodejs.org/)  
- **npm**: Comes bundled with Node.js  

### Steps to Install  

1. **Clone the Repository**  
   ```bash
   git clone git@github.com:m-tabish/Heckers_AMUHACKS4.0.git
   ```

2. **Navigate to Project Directory**  
   ```bash
   cd <projectDirectory>
   ```

3. **Install Backend Dependencies**  
   ```bash
   cd backend
   npm install
   ```

4. **Install Frontend Dependencies**  
   ```bash
   cd ../client
   npm install
   ```

---

## Environment Setup 🌐  

Create a `.env` file in the `backend` directory and set the following variables:

```env
CONNECTION_URL=your_mongodb_connection_string_here
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## Running the Application  

1. **Start Backend Server**  
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend Application**  
   ```bash
   cd ../client
   npm run dev
   ```

3. **Access the App**  
   - Frontend: [http://localhost:5173](http://localhost:5173)  
   - Backend: [http://localhost:3000](http://localhost:3000)  

---

## Technical Stack  

### Backend  
- **Framework**: [Express.js](https://expressjs.com/)  
- **API**: Integration with Gemini API for generating JSON-based flowchart content  

### Frontend  
- **Framework**: [React.js](https://reactjs.org/)  
- **Flowchart Tool**: [React Flow](https://reactflow.dev/)  
- **State Management**: React's built-in state management  

---

## Features 🌟  

- ⚙️ **Dynamic Flowchart Generation** from AI-generated JSON  
- 🧠 **AI-Powered Suggestions** for nodes and steps  
- 🧩 **User Interaction** for modifying flowcharts  
- 🛠️ **Frontend-Backend Integration** using Gemini API  

---

## Issues Encountered ⚠️  

- **Inconsistent API Responses** from the deployed Railway server (success rate ~60%)  
- **Concurrency Limitations** potentially due to free-tier deployment  

---

## Future Considerations 🔮  

- 🤝 **Real-time Collaboration** on roadmaps  
- ✏️ **Editable AI Output** for customization  
- 🧱 **Manual Roadmap Creation** option for full user control  

---

## Contributing 🤝  

Have an idea or feature in mind?  
Feel free to fork the repo and submit a PR. Contributions are highly appreciated!  

---

## Contact 📧  

For questions, reach out at [mohdtabishkhan001@gmail.com](#)

---

### 🔖 Hashtags  
#Bluprnt #AMUHACKS4.0 #CSSAMU #AMU #ReactFlow #GeminiAPI #Hackathon
 
