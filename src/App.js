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
  );
}

export default App;
