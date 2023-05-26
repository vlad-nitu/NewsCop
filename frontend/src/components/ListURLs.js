import ProgressBarCustom from './ProgressBarCustom'
import ProgressLineCustom from './ProgressLineCustom'
import { ListGroup } from 'react-bootstrap'

/**
 * Displays a list of articles together with their similarities
 * @param items the list of articles which will be displayed
 * @param similarities the list of similarities with the given articles used to display the progress bar
 * @returns {JSX.Element} the element that contains the list
 */

export default function ListURLs ({ items, similarities }) {
  if (items === null || items.length === 0) { return <p>No articles were found</p> } else {
    return (
      <ListGroup>
        {items.map((item, index) => (
          <ListGroup.Item key={index}>
            <p>{item}</p>
            <ProgressBarCustom similarity={similarities[index]} />
            <ProgressLineCustom progress={similarities[index]} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
  }
}
