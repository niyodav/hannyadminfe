import React from 'react'
import {GoogleLogout} from 'react-google-login'


const clientId = "389602098327-ilkau7lqoiigc5022klfolcfij39ld18.apps.googleusercontent.com";
function Logout() {
    const onSuccess = (res)=>{
        alert('Logout successful' )
    };

    const onFailure = (res) =>{
        alert('[Logout failed ' )
    }

    return (
        <div>
            <GoogleLogout
                clientId ={clientId}
                buttonText = "Logout"
                onLogoutSuccess = {onSuccess}
                onFailure = {onFailure}
                cookiePolicy = "single_host_origin"
                // style={{marginTop:"100px"}}
                // isSignedIn={true}
                />

                

            
        </div>
    )
}

export default Logout
