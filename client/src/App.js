import React,{useState} from "react";
import axios from 'axios';
function App() {
  const [file, setFile] = useState('');
  const [fileName, SetFilename] = useState("Choose file");
  const [filePathUploaded, setUploadedFile] = useState('');

  const onChange = e =>{
setFile(e.target.files[0]);
SetFilename(e.target.files[0].name);
  }

  const click = e =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('file',file);
    console.log(file);
    axios.post('http://localhost:5000/upload', formData , {
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    }).then((response)=>{
      const {fileName , filePath} = response.data;
      setUploadedFile(filePath);

    })
   
  }
  console.log(filePathUploaded);
  return (
    <div>
      <form onSubmit={click}>
        <input type="file" onChange={onChange} />
        <button >Submit</button>
        </form>
    <img src={filePathUploaded} /> 
    </div>
  );
}

export default App;
