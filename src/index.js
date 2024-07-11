
import ReactDOM from 'react-dom/client';
import {BmiCalculator} from './components/BmiCalculator';
// import { Speedometer } from './components/Speedometer';
import './index.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BmiCalculator />
    {/* <Speedometer /> */}
  </>
);


