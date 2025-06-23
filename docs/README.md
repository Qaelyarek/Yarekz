# Ask Why? Growth AI-Integrated Business Website

## Project Overview

This is a comprehensive AI-integrated business website built with React, TypeScript, and Tailwind CSS. The platform provides automated lead capture, AI-powered customer engagement, and advanced analytics for business growth.

## Architecture

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **AI Services**: OpenAI, Anthropic, ElevenLabs, Azure Speech
- **Testing**: Vitest
- **Build Tool**: Vite

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, etc.)
│   ├── layout/         # Layout components (Header, Footer, etc.)
│   ├── forms/          # Form components (LeadCapture, ContactForm)
│   ├── ai/             # AI-related components (ChatWidget, VoiceInterface)
│   └── dashboard/      # Dashboard components
├── ai-services/        # AI integration modules
├── content/           # Content management
├── assets/            # Static assets
├── config/            # Configuration files
├── utils/             # Utility functions
├── types/             # TypeScript type definitions
└── hooks/             # Custom React hooks
```

## Features

### Core Features
- ✅ Responsive design with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ Modular component architecture
- ✅ Lead capture system
- ✅ Environment configuration
- ✅ Utility functions

### AI Integration Features
- 🔄 OpenAI chat integration
- 🔄 Voice interface with ElevenLabs
- 🔄 Content generation
- 🔄 Lead analysis and scoring
- 🔄 Sentiment analysis

### Business Features
- 🔄 Lead management dashboard
- 🔄 Analytics and reporting
- 🔄 Email automation
- 🔄 ROI tracking
- 🔄 Customer journey mapping

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd ask-why-growth-ai-business-website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables
Create a `.env` file with the following variables:
```env
# AI Service API Keys
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Add other required API keys as needed
```

## Development Workflow

### Version Control
- Main branch protection enabled
- Feature branch strategy
- Daily commits to local repository
- Weekly pushes to remote (GitHub)
- Monthly full project backups

### Testing
```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Building
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## AI Services Integration

### OpenAI Integration
- Chat completions for customer support
- Content generation for blogs and emails
- Sentiment analysis for lead scoring

### Voice Integration
- ElevenLabs for text-to-speech
- Azure Speech Services for speech-to-text
- Real-time voice interactions

### Lead Analysis
- AI-powered lead scoring
- Interaction categorization
- Automated follow-up recommendations

## Security Protocols

### API Key Management
- All API keys stored in environment variables
- Never commit sensitive data to repository
- Use secure password manager for key storage
- Regular key rotation schedule

### Data Protection
- Input sanitization for all user inputs
- HTTPS enforcement in production
- Regular security audits
- Compliance with data protection regulations

## Deployment

### Staging Environment
1. Verify all API keys are active
2. Test all AI integrations
3. Confirm environment variables
4. Review security protocols
5. Deploy to staging environment

### Production Deployment
1. Final testing in staging
2. Database migration (if applicable)
3. DNS configuration
4. SSL certificate setup
5. Production deployment
6. Post-deployment verification

## Monitoring & Maintenance

### Performance Monitoring
- API response times
- User engagement metrics
- Conversion tracking
- Error rates and debugging

### Regular Maintenance
- Weekly code reviews
- Monthly security audits
- Quarterly dependency updates
- Annual architecture review

## Business Integration

### Lead Management
- Automated lead capture
- Lead scoring and prioritization
- CRM integration capabilities
- Follow-up automation

### Analytics & ROI
- Conversion tracking
- Customer journey mapping
- ROI calculation
- Performance dashboards

### Content Automation
- AI-generated blog posts
- Email sequence automation
- Social media content
- SEO optimization

## Contributing

### Development Guidelines
1. Follow TypeScript best practices
2. Use consistent naming conventions
3. Write comprehensive tests
4. Document all functions and components
5. Follow the established file structure

### Code Review Process
1. Create feature branch
2. Implement changes with tests
3. Submit pull request
4. Code review and approval
5. Merge to main branch

## Support & Documentation

### Getting Help
- Check the documentation in `/docs/`
- Review the changelog for recent updates
- Contact the development team for technical issues

### Documentation Updates
- Keep README.md current
- Update changelog for all releases
- Document new features and API changes
- Maintain deployment guides

---

*Last Updated: 2025-01-27*
*Version: 0.1.0*