// Mock database for development
interface User {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'user' | 'admin';
  plan: 'free' | 'premium' | 'enterprise';
  createdAt: Date;
}

interface Resume {
  _id: string;
  userId: string;
  title: string;
  templateId: string;
  data: any;
  lastEdited: Date;
  isPublic: boolean;
}

interface Template {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  isPremium: boolean;
  htmlTemplate: string;
  css: string;
  features: string[];
  tags: string[];
  downloadCount: number;
  rating: number;
}

// In-memory storage
let users: User[] = [];
let resumes: Resume[] = [];
let templates: Template[] = [];

// Sample data
const sampleTemplates: Template[] = [
  {
    _id: 'template-1',
    name: 'Professional Classic',
    description: 'Clean and professional template perfect for business professionals',
    category: 'executive',
    price: 0,
    isPremium: false,
    htmlTemplate: `
      <div class="resume-container">
        <header class="resume-header">
          <h1 class="name">{{firstName}} {{lastName}}</h1>
          <div class="contact-info">
            <p>{{email}} | {{phone}}</p>
            <p>{{address}}, {{city}}, {{state}} {{zipCode}}</p>
          </div>
        </header>
        {{#if summary}}
        <section class="summary">
          <h2>Professional Summary</h2>
          <p>{{summary}}</p>
        </section>
        {{/if}}
        {{#if experience.length}}
        <section class="experience">
          <h2>Professional Experience</h2>
          {{#each experience}}
          <div class="experience-item">
            <div class="experience-header">
              <h3>{{position}}</h3>
              <span class="company">{{company}}</span>
              <span class="dates">{{startDate}} - {{#if current}}Present{{else}}{{endDate}}{{/if}}</span>
            </div>
            {{#if description}}<p>{{description}}</p>{{/if}}
          </div>
          {{/each}}
        </section>
        {{/if}}
        {{#if education.length}}
        <section class="education">
          <h2>Education</h2>
          {{#each education}}
          <div class="education-item">
            <h3>{{degree}}</h3>
            <span class="institution">{{institution}}</span>
            <span class="dates">{{startDate}} - {{#if current}}Present{{else}}{{endDate}}{{/if}}</span>
          </div>
          {{/each}}
        </section>
        {{/if}}
        {{#if skills.length}}
        <section class="skills">
          <h2>Skills</h2>
          <div class="skills-list">
            {{#each skills}}
            <span class="skill">{{name}}</span>
            {{/each}}
          </div>
        </section>
        {{/if}}
      </div>
    `,
    css: `
      .resume-container {
        max-width: 800px;
        margin: 0 auto;
        font-family: 'Inter', sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .resume-header {
        text-align: center;
        margin-bottom: 2rem;
        border-bottom: 2px solid #3b82f6;
        padding-bottom: 1rem;
      }
      .name {
        font-size: 2.5rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 0.5rem;
        font-family: 'Playfair Display', serif;
      }
      .contact-info p {
        margin: 0.25rem 0;
        color: #6b7280;
      }
      section {
        margin-bottom: 2rem;
      }
      h2 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #3b82f6;
        border-bottom: 1px solid #e5e7eb;
        padding-bottom: 0.5rem;
        margin-bottom: 1rem;
        font-family: 'Playfair Display', serif;
      }
      .experience-item, .education-item {
        margin-bottom: 1.5rem;
      }
      .experience-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.5rem;
      }
      h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1f2937;
        margin: 0;
      }
      .company, .institution {
        font-weight: 500;
        color: #3b82f6;
      }
      .dates {
        color: #6b7280;
        font-size: 0.9rem;
      }
      .skills-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .skill {
        background-color: #f3f4f6;
        color: #374151;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.875rem;
      }
    `,
    features: ['ATS-Friendly', 'Clean Design', 'Professional Layout'],
    tags: ['business', 'executive', 'professional'],
    downloadCount: 1250,
    rating: 4.8
  },
  {
    _id: 'template-2',
    name: 'Modern Tech',
    description: 'Contemporary design perfect for software developers and tech professionals',
    category: 'technical',
    price: 0,
    isPremium: false,
    htmlTemplate: `
      <div class="resume-container modern">
        <div class="sidebar">
          <header class="resume-header">
            <h1 class="name">{{firstName}} {{lastName}}</h1>
            <div class="contact-info">
              <p>{{email}}</p>
              <p>{{phone}}</p>
            </div>
          </header>
          {{#if skills.length}}
          <section class="skills">
            <h2>Technical Skills</h2>
            {{#each skills}}
            <div class="skill-item">
              <span class="skill-name">{{name}}</span>
            </div>
            {{/each}}
          </section>
          {{/if}}
        </div>
        <div class="main-content">
          {{#if summary}}
          <section class="summary">
            <h2>About Me</h2>
            <p>{{summary}}</p>
          </section>
          {{/if}}
          {{#if experience.length}}
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="experience-item">
              <div class="experience-header">
                <h3>{{position}}</h3>
                <span class="company">{{company}}</span>
              </div>
              <div class="experience-meta">
                <span class="dates">{{startDate}} - {{#if current}}Present{{else}}{{endDate}}{{/if}}</span>
              </div>
              {{#if description}}<p>{{description}}</p>{{/if}}
            </div>
            {{/each}}
          </section>
          {{/if}}
        </div>
      </div>
    `,
    css: `
      .resume-container.modern {
        display: flex;
        min-height: 100vh;
        font-family: 'Inter', sans-serif;
      }
      .sidebar {
        width: 35%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 2rem;
      }
      .main-content {
        width: 65%;
        padding: 2rem;
        background: white;
      }
      .name {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1rem;
        font-family: 'Playfair Display', serif;
      }
      .contact-info p {
        margin: 0.5rem 0;
        font-size: 0.9rem;
        opacity: 0.9;
      }
      section {
        margin-bottom: 2rem;
      }
      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #1f2937;
        font-family: 'Playfair Display', serif;
      }
      .sidebar h2 {
        color: white;
        border-bottom: 2px solid rgba(255,255,255,0.3);
        padding-bottom: 0.5rem;
      }
      .skill-item {
        margin-bottom: 1rem;
      }
      .skill-name {
        display: block;
        margin-bottom: 0.25rem;
        font-size: 0.9rem;
      }
      .experience-item, .education-item {
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e5e7eb;
      }
      h3 {
        font-size: 1.1rem;
        font-weight: 600;
        color: #1f2937;
        margin: 0 0 0.25rem 0;
      }
      .company, .institution {
        font-weight: 500;
        color: #3b82f6;
      }
      .experience-meta {
        display: flex;
        justify-content: space-between;
        font-size: 0.9rem;
        color: #6b7280;
        margin-bottom: 0.5rem;
      }
    `,
    features: ['Modern Design', 'Tech-Focused', 'Colorful'],
    tags: ['tech', 'developer', 'modern'],
    downloadCount: 890,
    rating: 4.6
  },
  {
    _id: 'template-3',
    name: 'Creative Portfolio',
    description: 'Bold and creative design for designers, artists, and creative professionals',
    category: 'creative',
    price: 9.99,
    isPremium: true,
    htmlTemplate: `
      <div class="resume-container creative">
        <div class="header-section">
          <div class="profile-section">
            <h1 class="name">{{firstName}} {{lastName}}</h1>
            <p class="title">Creative Professional</p>
          </div>
          <div class="contact-section">
            <div class="contact-item">
              <strong>Email:</strong> {{email}}
            </div>
            <div class="contact-item">
              <strong>Phone:</strong> {{phone}}
            </div>
          </div>
        </div>
        {{#if summary}}
        <section class="summary">
          <h2>About</h2>
          <p>{{summary}}</p>
        </section>
        {{/if}}
        {{#if experience.length}}
        <section class="experience">
          <h2>Experience</h2>
          {{#each experience}}
          <div class="experience-item">
            <div class="experience-header">
              <h3>{{position}}</h3>
              <span class="company">{{company}}</span>
            </div>
            <div class="experience-dates">{{startDate}} - {{#if current}}Present{{else}}{{endDate}}{{/if}}</div>
            {{#if description}}<p>{{description}}</p>{{/if}}
          </div>
          {{/each}}
        </section>
        {{/if}}
        {{#if skills.length}}
        <section class="skills">
          <h2>Skills & Expertise</h2>
          <div class="skills-grid">
            {{#each skills}}
            <div class="skill-tag">{{name}}</div>
            {{/each}}
          </div>
        </section>
        {{/if}}
      </div>
    `,
    css: `
      .resume-container.creative {
        font-family: 'Inter', sans-serif;
        background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
        min-height: 100vh;
        padding: 2rem;
      }
      .header-section {
        background: white;
        border-radius: 20px;
        padding: 2rem;
        margin-bottom: 2rem;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .name {
        font-size: 3rem;
        font-weight: 800;
        color: #2d3748;
        margin: 0;
        font-family: 'Playfair Display', serif;
      }
      .title {
        font-size: 1.2rem;
        color: #4a5568;
        margin: 0.5rem 0 0 0;
        font-weight: 300;
      }
      .contact-section {
        text-align: right;
      }
      .contact-item {
        margin-bottom: 0.5rem;
        color: #4a5568;
      }
      section {
        background: white;
        border-radius: 20px;
        padding: 2rem;
        margin-bottom: 2rem;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      }
      h2 {
        font-size: 1.8rem;
        font-weight: 700;
        color: #2d3748;
        margin-bottom: 1.5rem;
        font-family: 'Playfair Display', serif;
        position: relative;
      }
      h2::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 50px;
        height: 4px;
        background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
        border-radius: 2px;
      }
      .experience-item {
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 2px solid #f7fafc;
      }
      .experience-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
      }
      .experience-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.5rem;
      }
      h3 {
        font-size: 1.3rem;
        font-weight: 600;
        color: #2d3748;
        margin: 0;
      }
      .company {
        font-weight: 500;
        color: #4ecdc4;
        font-size: 1.1rem;
      }
      .experience-dates {
        color: #718096;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
      }
      .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
      }
      .skill-tag {
        background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
        color: white;
        padding: 0.75rem 1rem;
        border-radius: 25px;
        text-align: center;
        font-weight: 500;
        font-size: 0.9rem;
      }
    `,
    features: ['Creative Design', 'Portfolio Ready', 'Visual Appeal'],
    tags: ['creative', 'design', 'portfolio'],
    downloadCount: 450,
    rating: 4.9
  }
];

// Initialize sample data
templates = [...sampleTemplates];

// Mock database functions
export const mockDB = {
  // User operations
  users: {
    find: (query: any) => {
      if (query.email) {
        return users.find(user => user.email === query.email);
      }
      return users;
    },
    findOne: (query: any) => {
      if (query._id) {
        return users.find(user => user._id === query._id);
      }
      if (query.email) {
        return users.find(user => user.email === query.email);
      }
      return null;
    },
    create: (userData: any) => {
      const newUser = {
        _id: `user-${Date.now()}`,
        ...userData,
        createdAt: new Date()
      };
      users.push(newUser);
      return newUser;
    },
    findByIdAndUpdate: (id: string, update: any) => {
      const userIndex = users.findIndex(user => user._id === id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...update };
        return users[userIndex];
      }
      return null;
    },
    findByIdAndDelete: (id: string) => {
      const userIndex = users.findIndex(user => user._id === id);
      if (userIndex !== -1) {
        return users.splice(userIndex, 1)[0];
      }
      return null;
    }
  },

  // Resume operations
  resumes: {
    find: (query: any) => {
      if (query.userId) {
        return resumes.filter(resume => resume.userId === query.userId);
      }
      return resumes;
    },
    findOne: (query: any) => {
      if (query._id) {
        return resumes.find(resume => resume._id === query._id);
      }
      return null;
    },
    create: (resumeData: any) => {
      const newResume = {
        _id: `resume-${Date.now()}`,
        ...resumeData,
        lastEdited: new Date()
      };
      resumes.push(newResume);
      return newResume;
    },
    findByIdAndUpdate: (id: string, update: any) => {
      const resumeIndex = resumes.findIndex(resume => resume._id === id);
      if (resumeIndex !== -1) {
        resumes[resumeIndex] = { ...resumes[resumeIndex], ...update, lastEdited: new Date() };
        return resumes[resumeIndex];
      }
      return null;
    },
    findByIdAndDelete: (id: string) => {
      const resumeIndex = resumes.findIndex(resume => resume._id === id);
      if (resumeIndex !== -1) {
        return resumes.splice(resumeIndex, 1)[0];
      }
      return null;
    }
  },

  // Template operations
  templates: {
    find: (query: any) => {
      if (query.isActive !== undefined) {
        return templates.filter(template => template.isActive === query.isActive);
      }
      if (query.category && query.category !== 'all') {
        return templates.filter(template => template.category === query.category);
      }
      return templates;
    },
    findOne: (query: any) => {
      if (query._id) {
        return templates.find(template => template._id === query._id);
      }
      return null;
    },
    create: (templateData: any) => {
      const newTemplate = {
        _id: `template-${Date.now()}`,
        ...templateData
      };
      templates.push(newTemplate);
      return newTemplate;
    },
    findByIdAndUpdate: (id: string, update: any) => {
      const templateIndex = templates.findIndex(template => template._id === id);
      if (templateIndex !== -1) {
        templates[templateIndex] = { ...templates[templateIndex], ...update };
        return templates[templateIndex];
      }
      return null;
    },
    findByIdAndDelete: (id: string) => {
      const templateIndex = templates.findIndex(template => template._id === id);
      if (templateIndex !== -1) {
        return templates.splice(templateIndex, 1)[0];
      }
      return null;
    }
  }
};

export default mockDB;
