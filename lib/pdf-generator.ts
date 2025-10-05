import puppeteer from 'puppeteer';
import { IResume } from '@/models/Resume';
import { ITemplate } from '@/models/Template';

export interface PDFOptions {
  format?: 'A4' | 'Letter';
  margin?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}

export async function generateResumePDF(
  resume: IResume,
  template: ITemplate,
  options: PDFOptions = {}
): Promise<Buffer> {
  let browser;
  
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set viewport for consistent rendering
    await page.setViewport({ width: 1200, height: 1600 });
    
    // Generate HTML content
    const htmlContent = generateResumeHTML(resume, template);
    
    // Set content
    await page.setContent(htmlContent, { 
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: options.format || 'A4',
      printBackground: true,
      margin: options.margin || {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    });

    return pdfBuffer;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

function generateResumeHTML(resume: IResume, template: ITemplate): string {
  // Simple template engine - replace placeholders with actual data
  let html = template.htmlTemplate;
  
  // Replace personal info
  const personalInfo = resume.data.personalInfo;
  html = html.replace(/{{firstName}}/g, personalInfo.firstName || '');
  html = html.replace(/{{lastName}}/g, personalInfo.lastName || '');
  html = html.replace(/{{email}}/g, personalInfo.email || '');
  html = html.replace(/{{phone}}/g, personalInfo.phone || '');
  html = html.replace(/{{address}}/g, personalInfo.address || '');
  html = html.replace(/{{city}}/g, personalInfo.city || '');
  html = html.replace(/{{state}}/g, personalInfo.state || '');
  html = html.replace(/{{zipCode}}/g, personalInfo.zipCode || '');
  html = html.replace(/{{website}}/g, personalInfo.website || '');
  html = html.replace(/{{linkedin}}/g, personalInfo.linkedin || '');
  html = html.replace(/{{github}}/g, personalInfo.github || '');
  
  // Replace summary
  html = html.replace(/{{summary}}/g, resume.data.summary || '');
  
  // Handle experience section
  if (resume.data.experience && resume.data.experience.length > 0) {
    const experienceHTML = resume.data.experience.map(exp => `
      <div class="experience-item">
        <div class="experience-header">
          <h3>${exp.position}</h3>
          <span class="company">${exp.company}</span>
          <span class="dates">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</span>
        </div>
        ${exp.location ? `<div class="location">${exp.location}</div>` : ''}
        ${exp.description ? `<p>${exp.description}</p>` : ''}
      </div>
    `).join('');
    
    html = html.replace(/{{#each experience}}.*?{{\/each}}/gs, experienceHTML);
  } else {
    html = html.replace(/{{#if experience\.length}}.*?{{\/if}}/gs, '');
  }
  
  // Handle education section
  if (resume.data.education && resume.data.education.length > 0) {
    const educationHTML = resume.data.education.map(edu => `
      <div class="education-item">
        <h3>${edu.degree}</h3>
        <span class="institution">${edu.institution}</span>
        <span class="dates">${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}</span>
        ${edu.field ? `<p>${edu.field}</p>` : ''}
      </div>
    `).join('');
    
    html = html.replace(/{{#each education}}.*?{{\/each}}/gs, educationHTML);
  } else {
    html = html.replace(/{{#if education\.length}}.*?{{\/if}}/gs, '');
  }
  
  // Handle skills section
  if (resume.data.skills && resume.data.skills.length > 0) {
    const skillsHTML = resume.data.skills.map(skill => `
      <span class="skill">${skill.name}</span>
    `).join('');
    
    html = html.replace(/{{#each skills}}.*?{{\/each}}/gs, skillsHTML);
  } else {
    html = html.replace(/{{#if skills\.length}}.*?{{\/if}}/gs, '');
  }
  
  // Clean up remaining handlebars syntax
  html = html.replace(/{{#if.*?}}/g, '');
  html = html.replace(/{{\/if}}/g, '');
  html = html.replace(/{{#unless.*?}}/g, '');
  html = html.replace(/{{\/unless}}/g, '');
  
  // Wrap in complete HTML document
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resume</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>
        ${template.css}
        
        /* Print-specific styles */
        @media print {
          body { margin: 0; }
          .no-print { display: none !important; }
        }
        
        /* Ensure proper page breaks */
        .page-break {
          page-break-before: always;
        }
        
        .avoid-break {
          page-break-inside: avoid;
        }
      </style>
    </head>
    <body>
      ${html}
    </body>
    </html>
  `;
}
