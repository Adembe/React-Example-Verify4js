import React, { useEffect} from 'react';
import { verify } from 'verify4js';
import Uploader from './Uploader';
import logo from './logo.svg';
import './App.css';
const VerificationComponent: React.FC = () => {

  useEffect(() => {
    const handleFileChange = (event: Event) => {
      const fileInput = event.target as HTMLInputElement;
      const file = fileInput.files?.[0];
      console.log("file",file)
      if (file) {
        // Read the file as ArrayBuffer
        const reader = new FileReader();
        reader.onload = () => {
          const pdfArrayBuffer = reader.result as ArrayBuffer;
          console.log("pdfArrayBuffer",pdfArrayBuffer)
          // Create a new ArrayBuffer and copy the contents
          // const newArrayBuffer = new ArrayBuffer(pdfArrayBuffer.byteLength);
          // console.log("newArrayBuffer",newArrayBuffer)
          const pdfInt8Array = new Int8Array(pdfArrayBuffer);
          console.log("pdfInt8Array",pdfInt8Array)
          // const newInt8Array = new Int8Array(newArrayBuffer);
          // console.log("newInt8Array",newInt8Array)
          // newInt8Array.set(pdfInt8Array);
    
          // Perform verification
          verify(pdfInt8Array)
            .then((res) => {
              // Set the verification result
              console.log("Result: ",res)
              alert(res.state);
            })
            .catch((err) => {
              console.error(err.message);
            });
        };
        reader.onerror = () => {
          console.error('Error reading file');
        };
        reader.readAsArrayBuffer(file);
      }
    };
    // Add event listener to file input
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.addEventListener('change', handleFileChange);

    return () => {
      // Cleanup event listener
      fileInput.removeEventListener('change', handleFileChange);
    };
  }, []);
  return (
<div className="App">
      <header className="App-header">
        <div className='logo'>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        </div>
        <div>
          <Uploader/>
        </div>
      </header>
    </div>
    
  );
};

export default VerificationComponent;
