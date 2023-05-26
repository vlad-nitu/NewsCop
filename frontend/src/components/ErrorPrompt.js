/**
 * The error prompt that is shown after entering the url, if a problem occurs.
 * @param prompt the prompt of the error
 * @returns {JSX.Element} the element that contains the error
 */
export default function ErrorPrompt ({ prompt }) {
  return (
    <div>
      <div className='d-flex flex-column justify-content-center mx-auto'>
        <div className='mb-3 mx-auto'>
          <h2 className='description-overlap' id='forErrorPrompt'>{prompt}</h2>
        </div>
      </div>
    </div>
  )
}
