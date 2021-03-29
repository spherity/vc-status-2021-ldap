export default class LdapSettings {
  ssl: boolean;
  host: string;
  query: string;
  params: Array<string>;

  constructor(
    ssl: boolean,
    host: string,
    query: string,
    params: Array<string>
  ) {
    this.ssl = ssl;
    this.host = host;
    this.query = query;
    this.params = params;
  }
}
