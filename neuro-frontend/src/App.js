
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Patients from './pages/Patients';
import PatientDetails from './components/PatientDetails';
import AllPatients from './components/AllPatients';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/patients' exact element={<Patients />} />
        <Route path="/patients/:id" exact element={<PatientDetails/>} />
        <Route path="/allPatients" exact element={<AllPatients/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
