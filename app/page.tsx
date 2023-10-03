'use client'
import './style/App.css';
import Header from './Header';
import  Login from './components/Login'
import {useSession} from 'next-auth/react'
import AddIcon from '@mui/icons-material/Add';
import CardAndCalander from './components/CardAndCalander';

export default function Home() {
  const session  = useSession();
  console.log(session);
  return (
    <div>
    {!session.data ? (
      <Login />
    ) : (
     
    <div className="App">
      <Header/>
      <CardAndCalander/>
  <div className='Add_icon'><AddIcon/></div>
    </div>
 )} </div> 
  )
}

    {/* <BrowserRouter>
<Routes>
  <Route path="/" element={<Header />}/>
    <Route path="/entries" element={<Entries/>} />
    <Route path="/explore" element={<Header />} />
    <Route path="/entries/newentry" element={<NewEntry />} />
</Routes>
</BrowserRouter> */}