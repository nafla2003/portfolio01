// Generates a formatted resume PDF using PDFKit
// Usage:
// 1. npm install (to fetch pdfkit) or `npm i pdfkit --save-optional`
// 2. node scripts/generate-resume-full.js

const fs = require('fs')
const path = require('path')
let PDFDocument
try {
  PDFDocument = require('pdfkit')
} catch (err) {
  console.error('PDFKit is not installed. Run: npm install pdfkit')
  process.exit(1)
}

const outPath = path.join(__dirname, '..', 'resume.pdf')
const doc = new PDFDocument({ size: 'A4', margin: 50 })
const stream = fs.createWriteStream(outPath)
doc.pipe(stream)

// Styles
const accent = '#8B1D2B'
const dark = '#0f1720'

// Header
doc.fillColor(accent).fontSize(22).font('Helvetica-Bold').text('Seidh Abdullah Adahan')
doc.moveDown(0.2)
doc.fillColor(dark).fontSize(10).font('Helvetica').text('Undergraduate Biomedical Technology Student', { continued: true })
doc.moveDown(0.5)

// Contact row
const startX = doc.x
doc.fontSize(10).fillColor(dark)
  .text('Email: seidhabdul10@gmail.com', { continued: true })
  .text('    Phone: 0714882750', { continued: true })
  .text('    Location: I-06, Tzuchi, Siribopra, Hambantota')

doc.moveDown(0.6)

// Summary
doc.fontSize(12).font('Helvetica-Bold').fillColor(dark).text('Professional Summary')
doc.moveDown(0.2)
doc.font('Helvetica').fontSize(10).fillColor('#333333').text(
  'Biomedical Technology undergraduate with experience in prototyping medical devices, signal acquisition, and web development. Passionate about building low-cost, practical solutions for healthcare and collaborating on interdisciplinary research projects.',
  { align: 'left' }
)

doc.moveDown(0.6)

// Education
doc.fontSize(12).font('Helvetica-Bold').fillColor(dark).text('Education')
doc.moveDown(0.2)
doc.font('Helvetica').fontSize(10).fillColor('#333333').text('BHSc (Hons) in Biomedical Technology — Gampaha Wickramarachchi University of Indigenous Medicine')
doc.text('2nd Year, relevant coursework: Biomedical Instrumentation, Digital Electronics, Signal Processing, Data Analysis')

doc.moveDown(0.6)

// Experience
doc.fontSize(12).font('Helvetica-Bold').fillColor(dark).text('Experience')
doc.moveDown(0.2)
doc.font('Helvetica-Bold').fontSize(10).fillColor(accent).text('Student Research Assistant — Biomedical Lab', { continued: false })
doc.font('Helvetica').fontSize(10).fillColor('#333333').list([
  'Built low-cost biosignal acquisition circuits and sensor prototypes',
  'Collected and preprocessed physiological datasets for analysis',
  'Prepared lab reports and presentations for research groups'
])

doc.moveDown(0.2)
doc.font('Helvetica-Bold').fontSize(10).fillColor(accent).text('Freelance Projects — Web & Hardware', { continued: false })
doc.font('Helvetica').fontSize(10).fillColor('#333333').list([
  'Built responsive portfolio and web tools using React and TypeScript',
  'Prototyped microcontroller projects (Arduino/ESP32) for sensing and control'
])

// Projects
doc.addPage()
doc.fontSize(12).font('Helvetica-Bold').fillColor(dark).text('Selected Projects')
doc.moveDown(0.2)

function project(title, desc, tech) {
  doc.font('Helvetica-Bold').fontSize(11).fillColor(accent).text(title)
  doc.font('Helvetica').fontSize(10).fillColor('#333333').text(desc)
  doc.font('Helvetica-Oblique').fontSize(9).fillColor('#444444').text('Tech: ' + tech)
  doc.moveDown(0.4)
}

project('Portable Heart Rate Monitor', 'Low-cost PPG-based monitor prototype with ESP32, data logging, and basic web dashboard.', 'ESP32, PPG sensor, Python, React')
project('Prototype Respiratory Rate Detector', 'Experimental sensor using accelerometer and pressure sensing to estimate respiration rate.', 'Arduino, Accelerometer, Python')
project('Portfolio Website', 'Responsive portfolio built with Vite, React, and TypeScript showcasing projects and contact form.', 'React, TypeScript, Vite, CSS')

doc.moveDown(0.6)

// Skills & Certifications
doc.fontSize(12).font('Helvetica-Bold').fillColor(dark).text('Skills & Certifications')
doc.moveDown(0.2)
doc.font('Helvetica').fontSize(10).fillColor('#333333').text('Skills: Biomedical Instrumentation, Embedded C/Arduino, Python, React & TypeScript, Signal Processing, PCB Prototyping')

doc.moveDown(0.3)
doc.font('Helvetica-Bold').fontSize(10).fillColor(accent).text('Certifications')
doc.font('Helvetica').fontSize(10).fillColor('#333333').text('- Biomedical Basics (2023)\n- Programming for Data Science (Python & R) (2022)')

// Footer
const year = new Date().getFullYear()
doc.moveDown(1)
doc.fontSize(9).fillColor('#666666').text(`© ${year} Seidh Abdullah Adahan. Generated resume.`)

// Finalize
doc.end()

stream.on('finish', () => {
  console.log('Generated', outPath)
})
