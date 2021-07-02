import React,{useState} from "react";
import axios from 'axios';
function App() {
  const [file, setFile] = useState('');
  const [fileName, SetFilename] = useState("");
  const [fileNameUploaded, setUploadedFile] = useState('');

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
      const {fileName} = response.data;
      SetFilename(fileName);

    })
   
    axios.get('http://localhost:5000/getImg/'+fileName).then((response)=>{
      setUploadedFile(response.config.url);
     
    })

  }
  
  return (
    <div>
      <form onSubmit={click}>
        <input type="file" onChange={onChange} />
        <button >Submit</button>
        </form>
        {fileNameUploaded === "" ? null : <img src={fileNameUploaded} height="200px" width="200px"/> }
          
    </div>
  );
}

export default App;
