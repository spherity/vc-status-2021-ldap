"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LdapSettings {
    constructor(ssl, host, query, params) {
        this.ssl = ssl;
        this.host = host;
        this.query = query;
        this.params = params;
    }
}
exports.default = LdapSettings;
