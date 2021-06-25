import { Button,Drawer, Typography, List,ListItem, ListItemText ,Container, Paper} from "@material-ui/core";
import React, { useEffect, useState,useContext } from "react";
import {BrowserRouter as Router, Switch, Route, Link,useHistory,useLocation} from 'react-router-dom'

import { makeStyles } from "@material-ui/core/styles"
import "./App.css";
import './components/styles.css';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import TsControl from "./components/TsControl";
import CreateCategory from "./components/createCategory";
import CreateBotChat from "./components/createBotChat";
import DisplayChallengesGroups from "./components/displayChallengesGroups";
import DisplayChallenges from "./components/displayChallenges";
import DisplayScenerios from "./components/displayScenerios";
import DisplayBlocks from "./components/displayBlocks";
import DisplayBotChat from "./components/displayBotChat";
import { findByLabelText } from "@testing-library/react";
import { CategoryProvider } from "./components/contexts/categoriesContext";

import { CategoryContext } from './components/contexts/categoriesContext'
import { TableSortProvider } from "./components/contexts/sortByContext";
import { UpdateContextProvider } from "./components/contexts/updateContext";
import { DeleteIdsContextProvider } from "./components/contexts/deleteIdsContext";
import { SelectedFeatureProvider } from "./components/contexts/featuresContext";
import { SelectedBlockContextProvider } from "./components/contexts/selectedBlockContext";
import { CreatedtextContext, CreatedtextContextProvider } from "./components/contexts/createdTextContext";
import DisplayChallengeManagement from "./components/challengeManagement/challengeManagement";
import VistedLinks from "./components/vistedLinks";
import { LocationContextProvider } from "./components/contexts/locationContext";
import { SelectedCategoryContextProvider } from "./components/contexts/selectedCategoryContext";
import { CreatedFileContextProvider } from "./components/contexts/createdFileContext";
import { SelectedMenuContextProvider } from "./components/contexts/selectedMenuContext";
import Login from "./components/login";
import Logout from "./components/logout";


import DisplayStatus from "./HANNYAPP/status";
import ControlApp from "./HANNYAPP/controlApp";




const client = new ApolloClient({
  // uri: 'https://gmmhpn143g.execute-api.ap-northeast-2.amazonaws.com/dev/graphql/',
  // url: 'http://127.0.0.1:8000/graphql',
  uri: 'https://2nrpbffin8.execute-api.ap-northeast-2.amazonaws.com/dev/graphql/',
  cache: new InMemoryCache(),

});


const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );
 
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);
 
  return [value, setValue];
};
 
  


const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    // width:"inherit",
    display:"flex",
    
    background: "#434343"

 
   },
   drawerList:{

    paddingLeft:20


   },
  link: {
    textDecoration: 'none',
    color :"#d9d9d9",
  "&:hover": {
    color: "#ff8000"
}
        // color: theme.palette.text.primary,
    // background: "#434343",
  },
  paper:{
    // backgroundColor: "#434343",
    minWidth:200,
    maxHeight:400
  },
  Main:{
    marginLeft:190
  }
}))

function App() {
  const [value, setValue] = useStateWithLocalStorage(
    'myValueInLocalStorage'
  );
console.log(value,"stottttt")


  const [items ,setItems] = useState('')
  const [clicked ,setClicked] = useState(false)

  const classes  = useStyles()
  // const [newCategory , setNewCategory] = useContext(CategoryContext);

// console.log(CategoryContext)
// const location = useLocation();
// console.log(useLocation())
  // React.useEffect(() => {
  //   console.log(useLocation())
  //   // ga.send(["pageview", location.pathname]);
  // }, []);

  return (
    
    
    <ApolloProvider client={client}>
    
    <TableSortProvider>
    <CategoryProvider>
    <UpdateContextProvider>
    <DeleteIdsContextProvider>
    <SelectedFeatureProvider>
    <SelectedBlockContextProvider>
    <CreatedtextContextProvider>
    <LocationContextProvider>
    <SelectedCategoryContextProvider>
    <CreatedFileContextProvider>
    <SelectedMenuContextProvider>
    <Router>
    
    {/* style={{background:"red",width:"100%"}} */}
    {/* <div className={classes.root}>  */}

      <div className={classes.root} style={{height:1000,background:"#f3f3f3",overflow:"scroll"}}>
       
        <Drawer
          variant ='persistent'
          open={true}
          classes = {{paper:classes.drawerPaper}}
          className={classes.drawerPaper}

        >
          <Link to="/" className={classes.link} button onClick={() => setClicked('banner')} style={clicked==='banner'?{color: "#ff8000"}:null}>
          <img src={"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/hannybanner1.png"} alt="decrement" style={{width:"auto",height:60}}/>
          </Link>
         

          <List className={classes.drawerList} >
          
            <Link to="/" className={classes.link}>
              <ListItem button onClick={() => setClicked('home')} style={clicked==='home'?{color: "#ff8000"}:null}>    
              <img src={"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/%E1%84%83%E1%85%A2%E1%84%92%E1%85%AA%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5.png"} alt="increment" style={{width:20,height:20,marginRight:10}}/>    
                <ListItemText primary={"대화관리"} />
              </ListItem>
            </Link>
            <Link to="/HC" className={classes.link}>
              <ListItem button onClick={() => setClicked('hc')} style={clicked==='hc'?{color: "#ff8000"}:null}>
              <img src={"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/HC%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5_4ne7sV4.png"} alt="decrement" style={{width:20,height:20,marginRight:10}}/>

                <ListItemText primary={"챌린지관리"} />
              </ListItem>      
            </Link>
            <Link to="/freetalk" className={classes.link}>  
              <ListItem button onClick={() => setClicked('freetalk')} style={clicked==='freetalk'?{color: "#ff8000"}:null}>
              <img src={"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/%E1%84%8E%E1%85%B5%E1%86%AB%E1%84%80%E1%85%AE%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5.png"} alt="increment" style={{width:20,height:20,marginRight:10}}/>    
                <ListItemText primary={"친구관리"} />
              </ListItem>
            </Link>
            <Link to="/dashboard" className={classes.link}>
              <ListItem button  onClick={() => setClicked('dashboard')} style={clicked==='dashboard'?{color: "#ff8000"}:null}>
              <img src={"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/%E1%84%83%E1%85%A2%E1%84%89%E1%85%B5%E1%84%87%E1%85%A9%E1%84%83%E1%85%B3_PmThK5Y.png"} alt="increment" style={{width:20,height:20,marginRight:10}}/>    

                <ListItemText primary={"대시보드"} />
              </ListItem>
            </Link>

            <Link to="/state" className={classes.link}>
              <ListItem button  onClick={() => setClicked('state')} style={clicked==='state'?{color: "#ff8000"}:null}>
              {/* <img src={"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/%E1%84%83%E1%85%A2%E1%84%89%E1%85%B5%E1%84%87%E1%85%A9%E1%84%83%E1%85%B3_PmThK5Y.png"} alt="increment" style={{width:20,height:20,marginRight:10}}/>     */}

                <ListItemText primary={"state"} />
              </ListItem>
            </Link>
            <Link to="/controlcenter" className={classes.link}>
              <ListItem button  onClick={() => setClicked('controlcenter')} style={clicked==='controlcenter'?{color: "#ff8000"}:null}>
              {/* <img src={"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/%E1%84%83%E1%85%A2%E1%84%89%E1%85%B5%E1%84%87%E1%85%A9%E1%84%83%E1%85%B3_PmThK5Y.png"} alt="increment" style={{width:20,height:20,marginRight:10}}/>     */}

                <ListItemText primary={"App control center"} />
              </ListItem>
            </Link>

        
          </List>
        </Drawer>
        <div className={classes.Main}>
        
        <Switch>
       
          <Route exact path ="/">
          <div >
            {/* <VistedLinks/> */}
         
             {
               value?<TsControl/>:<Login/>  

             }
            
          </div>
          </Route>
          <Route exact path ="/HC">
            
              <DisplayChallengeManagement/>
          </Route> 
          <Route exact path='/freetalk'>
         

          </Route>
          <Route exact path='/useradmin'>
            친구관리는 현재 앱이랑 BE 관계 있음 
            BE2 완료 후 연결 필요
            <CreateCategory/>
          </Route>
          
          <Route exact path='/challenge-group/:fk'>
            <DisplayChallengesGroups/>
          </Route>
          <Route exact path='/challenge/:fk'>
            <DisplayChallenges/>
          </Route>
          <Route exact path='/scenerio/:fk'>
            <DisplayScenerios/>
          </Route>
          <Route exact path='/block/:fk'>
            <DisplayBlocks/>
          </Route>
          <Route exact path='/chat/:fk'>
            <DisplayBotChat/>

          </Route>

          <Route exact path='/state'>
            
            <DisplayStatus/>

          </Route>
          <Route exact path='/controlcenter'>
            
            <ControlApp/>

          </Route>
        </Switch>
        </div>

      </div>

  
    </Router>
    </SelectedMenuContextProvider>
    </CreatedFileContextProvider>
    </SelectedCategoryContextProvider>
    </LocationContextProvider>
    </CreatedtextContextProvider>
    </SelectedBlockContextProvider>
    </SelectedFeatureProvider>
    </DeleteIdsContextProvider>
    </UpdateContextProvider>
    </CategoryProvider>
    </TableSortProvider>
    
    
    </ApolloProvider>
    

  );
}

export default App;
