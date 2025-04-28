# 🚀 Bluprnt   
# Visit  [🔹BluPrnt🔹](https://www.bluprnt.tech/) 




## Project Overview   
Bluprnt is a web applicationthat leverages the power of the [Gemini API](https://gemini.com) to generate structured JSON responses, which are dynamically rendered as interactive flowcharts on the frontend using [React Flow](https://reactflow.dev/). The platform is an AI-powered solution aimed at simplifying project planning and execution for developers, innovators, and teams. Users input their project name, description, and tech stack, and Bluprnt generates a detailed, interactive roadmap in the form of a visual flowchart. It also provides curated resources, source code examples, and study materials to accelerate learning and development. By addressing challenges like unclear project direction, steep learning curves for new tech stacks, and time-consuming manual planning, Bluprnt enables users to focus on building while the system handles the blueprint. Whether visualizing processes, creating learning roadmaps, or mapping system workflows, Bluprnt makes project planning intuitive, efficient, and visually engaging.
---

## Installation 🛠️  

### Prerequisites  
v
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
# Proposed System
The proposed system is an intelligent, web-based platform that leverages AI to generate customized project roadmaps dynamically. Key features include:

AI-Driven Roadmap Generation : Users input project details, and the system creates a visual, interactive roadmap using React Flow.
Resource Recommendations : Curated learning materials, source code snippets, and documentation are provided based on the chosen tech stack.
Collaboration Tools : Real-time sharing and collaboration on roadmaps for team projects.
Scalability : Adaptable to various project sizes and complexities, from small apps to enterprise-level systems.
The system works by analyzing user inputs, mapping dependencies, and suggesting optimal workflows, ensuring clarity and efficiency in project execution.

# Existing System and Drawbacks
Currently, project planning relies heavily on manual efforts or generic tools like flowchart software, whiteboards, or static templates. These methods have significant limitations:

Time-Consuming : Creating detailed roadmaps manually is labor-intensive and prone to errors.
Lack of Customization : Generic tools fail to account for specific tech stacks or project requirements.
No Learning Support : Existing solutions do not provide integrated resources or guidance for unfamiliar technologies.
Limited Collaboration : Many tools lack real-time collaboration features, making teamwork inefficient.

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
 