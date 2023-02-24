import { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './profile.css'
import { AuthContext } from '../context/AuthContext';

function Profile() {


    let cuser = useContext(AuthContext);
    let [loading, setLoading] = useState(true);
    let [user,setUser] = useState('');

    console.log(cuser);

    useEffect(function fn() {
        (async function () {
            if (cuser) {

                const docRef = doc(db, "newusers", cuser.uid);
                //db -> kis database me dhundhna he
                //newusers -> konse collection me dhundhna he
                //user.uid -> konsa document dhundna he
                const userObj = await getDoc(docRef);
                
                setUser(userObj.data());
                    console.log(user.name);
                setLoading(false);
            }

        })()

    }, []);


    return (
        <>
            {loading == true ? <div>...loading</div> :
                <>

                    <div className="header"></div>
                    <div className="main">
                        <div className="pimg_container">
                            <img className='pimg' src="" />

                        </div>
                        <div className="details">
                            <div className="content">{user.name}</div>
                            <div className="content">No of Posts: <span className='bold_text'>{user. reelsIds.length}</span></div>
                            <div className="content">Email:{user.email}<span className='bold_text'></span></div>
                        </div>

                    </div>

                </>
            }

        </>



    )
}

export default Profile;