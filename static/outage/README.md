# Outage pages (PoliticalCompass / ideologos.site server)

Served automatically when the request **Host** is:

| Domain | Page |
|--------|------|
| `shishapoint.site` / `www.shishapoint.site` | Order at the bar |
| `peqi.hair` / `www.peqi.hair` | Call **2897 023232** |

Preview on the main site (not linked publicly):

- `https://ideologos.site/outage/shishapoint`
- `https://ideologos.site/outage/peqi`

## During Hostman outage

1. Point DNS **A record** for `shishapoint.site` and `peqi.hair` to the **same IP** as ideologos.site (PoliticalCompass server).
2. Redeploy or restart PoliticalCompass if you changed code (`npm run build:deploy` then restart).
3. Visitors hitting those domains see the apology page; ideologos.site keeps working normally.

When the main apps are back, point DNS back to Hostman.
