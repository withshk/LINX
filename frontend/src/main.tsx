import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SignUpPage1 } from './Pages/SignUpPage1'
import { SignUpPage2 } from './Pages/SignUpPage2'
import { SignUpPage3 } from './Pages/SignUpPage3'
import { LogInPage } from './Pages/LogInPage'
import { MyPage } from './Pages/MyPage'
import { MainPage } from './Pages/MainPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/LogIn" replace />}/>
        <Route path='/SignUp/step1' element={<SignUpPage1/>}/>
        <Route path='/SignUp/step2' element={<SignUpPage2/>}/>
        <Route path='/SignUp/step3' element={<SignUpPage3/>}/>
        <Route path='/LogIn' element={<LogInPage/>}/>
        <Route path='/MyPage' element={<MyPage/>}/>
        <Route path='/MainPage' element={<MainPage/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)