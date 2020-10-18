const fs = require('fs')
const globby = require('globby')

async function generateSiteMap() {
    const pages = await globby([
        'pages/**/*.tsx',
        '!pages/[lang]/test.tsx',
        '!pages/_app.tsx',
        '!pages/index.tsx',
        '!pages/_document.tsx',
        'pages/[lang]/*.tsx',
    ])

    const sitemap = `
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${pages
            .map(page => {
                const path = page
                    .replace('pages', '')
                    .replace('.tsx', '')
                const route = path === '/index' ? '' : path
                return `
                      <url>
                          <loc>${`https://applepie.berlin${route.replace(/(\[lang\])/g, 'de')}`}</loc>
                      </url>
                      <url>
                         <loc>${`https://applepie.berlin${route.replace(/(\[lang\])/g, 'en')}`}</loc>
                      </url>
                  `
            })
            .join('')}
      </urlset>
  `

    fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSiteMap()