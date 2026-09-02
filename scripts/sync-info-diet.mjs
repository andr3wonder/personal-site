/**
 * OPTIONAL build-time Notion adapter for the Info Diet section.
 *
 * This is opt-in and is NOT wired into `npm run build`. The site ships with a
 * static Info Diet in `src/data/content.ts` taken from the public Notion page,
 * and that static list is always the fallback. Nothing here runs unless you
 * explicitly run `npm run sync:info-diet` with credentials in your shell.
 *
 * The site does NOT claim to be live-synced with Notion, because this adapter
 * has not been configured or run for the deployed build.
 *
 * Usage (credentials stay in your shell, never in the repo):
 *
 *   export NOTION_TOKEN=secret_xxx
 *   export NOTION_INFO_DIET_DB_ID=xxxxxxxxxxxx
 *   npm run sync:info-diet
 *
 * It writes `src/data/info-diet.generated.json`, which is gitignored. If that
 * file is absent the app uses the static list, so production never breaks.
 *
 * SECURITY: never commit a Notion token. `.env*` and the generated JSON are
 * both gitignored. This script refuses to run without a token, and it never
 * prints the token.
 */

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/info-diet.generated.json');

const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_INFO_DIET_DB_ID;

if (!token || !databaseId) {
  console.error(
    'Skipping Info Diet sync: set NOTION_TOKEN and NOTION_INFO_DIET_DB_ID in your shell first.\n' +
      'The site will keep using the static Info Diet in src/data/content.ts.',
  );
  process.exit(1);
}

/** Pulls the plain-text value out of whichever Notion property type it is. */
function readProperty(property) {
  if (!property) return '';
  switch (property.type) {
    case 'title':
      return property.title.map((t) => t.plain_text).join('');
    case 'rich_text':
      return property.rich_text.map((t) => t.plain_text).join('');
    case 'select':
      return property.select?.name ?? '';
    case 'multi_select':
      return property.multi_select.map((s) => s.name).join(', ');
    case 'url':
      return property.url ?? '';
    default:
      return '';
  }
}

async function main() {
  const rows = [];
  let cursor;

  do {
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cursor ? { start_cursor: cursor } : {}),
    });

    if (!res.ok) {
      throw new Error(
        `Notion API returned ${res.status}. Check that the integration has access to this database.`,
      );
    }

    const page = await res.json();
    for (const result of page.results) {
      const props = result.properties ?? {};
      const titleKey = Object.keys(props).find((k) => props[k].type === 'title');
      rows.push({
        title: titleKey ? readProperty(props[titleKey]) : '',
        category: readProperty(props.Category ?? props.Type ?? props.Tags),
        url: readProperty(props.URL ?? props.Link) || result.url,
      });
    }

    cursor = page.has_more ? page.next_cursor : undefined;
  } while (cursor);

  const grouped = new Map();
  for (const row of rows) {
    if (!row.title) continue;
    const key = row.category || 'Uncategorised';
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  }

  const payload = {
    syncedAt: new Date().toISOString(),
    categories: [...grouped.entries()].map(([label, items]) => ({ label, items })),
  };

  await writeFile(OUT, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${rows.length} Info Diet entries to ${OUT}`);
}

main().catch((err) => {
  console.error(`Info Diet sync failed: ${err.message}`);
  console.error('The static Info Diet in src/data/content.ts remains in use.');
  process.exit(1);
});
