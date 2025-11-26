/**
 * TikZ 渲染脚本
 * 
 * 使用 node-tikzjax 将 TikZ 代码渲染为 SVG
 * 
 * 用法：
 * bun run scripts/render-tikz.ts <input.tex> <output.svg>
 * 
 * 或处理整个目录：
 * bun run scripts/render-tikz.ts --dir src/content/tikz
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, basename, dirname, extname } from 'path';

// @ts-ignore - node-tikzjax 类型定义
import tikzjax from 'node-tikzjax';

interface RenderOptions {
  input: string;
  output?: string;
  dir?: string;
}

async function renderTikZ(code: string): Promise<string> {
  try {
    // node-tikzjax 接受纯 TikZ 代码
    const svg = await tikzjax(code);
    return svg;
  } catch (error) {
    console.error('TikZ 渲染错误:', error);
    throw error;
  }
}

async function renderFile(inputPath: string, outputPath: string): Promise<void> {
  console.log(`渲染: ${inputPath} -> ${outputPath}`);
  
  const code = readFileSync(inputPath, 'utf-8');
  const svg = await renderTikZ(code);
  
  // 确保输出目录存在
  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  writeFileSync(outputPath, svg);
  console.log(`✓ 完成: ${outputPath}`);
}

async function renderDirectory(dirPath: string): Promise<void> {
  const outputDir = join(dirname(dirPath), 'tikz-output');
  
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  const files = readdirSync(dirPath).filter(f => 
    extname(f) === '.tex' || extname(f) === '.tikz'
  );
  
  console.log(`找到 ${files.length} 个 TikZ 文件`);
  
  for (const file of files) {
    const inputPath = join(dirPath, file);
    const outputPath = join(outputDir, basename(file, extname(file)) + '.svg');
    
    try {
      await renderFile(inputPath, outputPath);
    } catch (error) {
      console.error(`✗ 失败: ${file}`, error);
    }
  }
}

// 解析命令行参数
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
TikZ 渲染脚本

用法:
  bun run scripts/render-tikz.ts <input.tex> [output.svg]
  bun run scripts/render-tikz.ts --dir <directory>

示例:
  bun run scripts/render-tikz.ts diagram.tex output.svg
  bun run scripts/render-tikz.ts --dir src/content/tikz

参数:
  <input.tex>    输入的 TikZ/TeX 文件
  [output.svg]   输出的 SVG 文件（可选，默认为输入文件名.svg）
  --dir          处理整个目录中的所有 .tex/.tikz 文件
  `);
  process.exit(0);
}

async function main() {
  if (args[0] === '--dir' && args[1]) {
    await renderDirectory(args[1]);
  } else if (args[0]) {
    const inputPath = args[0];
    const outputPath = args[1] || inputPath.replace(/\.(tex|tikz)$/, '.svg');
    await renderFile(inputPath, outputPath);
  }
}

main().catch(console.error);
