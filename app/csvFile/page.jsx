'use client'
import ChatGPT from '@/components/ChatGPT';
import { useState } from 'react';
import Papa from 'papaparse';

const FileUpload = () => {
  const [fileContent, setFileContent] = useState(''); // Store the string content of the file
  const [dataFromFile, setDataFromFile] = useState([]); // Store the parsed data for display

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const csvString = Papa.unparse(results.data); // Convert parsed data back to CSV string format
          setFileContent(csvString); // Set the CSV string
          setDataFromFile(results.data); // Update the data for display
        },
        error: (error) => {
          console.error('Error reading CSV:', error);
          alert('Could not read file');
        }
      });
    } else {
      alert('Please upload a valid CSV file.');
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4 items-center justify-center p-4">
        <label
          htmlFor="file"
          className="block text-sm font-medium text-gray-700"
        >
          Upload a CSV file:
        </label>
        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          accept=".csv"
        />
      </form>

      <br />
      <ChatGPT extraInformation={fileContent} />  {/* Pass raw data as props */}
      <br />
      <hr />
      <br />
      <div className="max-w-4xl mx-auto mt-5">
        {dataFromFile.length > 0 ? (
          <div className="px-4 py-6 bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b">
                  {Object.keys(dataFromFile[0]).map((header, index) => (
                    <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {dataFromFile.map((row, index) => (
                  <tr key={index} className="border-b">
                    {Object.values(row).map((value, index) => (
                      <td key={index} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No file uploaded or empty file.</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
