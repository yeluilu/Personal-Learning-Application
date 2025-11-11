import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import Home from './Pages/home';
import SignupPage from './Pages/SignupPage';



function App() {
	return(
		<Router>
			<Routes>
				<Route path = "/" element = {<Home/>}/>
				<Route path = "/LoginPage" element = {<LoginPage/>}/>
				<Route path = "/SignupPage" element = {<SignupPage/>}/>
			</Routes>
		</Router>
	)
}

export default App;
