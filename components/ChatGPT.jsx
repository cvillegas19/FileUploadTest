// In your component file
import React, { useState } from "react";

function ChatGPT({ extraInformation }) {
  // Using destructuring to get extraInformation from props
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    console.log(extraInformation);
    try {
      const res = await fetch("/chatgpt-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          extraInformation: extraInformation,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      // Log the data to see what you're receiving from the server
      console.log("Received data:", data);

      if (!data) {
        setResponse("Received no choices or empty choices from the API.");
        console.error("No choices received:", data);
      } else {
        setResponse(data.data.choices[0].message.content);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("Failed to fetch data.");
    }
  };

  return (
    <div
      className="p-4 mx-auto bg-white rounded-lg shadow-md"
      style={{ maxWidth: "800px" }}
    >
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
        placeholder="Type your message"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Send
      </button>
      <div className="mt-4 p-2 bg-gray-100 border border-gray-300 rounded">
        <p>Response:</p>
        <p className="text-gray-800">{response}</p>
      </div>
    </div>
  );
}

export default ChatGPT;
