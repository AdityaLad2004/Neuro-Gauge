
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Patients from './pages/Patients';
import PatientDetails from './components/PatientDetails';
import AllPatients from './components/AllPatients';
import Chat from './components/Chat';
import Video from './components/Video';
import PrescriptionForm from './components/Prescribe';
import PrescriptionList from './components/ViewPre'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/patients' exact element={<Patients />} />
        <Route path="/patients/:id" exact element={<PatientDetails/>} />
        <Route path="/allPatients" exact element={<AllPatients/>} />
        <Route path="/chat" exact element={<Chat/>} />
        <Route path="/video" exact element={<Video/>} />
        <Route path="/prescribe" exact element={<PrescriptionForm/>} />
        <Route path="/viewpre" exact element={<PrescriptionList/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
