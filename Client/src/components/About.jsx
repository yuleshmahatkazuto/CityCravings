import React, { useState, useEffect } from "react";
import axios from "axios";

export default function About() {
  const [content, setContent] = useState(
    "Nothing to be displayed at the moment"
  );

  useEffect(() => {
    async function getContent() {
      try {
        const result = await axios.get(
          "https://citycravings-server.onrender.com/api"
        );
        setContent(result.data.message);
      } catch (error) {
        setContent("Catch block was triggered.");
      }
    }

    getContent();
  }, []);

  return <div>{content && <div>{content}</div>}</div>;
}
