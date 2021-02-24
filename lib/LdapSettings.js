"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LdapSettings {
    constructor(protocol, host, query, params) {
        this.protocol = protocol;
        this.host = host;
        this.query = query;
        this.params = params;
    }
}
exports.default = LdapSettings;
