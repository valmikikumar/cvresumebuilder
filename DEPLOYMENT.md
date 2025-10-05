# ResumeShala Deployment Guide

This guide provides step-by-step instructions for deploying ResumeShala to various environments.

## 🚀 Quick Start

### Local Development
```bash
# Clone and setup
git clone <repository-url>
cd resume-shala

# Run deployment script
./scripts/deploy.sh local
```

### Docker Deployment
```bash
./scripts/deploy.sh docker
```

### Vercel Deployment
```bash
./scripts/deploy.sh vercel
```

## 📋 Prerequisites

### Required Services
1. **MongoDB Database**
   - Local MongoDB installation OR
   - MongoDB Atlas cloud database
   
2. **OpenAI API Key**
   - Sign up at [OpenAI Platform](https://platform.openai.com/)
   - Generate API key for AI features

3. **Payment Gateways** (Optional for MVP)
   - Razorpay account for India
   - Stripe account for international

### Environment Variables

Create `.env.local` file with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/resume-shala

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000

# AI Integration
OPENAI_API_KEY=sk-your-openai-api-key-here

# Payment Gateways (Optional)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret

# File Storage (Optional)
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
```

## 🌐 Production Deployment Options

### Option 1: Vercel (Recommended)

**Pros:**
- Zero configuration
- Automatic HTTPS
- Global CDN
- Serverless functions
- Free tier available

**Steps:**
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

**Environment Setup:**
- Add all environment variables in Vercel dashboard
- Use MongoDB Atlas for database
- Configure custom domain (optional)

### Option 2: Railway

**Pros:**
- Simple deployment
- Built-in database options
- Automatic deployments
- Affordable pricing

**Steps:**
1. Connect GitHub repository
2. Add environment variables
3. Deploy with one click

### Option 3: DigitalOcean App Platform

**Pros:**
- Managed platform
- Auto-scaling
- Integrated monitoring
- Database options

**Steps:**
1. Create new app from GitHub
2. Configure build settings
3. Add environment variables
4. Deploy

### Option 4: AWS/GCP/Azure

**Pros:**
- Full control
- Enterprise features
- Scalability
- Multiple services

**Requirements:**
- Docker knowledge
- Cloud platform experience
- Infrastructure management

## 🐳 Docker Deployment

### Local Docker
```bash
# Build image
docker build -t resume-shala .

# Run container
docker run -p 3000:3000 --env-file .env.local resume-shala
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/resume-shala
    depends_on:
      - mongo
  
  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

### Production Docker
```bash
# Build production image
docker build -t resume-shala:prod --target production .

# Run with production settings
docker run -d \
  --name resume-shala-prod \
  -p 80:3000 \
  --env-file .env.production \
  --restart unless-stopped \
  resume-shala:prod
```

## 🔧 Configuration

### Database Setup

#### MongoDB Atlas (Recommended for Production)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create new cluster
3. Add database user
4. Configure network access
5. Get connection string
6. Update `MONGODB_URI` in environment variables

#### Local MongoDB
```bash
# Install MongoDB
# macOS
brew install mongodb-community

# Ubuntu
sudo apt-get install mongodb

# Start MongoDB
mongod

# Create database
mongo
use resume-shala
```

### AI Features Setup

#### OpenAI Configuration
1. Sign up at [OpenAI Platform](https://platform.openai.com/)
2. Generate API key
3. Add to `OPENAI_API_KEY` environment variable
4. Monitor usage and billing

#### Alternative AI Providers
- Google Gemini API
- Anthropic Claude API
- Local AI models (Ollama)

### Payment Gateway Setup

#### Razorpay (India)
1. Create account at [Razorpay](https://razorpay.com/)
2. Get API keys from dashboard
3. Configure webhooks for payment events
4. Test with test keys first

#### Stripe (International)
1. Create account at [Stripe](https://stripe.com/)
2. Get publishable and secret keys
3. Configure webhooks
4. Set up products and pricing

## 📊 Monitoring & Analytics

### Application Monitoring
- **Vercel Analytics**: Built-in for Vercel deployments
- **Google Analytics**: Add tracking code
- **Sentry**: Error tracking and performance monitoring

### Database Monitoring
- **MongoDB Atlas**: Built-in monitoring
- **MongoDB Compass**: Desktop GUI tool

### Performance Monitoring
- **Lighthouse**: Web performance audits
- **Core Web Vitals**: User experience metrics
- **New Relic**: Application performance monitoring

## 🔒 Security Checklist

### Environment Security
- [ ] Use strong JWT secrets (32+ characters)
- [ ] Enable HTTPS in production
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Regular security updates

### Database Security
- [ ] Enable authentication
- [ ] Use connection encryption
- [ ] Regular backups
- [ ] Access control
- [ ] Monitor for suspicious activity

### API Security
- [ ] Rate limiting
- [ ] Input validation
- [ ] Authentication on protected routes
- [ ] CSRF protection
- [ ] API key rotation

## 🚨 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules
rm -rf node_modules package-lock.json
npm install

# Type check
npm run type-check
```

#### Database Connection Issues
```bash
# Test MongoDB connection
mongo "your-connection-string"

# Check environment variables
echo $MONGODB_URI
```

#### PDF Generation Issues
```bash
# Install Puppeteer dependencies (Linux)
sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

### Performance Issues
- Enable caching
- Optimize images
- Use CDN for static assets
- Database indexing
- Code splitting

### Memory Issues
- Increase server memory
- Optimize bundle size
- Use streaming for large files
- Implement pagination

## 📈 Scaling Considerations

### Horizontal Scaling
- Load balancer configuration
- Multiple server instances
- Database clustering
- CDN implementation

### Vertical Scaling
- Server resource upgrades
- Database optimization
- Caching strategies
- Code optimization

### Microservices Architecture
- API Gateway
- Service separation
- Database per service
- Event-driven architecture

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support

For deployment issues:
- Check the [GitHub Issues](https://github.com/yourusername/resume-shala/issues)
- Join our [Discord Community](https://discord.gg/resumeshala)
- Email: support@resumeshala.com

---

**Happy Deploying! 🚀**
