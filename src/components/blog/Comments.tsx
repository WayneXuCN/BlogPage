/**
 * Comments.tsx
 * giscus 评论组件（React）
 * 支持主题同步
 */
import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';

interface GiscusConfig {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: string;
  lang: string;
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

    // 监听主题变化
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

    return () => {
      observer.disconnect();
      window.removeEventListener('theme-change', handleThemeChange as EventListener);
    };
  }, []);

  return (
    <div className='giscus-wrapper'>
      <Giscus
        id='comments'
        repo={giscus.repo as `${string}/${string}`}
        repoId={giscus.repoId}
        category={giscus.category}
        categoryId={giscus.categoryId}
        mapping={giscus.mapping}
        strict={giscus.strict ? '1' : '0'}
        reactionsEnabled={giscus.reactionsEnabled ? '1' : '0'}
        emitMetadata={giscus.emitMetadata ? '1' : '0'}
        inputPosition={giscus.inputPosition}
        theme={theme === 'dark' ? 'dark' : 'light'}
        lang={lang === 'zh' ? 'zh-CN' : 'en'}
        loading='lazy'
      />
    </div>
  );
}
