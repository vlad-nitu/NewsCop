import ListURLs from './ListURLs'

/**
 * The decision that is shown after entering the url. If no articles were found, a special message is displayed.
 * @param items the list of articles which will be displayed
 * @param similarities the list of similarities with the given articles used to display the progress bar
 * @param publishingDate the publishing date of the article
 * @param decision the decision, i.e. whether the article was plagiarised
 * @returns {JSX.Element} the element that contains the decision
 */
export default function CheckUrlDecision ({ sourceArticle, articles }) {
  return (
    <div>
      <div className='d-flex flex-column'>
        <div className='mb-3 mt-3'>
            <div>
              <div className='pe-3 title-wrapper'>
                <h1>For your article</h1>
                <a href={sourceArticle.url} target='_blank' rel='noopener noreferrer' style={{color:"#000000", fontWeight: 'bold'}}>
                  {sourceArticle.title}
                </a>
                  {
                      ((sourceArticle.date !== 'N/A' && sourceArticle.date !== null) &&  (
                          <div>
                              <div>
                                  That was published on:
                              </div>
                              <div style={{fontWeight: 'bold'}}>
                                  {sourceArticle.date}
                              </div>
                      </div>))
                  }
              </div>
            </div>
          {articles.length === 0
            ? (<h2>We found no similar articles</h2>)
            : (
              <div>
                <h2>We found the following similar articles:</h2>
                <hr />
                <ListURLs sourceUrl={sourceArticle.url} articles={articles} />
              </div>)}

        </div>
      </div>
    </div>
  )
}
