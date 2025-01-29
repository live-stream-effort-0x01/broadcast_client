import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import  Home  from "./routes/home";
import NotFound  from "./routes/[...404]";
import ChatRoom  from "./routes/chatRoom";
const App = () => {
  return (
    <div lang="en">
      <header>
        <title>MVP Broadcast Client</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </header>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
         <Route path="/" element={<Home />} />
           <Route path="/chatRoom" element={<ChatRoom />} />
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </Router>
      </React.Suspense>
    </div>
  );
};

export default App;
