import "./feed.css"
import VideoContainer from './VideoContainer'
import { auth, storage } from '../firebase'
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import './signup.css';
import { setDoc, doc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
function Feed() {


    
    let user = useContext(AuthContext);
    let [posts, setPosts] = useState([]);
    let[loading,setLoading] = useState(false)

    
        const history = useHistory();
      
        const handleLogout = () => {
          auth.signOut();
          
          history.push('/login');
        };


    useEffect(async () => {
        const querySnapshot = await getDocs(collection(db, "newpostsinsta"));
        let arr = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            arr.push({ id: doc.id, ...doc.data() })
        });
        setPosts(arr);


    }, [])
    return (
        <>

{/* () => auth.signOut() */}
                        <div className="header">
                        
                        <div>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiBvvRY2qdk21cCDqMgUYXHfcA4T5vaDKSDA&usqp=CAU" className="insta_img"></img>
                        </div>
                        <div className="feed_userImage">
                            <img src="data:image/webp;base64,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"
                                className="profile_img"></img>
                        
                            <button     onClick={handleLogout} className="logout">   logout</button>
                        </div>
    
                    </div>
                    
                    
               
                        
                
            
        
        
         
            <div className="main_container">
                <input type='file' onChange={(e) => {
                    setLoading(true);
                        
                        
                       
                    
                        let videoObj = e.currentTarget.files[0];
                    console.log(videoObj);
                    let { name, type, size } = videoObj;
                    console.log(type);
                    if (type != 'video/mp4') {
                        alert('enter videos only')
                    }
                    else {
                            
                                
                          let storageRef = ref(storage, `${name}`)
                        console.log("storaage video", storageRef);
                        const uploadTask = uploadBytesResumable(storageRef, videoObj);

                        uploadTask.on('state_changed',


                        
                            (snapshot) => {



                                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log('Upload is ' + progress + '% done');
                                  
                                switch (snapshot.state) {
                                    case 'paused':
                                        console.log('Upload is paused');
                                        break;
                                    case 'running':
                                        console.log('Upload is running');
                                        
                                        break;
                                }

                            },
                            loading == true?<div>...loading</div>:
                            (error) => {
                                
                                // A full list of error codes is available at
                                // https://firebase.google.com/docs/storage/web/handle-errors
                                switch (error.code) {
                                    case 'storage/unauthorized':
                                        // User doesn't have permission to access the object
                                        break;
                                    case 'storage/canceled':
                                        // User canceled the upload
                                        break;

                                    // ...

                                    case 'storage/unknown':
                                        // Unknown error occurred, inspect error.serverResponse
                                        break;
                                }
                            },
                                
                            
                            
                            () => {


                                // Upload completed successfully, now we can get the download URL
                                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                                    console.log('File available at', downloadURL);
                                   const docRef = await setDoc(doc(db, "newpostsinsta", user.uid + `${name}`), {
                                        email: user.email,
                                        likes: [],
                                        comments: [],
                                        profileImageUrl: downloadURL,


                                    })
                                    
                                });
                                
                            },
                            setLoading(false),
                        );



                    }

                }} />
                <div className="reels_container">
                    {posts.map((post) => {
                        return <VideoContainer key={post.id} data={post} />
                    })}
                </div>



            </div>

        </>

    )
}


export default Feed;
