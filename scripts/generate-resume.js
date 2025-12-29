// Generates a simple placeholder resume.pdf from embedded base64
// Run: node scripts/generate-resume.js
const fs = require('fs')
const path = require('path')

// Small one-page PDF base64 (placeholder text)
const b64 = 'JVBERi0xLjQKJeLjz9MKNCAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFsgMyAwIFIgXQovQ291bnQgMQo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDIgMCBSCi9NZWRpYUJveCBbMCAwIDU5NSA4NDJdCi9Db250ZW50cyA0IDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8IC9GMSA1IDAgUiA+PgovUHJvY1NldCBbL1BERiAvVGV4dF0KPj4KPj4KZW5kb2JqCjUgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhPj4KZW5kb2JqCjAgMCAKc3RhcnR4cmVmCjQzNgolJUVPRgo='

const out = path.join(__dirname, '..', 'resume.pdf')
fs.writeFileSync(out, Buffer.from(b64, 'base64'))
console.log('Wrote', out)
