/**
 * The Ownership that is shown after entering two URLs, if both dates were able to be retrieved 
 * and there is a high overlap between the two aricles.
 * @param prompt the prompt of the error
 * @returns {JSX.Element} the element that contains the error
 */
export default function Ownership ({ result }) {
  return (
    <div>
      <div className='d-flex flex-column justify-content-center mx-auto'>
        <div className='mb-3 mx-auto'>
          <h2 className='description-overlap' data-testid='ownership-prompt' id='ownershipPrompt'>{result}</h2>
        </div>
      </div>
    </div>
  )
}
