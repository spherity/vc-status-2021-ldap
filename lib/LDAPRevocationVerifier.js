"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LDAPRevocationVerifier = void 0;
const ldap_escape_1 = __importDefault(require("ldap-escape"));
const ldapts_1 = require("ldapts");
const SearchResult_1 = __importDefault(require("./SearchResult"));
class LDAPRevocationVerifier {
    constructor(timeout = 10000, connectTimeout = 10000) {
        this.timeout = timeout;
        this.connectTimeout = connectTimeout;
    }
    async verify(settings) {
        const escapedQuery = settings.query.replace(/{{\w+}}/g, function (index) {
            return ldap_escape_1.default.dn `${settings.params[+index.replace(/{|}/g, '')]}`;
        });
        const protocol = settings.ssl === true ? 'ldap' : 'ldaps';
        const client = new ldapts_1.Client({
            url: `${protocol}://${settings.host}`,
            timeout: this.timeout,
            connectTimeout: this.connectTimeout,
            tlsOptions: { rejectUnauthorized: false },
        });
        try {
            const { searchEntries } = await client.search(escapedQuery, {
                scope: 'sub',
            });
            await client.unbind();
            return new SearchResult_1.default(true, searchEntries);
        }
        catch (err) {
            await client.unbind();
            if (err.message === 'Connection timeout' ||
                err.message === 'SearchRequest: Operation timed out') {
                throw new Error(`LDAP servcer does not respond when requsting data using LDAP URI: ${protocol}://${settings.host}`);
            }
            if (err.code === 32) {
                return new SearchResult_1.default(false, new Array());
            }
            throw err.message;
        }
    }
}
exports.LDAPRevocationVerifier = LDAPRevocationVerifier;
