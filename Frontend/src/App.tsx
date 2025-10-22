import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/homePage.tsx';
import CreatePage from './pages/createPage.tsx';
import NoteDetailPage from './pages/noteDetailPage.tsx';

const App = () => {

  return (
    <div data-theme='forest' className='h-full w-full absolute inset-0 -z-10 items-center bg-[radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]' >
      <div className='bg-transparent'>
        <Routes>
          <Route path = '/' element ={<HomePage/>}/>
          <Route path = '/create' element ={<CreatePage/>}/>
          <Route path = '/note/:id' element ={<NoteDetailPage/>}/>
        </Routes>
      </div>
     
    </div>
  )
}

export default App;
 