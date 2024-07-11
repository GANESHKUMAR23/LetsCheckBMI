import {useState} from 'react'
import '../css/bmi.css';
import bmiLogo from '../assest/bmiLogo1.jpg'
import underWeight from '../assest/underWeight.png';
import normalWeight from '../assest/normalWeight.png';
import overWeight from '../assest/overWeight.png';
import obese from '../assest/obese.png';
import { Loading } from './Loading';
import { Speedometer } from './Speedometer';


const bmiImage = [underWeight,normalWeight,overWeight,obese];

export const BmiCalculator = () => {

    const [height,setHeight] = useState("");
    const [weight,setWeight] = useState("");
    const [bmi,setBmi] = useState(null);
    const [bmistatus,setBmiStataus] = useState("Nothing!");
    const [error,setError] = useState("");
    const [bgColor,setBgColor] = useState("");
    const [loading,setLoading] = useState(false);
    const [pointValue,setPointValue] = useState("0deg");
    const [bmiImageNum,setBmiImageNum] = useState(null);
    const [imgBg,setImgBg] = useState("white");


    const clearAll = () => {
        setHeight("");
        setWeight("");
        setBmi(null);
        setBmiStataus("");
        setError("");
        setLoading(false);
        setPointValue("0deg");
        setBmiImageNum(null);
    
    }
    function handleEmpty() {
        if(!bmistatus){
            setBmiStataus("Nothing !");
        }
    }

    const wait = t => new Promise((resolve, reject) => setTimeout(resolve, t));

    const myFunc = async () => {

        await wait(1000)

        const isValidHeight = /^\d+$/.test(height);
        const isValidWeight = /^\d+$/.test(weight);



        if(isValidHeight && isValidWeight){


            const heightInMetres = height/100;
            const bmiValue = weight / (heightInMetres * heightInMetres);
            setBmi(bmiValue.toFixed(2));
            if(bmiValue < 18.5){
                setBmiStataus("Under Weight");
                setBgColor("#3498db");
                setPointValue("15deg");
                setBmiImageNum(0);
                setImgBg("lightblue");
                
            }
            else if(bmiValue >= 18.5 && bmiValue < 24.9){
                setBmiStataus("Normal Weight");
                setBgColor("#2ecc71");
                setPointValue("60deg");
                setBmiImageNum(1);
                setImgBg("#90eed8");
            }
            else if(bmiValue >= 25 && bmiValue < 29.9){
                setBmiStataus("Over Weight");
                setBgColor("#f1c40f");
                setPointValue("120deg");
                setBmiImageNum(2);
                setImgBg("#eeec90");
            }
            else{
                setBmiStataus("Obese");
                setBgColor("#e74c3c");
                setPointValue("165deg");
                setBmiImageNum(3);
                setImgBg("#ee9090");
            }
            setError("");
            setLoading(false);
        }
        else{
            setError("Please enter a valid numeric values for height & weight");
            setBmi(null);
            setLoading(false);

        }

      }

    const bmiCalculate = () => {

        setLoading(true);
        setBmi(null);
        myFunc();

        
    }


  return (
    <>
        <div className="Bmi-container">
            <div className="img-box" 
                style={{
                    background: imgBg,
                }}
            >
                <img src={bmiLogo} alt="error" />
                <Speedometer id="meter"
                    pointValue={pointValue}
                    bmistatus={bmistatus} 
                    handleEmpty={handleEmpty}
                />
                {/* <div className="value-box">
                    <img src={bmiImage[bmiImageNum]} alt="bmiImg" />
                </div>
                <Speedometer
                        pointValue={pointValue}
                        bmistatus={bmistatus} 
                        handleEmpty={handleEmpty}
                /> */}

            </div>
            <div className="data">
                <h3>BMI Calculator</h3>
                {error && <p className='error'>{error}</p>}
                { loading && <Loading />}
                <div className="input-box">
                    <label htmlFor="height">Enter Height : </label>
                    <input type="text" name="height" id="height" value={height} onChange={(e) => setHeight(e.target.value)} />
                </div>
                <div className="input-box">
                <label htmlFor="weight">Enter Weight : </label>
                    <input type="text" name="weight" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div className="input-btn">
                    <button type='button' onClick={bmiCalculate} >calculate</button>
                    <button type='button'onClick={clearAll} >clear</button>
                </div>
                {bmi !== null && (
                     <div className="result">
                     <p>Your BMI is <span style={{background:bgColor}} >{bmi}</span></p>
                     <p>BMI Status is <span style={{background:bgColor}} >{bmistatus}</span></p>
                 </div>
                )}
               
            </div>
        </div>
    </>
  )
}
