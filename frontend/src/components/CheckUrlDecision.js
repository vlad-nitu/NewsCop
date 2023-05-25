/**
 * The decision that is shown after entering the url.
 * @param title the title of the article
 * @param publishingDate the publishing date of the article
 * @param decision the decision, i.e. whether the article was plagiarised
 * @returns {JSX.Element} the element that contains the decision
 */
export default function CheckUrlDecision ({ title }) {
  return (
    <div>
      <div className='d-flex flex-column justify-content-center mx-auto'>
        <div className='mb-3 mx-auto'>
          <h2 className='description-overlap' id='forArticle'>{title}</h2>
        </div>
      </div>
    </div>
  )
}
