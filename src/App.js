// Whenever we are building in React, we always like to make reusable components 

import './App.css';
// When importing our components we have to make sure we importing our version of it and not MUI
import Button from './components/Button';
// Importing Error from the components folder 
import Error from './components/Error';
// Importing the NavBar from the components folder 
import NavBar from './components/NavBar';
// Importing getUer from the apifolder - the reason we put braces around it is because we are doing a non-default export. This is an object destructuring
// This also means we have to keep the same name
import { getUser } from './api/apiBasicAuth';
import { CancelToken } from 'apisauce';
import LoginForm from './forms/LoginForm';
import CategoryForm from './forms/CategoryForm';
import ItemForm from './forms/ItemForm';
import apiCategory from './api/apiCategory';
import CategoryBar from './components/CategoryBar';
import AdminMenu from './components/AdminMenu';
import AdminSelectCategory from './components/AdminSelectCategory';
import AdminSelectItem from './components/AdminSelectItem';
import ItemBrowser from './components/ItemBrowser';

const handleAPITest = async ()=>{
  const source = CancelToken.source();
  const response_object= await apiCategory.get(source.token);
  console.log(response_object)
}

function App() {
  /* 
    Anything inside of the return function is a component. 
    Since there is a color being passed into the error button, 
    <Button><Error> & <LoginForm> have now become child elements inside of the NavBar component
  */

  return ( 
      <NavBar>
        <ItemBrowser/>
        <AdminMenu/>
      </NavBar>
  );
}

export default App;