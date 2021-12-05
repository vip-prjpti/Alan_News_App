// import React,{useState} from 'react'

// const Signup = () => {
//     const[email,setEmail] = useState("")
//     const[password,setPassword] = useState("")
//     const handleSubmit =(e)=>{
//         e.preventDefault()
//         console.log(email,password)
//     }
//     return (
//         <div className="centre container" style={{maxWidth:"500px"}}>

//             <h3> Please Signup </h3>
//             <form onSubmit={(e)=>handleSubmit}>
//             <div className="input-field">
//                 <input type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}  />
//                 <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}  />

//         </div>
//         <button type="submit"className= "btn blue">signup</button>
//             </form>
//         </div>
//     )
// }

// export default Signup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await auth.createUserWithEmailAndPassword(email, password);
      window.M.toast({ html: `Welcome ${result.user.email}`, classes: 'green' });
      navigate('/');
    } catch (err) {
      window.M.toast({ html: err.message, classes: 'red' });
    }
  };
  return (
    <div className="login-body">
      <div className="center container" style={{ maxWidth: '500px' }}>
        <div><h3 className="login-text-center">Please Signup!!</h3></div>
        <div className="progress light-blue accent-3" />
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input-field">
            <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn light-blue accent-3">Signup</button>
        </form>

      </div>
    </div>
  );
}
