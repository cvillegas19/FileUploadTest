'use client'
import { useState } from 'react';
import mammoth from 'mammoth';

const FileUpload = () => {
  const [fileContent, setFileContent] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.docx')) {
      mammoth.extractRawText({ arrayBuffer: file.arrayBuffer() })
        .then((result) => {
          setFileContent(result.value);
        })
        .catch((error) => {
          console.error('Error reading file:', error);
          alert('Could not read file');
        });
    } else {
      alert('Please upload a valid DOCX file.');
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4 items-center justify-center p-4">
        <label
          htmlFor="file"
          className="block text-sm font-medium text-gray-700"
        >
          Upload a DOCX file:
        </label>
        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          accept=".docx"
        />
      </form>

      <br />
      <hr />
      <br />
      <div className="max-w-4xl mx-auto mt-5">
        {fileContent ? (
          <div className="px-4 py-6 bg-white shadow-lg rounded-lg">
            <pre className="text-gray-800 text-sm whitespace-pre-wrap">{fileContent}</pre>
          </div>
        ) : (
          <p className="text-center text-gray-500">No file uploaded or empty file.</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
