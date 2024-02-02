import React, { useState } from 'react'
import ProgressBar from './ProgressBar';

const UploadForm = () => {
  const [file,setFile]=useState(null);
  const types=['image/png','image/jpeg','image/jpg']
  const [error,setError]=useState(null)   
  function handleChange(e){
    let selected=e.target.files[0];
    console.log(selected)
    if(selected && types.includes(selected.type) ){
      setFile(selected)
      setError(null)
    }
    else{
      setFile(null);
      setError('Please select an image file (png, jpeg or jpg)')

    }
  }
  return (
    <form className='upload_form'>
     
      <label className='uploadbtn'>
        <input type="file"  onChange={handleChange}/>
        Upload File
      </label>

        <div className="output">
          {error&&<div className='error'>{error}</div>}
          {file&& <div>{file.name}</div>}
          {file&&<ProgressBar file={file} setFile={setFile}  />} 
          {/* file={file} setFile={setFile} */}
        </div>
    </form>
  )
}

export default UploadForm