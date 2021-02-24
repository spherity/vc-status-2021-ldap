export default class LdapSettings {
    protocol: string;
    host: string;
    query: string;
    params: Array<string>;
    constructor(protocol: string, host: string, query: string, params: Array<string>);
}
