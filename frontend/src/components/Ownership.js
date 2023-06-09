import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * The Ownership that is shown after entering two URLs, if both dates were able to be retrieved 
 * and there is a high overlap between the two aricles.
 * @param prompt the prompt of the error
 * @returns {JSX.Element} the element that contains the error
 */

export default function Ownership({ result }) {
  return (
    <div className='d-flex  justify-content-center mx-auto'>
      {
        result.includes("right") ? (
          <>
            <h2 className="description-overlap d-inline-block" data-testid="ownership-prompt"> {result}</h2>
            <FontAwesomeIcon icon={faArrowTurnUp} style={{ color: "#2e837e", }} className="d-inline-block float-right turn-up-arrow-icon ml-2" />
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faArrowTurnUp} flip="horizontal" style={{ color: "#2e837e", }} className="d-inline-block float-right turn-up-arrow-icon ml-2" />
            <h2 className="description-overlap d-inline-block" data-testid="ownership-prompt"> {result}</h2>
          </>
        )
      }
    </div>
  );
}
