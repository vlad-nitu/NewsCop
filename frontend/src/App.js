import './css/general.css'
import NavbarComponent from './components/navbar'
import MainPageBigImage from './components/mainPageBigImage'
import Mission from './components/mission'
import Services from './components/services'
import Map from './components/map'
import Footer from './components/footer'

function App () {

  const applicationName = "NewsCop"
  const applicationDescription = "NewsCop is a news article " + 
  "overlap detection platform that helps businesses stay on " + 
  "top of competitors' news coverage. Our service quickly " + 
  "checks for duplicated stories, allowing you to spot " + 
  "trends and identify opportunities to maximize coverage. " + 
  "With NewsCop, you'll never miss a story."
  const projectName = "News article overlap"
  const imageUrl = "https://i.ibb.co/713x3tb/Screenshot-2023-05-03-at-12-50-00.png"

  const ourMission = "Creating a platform that provides various ways of " +
  "comparing news articles, helping users to identify overlapping content " + 
  "quickly and accurately and, consequently, decreasing the impact of " + 
  "missinformation and plagiarism in the media."

  const ourMissionImage = "https://gcdnb.pbrd.co/images/e5PfBZ9MCJqB.jpg?o=1"
  const ourMissionImage2 = "https://thumbs.dreamstime.com/b/man-looking-over-newspaper-62558573.jpg"
  const ourMissionImage3 = "https://gcdnb.pbrd.co/images/N1ELmhry5wXH.png?o=1"

  const titles = ["URL plagiarism checker", "Text plagiarism checker", "Text similarity checker"]
  const descriptions = ["NewsCop provides users with a way of checking the URL of a news article against a large database of articles for fast and accurate plagiarism detection.",
  "NewsCop provides users with a way of checking the text of a news article against a large database of articles for fast and accurate plagiarism detection.", "Test the similarity between two news articles by using this poweful tool which enables you to input two URLs of media content and see the alikeness of the two"]
  const images = ["https://scholarlykitchen.sspnet.org/wp-content/uploads/2020/05/iStock-1188116818.jpg", "https://cdn.britannica.com/25/93825-050-D1300547/collection-newspapers.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/The_Indianapolis_Star%2C_2011.jpg/1200px-The_Indianapolis_Star%2C_2011.jpg"]

  return (
    <>
      <NavbarComponent name={ applicationName } />
      <MainPageBigImage description={ applicationDescription } projectName={ projectName } 
      imageUrl={imageUrl}/>
      <Mission description={ourMission} imageUrl={ourMissionImage3} />
      <Services titles={titles} descriptions={descriptions} images={images}/>
      <Map />
      <Footer />
    </>
  )
}

export default App
