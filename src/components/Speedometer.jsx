import '../css/speedometer.css';

export const Speedometer = ({pointValue ,bmistatus,handleEmpty}) => {

    const styleMeter = {
        transform : `rotate(${pointValue})`
    }
    
  return (
    <>
        <div className="speedometer" data-name={bmistatus} onMouseEnter={handleEmpty}>
            <div className="semi-circle">
                <div></div>
                <div></div>
            </div>
            <div className="needle pin" style={styleMeter}></div>
            <div className="point"></div>
        </div>
    </>
  )
}
