# Ask Why? Growth - AI Voice Assistant Integration

## 🚀 Enhanced with Official VAPI Web SDK

This project demonstrates a complete integration with the official VAPI Web SDK for AI voice conversations. Built with React, TypeScript, and following official VAPI best practices.

## ✨ Features

### Official VAPI Integration
- ✅ **Official @vapi-ai/web SDK** - Latest stable version
- ✅ **Real-time voice conversations** - Natural AI interactions
- ✅ **Live transcription** - See conversations in real-time
- ✅ **Advanced audio controls** - Mute, volume, audio visualization
- ✅ **Error handling** - Comprehensive error management
- ✅ **TypeScript support** - Full type safety

### UI Components
- ✅ **StarBorder component** - Animated call-to-action button
- ✅ **Voice waveform** - Real-time audio visualization
- ✅ **Status indicators** - Connection and call state
- ✅ **Responsive design** - Mobile-optimized interface
- ✅ **Debug tools** - Development and troubleshooting

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. VAPI Configuration
Get your credentials from [vapi.ai](https://vapi.ai):

1. **Create a VAPI account** at https://vapi.ai
2. **Create an assistant** in the VAPI dashboard
3. **Get your credentials**:
   - Public Key (for client-side usage)
   - Assistant ID (from your created assistant)

### 3. Environment Setup
Update your `.env` file with VAPI credentials:

```env
# Required for VAPI functionality
VITE_VAPI_PUBLIC_KEY=your_vapi_public_key_here
VITE_VAPI_ASSISTANT_ID=your_vapi_assistant_id_here

# Optional VAPI settings
VITE_VAPI_API_KEY=your_vapi_api_key_here
VITE_VAPI_ENDPOINT=https://api.vapi.ai
```

### 4. Start Development
```bash
npm run dev
```

## 📱 Available Routes

- **`/`** - Homepage with enhanced hero section
- **`/enhanced-hero`** - Standalone enhanced hero demo
- **`/interface-demo`** - Full VAPI interface showcase
- **`/vapi-demo`** - Simple VAPI test page

## 🎯 Key Components

### VAPIPhoneInterface
Complete voice interface with:
- Call management (start/end)
- Real-time transcription
- Audio controls (mute/unmute)
- Voice visualization
- Text messaging support
- Debug information

### EnhancedAIPhoneHero
Hero section featuring:
- StarBorder animated button
- Configuration validation
- VAPI integration
- Responsive design
- Error handling

### Official VAPI Service
Production-ready service with:
- Official SDK integration
- Event management
- Error handling
- TypeScript definitions
- Debug utilities

## 🔧 Development Features

### Debug Mode
Enable debug mode by setting `VITE_APP_ENV=development`:
- Configuration validation
- Real-time status monitoring
- Event logging
- Diagnostic tools

### Error Handling
Comprehensive error management:
- Configuration validation
- Connection error handling
- User-friendly error messages
- Automatic retry mechanisms

## 📚 VAPI Resources

Based on the official VAPI ecosystem:

- **Web SDK**: https://github.com/VapiAI/web
- **React Examples**: https://github.com/VapiAI/client-side-example-javascript-react
- **Official Docs**: https://docs.vapi.ai/
- **API Reference**: https://api.vapi.ai/api

## 🔒 Security

- Environment variables for credentials
- Client-side public key usage
- No sensitive data in source code
- Secure credential handling

## 🚀 Production Deployment

1. Set production environment variables
2. Build the application: `npm run build`
3. Deploy to your preferred hosting platform
4. Ensure HTTPS for WebRTC functionality

## 📞 Testing Your Integration

1. **Check configuration**: Visit `/interface-demo` for full testing
2. **Test connection**: Use the debug tools to validate setup
3. **Voice testing**: Start a call and speak naturally
4. **Error handling**: Test with invalid configuration

## 🤝 Support

For VAPI-specific issues:
- Check the [official VAPI documentation](https://docs.vapi.ai/)
- Visit the [VAPI GitHub repositories](https://github.com/VapiAI)
- Contact VAPI support for API issues

---

*Built with ❤️ using the official VAPI Web SDK*