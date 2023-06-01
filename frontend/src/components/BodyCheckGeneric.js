/**
 *  A container that will hold the similarity header and description subheader that
 *   can be found on the Figma wireframe.
 *
 * @param description the first description, which looks like a header
 * @param secondDescription the second description, which looks like a subheader
 * @returns {JSX.Element} that represents the similarity text and description of our tool;
 * Can be found directly under the navbar component of the page
 */
export default function BodyCheckGeneric ({ description, secondDescription }) {
  return (
    <div className='my-md-3 mt-3'>
      <div className='mb-3'>
        <h2 className='title text-center' id='plagiarismChecker'>{description}</h2>
      </div>
      <div className='mb-4'>
        <p className='description-paragraph text-center'>{secondDescription}</p>
      </div>
    </div>
  )
}
