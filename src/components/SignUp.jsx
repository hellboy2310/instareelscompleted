import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../firebase";
import './signup.css';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loader, setLoader] = useState(false);
    const [user, setUser] = useState("");
    const [error, setError] = useState("")
    const history = useHistory();

    const createUser = async () => {
        try {
            setLoader(true);
            let userCredential = await createUserWithEmailAndPassword(auth, email, password);

            //this will store the data in firestore database with a new collection with a name newusers
            const docRef = await setDoc(doc(db, "newusers", userCredential.user.uid), {
                email,
                name,
                reelsIds: [],
                profileImageUrl: "",
                userId: userCredential.user.uid

            });
            setUser(userCredential.user);
            history.push("/feed");
        }
        catch (error) {
            setError(error);
            setTimeout(() => {
                setError('');
            }, 2000);
        }
        setLoader(false);
        // rules_version = '2';
        // service cloud.firestore {
        //   match /databases/{database}/documents {
        //     match /{document=**} {
        //       allow read, write: if
        //           request.time < timestamp.date(2022, 8, 16);
        //     }
        //   }
        // }


    }

    const Emailhandler = (e) => {
        setEmail(e.target.value);
    }
    const Passwordhandler = (e) => {
        setPassword(e.target.value);
    }
    const Namehandler = (e) => {
        setName(e.target.value);
    }

    return (

        <>
            <div className="signup_header">
                {


                    error != '' ? <h1>{error.message}</h1> :
                        loader == true ? <h1>...loading</h1> :
                            user != '' ? <h1>user is {user.uid}</h1> :

                                <div className="main_container">
                                    <div className="card" >
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiBvvRY2qdk21cCDqMgUYXHfcA4T5vaDKSDA&usqp=CAU"  className="card-img-top" alt="..." />
                                        <div className="input-group mb-3 input_Container">

                                            <input type="email" onChange={Emailhandler} className="form-control area_of_container firstContainer" placeholder="Enter your email" aria-label="Username" aria-describedby="basic-addon1" value={email} />
                                            
                                            <input type="password" onChange={Passwordhandler} className="form-control area_of_container" placeholder="Enter your Password" aria-label="Username" aria-describedby="basic-addon1" value={password} />
                                            
                                            <input type="name" onChange={Namehandler} className="form-control area_of_container" placeholder="Enter your Name" aria-label="Username" aria-describedby="basic-addon1" value={name} />
                                            
                                            <button  onClick={createUser} className="signup_button">Sign up </button>
                                            

                                           
                                        </div>
                                    </div>
                                </div>






                }
            </div>


        </>

    )
}

export default SignUp;
