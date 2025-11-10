import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import Home from './Pages/home';




function App() {
	return(
		<Router>
			<Routes>
				<Route path = "/" element = {<Home/>}/>
				<Route path = "/LoginPage" element = {<LoginPage/>}/>
			</Routes>
		</Router>
	)
}

export default App;
