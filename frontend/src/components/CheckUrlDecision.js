import React from 'react'
import SimilaritySettings from './SimilaritySettings'

/**
 * The decision that is shown after entering the url. If no articles were found, a special message is displayed.
 * @param items the list of articles which will be displayed
 * @param similarities the list of similarities with the given articles used to display the progress bar
 * @param publishingDate the publishing date of the article
 * @param decision the decision, i.e. whether the article was plagiarised
 * @returns {JSX.Element} the element that contains the decision
 */
export default function CheckUrlDecision ({ type, sourceArticle, articles, display }) {
  return (
    <div data-testid='check-decision' id='similar_articles' style={{ display: display }}>
      <div className='d-flex flex-column'>
        <div className='mb-3 mt-3'>
          <div className='text-center'>
            <div className='pe-3'>
              <h2>For your {type}:</h2>
              <a href={sourceArticle.url} target='_blank' rel='noopener noreferrer' style={{ color: '#000000', fontWeight: 'bold' }}>
                {sourceArticle.title}
              </a>
              {
                      ((sourceArticle.date !== 'N/A' && sourceArticle.date !== null) && (
                        <div className='pt-2'>
                          <h2>
                            That was published on:
                          </h2>
                          <div style={{ fontWeight: 'bold' }}>
                            {sourceArticle.date}
                          </div>
                        </div>))
                  }
            </div>
          </div>
          {articles.length === 0
            ? (<h2 className='pt-3 text-center'>We found no similar articles</h2>)
            : (
              <div className='pt-3'>
                <h2>We found the following similar articles:</h2>
                <hr />
                <SimilaritySettings type={type} sourceUrl={sourceArticle.url} articles={articles} />
              </div>)}
        </div>
      </div>
    </div>
  )
}
