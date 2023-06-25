/**
 * Represents a class with properties for URLs, titles, publishers, dates, and similarities which are displayed on the
 * pages when searching for overlapping.
 */
export default class Article {
  /**
     * Constructs a new instance of ArticleData.
     */
  constructor (url, title, publisher, date, similarity) {
    this.url = url
    this.title = title
    this.publisher = publisher
    this.date = date
    this.similarity = similarity
  }
}
