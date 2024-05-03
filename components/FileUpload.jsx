"use client";
import ChatGPT from '@/components/ChatGPT';
import { useState } from "react";

const FileUpload = () => {
  const [filename, setFilename] = useState("");
  const [dataFromFile, setDataFromFile] = useState([]);

  const handleFilenameChange = (event) => {
    setFilename(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (filename) {
      try {
        const response = await fetch("/textract-api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filename }),
        });

        const data = await response.json();
        setDataFromFile(
          data.data.Blocks.filter((block) => block.BlockType === "LINE")
        );
        alert("File uploaded and processed successfully");
      } catch (error) {
        console.error("Error", error);
        alert("Failed to upload and process the file");
      }
    }
  };

  // Prepare concatenated string from dataFromFile
  const fileContent = dataFromFile.map(line => line.Text).join(" ");

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center justify-center p-4"
      >
        <label
          htmlFor="filename"
          className="block text-sm font-medium text-gray-700"
        >
          Enter the filename:
        </label>
        <input
          type="text"
          id="filename"
          value={filename}
          onChange={handleFilenameChange}
          placeholder="Filename in S3 bucket"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Analyze using Textract
        </button>
      </form>

      <br />
      <ChatGPT extraInformation={fileContent} />  {/* Pass concatenated data as props */}
      <br />
      <hr />
      <br />
      <div className="max-w-4xl mx-auto mt-5">
        {dataFromFile.length > 0 ? (
          <div className="px-4 py-6 bg-white shadow-lg rounded-lg">
            <ul className="list-none space-y-2 p-4">
              {dataFromFile.map((line) => (
                <li key={line.Id} className="text-gray-800 text-sm">
                  {line.Text}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading or no data...</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
