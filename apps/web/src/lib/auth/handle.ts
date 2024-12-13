type DNSLookupAnswer = {
  TTL: number;
  data: string;
  name: string;
  type: number;
};

type DNSLookup = {
  Answer: DNSLookupAnswer[];
};

export const dnsLookup = async (domain: string, type: string = 'A') => {
  const url = new URL(`https://cloudflare-dns.com/dns-query`);
  url.searchParams.append('name', domain);
  url.searchParams.append('type', type);

  const res = await fetch(url, {
    headers: { 'Accept': 'application/dns-json' },
  });

  return (await res.json()) as DNSLookup;
};

/**
 * Resolves a handle from DNS (first) or HTTP to a DID.
 */
export const resolveHandle = async (handle: string) => {
  const domain = await dnsLookup(`_atproto.${handle}`, 'TXT');
  if (domain.Answer) {
    const { data } = domain.Answer[0];
    console.log(data);
    if (!data.startsWith('"did=did:')) {
      throw new Error(`Invalid TXT response to _atproto.${handle} DNS query.`);
    }
    return data.split('=')[1].replace('"', '');
  } else {
    // No DNS record found, try with HTTP.
    const res = await fetch(`https://${handle}/.well-known/atproto-did`);
    const data = await res.text();
    if (!data.startsWith('did:')) {
      throw new Error(`Invalid response to https://${handle}/.well-known/atproto-did.`);
    }
    return data;
  }
};
