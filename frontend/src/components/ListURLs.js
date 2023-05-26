import ProgressBarCustom from './ProgressBarCustom'
import ProgressLineCustom from './ProgressLineCustom'
/**
 * Displays a list of articles together with their similarities
 * @param items the list of articles which will be displayed
 * @param similarities the list of similarities with the given articles used to display the progress bar
 * @returns {JSX.Element} the element that contains the list
 */

export default function ListURLs ({ items, similarities }) {
  if (items === null || items.length === 0) { return <p>No articles were found</p> } else {
    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}
            <ProgressBarCustom similarity={similarities[index]} />
            <ProgressLineCustom progress={similarities[index]} />
          </li>
        ))}
      </ul>
    )
  }
}
