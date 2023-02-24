import logo from './logo.svg';
import './App.css';
import Feed from './components/Feed';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { AuthContext, AuthContextProvider } from './context/AuthContext';
import { useContext } from 'react';
//In this code we have installed react-router-dom@5.3.1 to understand switch 


function App() {
  return (
    <div>
      <AuthContextProvider>
        <Switch>
        <RedirectToFeed path = '/login' comp = {Login}>

</RedirectToFeed>
          
<RedirectToFeed path = '/signup' comp = {SignUp}>

          </RedirectToFeed> 
          

          <PrivateRoute path='/feed' comp={Feed}>

          </PrivateRoute>

          {/* <Route path='/feed'>
            <Feed></Feed>
          </Route> */}
          {/*  */}
        


          <PrivateRoute path='/profile' comp={Profile}>

          </PrivateRoute>

          {/* <Route path = '/profile'>
          <Profile></Profile>
        </Route> */}
          
           
         {/* <Route path='/signup'>
            <SignUp></SignUp>
          </Route>  
           */}
          {/* <PageNotFound></PageNotFound> */}
          <NavLink to="/login" className="kuchbhi"><SignUp></SignUp></NavLink>
         <NavLink ></NavLink> 
        </Switch>
      </AuthContextProvider>
    </div>
  );
}


function PrivateRoute(props) {
  // This line declares a function component named PrivateRoute that accepts a props object as its input.
  let Component = props.comp;
  //This line creates a new variable named Component and assigns it the value of the comp property of the props object.
  let user = useContext(AuthContext);
  return (
    <Route
      {...props}
      //This line creates a new Route component and passes all of the props object's properties to it using the spread syntax ({...props}). This is done so that any additional properties passed to PrivateRoute are also passed on to the Route component.
      render={
        (props) => {
          return user != null ? <Component {...props}></Component> : <Redirect {...props} to='/login'></Redirect>
        }
      }
    >
    </Route>
  )

}

function RedirectToFeed(props) {
  let Component = props.comp;
  let user = useContext(AuthContext);
return(
  <Route
  {...props}
  render ={
    (props) =>{
      return user != null?<Redirect {...props} to = '/feed'></Redirect>:<Component {...props}></Component>
        }
  } 
  >

  </Route>
)
  
}


export default App;
