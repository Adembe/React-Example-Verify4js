import { useState } from 'react';
import './uploader.css';
import { MdCloudUpload } from 'react-icons/md';
function Uploader() {
  const [image] = useState<string | null>(null);
  const [fileName] = useState<string>('No selected file');

  return (
    <main>
      <form
        action=""
        onClick={() => {
          const inputField = document.querySelector('.input-field') as HTMLInputElement;
          inputField && inputField.click();
        }}
      >
        
        <input
        id="fileInput"
        type="file"
        accept=".pdf"
        className="input-field"
		hidden
      	/>
        {image ? (
          <img src={image} width={60} alt={fileName} />
        ) : (
          <>
            <MdCloudUpload color="#1475cf" size={60} />
            <p>Browse Files to upload</p>
          </>
        )}		
      </form>

    
    </main>
  );
}

export default Uploader;

