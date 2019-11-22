class APIFeatures {
  constructor(queryString, query) {
    this.queryString = queryString;
    this.query = query;
  }

  sort() {
    // Check if it has a query
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.queryString = this.query.sort(sortBy);
    } else this.query = this.query.sort('-title');

    return this;
  }
}

module.exports = APIFeatures;
