import React, { useState } from 'react';

function App() {
  const [img, setimg] = useState('');
  const [datainput, setdatainput] = useState('');
  

  const handledatainput = (evt) => {
    setdatainput(evt.target.value);
  };

  

  async function generateqr() {
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=155x150&data=${encodeURIComponent(
        datainput
      )}`;
      setimg(url);
    } catch (error) {
      console.error('error generating qr code', error);
    }
  }

  const downloadqr = () => {
    fetch(img)
      .then((Response) => Response.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-blue-500 mb-6 mr-3 underline">QR CODE GENERATOR</h1>
      <img className="mb-4 p-2" src={img} />
      <div className="w-full max-w-xs">
        <label htmlFor="datainput" className="block text-blue-500 text-lg font-semibold mb-2 ">
          Data for QR Code:
        </label>
        <input
          value={datainput}
          onChange={handledatainput}
          type="text"
          id="datainput"
          placeholder="Enter data for QR code"
          className="w-full mb-4 px-4 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
       
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            onClick={generateqr}
          >
            Generate QR Code
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ml-8"
            onClick={downloadqr}
          >
            Download QR Code
          </button>
        </div>
      </div>
      <p className="mt-8 text-gray-600">
        Designed by <a href="" className="text-blue-500">Harish</a>
      </p>
    </div>
  );
}

export default App;
