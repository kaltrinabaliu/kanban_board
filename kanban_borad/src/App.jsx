import './App.css';
import dummyData from './assets/data.json';
import Kanban from "./components/Kanban/Kanban";


function App() {

  const data = dummyData;

  return (
    <div>
      <Kanban data={data}/>
    </div>
  )
}

export default App
