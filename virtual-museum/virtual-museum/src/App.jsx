import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import './App.css'

const App = () => {
  return (
    <div className="App-wrapper">
      <Layout>
        <Routes>
          <Route path="/" element={ <Home/> }></Route>
          <Route path="*" element={ <NotFound/> }></Route>
        </Routes>
      </Layout>
    </div>
  )
}

export default App