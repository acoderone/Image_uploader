import './App.css'
import axios from 'axios';
import { useState } from 'react';
function App() {
  const [file,setFile]=useState(null);
const handleFileChange=(e)=>{
  setFile(e.target.files[0]);
}
 const Upload=async()=>{
  try{
    const formData=new FormData();
    formData.append('file',file);
   await axios.post('http://localhost:5000/uploads',formData,{
    headers:{
      'Content-Type':'multipart/form-data',
    }
   })
   console.log("File uploaded successfully");
  }
  catch(e){
   console.error('Error uploading file:',e);
  }
 }

  return (
    <>
     
      <input type='file'  onChange={handleFileChange}/>
    
     <button onClick={Upload}>upload</button>
        
    </>
  )
}

export default App
