# Development Guide

This guide provides comprehensive information for developers working on the Kanye 2049 tribute website, including setup instructions, coding standards, and development workflows.

## Table of Contents

- [Development Environment Setup](#development-environment-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Development Workflow](#development-workflow)
- [Testing Guidelines](#testing-guidelines)
- [Performance Guidelines](#performance-guidelines)
- [Deployment](#deployment)

## Development Environment Setup

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Git** (v2 or higher)
- **Code Editor** (VS Code recommended)

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/guitarbeat/nini.earth.git
   cd nini.earth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run serve
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Recommended VS Code Extensions

- **SCSS IntelliSense** - SCSS syntax highlighting and autocomplete
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **Live Server** - Alternative development server
- **GitLens** - Enhanced Git integration

## Project Structure

```
nini.earth/
├── src/                    # Source files
│   ├── scss/              # SCSS stylesheets
│   │   ├── _main.scss     # Main styles (documented)
│   │   ├── _variables.scss # SCSS variables
│   │   ├── _functions.scss # Custom functions
│   │   ├── _normalize.scss # CSS reset
│   │   ├── _rem.scss      # REM utilities
│   │   └── _utilities.scss # Utility classes
│   ├── js/                # JavaScript files
│   │   ├── script.js      # Main application logic (documented)
│   │   └── jquery/        # jQuery library
│   ├── img/               # Images and graphics
│   ├── sound/             # Audio files
│   ├── video/             # Video files
│   ├── fonts/             # Custom fonts
│   ├── bootstrap/         # Bootstrap assets
│   ├── index.html         # Main HTML file
│   ├── 404.html          # Error page
│   ├── humans.txt        # Site credits
│   └── site.webmanifest  # PWA manifest
├── dist/                  # Built files (auto-generated)
├── gulpfile.mjs          # Gulp build configuration (documented)
├── package.json          # Project dependencies
├── README.md            # Project overview
├── API.md              # JavaScript API documentation
└── DEVELOPMENT.md      # This file
```

## Coding Standards

### JavaScript Standards

#### General Guidelines

- Use ES6+ features when possible
- Prefer `const` and `let` over `var`
- Use meaningful variable and function names
- Add JSDoc comments for all functions and complex objects

#### Code Style

```javascript
// ✅ Good
const system = {
  init() {
    this.setupEventListeners();
    this.startBootSequence();
  },
  
  setupEventListeners() {
    $(window).on('keyup click', this.handleUserInteraction.bind(this));
  }
};

// ❌ Avoid
var system = {
  init: function(){
    var self = this;
    // ... complex code without comments
  }
};
```

#### JSDoc Documentation

```javascript
/**
 * Formats a date to AM/PM format with month and day
 * @param {Date} date - Date object to format
 * @returns {string} Formatted time string
 * @example
 * formatAMPM(new Date()) // Returns: "2:30PM - Jan. 15, 2024"
 */
function formatAMPM(date) {
  // Implementation
}
```

### SCSS Standards

#### File Organization

- Use partial files (prefixed with `_`) for modularity
- Import partials in `_main.scss`
- Group related styles together
- Use BEM methodology for class naming

#### Naming Conventions

```scss
// ✅ Good - BEM methodology
.login {
  &__dialog {
    &--loaded {
      opacity: 1;
    }
  }
  
  &__submit {
    &:hover {
      background-color: #000;
    }
  }
}

// ❌ Avoid
.login-dialog-loaded {
  opacity: 1;
}
```

#### Variables and Mixins

```scss
// ✅ Good - Use variables for consistency
$primary-color: #000;
$secondary-color: #fff;
$border-radius: rem(10px);

.screen {
  background-color: $primary-color;
  border-radius: $border-radius;
}

// ✅ Good - Use mixins for reusable patterns
@mixin absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### HTML Standards

#### Semantic HTML

```html
<!-- ✅ Good -->
<main class="screen">
  <header class="navbar">
    <nav class="navigation">
      <!-- Navigation content -->
    </nav>
  </header>
  <section class="content">
    <!-- Main content -->
  </section>
</main>

<!-- ❌ Avoid -->
<div class="screen">
  <div class="navbar">
    <div class="nav">
      <!-- Navigation content -->
    </div>
  </div>
</div>
```

#### Accessibility

- Use proper ARIA labels
- Ensure keyboard navigation
- Provide alt text for images
- Maintain proper heading hierarchy

```html
<!-- ✅ Good -->
<button 
  class="submit" 
  aria-label="Submit login form"
  type="submit">
  Submit
</button>

<img 
  src="img/artwork.jpg" 
  alt="Album artwork for Kanye 2049"
  class="album-art">
```

## Development Workflow

### Feature Development

1. **Create a feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make changes**
   - Follow coding standards
   - Add appropriate documentation
   - Test across browsers

3. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/new-feature
   ```

### Commit Message Convention

Use conventional commit messages:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(audio): add media session integration
fix(ui): resolve CRT effect on mobile devices
docs(api): update JavaScript API documentation
```

### Code Review Process

1. **Self-review**
   - Test your changes thoroughly
   - Check for linting errors
   - Ensure documentation is updated

2. **Peer review**
   - Request review from team members
   - Address feedback and suggestions
   - Update code as needed

3. **Merge**
   - Squash commits if necessary
   - Merge to main branch
   - Delete feature branch

## Testing Guidelines

### Manual Testing Checklist

- [ ] **Cross-browser testing**
  - Chrome (latest)
  - Firefox (latest)
  - Safari (latest)
  - Edge (latest)
  - iOS Safari
  - Android Chrome

- [ ] **Responsive testing**
  - Mobile (320px - 768px)
  - Tablet (768px - 1024px)
  - Desktop (1024px+)

- [ ] **Functionality testing**
  - Boot sequence works correctly
  - Audio playback functions
  - Share functionality works
  - CRT effect toggles properly
  - Loading states display correctly

- [ ] **Performance testing**
  - Page load time < 3 seconds
  - Audio files load efficiently
  - Images are optimized
  - No console errors

### Automated Testing

Consider implementing automated tests:

```javascript
// Example test structure
describe('System Object', () => {
  beforeEach(() => {
    // Setup test environment
  });
  
  test('should initialize correctly', () => {
    expect(system.started).toBe(false);
    system.init();
    expect(system.started).toBe(true);
  });
  
  test('should format time correctly', () => {
    const date = new Date('2024-01-15T14:30:00');
    const formatted = system.formatAMPM(date);
    expect(formatted).toContain('2:30PM');
  });
});
```

## Performance Guidelines

### JavaScript Performance

- **Minimize DOM queries**
  ```javascript
  // ✅ Good - Cache DOM elements
  const $screen = $('.screen');
  const $bios = $('.bios');
  
  // ❌ Avoid - Repeated queries
  $('.screen').hide();
  $('.screen').show();
  ```

- **Use event delegation**
  ```javascript
  // ✅ Good - Event delegation
  $(document).on('click', '.share-popup', handleShare);
  
  // ❌ Avoid - Direct binding
  $('.share-popup').click(handleShare);
  ```

- **Debounce frequent events**
  ```javascript
  // ✅ Good - Debounced resize handler
  const debouncedResize = _.debounce(handleResize, 250);
  $(window).on('resize', debouncedResize);
  ```

### CSS Performance

- **Use efficient selectors**
  ```scss
  // ✅ Good - Specific selectors
  .login__submit {
    background-color: #fff;
  }
  
  // ❌ Avoid - Universal selectors
  * {
    background-color: #fff;
  }
  ```

- **Minimize reflows**
  ```scss
  // ✅ Good - Batch layout changes
  .element {
    transform: translateX(100px);
    opacity: 0;
  }
  
  // ❌ Avoid - Multiple reflows
  .element {
    left: 100px;
    top: 50px;
    width: 200px;
  }
  ```

### Asset Optimization

- **Image optimization**
  - Use WebP format with fallbacks
  - Implement responsive images
  - Compress images appropriately

- **Audio optimization**
  - Use compressed formats (MP3, OGG)
  - Implement lazy loading
  - Consider audio preloading

## Deployment

### Build Process

1. **Production build**
   ```bash
   npm run build
   ```

2. **Verify build output**
   - Check `dist/` directory
   - Test built files locally
   - Validate minified code

3. **Deploy to hosting**
   - Upload `dist/` contents
   - Configure server settings
   - Test live deployment

### Environment Configuration

Create environment-specific configurations:

```javascript
// config/development.js
module.exports = {
  debug: true,
  ambientSound: false,
  crtEffect: true
};

// config/production.js
module.exports = {
  debug: false,
  ambientSound: true,
  crtEffect: true
};
```

### Deployment Checklist

- [ ] **Pre-deployment**
  - Run production build
  - Test all functionality
  - Check for console errors
  - Validate HTML/CSS

- [ ] **Deployment**
  - Upload files to server
  - Configure server settings
  - Set up redirects if needed
  - Enable HTTPS

- [ ] **Post-deployment**
  - Test live site
  - Check performance metrics
  - Monitor error logs
  - Verify analytics

## Troubleshooting

### Common Development Issues

1. **Gulp build errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **BrowserSync not working**
   ```bash
   # Check if port is in use
   lsof -i :3000
   # Kill process if needed
   kill -9 <PID>
   ```

3. **SCSS compilation errors**
   - Check for syntax errors
   - Verify import paths
   - Ensure all partials exist

### Debug Tools

- **Browser DevTools**
  - Console for JavaScript debugging
  - Network tab for asset loading
  - Performance tab for optimization

- **Gulp debugging**
  ```bash
  # Run with verbose output
  gulp --verbose
  ```

## Contributing

### Getting Started

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Review Guidelines

- **Be constructive** - Provide helpful feedback
- **Be specific** - Point to exact lines and issues
- **Be respectful** - Maintain professional tone
- **Be thorough** - Check for edge cases

### Documentation Updates

When adding new features:

1. Update README.md if needed
2. Add JSDoc comments to functions
3. Update API.md for new APIs
4. Add examples and usage instructions

---

For more information, see the main [README.md](README.md) and [API.md](API.md) files.