import fs from 'fs';
import path from 'path';

const texPath = path.join(process.cwd(), 'public', 'data.tex');
const outputPath = path.join(process.cwd(), 'public', 'leaderboard.json');
const texContent = fs.readFileSync(texPath, 'utf-8');

const lines = texContent.split('\n');

const metrics = ["R@1", "R@5", "R@10", "R@20", "N@1", "N@5", "N@10", "N@20"];

const data = {
  embedding: { cn: [], en: [] },
  caption: { cn: [], en: [] },
  agent: { cn: [], en: [] },
};

let currentCategory = null;

for (const line of lines) {
  const trimmedLine = line.trim();

  if (trimmedLine.includes('-- Multimodal Embedding Models --')) {
    currentCategory = 'embedding';
    continue;
  } else if (trimmedLine.includes('-- Caption-based Text Embedding Pipelines --')) {
    currentCategory = 'caption';
    continue;
  } else if (trimmedLine.includes('-- Tool-based Agentic Systems --')) {
    currentCategory = 'agent';
    continue;
  }

  if (currentCategory && trimmedLine && !trimmedLine.startsWith('%') && !trimmedLine.startsWith('\\') && trimmedLine.includes('&')) {
    const parts = trimmedLine.split('&').map(s => s.trim().replace(/\\underline|\\textbf|[{}]|\\/g, ''));
    
    if (parts.length < 18) continue;

    const modelName = parts[0];
    if (modelName.toLowerCase().includes('model') || modelName === '') continue;

    const cnScores = parts.slice(2, 10);
    const enScores = parts.slice(10, 18);

    const cnRow = { model: modelName };
    metrics.forEach((metric, i) => {
      cnRow[metric] = parseFloat(cnScores[i]) || 0;
    });
    data[currentCategory].cn.push(cnRow);

    const enRow = { model: modelName };
    metrics.forEach((metric, i) => {
      enRow[metric] = parseFloat(enScores[i]) || 0;
    });
    data[currentCategory].en.push(enRow);
  }
}

fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

console.log('Leaderboard data generated successfully at public/leaderboard.json');
