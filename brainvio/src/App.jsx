import { BrowserRouter  as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage.jsx';
import Home from './Pages/home.jsx';
import SignupPage from './Pages/SignupPage.jsx';
import UsersPage from './Pages/UsersPage.jsx';
import DashboardOverview from './Pages/DashboardOverview.jsx';
import DashboardJournal from './Pages/DashboardJournal.jsx';
import DashboardProgress from './Pages/DashboardProgress.jsx';
import GuidedExercises from './Pages/GuidedExercises.jsx';
import AITherapist from './Pages/AITherapist.jsx';
import Resources from './Pages/Resources.jsx';


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
				<Route path="aibuddy" element={<AITherapist/>} />
				<Route path="exercises" element={<GuidedExercises/>} />
				<Route path="resources" element={<Resources/>} />
			</Route>
			</Routes>
		</Router>
	)
}

export default App;
