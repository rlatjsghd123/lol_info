import React, { useState } from 'react'
import {  signInWithEmailAndPassword,GoogleAuthProvider,GithubAuthProvider ,signInWithPopup,FacebookAuthProvider,deleteUser } from "firebase/auth";
import { AuthService } from '../fbase'
import {FaGithub,FaGoogle,FaFacebook} from 'react-icons/fa'
import '../scss/Login.scss'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("")

    const navigate = useNavigate();


    const onChange = (e:any) =>{
        const {target: {value,name}} = e;
        if(name === "email"){
            setEmail(value);
        } else if(name === "password"){
            setPassword(value);
        }
    }
    const onSubmit = async(e:any) =>{
        e.preventDefault();
        try{
        await signInWithEmailAndPassword(AuthService, email, password);
        navigate("/");
        }catch(error){
            if (error instanceof Error) {
              setError("아이디, 비밀번호를 확인해주세요.");
              console.log(error)
              } else{
                console.log(error)
              }
        }
    }
    const onClick = async(e:any) =>{
        const name = e.target.name;
        let provider:any;
        if(name == "Google"){
        provider = new GoogleAuthProvider();
        } else if(name == "GitHub"){
        provider = new GithubAuthProvider();
        } else if(name =="Facebook"){
        provider = new FacebookAuthProvider();   
        }
       await signInWithPopup(AuthService, provider);
       navigate("/");
    }
  return (
    <main className='auth_main'>
        <h1><img src='imgs/lol_logo.png' />LOL.info</h1>
    <form onSubmit={onSubmit} className="auth_form">
        <fieldset>
            <legend className='blind'>로그인창</legend>
            <input type="email"   name="email" value={email} placeholder='아이디를 입력하세요' onChange={onChange} required />
            <input type="password"  name="password" value={password} placeholder='비밀번호를 입력하세요' onChange={onChange} required />
            <input type="submit"  value='로그인' />
            <span className='authError'>{error}</span>
        </fieldset>
    </form>
    <div className='brand_btn'> 
            <button onClick={onClick} name="GitHub"><FaGithub />GitHub로 로그인</button>
            <button onClick={onClick} name="Google"><FaGoogle />Google로 로그인</button>
            <button onClick={onClick} name="Facebook"><FaFacebook />Facebook로 로그인</button>
        </div>
</main>
  )
}

export default Login;
