
import './videocontainer.css'
import { useContext, useEffect, useState } from "react"
import { db } from "../firebase";
import { AuthContext } from '../context/AuthContext';
import { setDoc, doc,getDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";


function VideoContainer(props) {
    let [playing, setPlaying] = useState(true);
    let [commentbox, setComment] = useState(false);
    let [currUserComment, setCurrUserComment] = useState("");
    // console.log('videoContainer', props);
   let[comments,setComments] = useState([]);
    let user = useContext(AuthContext);

    useEffect(async()=>{
        let commentIdArr = props.data.comments;
        let arr = [];
        for(let i = 0 ;i<commentIdArr.length;i++){
            const commentRef  = doc(db,"newcommentsinsta",commentIdArr[i]);
            const commentSnap = await getDoc(commentRef);
            arr.push(commentSnap.data())   
        }
        setComments(arr);
        console.log(arr);
    },[props]);

   


    return (
        <div className="video_card">

            <video className='video-card-video' onClick={(e) => {
                if (playing) {
                    e.currentTarget.pause();
                    setPlaying(false);
                }
                else {
                    e.currentTarget.play();
                    setPlaying(true);
                }
            }}

                src={props.data.profileImageUrl}></video>



            <p className='video-card-username' ></p>
            <span className='video-card-music'></span>

            <span onClick={(e) => {
                if (setComment) {
                    setComment(true);
                    console.log("comment was pressed");
                }
                else {
                    setComment(false);
                }
            }}>
                <button class="chat_button">comment</button>
            </span>

            {commentbox ?
                <div className="video-card-comment-box">
                    <div className="actual-comments">
                    {comments.map((comment) => {
                        console.log(comment.email);
                        return (
                            console.log(comment.email),
                            console.log(comment.comments),
                            <div className="actual-comments">
                                
                                <h5>{comment.email}</h5>
                                
                                <p>{comment.comments}</p>
                            </div>
                        )
                    })}
                    </div>
                    <div className="comment-form">
                        <div className="post-user-comment">

                            <input type='text'  className = "inputbtn" value={currUserComment} onChange={(e) => setCurrUserComment(e.currentTarget.value)} />

                            <button className='postbtn' onClick={async () => {
                                let commentId = user.uid + '$' + Date.now();
                                const docRef = await setDoc(doc(db, "newcommentsinsta", commentId), {
                                    email: user.email,

                                    comments: currUserComment,



                                });
                                
                                setCurrUserComment(" ");
                                let postCommentsArr = props.data.comments;
                                console.log(postCommentsArr);
                                postCommentsArr.push(commentId);    
                                const  postcommentRef = doc(db, "newpostsinsta", props.data.id);
                                await updateDoc(postcommentRef, {
                                    comments:postCommentsArr
                                  });

                            }}>post</button>
                            
                        </div>

                    </div>

                </div> : ("")}





        </div>

    )
}

export default VideoContainer;