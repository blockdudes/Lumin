import React, { useState } from 'react';
import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";

interface FileDetails {
  file: File;
  url: string;
}

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<FileDetails[]>([]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files).map(file => ({
      file,
      url: file.type.startsWith('image') ? URL.createObjectURL(file) : ''
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map(file => ({
        file,
        url: file.type.startsWith('image') ? URL.createObjectURL(file) : ''
      }));

      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleDelete = (url: string) => {
    URL.revokeObjectURL(url);
    setFiles(prev => prev.filter(file => file.url !== url));
  };

  return (
    <div className="max-w-[750px] mx-auto p-4">
      <div className="bg-white w-full h-full">
        <div
          className="w-[706px] relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-12 hover:border-blue-500 transition-colors"
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
        >
          <p className="mb-3 font-semibold text-gray-900">Drag and drop your files here or</p>
          <input
            id="hidden-input"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
          <button
            className="mt-2 rounded px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={() => document.getElementById('hidden-input')?.click()}
          >
            Select Files
          </button>
        </div>
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {files.map(({ file, url }) => (
            <li key={url} className="flex flex-col items-center p-2 bg-gray-100 rounded shadow relative group">
              {url ? (
                <img src={url} alt={file.name} className="w-full h-32 object-cover rounded" />
              ) : (
                <div className="flex items-center justify-center w-full h-32 bg-gray-200 rounded">
                  <DocumentTextIcon className="w-16 h-16 text-gray-400" />
                </div>
              )}
              <span className="mt-2 text-sm text-gray-700 truncate w-full px-2">{file.name}</span>
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10"
                onClick={() => handleDelete(url)}
              >
                <TrashIcon className="w-6 h-6" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;