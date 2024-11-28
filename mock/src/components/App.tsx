import { useState } from "react";
import "../styles/App.css";
import { LoginButton } from "./LoginButton";
import { SelectInput } from '../components/select/SelectInput';
import { SelectHistory } from '../components/select/SelectHistory';
import { histEntry } from '../components/select/Select';
import RegisterButton from './RegisterButton';

/**
 * This is the highest level of Mock which builds the component APP;
 *
 * @return JSX of the entire mock
 *  Note: if the user is logged in, the main interactive screen will show,
 *  else it will stay at the screen prompting for log in
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [history, setHistory] = useState<histEntry[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');
  const [chartState, setChartState] = useState<{
    selectedDataset: (string | number)[][] | null;
    xAxis: string;
    yAxis: string;
  }>({
    selectedDataset: null,
    xAxis: '',
    yAxis: '',
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);

    // Reset all related state when the user logs out
    setHistory([]);
    setViewMode('table');
    setChartState({
      selectedDataset: null,
      xAxis: '',
      yAxis: '',
    });
  };

  return (
    <div className="App">
        <h1 style={{ color: 'purple', fontSize: '2em' }}>WellNest</h1>
        <h2 style={{fontSize: '2.7em' }}>Welcome to Senior Safety Check</h2>
        <h3>A community platform for senior citizens to check in and <br /> stay connected with their loved ones.</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        {/* Left Component */}
        <div style={{ width: '40%', textAlign: 'center' }}>
          <h3 style={{fontSize: '1.5em' }}>Is it your first time <br /> using this site?</h3>
          <RegisterButton onClick={() => alert('Register button clicked!')} />
        </div>

        {/* Right Component */}
        <div style={{ width: '40%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h3 style={{fontSize: '1.5em' }}>Already a user?</h3>
        <br></br>
          <LoginButton 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={isLoggedIn ? handleLogout : handleLogin} 
        />
        {/* {isLoggedIn && (
          <>
            <SelectInput 
              history={history} 
              setHistory={setHistory} 
              viewMode={viewMode} 
              setViewMode={setViewMode}
              chartState={chartState}
              setChartState={setChartState}
            />
            <SelectHistory 
              history={history}
              viewMode={viewMode} 
              selectedDataset={chartState.selectedDataset} 
              xAxis={chartState.xAxis} 
              yAxis={chartState.yAxis} 
            />
          </>
        )} */}
        </div>
      </div>

      <div id="modal-root"></div>
    </div>
  );
}

export default App;
