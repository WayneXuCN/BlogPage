/**
 * Comments.tsx
 * giscus 评论组件（React）
 * 支持主题同步和视图过渡持久化
 * 
 * 使用方式：
 * <Comments client:visible lang={lang} giscus={siteConfig.giscus} />
 */
import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';

interface GiscusConfig {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: 'url' | 'title' | 'og:title' | 'specific' | 'number' | 'pathname';
  lang: string;
  strict?: boolean;
  reactionsEnabled?: boolean;
  emitMetadata?: boolean;
  inputPosition?: 'top' | 'bottom';
}

interface CommentsProps {
  lang?: 'zh' | 'en';
  giscus: GiscusConfig;
}

export default function Comments({ lang = 'zh', giscus }: CommentsProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // 初始化主题
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    // 监听主题变化 - 使用 MutationObserver 监听 class 变化
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setTheme(isDark ? 'dark' : 'light');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // 监听自定义主题切换事件
    const handleThemeChange = (e: CustomEvent<{ theme: string }>) => {
      setTheme(e.detail.theme as 'light' | 'dark');
    };

    window.addEventListener('theme-change', handleThemeChange as EventListener);

    // 监听 Astro 页面加载事件（用于 View Transitions）
    const handlePageLoad = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };

    document.addEventListener('astro:page-load', handlePageLoad);

    return () => {
      observer.disconnect();
      window.removeEventListener('theme-change', handleThemeChange as EventListener);
      document.removeEventListener('astro:page-load', handlePageLoad);
    };
  }, []);

  return (
    <div className='giscus-wrapper' data-theme={theme}>
      <Giscus
        id='comments'
        repo={giscus.repo as `${string}/${string}`}
        repoId={giscus.repoId}
        category={giscus.category}
        categoryId={giscus.categoryId}
        mapping={giscus.mapping as 'url' | 'title' | 'og:title' | 'specific' | 'number' | 'pathname'}
        strict={giscus.strict ? '1' : '0'}
        reactionsEnabled={giscus.reactionsEnabled !== false ? '1' : '0'}
        emitMetadata={giscus.emitMetadata ? '1' : '0'}
        inputPosition={giscus.inputPosition || 'bottom'}
        theme={theme === 'dark' ? 'dark' : 'light'}
        lang={lang === 'zh' ? 'zh-CN' : 'en'}
        loading='lazy'
      />
    </div>
  );
}
