import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage.jsx';
import Home from './Pages/home.jsx';
import SignupPage from './Pages/SignupPage.jsx';
import UsersPage from './Pages/UsersPage.jsx';


function App() {
	return(
		<Router>
			<Routes>
				<Route path = "/" element = {<Home/>}/>
				<Route path = "/LoginPage" element = {<LoginPage/>}/>
				<Route path = "/SignupPage" element = {<SignupPage/>}/>
				<Route path = "/UsersPage" element = {<UsersPage/>}/>
			</Routes>
		</Router>
	)
}

export default App;
