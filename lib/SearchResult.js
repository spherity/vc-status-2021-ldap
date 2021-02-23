"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SearchResult {
    constructor(isRevoked, results) {
        this.results = results;
        this.isRevoked = isRevoked;
    }
}
exports.default = SearchResult;
