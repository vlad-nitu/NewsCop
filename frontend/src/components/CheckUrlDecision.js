import ListURLs from './ListURLs'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Slider } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React from 'react'
import { collect } from 'collect.js'

/**
 * The decision that is shown after entering the url. If no articles were found, a special message is displayed.
 * @param items the list of articles which will be displayed
 * @param similarities the list of similarities with the given articles used to display the progress bar
 * @param publishingDate the publishing date of the article
 * @param decision the decision, i.e. whether the article was plagiarised
 * @returns {JSX.Element} the element that contains the decision
 */
export default function CheckUrlDecision ({ type, sourceArticle, articles, display }) {
  const [articlesAmount, setArticlesAmount] = React.useState(5)
  const [ratioValue, setRatioValue] = React.useState(0)
  const [resultArticles, setResultArticles] = React.useState(articles)

  const handleRatioValueChange = (event) => {
    setRatioValue(event.target.value)
    setResultArticles(articles.filter(a => a.similarity >= ratioValue))
  }

  const handleArticlesAmountChange = (event) => {
    setArticlesAmount(event.target.value)
    setResultArticles(collect(articles).take(articlesAmount - 1))
  }

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
                <ListURLs type={type} sourceUrl={sourceArticle.url} articles={resultArticles} />
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                  >
                    <Typography>Options</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <Typography>Filtering ratio: {ratioValue}</Typography>
                      <Slider value={ratioValue} onChange={handleRatioValueChange} min={0} max={100} />
                    </div>
                    <div>
                      <Typography>Number of articles: {articlesAmount}</Typography>
                      <Slider value={articlesAmount} onChange={handleArticlesAmountChange} min={1} max={10} />
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>)}
        </div>
      </div>
    </div>
  )
}
