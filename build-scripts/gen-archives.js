const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const jsYaml = require('yaml-front-matter');

const years = {};
const contentPath = path.join(__dirname, '..', 'content');
const postsPath = path.join(contentPath, 'posts');
const archmPath = path.join(contentPath, 'archm');
const archyPath = path.join(contentPath, 'archives');

mkdirp.sync(archmPath);
mkdirp.sync(archyPath);

fs.readdirSync(postsPath).forEach(filePath => {
  console.log(filePath);
  if (!filePath.match(/\.md$/)) { return; }
  const content = fs.readFileSync(path.join(postsPath, filePath), 'utf8');
  const meta = jsYaml.loadFront(content);
  if (meta.draft) {
    return;
  }
  const y = meta.date.getFullYear().toString();
  const m = ('0' + (meta.date.getMonth() + 1)).slice(-2);
  if (!years.hasOwnProperty(y)) {
    years[y] = new Set();
    writeFile(path.join(archyPath, `${y}.md`), y, '01');
  }
  if (!years[y].has(m)) {
    years[y].add(m);
    writeFile(path.join(archmPath, `${y}-${m}.md`), y, m);
  }
});

function writeFile(outPath, y, m) {
  fs.writeFileSync(outPath, JSON.stringify({ date: `${y}-${m}-01 00:00:00` }), 'utf8');
  console.log('++', outPath);
}