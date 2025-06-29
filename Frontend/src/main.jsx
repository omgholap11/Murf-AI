import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import HomePage from './components/HomePage.jsx'
import QuestionSheets from './components/QuestionSheets.jsx'
import Layout from './Layout.jsx'
import PracticeTest from './components/PracticeTest.jsx'
import StoryReader from './components/StoryReader.jsx'
import StoriesPage from './components/StoriesPage.jsx'
import ContactUs from './components/ContactUs.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <Layout/>,
    children : [
      {
        path : "",
        element : <HomePage/>
      },
      {
        path : "questionsheets",
        element : <QuestionSheets/>
      },
      {
        path : "practicetest",
        element : <PracticeTest/>
      },
      {
        path : "readstory",
        element : <StoryReader/>
      },
      {
        path : "allstories",
        element : <StoriesPage/>
      },
      {
        path : "contactus",
        element : <ContactUs/>
      }
    ]

  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router = {router}/>
  </StrictMode>,
)
