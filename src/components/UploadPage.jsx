import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';


const UploadPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [qrUrl, setQrUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile || !videoFile) {
      alert("Please select both an image and a video");
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('video', videoFile);

    try {
      const res = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const fullUrl = `http://localhost:8000${res.data.ar_url}`;
      setQrUrl(fullUrl);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto text-center space-y-4">
      <h2 className="text-xl font-bold">Upload Image & Video for AR</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Target Image:</label><br />
          <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
        </div>

        <div>
          <label>Overlay Video:</label><br />
          <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files[0])} />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Generate AR QR Code
        </button>
      </form>

      {qrUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Scan to View AR:</h3>
          <QRCode value={qrUrl} size={200} />
          <p className="text-sm break-all mt-2">{qrUrl}</p>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
