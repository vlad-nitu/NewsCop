import ProgressLineCustom from './ProgressLineCustom'
import { ListGroup } from 'react-bootstrap'

/**
 * Displays a list of articles together with their similarities
 * @param items the list of articles which will be displayed
 * @param similarities the list of similarities with the given articles used to display the progress bar
 * @returns {JSX.Element} the element that contains the list
 */

export default function ListURLs({ items, similarities }) {
  if (items === null || items.length === 0) {
    return <p>No articles were found</p>;
  } else {
    return (
      <div>
        <div style={{ float: 'left', fontSize: '28px', marginTop: '8vh', marginBottom: "2vh"}}>
          We found the following similar articles:
        </div>
        <div style={{ clear: 'both', borderTop: '1px solid #000', paddingTop: '2vh' }}></div> {/* Clear the float */}
        <ListGroup style={{ marginLeft: '0'}}> {/* Set marginLeft to 0 to align with the left-aligned div */}
          {items.map((item, index) => (
            <ListGroup.Item key={index} style={{ marginBottom: '3vh', borderRadius: '8px', border: '1px solid #000', display: 'flex', alignItems: 'center' }}>
              <a href={item} target="_blank" rel="noopener noreferrer" style={{ display: 'block', maxWidth: '20%', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                {item}
              </a>
              <ProgressLineCustom progress={similarities[index]} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  }
}