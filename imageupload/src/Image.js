import React, { useState, useEffect } from 'react';

export default function Image(props){
    const [imageFile, setimageFile] = useState('')
    const [desc, setdesc] = useState('')
    const [product, setproduct] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3003/getImage', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(a => console.log(a))
    },[])

    function handleChange(e){
        console.log("image got.");
        setimageFile(e.target.files[0]);
        setdesc(e.target.files[0].name);
    }

    function handleUpload(e){
        const form=new FormData();
        form.append('file', imageFile);
        form.append('description', desc);
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
            <input type="file" name="file" onChange={handleChange}/><br/>
            <button onClick={handleUpload}>UPLOAD</button>
        </div>
        </>
    )
}