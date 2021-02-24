export default class SearchResult {
  isRevoked: boolean;
  results: Array<any>;
  constructor(isRevoked: boolean, results: Array<any>) {
    this.results = results;
    this.isRevoked = isRevoked;
  }
}
