import SearchResult from './SearchResult';
import LdapSettings from './LdapSettings';
declare class LDAPRevocationVerifier {
    timeout: number;
    connectTimeout: number;
    constructor(timeout?: number, connectTimeout?: number);
    verify(settings: LdapSettings): Promise<SearchResult>;
}
export { LDAPRevocationVerifier };
