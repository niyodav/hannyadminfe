import React from 'react'

export  const refreshTokenSetup = (res) =>{
    let refreshTiming = (res.tokenObj.expires_in || 36000-5* 60)*100;

    const refreshToken = async() =>{
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming =(newAuthRes.expires_in || 36000-5* 60)*100;
        console.log('newAuthRes:', newAuthRes)
        console.log('new auth token', newAuthRes.id_token)
        setTimeout(refreshToken,refreshToken)

    };
    setTimeout(refreshToken,refreshToken)


}
