import React from 'react';
// import {useState} from 'react';

import CreateChallengeGroup from './createChallengeGroup';
import DisplayChallengesGroups from './displayChallengesGroups';




    
function TsControl() {
    // const [challengeFk, setChallengeFk] = useState('');
    // const [sceneriogroupFk, setSceneriogroupFk] = useState('');
    // const [tsScenerios, setTsScenerios] = useState('');
    // const [display , setDisplay] = useState({
    //     chg:'none'
    // });

    // function addChallengeFk(fk){
    //     setChallengeFk(fk);

    //     }
    // function addScenerioGroupFk(fk){
    //     setSceneriogroupFk(fk);

    //     }
    // function addTsScenerioFk(fk){
    //     setTsScenerios(fk);

    //     }

    // function handleClick(e){
   
    //     console.log(e)
    //     if(e){
    //         console.log(e)

    //       }

    //     }
   
    return (
        <div>
           
            <DisplayChallengesGroups/>
            {/* <DisplayChallenges/> */}
            {/* <CreateTsFlow/> */}
            {/* <DisplayScenerios/> */}
            {/* <Button onClick={{handleClick}}>+ ADD NEW</Button> */}
            {/* <CreateChallengeGroup  style={{display:'none'}}/> */}
            


        </div>
    )
}


export default TsControl