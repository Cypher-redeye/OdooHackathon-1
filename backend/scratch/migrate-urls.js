import fs from 'fs';
import path from 'path';

const rootDir = 'c:/Users/om231/OneDrive/Desktop/Projects/Traveloop/traveloop-app';
const apiConstPath = '@/lib/api';
const apiConstImport = `import { API_URL } from "${apiConstPath}";`;

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.next') {
                processDirectory(fullPath);
            }
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('http://127.0.0.1:5000')) {
                console.log(`Processing ${fullPath}`);
                
                // Add import if not present
                if (!content.includes(apiConstImport) && !content.includes("from '@/lib/api'")) {
                    const lines = content.split('\n');
                    let importIndex = -1;
                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i].startsWith('import ')) {
                            importIndex = i;
                        } else if (importIndex !== -1) {
                            break;
                        }
                    }
                    if (importIndex !== -1) {
                        lines.splice(importIndex + 1, 0, apiConstImport);
                        content = lines.join('\n');
                    } else {
                        content = apiConstImport + '\n' + content;
                    }
                }
                
                // Replace URLs
                content = content.replace(/http:\/\/127\.0\.0\.1:5000/g, '${API_URL}');
                fs.writeFileSync(fullPath, content);
            }
        }
    });
}

processDirectory(rootDir);
console.log('Done!');
