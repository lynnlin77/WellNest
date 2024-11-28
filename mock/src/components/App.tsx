import { useState } from "react";
import "../styles/App.css";
import { LoginButton } from "./LoginButton";
import { SelectInput } from '../components/select/SelectInput';
import { SelectHistory } from '../components/select/SelectHistory';
import { histEntry } from '../components/select/Select';

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
      <div className="App-header">
        <h1>Mock</h1>
        <LoginButton 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={isLoggedIn ? handleLogout : handleLogin} 
        />
      </div>
      {isLoggedIn && (
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
      )}
      <div id="modal-root"></div>
    </div>
  );
}

export default App;
