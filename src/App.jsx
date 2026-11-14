import {useState , useEffect} from "react";
import "./App.css";

function App(){
  const [timeLeft , setTimeLeft] = useState(1500);
  const [isRunning , setIsRunning] = useState(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedMinutes = String(minutes) .padStart(2,"0");
  const formattedSeconds = String(seconds).padStart(2,"0");

  useEffect(() => {
    if(!isRunning || timeLeft <= 0)return;

    const timer = setInterval(() => {
      setTimeLeft(previousTime => 
        previousTime -1)
    },1000);

    return () => {
      clearInterval(timer)
    }
  },[isRunning , timeLeft])

  useEffect(() => {
    if(timeLeft === 0 ){
      setIsRunning(false);
    }
  } , [timeLeft])

  function startTimer(){
    setIsRunning(true);
  }

  function pauseTimer(){
    setIsRunning(false);
  }

  function resetTimer(){
    setTimeLeft(1500);
    setIsRunning(false);
  }

  return(
    <div id="pomodoro-viewer">
      <h2>TIME TO FOCUS</h2>
     <h1>{formattedMinutes}:{formattedSeconds}</h1>
     {isRunning ? <button onClick={pauseTimer}>Pause</button>:<button onClick={startTimer}>Start</button>}
     <button onClick={resetTimer}>Reset</button>

     {timeLeft === 0 && (
      <p className="alert">Focus Session Completed</p>
     )}
    </div>
  )
}
export default App;