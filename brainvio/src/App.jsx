import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Page1 from './Pages/page1';
import Home from './Pages/home';




function App() {
	return(
		<Router>
			<Routes>
				<Route path = "/" element = {<Home/>}/>
				<Route path = "/page1" element = {<Page1/>}/>
			</Routes>
		</Router>
	)
}

export default App;
