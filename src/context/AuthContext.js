
import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import React from 'react';
const swal = require('sweetalert2');



const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    

    const [user, setUser] = useState(() => 
        localStorage.getItem("authTokens")
            ?jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access)
             : null
    );


    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

        const loginUser = async (email, password) => {
            const response = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })
            const data = await response.json()
            console.log(data);

            if(response.status === 200){
                console.log("Logged In");
                setAuthTokens(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem("authTokens", JSON.stringify(data))
                navigate("/");
                swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                })

            } else {    
                console.log(response.status);
                console.log("there was a server issue");
                alert("somthing went wrong"+ response.status);
                swal.fire({
                    title: "Username or passowrd does not exists",
                    icon: "error",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
            }
        }

    const registerUser = async (email, username, password, password2) => {
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, username, password, password2
            })
        })
        if(response.status === 201){
            navigate("/login"); 
            swal.fire({
                title: "Registration Successful, Login Now",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            alert("Somthing went wrong"+response.status);
            swal.fire({
                title: "An Error Occured " + response.status,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        navigate("/login");
        swal.fire({
            title: "YOu have been logged out...",
            icon: "success",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
    }

    const contextData = {
        user, 
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
             {loading ? null : children}
         </AuthContext.Provider>
    )

}
