import React, { useRef, useState } from 'react';
import '../styles/UploadPage.css';
import axios from 'axios';

function UploadPage() {
  const fileInputRef = useRef(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];
    console.log('Selected file:', file);
  };

  const handleUpload = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      axios.post('http://127.0.0.1:8000/uploadjson/', formData, {
        onUploadProgress: progressEvent => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        }
      })
        .then(response => {
          console.log('Upload response:', response.data);
          setUploadStatus('File uploaded successfully');
          fileInputRef.current.value = '';
          setUploadProgress(0);
          setUploadError('');
        })
        .catch(error => {
          console.error('Upload error:', error);
          if (error.response && error.response.status === 404) {
            setUploadError('Error: 404 not found');
            setUploadProgress(0);
          } else {
            setUploadError('Error: Failed to upload file');
            setUploadProgress(0);
          }
        });
    }
  };

  return (
    <div>
      <h1>Upload Page</h1>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} />
      {uploadStatus && (
        <div className="upload-prompt">
          <p>{uploadStatus}</p>
        </div>
      )}
      {uploadError && (
        <div className="upload-error">
          <p>{uploadError}</p>
        </div>
      )}
      <div className="progress">
        <div className="progress-bar" style={{ width: `${uploadProgress}%` }}>
          {uploadProgress}%
        </div>
      </div>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadPage;