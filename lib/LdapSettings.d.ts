export default class LdapSettings {
    ssl: boolean;
    host: string;
    query: string;
    params: Array<string>;
    constructor(ssl: boolean, host: string, query: string, params: Array<string>);
}
