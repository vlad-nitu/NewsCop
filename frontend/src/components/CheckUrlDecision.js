import ListURLs from './ListURLs'

/**
 * The decision that is shown after entering the url.
 * @param items the list of articles which will be displayed
 * @param similarities the list of similarities with the given articles used to display the progress bar
 * @param publishingDate the publishing date of the article
 * @param decision the decision, i.e. whether the article was plagiarised
 * @returns {JSX.Element} the element that contains the decision
 */
export default function CheckUrlDecision ({ source_url, urls, titles, publishers, dates, similarities }) {
  return (
    <div>
      <div className='d-flex flex-column justify-content-center mx-auto'>
        <div className='mb-3 mx-auto'>
          <h2 className='description-overlap'>
            <ListURLs source_url = {source_url} urls={urls} titles={titles} publishers={publishers} dates={dates} similarities={similarities} />
          </h2>
        </div>
      </div>
    </div>
  )
}
