import React, {useState, useRef} from 'react';
import './App.css';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';

function App() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResult, setScanResult] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const qrRef = useRef(null);

  const generateQRCode = async () => {
      try {
          const response = await QRCode.toDataURL(text);
          setImageUrl(response);
      } catch (error){
          console.log(error);
      }
  }
  const onScanQRCode = () => {
      qrRef.current.openImageDialog();
  }
  const handleErrorFile = (error) => {
      console.log(error);
  }
  const handleScanFile = (result) => {
      if(result) {
          setScanResult(result);
      }
  }
  const handleErrorWebCam = (error) => {
      console.log(error);
  }
  const handleScanWebCam = (result) => {
      if(result) {
          setScanResultWebCam(result);
      }
  }


  return (
      <>
          <div className="min-w-screen h-screen flex justify-center items-center z-1 bg-green-100 bg-cover">
              <div className="absolute bg-gradient-to-tl from-indigo-600  to-green-600 opacity-80 inset-0 "/>
              <div className="z-10 shadow-md bg-white grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center space-y-8 p-4 shadow m-2">
                      <div className={"flex items-center justify-center"}>
                          <input className={"focus:outline-none"} placeholder={"Enter Text Here"} onChange={(e) => setText(e.target.value)}/>
                          <button className={"bg-indigo-700 text-white font-semibold px-3 py-1"} onClick={()=>generateQRCode()}>Generate</button>
                      </div>
                      <div className={"border border-gray-300 w-full h-full flex items-center justify-center"}>
                          {imageUrl ? (<a href={imageUrl} download><img src={imageUrl} alt={"qrcode"}/></a>) : null}
                      </div>
                      <div className={"h-8"}/>
                  </div>
                  <div className="flex flex-col items-center space-y-8 p-4 shadow m-2">
                      <button className={"bg-pink-700 text-white font-semibold px-3 py-1"} onClick={()=>onScanQRCode()}>Scan Qr Code</button>
                      <QrReader
                          ref={qrRef}
                          delay={300}
                          style={{width: '100%'}}
                          onError={handleErrorFile}
                          onScan={handleScanFile}
                          legacyMode
                      />
                      <h3 className={"text-gray-700 self-start"}>Scanned Code: {scanResult}</h3>
                  </div>
                  <div className="flex flex-col items-center space-y-8 p-4 shadow m-2">
                      <h3 className={"text-gray-700 px-3 py-1"}>Scan Qr Code by webcam</h3>
                      <QrReader
                          delay={300}
                          style={{width: '100%'}}
                          onError={handleErrorWebCam}
                          onScan={handleScanWebCam}
                      />
                      <h3 className={"text-gray-700 self-start"}>Scanned Code: {scanResultWebCam}</h3>
                  </div>
              </div>
          </div>
          <div style={{width: '-webkit-fill-available'}} className="fixed bottom-0 w-100 flex items-center justify-center space-x-2 text-gray-500 bg-white text-sm p-4">
              <span>© {new Date().getFullYear()} | Made with </span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   className="text-red-500 h-5 w-5 " stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
              </svg>
              <span> by GrimwolfStudio | </span>
              <a className={"text-blue-500 text-xs"} href="https://github.com/blutbaden/translator">View on github</a>
          </div>
      </>
  );
}

export default App;
