import NavbarComponent from './navbar'
import MainPageBigImage from './mainPageBigImage'
import Mission from './mission'
import Services from './services'
import Footer from './footer'
import Map from './map'

/**
 * This will be our main home page that we will first display. See also the main page from the Figma mock-up.
 *
 * @returns {JSX.Element} that hosts all the elements in our main page
 */
export default function Home () {
  const applicationName = 'NewsCop'
  const applicationDescription = 'NewsCop is a news article ' +
        'overlap detection platform that helps businesses stay on ' +
        "top of competitors' news coverage. Our service quickly " +
        'checks for duplicated stories, allowing you to spot ' +
        'trends and identify opportunities to maximize coverage. ' +
        "With NewsCop, you'll never miss a story."
  const projectName = 'News article overlap'
  const imageUrl = './background_image.png'

  const ourMission = 'Creating a platform that provides various ways of ' +
        'comparing news articles, helping users to identify overlapping content ' +
        'quickly and accurately and, consequently, decreasing the impact of ' +
        'missinformation and plagiarism in the media.'

  // const ourMissionImage = 'https://gcdnb.pbrd.co/images/e5PfBZ9MCJqB.jpg?o=1'
  // const ourMissionImage2 = 'https://thumbs.dreamstime.com/b/man-looking-over-newspaper-62558573.jpg'
  const ourMissionImage3 = './ourMissionImage.png'

  const titles = ['URL plagiarism checker', 'Text plagiarism checker', 'Text similarity checker']
  const descriptions = ['NewsCop provides users with a way of checking the URL of a news article against a large database of articles for fast and accurate plagiarism detection.',
    'NewsCop provides users with a way of checking the text of a news article against a large database of articles for fast and accurate plagiarism detection.', 'Test the similarity between two news articles by using this poweful tool which enables you to input two URLs of media content and see the alikeness of the two']
  const images = ['service1.jpeg', 'service2.webp', 'service3.jpeg']

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

      {/* Map Section */}
      <Map />

      {/* Footer */}
      <Footer />
    </>
  )
}
