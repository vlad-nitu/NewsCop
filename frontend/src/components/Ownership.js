import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * The Ownership that is shown after entering two URLs, if both dates were able to be retrieved 
 * and there is a high overlap between the two aricles.
 * It also displays an arrow in the Source's colors to indicate which URL was the first publisher
 * * @param prompt the prompt of the error
 * @returns {JSX.Element} the element that contains the error
 */

export default function Ownership({ result }) {
  return (
    <div className='d-flex  justify-content-center mx-auto'>
      {
        result.includes("right") ? (
          <>
            <h2 className="description-overlap d-inline-block" data-testid="ownership-prompt"> {result}</h2>
            <FontAwesomeIcon icon={faArrowTurnUp} style={{ color: "#2e837e", }} className="d-inline-block float-right turn-up-arrow-icon ml-2" data-testid="turn-up-icon"/>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faArrowTurnUp} flip="horizontal" style={{ color: "#2e837e", }} className="d-inline-block float-right turn-up-arrow-icon ml-2" data-testid="turn-up-icon"/>
            <h2 className="description-overlap d-inline-block" data-testid="ownership-prompt"> {result}</h2>
          </>
        )
      }
    </div>
  );
}
