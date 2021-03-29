import ldapEscape from 'ldap-escape';
import { Client } from 'ldapts';

import SearchResult from './SearchResult';
import LdapSettings from './LdapSettings';

class LDAPRevocationVerifier {
  timeout: number;
  connectTimeout: number;

  constructor(timeout = 10000, connectTimeout = 10000) {
    this.timeout = timeout;
    this.connectTimeout = connectTimeout;
  }

  async verify(settings: LdapSettings): Promise<SearchResult> {
    const escapedQuery = settings.query.replace(
      /{{\w+}}/g,
      function (index: string) {
        return ldapEscape.dn`${settings.params[+index.replace(/{|}/g, '')]}`;
      }
    );
    const protocol = settings.ssl === true ? 'ldap' : 'ldaps';
    const client = new Client({
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
      return new SearchResult(true, searchEntries);
    } catch (err) {
      await client.unbind();

      if (
        err.message === 'Connection timeout' ||
        err.message === 'SearchRequest: Operation timed out'
      ) {
        throw new Error(
          `LDAP servcer does not respond when requsting data using LDAP URI: ${protocol}://${settings.host}`
        );
      }

      if (err.code === 32) {
        return new SearchResult(false, new Array<any>());
      }

      throw err.message;
    }
  }
}

export { LDAPRevocationVerifier };
