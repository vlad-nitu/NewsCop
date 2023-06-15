import NavbarComponent from './navbar'
import MainPageBigImage from './mainPageBigImage'
import Mission from './mission'
import Services from './services'
import Statistics from './Statistics'
import Footer from './footer'
import MapCustom from './map'

/**
 * This will be our main home page that we will first display. See also the main page from the Figma mock-up.
 *
 * @returns {JSX.Element} that hosts all the elements in our main page
 */
export default function Home ({ applicationName, applicationDescription, ourMission }) {
  const projectName = 'News article overlap'
  const imageUrl = './background_image.png'
  // const ourMissionImage = 'https://gcdnb.pbrd.co/images/e5PfBZ9MCJqB.jpg?o=1'
  // const ourMissionImage2 = 'https://thumbs.dreamstime.com/b/man-looking-over-newspaper-62558573.jpg'
  const ourMissionImage3 = './ourMissionImage.png'

  const titles = ['URL similarity checker', 'Text similarity checker', 'Similarity checker for two texts', 'Similarity checker for two URLs']
  const descriptions = ['NewsCop provides users with a way of checking the URL of a news article against a large database of articles for fast and accurate overlap detection.',
    'NewsCop provides users with a way of checking the text of a news article against a large database of articles for fast and accurate overlap detection.', 'Test the similarity between two news articles by using this powerful tool which enables you to compare two paragraphs of media content.',
    'Test the similarity between two news articles by using this powerful tool which enables you to input two URLs of media content and see the likeness of the two.']
  const images = ['service1.jpeg', 'service2.webp', 'service3.jpeg', 'service4.jpeg']

  const statisticsTitles = [' articles', ' users', ' articles']
  const statisticsDescription = ['are stored in the database', 'in the last 24 hours', 'have been checked for overlapping in the last 24 hours']
  const statisticsImages = ['newspaper-regular.svg', 'user-regular.svg', 'list-check-solid.svg']

  return (
    <>
      {/* Navbar */}
      <NavbarComponent name={applicationName} mainPage />

      {/* Big image with text */}
      <MainPageBigImage
        description={applicationDescription} projectName={projectName}
        imageUrl={imageUrl}
      />

      {/* Our Mission Section */}
      <Mission description={ourMission} imageUrl={ourMissionImage3} />

      {/* Services Section */}
      <Services titles={titles} descriptions={descriptions} images={images} />

      {/* Statistics Section */}
      <Statistics titles={statisticsTitles} descriptions={statisticsDescription} images={statisticsImages} />

      {/* Map Section */}
      <MapCustom />

      {/* Footer */}
      <Footer />
    </>
  )
}
