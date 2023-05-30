import ListURLs from './ListURLs'

/**
 * The decision that is shown after entering the url.
 * @param items the list of articles which will be displayed
 * @param similarities the list of similarities with the given articles used to display the progress bar
 * @param publishingDate the publishing date of the article
 * @param decision the decision, i.e. whether the article was plagiarised
 * @returns {JSX.Element} the element that contains the decision
 */
export default function CheckUrlDecision ({ sourceUrl, urls, titles, publishers, dates, similarities }) {
  return (
    <div>
      <div className='d-flex flex-column'>
        <div className='mb-3 mt-3'>
          <h2>We found the following similar articles:</h2>
          <hr />
          <ListURLs sourceUrl={sourceUrl} urls={urls} titles={titles} publishers={publishers} dates={dates} similarities={similarities} />
        </div>
      </div>
    </div>
  )
}
