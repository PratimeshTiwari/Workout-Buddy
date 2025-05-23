import { BrowserRouter , Routes ,Route} from 'react-router-dom'

//browser router : wraps everywhere we want to use the router 
//Routes : wraps all our individuals routes 
//Route : create a single route 

//pages and components 
import Home from './pages/Home'  //Home component from Home Page
import Navbar from './components/Navbar'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
