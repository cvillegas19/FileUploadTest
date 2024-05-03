'use client'
import { useState } from 'react';
import * as XLSX from 'xlsx';

const FileUpload = () => {
  const [dataFromFile, setDataFromFile] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assuming the first sheet is the target
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        setDataFromFile(jsonData);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Please upload a valid Excel file.');
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4 items-center justify-center p-4">
        <label
          htmlFor="file"
          className="block text-sm font-medium text-gray-700"
        >
          Upload an Excel file:
        </label>
        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          accept=".xls,.xlsx"
        />
      </form>

      <br />
      <hr />
      <br />
      <div className="max-w-4xl mx-auto mt-5">
        {dataFromFile.length > 0 ? (
          <div className="px-4 py-6 bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b">
                  {dataFromFile[0].map((header, index) => (
                    <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {dataFromFile.slice(1).map((row, index) => (
                  <tr key={index} className="border-b">
                    {row.map((cell, idx) => (
                      <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {cell}
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
