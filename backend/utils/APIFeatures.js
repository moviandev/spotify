class APIFeatures {
  constructor(queryString, query) {
    this.queryString = queryString;
    this.query = query;
  }

  sort() {
    // Check if it has a query
    if (this.queryString.sort) {
      // Eliminates the comma in the query and join them by spaces
      const sortBy = this.queryString.sort.split(',').join(' ');

      // Stores into the query string the sort option
      this.queryString = this.query.sort(sortBy);

      // If theres no query the musics will sorted by title
    } else this.query = this.query.sort('-title');

    // Return this to the global scope
    return this;
  }
}

module.exports = APIFeatures;
