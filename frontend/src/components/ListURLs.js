/**
 * Displays a list of articles together with their similarities
 * @param items the list of articles which will be displayed
 * @returns {JSX.Element} the element that contains the list
 */

export default function ListURLs ({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}
