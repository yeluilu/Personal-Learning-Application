import { BrowserRouter  as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage.jsx';
import Home from './Pages/home.jsx';
import SignupPage from './Pages/SignupPage.jsx';
import UsersPage from './Pages/UsersPage.jsx';
import DashboardOverview from './Pages/DashboardOverview.jsx';
import DashboardJournal from './Pages/DashboardJournal.jsx';
import DashboardProgress from './Pages/DashboardProgress.jsx';
import DashboardSettings from './Pages/DashboardSettings.jsx';


function App() {
	return(
		<Router>
			<Routes>
				<Route path = "/" element = {<Home/>}/>
				<Route path = "/LoginPage" element = {<LoginPage/>}/>
				<Route path = "/SignupPage" element = {<SignupPage/>}/>
				<Route path = "/UsersPage/*" element = {<UsersPage/>}>
					<Route index element={<DashboardOverview/>} />
					<Route path="journal" element={<DashboardJournal/>} />
					<Route path="progress" element={<DashboardProgress/>} />
					<Route path="settings" element={<DashboardSettings/>} />
				</Route>
			</Routes>
		</Router>
	)
}

export default App;
