import './css/general.css'
import NavbarComponent from './components/navbar'
import MainPageBigImage from './components/mainPageBigImage'
import { Component } from 'react'

function App () {

  const applicationName = "NewsCop"
  const applicationDescription = "NewsCop is a news article" + 
  "overlap detection platform that helps businesses stay on " + 
  "top of competitors' news coverage. Our service quickly " + 
  "checks for duplicated stories, allowing you to spot " + 
  "trends and identify opportunities to maximize coverage. " + 
  "With NewsCop, you'll never miss a story."
  const projectName = "News article overlap"
  const imageUrl = "https://i.ibb.co/713x3tb/Screenshot-2023-05-03-at-12-50-00.png"

  return (
    <>
      <NavbarComponent name={ applicationName } />
      <MainPageBigImage description={ applicationDescription } projectName={ projectName } 
      imageUrl={imageUrl}/>
    </>
  )
}

export default App
