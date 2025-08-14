# IELTS Mock Exam Frontend

A modern, responsive React frontend for the IELTS Mock Exam platform built with TypeScript, Ant Design, and React Router.

## Features

- 🏠 **Home Page**: Welcome screen with feature highlights and navigation
- 📝 **Quiz Interface**: Interactive quiz with 10-minute timer and random question order
- 📊 **Results Page**: Detailed score breakdown with performance analytics
- ⚙️ **Admin Panel**: Full CRUD operations for managing questions and answer variants
- ⏱️ **Timer**: 10-minute countdown timer with visual progress indicator
- 🎯 **Random Questions**: Questions are shuffled for each quiz attempt
- 📱 **Responsive Design**: Mobile-friendly interface with Ant Design components

## Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Ant Design** - Professional UI component library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Backend server running on `http://localhost:3000`

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
pnpm build
```

The built files will be in the `dist` directory.


## API Integration

The frontend communicates with the NestJS backend through the following endpoints:

### Quiz Questions
- `GET /quiz` - Fetch all questions
- `POST /quiz` - Create new question
- `PUT /quiz/:id` - Update question
- `DELETE /quiz/:id` - Delete question

### Answer Variants
- `GET /variant` - Fetch all variants
- `POST /variant` - Create new variant
- `PUT /variant/:id` - Update variant
- `DELETE /variant/:id` - Delete variant

### Quiz Attempts
- `POST /attempt` - Submit quiz results
- `GET /attempt` - Fetch attempt history

## Key Components

### HomePage
- Welcome message and platform description
- Feature highlights with icons
- Navigation buttons to start quiz or access admin panel

### QuizPage
- 10-minute countdown timer with progress bar
- Question display with 4 answer variants
- Navigation between questions
- Answer tracking and validation
- Auto-submit when time expires

### ResultPage
- Score display with color-coded performance
- Percentage breakdown
- Time usage statistics
- Answer breakdown (correct/incorrect)
- Navigation options to retake or return home

### AdminPage
- Question management table
- Add/Edit/Delete questions modal
- Answer variant management
- Form validation and error handling
- Responsive table design

## Styling

The application uses a combination of:
- **Ant Design** components for consistent UI
- **Custom CSS** for page-specific styling
- **CSS Grid/Flexbox** for responsive layouts
- **CSS Variables** for consistent theming
- **Media queries** for mobile responsiveness

## State Management

- **React Hooks** for local component state
- **React Router** for navigation and URL state
- **Form state** managed by Ant Design Form components
- **API state** handled with async/await and error boundaries

## Error Handling

- **API error interceptors** for consistent error messages
- **Form validation** with Ant Design validation rules
- **User-friendly error messages** with toast notifications
- **Fallback UI** for loading and error states

## Performance Features

- **Lazy loading** of page components
- **Optimized re-renders** with proper dependency arrays
- **Debounced API calls** to prevent excessive requests
- **Responsive images** and optimized assets

## Browser Support

- **Modern browsers** (Chrome 90+, Firefox 88+, Safari 14+)
- **Mobile browsers** (iOS Safari, Chrome Mobile)
- **Progressive enhancement** for older browsers

## Development

### Code Style
- **ESLint** configuration for code quality
- **Prettier** for consistent formatting
- **TypeScript** strict mode enabled
- **Component naming** follows React conventions

### Testing
```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage
```

### Linting
```bash
# Check for linting errors
pnpm lint

# Fix auto-fixable issues
pnpm lint:fix
```

## Deployment

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:3000
```

### Build Process
1. Run `pnpm build` to create production build
2. Deploy the `dist` folder to your web server
3. Ensure the backend API is accessible from the frontend domain

### Docker (Optional)
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues:
1. Check the documentation
2. Review existing issues
3. Create a new issue with detailed information
4. Contact the development team

---

**Note**: This frontend requires the corresponding NestJS backend to be running for full functionality.
