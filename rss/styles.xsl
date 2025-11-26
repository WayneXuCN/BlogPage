<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> - RSS Feed</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style type="text/css">
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Noto Sans SC', system-ui, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f9fafb;
            padding: 2rem;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
          }
          header {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
          }
          header h1 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
          }
          header p {
            opacity: 0.9;
            font-size: 0.95rem;
          }
          .rss-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255,255,255,0.2);
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            margin-bottom: 1rem;
          }
          .rss-badge svg {
            width: 14px;
            height: 14px;
          }
          .posts {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          article {
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: transform 0.2s, box-shadow 0.2s;
          }
          article:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
          article h2 {
            font-size: 1.125rem;
            margin-bottom: 0.5rem;
          }
          article h2 a {
            color: #111;
            text-decoration: none;
          }
          article h2 a:hover {
            color: #2563eb;
          }
          article .description {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
          }
          article .meta {
            font-size: 0.8rem;
            color: #999;
          }
          .subscribe-info {
            background: #fff7ed;
            border: 1px solid #fed7aa;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 2rem;
            font-size: 0.9rem;
          }
          .subscribe-info code {
            background: #fef3c7;
            padding: 0.125rem 0.375rem;
            border-radius: 4px;
            font-size: 0.85em;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div class="rss-badge">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20 5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z"/>
              </svg>
              RSS Feed
            </div>
            <h1><xsl:value-of select="/rss/channel/title"/></h1>
            <p><xsl:value-of select="/rss/channel/description"/></p>
          </header>
          
          <div class="subscribe-info">
            📡 这是一个 RSS 订阅源。复制当前页面的 URL 到你的 RSS 阅读器即可订阅。
          </div>
          
          <div class="posts">
            <xsl:for-each select="/rss/channel/item">
              <article>
                <h2>
                  <a>
                    <xsl:attribute name="href">
                      <xsl:value-of select="link"/>
                    </xsl:attribute>
                    <xsl:value-of select="title"/>
                  </a>
                </h2>
                <p class="description"><xsl:value-of select="description"/></p>
                <div class="meta">
                  <xsl:value-of select="pubDate"/>
                </div>
              </article>
            </xsl:for-each>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
