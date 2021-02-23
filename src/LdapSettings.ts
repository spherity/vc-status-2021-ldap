export default class LdapSettings {
  protocol: string;
  host: string;
  query: string;
  params: Array<string>;

  constructor(
    protocol: string,
    host: string,
    query: string,
    params: Array<string>
  ) {
    this.protocol = protocol;
    this.host = host;
    this.query = query;
    this.params = params;
  }
}
