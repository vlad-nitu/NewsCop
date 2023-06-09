import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * Renders the Ownership component, displaying ownership information based on the result and dates.
 * The Ownership is shown after entering two URLs, if both dates were able to be retrieved and there is a high overlap between the two aricles.
 * It also displays an 'ArrowTurnUp` icon in the Source's colors to indicate which URL was the first publisher
 * @param {Object} props - The component props.
 * @param {string} props.result - The ownership result, indicating which input likely owns the content.
 * @param {string} props.dateLeft - The date of the left news article.
 * @param {string} props.dateRight - The date of the right news article.
 * @returns {JSX.Element} The rendered Ownership component.
 */
export default function Ownership ({ result, dateLeft, dateRight }) {
  if (result.includes('right')) {
    return (
      <>
        <div className='d-flex  justify-content-center mx-auto mt-5'>
          <h2 className='description-overlap d-inline-block' data-testid='ownership-prompt'> {result}</h2>
          <FontAwesomeIcon icon={faArrowTurnUp} style={{ color: '#2e837e' }} className='d-inline-block float-right turn-up-arrow-icon ml-2' data-testid='turn-up-icon' />
        </div>
        <div>
          <h2 className='description-overlap' data-testid='date-left-prompt'> {`The left news article was published on: ${dateLeft}`}</h2>
          <h2 className='description-overlap' data-testid='date-right-prompt'> {`The right news article was published on: ${dateRight}`}</h2>
        </div>
      </>

    )
  } else if (result.includes('left')) {
    return (
      <>
        <div className='d-flex  justify-content-center mx-auto mt-5'>
          <FontAwesomeIcon icon={faArrowTurnUp} flip='horizontal' style={{ color: '#2e837e' }} className='d-inline-block float-right turn-up-arrow-icon ml-2' data-testid='turn-up-icon' />
          <h2 className='description-overlap d-inline-block' data-testid='ownership-prompt'> {result}</h2>
        </div>
        <div>
          <h2 className='description-overlap' data-testid='date-left-prompt'> {`The left news article was published on: ${dateLeft}`}</h2>
          <h2 className='description-overlap' data-testid='date-right-prompt'> {`The right news article was published on: ${dateRight}`}</h2>
        </div>
      </>
    )
  } else {
    return (
      <div className='d-flex  justify-content-center mx-auto mt-5'>
        <h2 className='description-overlap d-inline-block' data-testid='ownership-prompt'> {result}</h2>
      </div>
    )
  }
}
