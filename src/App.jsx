import HomePage from './pages/HomePage.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreatePost from './pages/CreatePost.jsx';
import ShowPost from './pages/ShowPost.jsx';
import LayoutStandard from './layouts/LayoutStandard.jsx';
import IndexPage from './pages/IndexPage.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import PrivateArea from './middlewares/PrivateArea.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { GlobalProvider } from './contexts/GlobalContext.jsx';



function App() {

  return (
    <BrowserRouter>
      <GlobalProvider>
        <AuthProvider>
          <Routes>
              <Route path="/" element={<LayoutStandard/>}>
                  <Route index element={<HomePage/>} />
                  <Route path="login" element={<LoginPage/>}/>
                  <Route path="posts">
                      <Route index element={<IndexPage/>}/>
                      <Route path=":slug">
                          <Route index element={<PrivateArea>
                            <ShowPost/>
                            </PrivateArea>}/>
                      </Route>
                      <Route path="create" element={<CreatePost/>}/>
                  </Route>
              </Route>
          </Routes>
        </AuthProvider>
      </GlobalProvider>
    </BrowserRouter> 
  )
  
}

export default App
