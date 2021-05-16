import React, { useState } from 'react';

export default function Image(props){
    const [imageFile, setimageFile] = useState('')
    const [desc, setdesc] = useState("")

    function handleChange(e){
        console.log("image got.");
        setimageFile(e.target.files[0]);
        setdesc(e.target.files[0].name);
    }

    function handleUpload(e){
        const form=new FormData();
        form.append('file', imageFile);
        form.append('description', desc);
        // console.log(form);  it wont print it like this.
        //instead use this... for method
        // for(var pair of form.entries()) {
        //    console.log(pair[1]);
        // }
        fetch('http://localhost:3003/postImage', {
            method: 'POST',
            body: form
            // headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => response.json())
        .then(a=>console.log(a))
        .catch(err => console.log("error"+err));
    }

    return(
        <>
        <div>
            <input type="text" name="description"/><br/>
            <input type="file" name="file" onChange={handleChange}/>
            <button onClick={handleUpload}>UPLOAD</button>
        </div>
        </>
    )
}