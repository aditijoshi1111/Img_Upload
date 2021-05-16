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
        // console.log(form);  it wont print it like this.
        //instead use this... for method
        // for(var pair of form.entries()) {
        //    console.log(pair[1]);
        // }

        var data={file: form, description: desc};
        console.log(data);
        fetch('http://localhost:3001/postImage', {
            method: 'POST',
            body: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
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