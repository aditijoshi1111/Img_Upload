import React, { useState, useEffect } from 'react';

export default function Image(props){
    const [imageFile, setimageFile] = useState('')
    const [desc, setdesc] = useState('')
    var [product, setproduct] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3003/getImage', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for(let i=0;i<data.length;i++){
            var base64Flag = 'data:image/jpeg;base64,';
            var imageStr = arrayBufferToBase64(data[i].img.data.data);

            data[i].img=base64Flag+imageStr;
            }
            setproduct(data);
            console.log(product);
        })
        .catch(err => console.log("err "+err));
    },[])

    function arrayBufferToBase64(buffer){
        var binary= '';
        var bytes = [].slice.call(new Uint8Array(buffer));

        bytes.forEach((b) => binary += String.fromCharCode(b));

        return window.btoa(binary);
    }

    function handleChange(e){
        console.log("image got.");
        setimageFile(e.target.files[0]);
        setdesc(e.target.files[0].name);
    }

    function handleUpload(){
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
            <button onClick={handleUpload}>UPLOAD</button><br/>

            {product.map( item =>{
                return(
                    <div className="card">
                        <img src={item.img} alt="qwerty"/>
                        <div>{item.description}</div>
                   </div>
                )
            })}
        </div>
        </>
    )
}