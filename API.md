# Kanye 2049 Tribute - API Documentation

This document provides comprehensive documentation for the JavaScript API, configuration options, and customization points in the Kanye 2049 tribute website.

## Table of Contents

- [Global Configuration](#global-configuration)
- [System Object API](#system-object-api)
- [Audio System](#audio-system)
- [UI Components](#ui-components)
- [Event System](#event-system)
- [Customization Guide](#customization-guide)

## Global Configuration

### Configuration Variables

The following variables control the behavior of the application:

```javascript
var displayBoot = true;    // Controls boot sequence display
var crtEffect = true;      // Enables/disables CRT monitor effect
var ambientSound = false;  // Controls background ambient audio
```

### Browser Compatibility

The application includes polyfills and compatibility checks for:

- **IE11**: NodeList.forEach polyfill
- **iOS**: Special handling for audio autoplay restrictions
- **Mobile**: Touch action optimizations

## System Object API

The main `system` object controls the core application functionality.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `view` | jQuery | Main screen container element |
| `bios` | jQuery | BIOS boot screen element |
| `started` | Boolean | Whether the system has been initialized |
| `loading` | Object | Loading state flags for audio/video |
| `ambientAudio` | Audio | Background ambient audio player |
| `audioPlayer` | HTMLAudioElement | Main audio player for music tracks |
| `isIPhone` | Boolean | iOS device detection flag |

### Methods

#### `system.init()`
Initializes the system, sets up event listeners, and starts the boot sequence.

```javascript
// Initialize the system
system.init();
```

#### `system.setBodyHeight()`
Sets the body height to match the viewport height.

```javascript
// Set body height (called automatically)
system.setBodyHeight();
```

#### `system.setLoading(state)`
Controls the loading state and cursor.

```javascript
// Show loading state
system.setLoading(true);

// Hide loading state
system.setLoading(false);
```

#### `system.formatAMPM(date)`
Formats a Date object to AM/PM format with month and day.

```javascript
// Format current time
var timeString = system.formatAMPM(new Date());
// Returns: "2:30PM - Jan. 15, 2024"
```

#### `system.displayTime()`
Updates the time display every second.

```javascript
// Start time display (called automatically)
system.displayTime();
```

#### `system.boot()`
Initializes the boot sequence and applies visual effects.

```javascript
// Start boot sequence (called automatically)
system.boot();
```

### Audio Control Methods

#### `system.resumeTrack()`
Resumes the currently playing audio track.

#### `system.pauseTrack()`
Pauses the currently playing audio track.

#### `system.stopTrack()`
Stops the currently playing audio track.

## Audio System

### Ambient Audio

The ambient audio system provides background atmosphere:

```javascript
// Ambient audio configuration
system.ambientAudio.loop = true;           // Enable looping
system.ambientAudio.volume = 0;            // Start muted
system.ambientAudio.addEventListener('timeupdate', function(){
  // Seamless loop implementation
});
```

### Media Session Integration

The application integrates with system media controls:

```javascript
// Media session action handlers
navigator.mediaSession.setActionHandler("play", () => {
  system.resumeTrack();
});
navigator.mediaSession.setActionHandler("pause", () => {
  system.pauseTrack();
});
navigator.mediaSession.setActionHandler("seekto", details => {
  system.audioPlayer.currentTime = details.seekTime;
});
```

### Audio Events

| Event | Description | Handler |
|-------|-------------|---------|
| `ended` | Audio track finished | Stops track and resets UI |
| `stalled` | Audio loading stalled | Reloads audio element |

## UI Components

### Share Popup System

The `sharePopups` object manages social media sharing:

```javascript
var sharePopups = {
  triggers: $('.share-popup'),  // Share button elements
  
  init: function() {
    // Initialize share functionality
  },
  
  popup: function(target) {
    // Open share popup window
  }
};
```

### Google Analytics Integration

Custom event tracking for user interactions:

```html
<!-- Example GA event trigger -->
<button class="ga-ce" 
        data-category="music" 
        data-action="play" 
        data-label="track-1">
  Play Track
</button>
```

## Event System

### User Interaction Events

The application responds to various user interactions:

```javascript
// System start event
$(window).on('keyup click', function(e){
  if(!system.started){
    // Initialize system
  }
});
```

### State Management

The application uses CSS classes to manage different states:

| Class | Description |
|-------|-------------|
| `body.crt` | CRT monitor effect enabled |
| `body.loading` | Loading state with custom cursor |
| `body.media-playing` | Media player interface active |
| `body.show-hidden-files` | Hidden files visible |
| `.login.loaded` | Login dialog visible |

## Customization Guide

### Modifying the Boot Sequence

To customize the boot sequence text, edit the `system.text` array:

```javascript
system.text = [
  '<p>Custom OS Name</p>',
  '<p>Custom Copyright Text</p>',
  // ... more boot messages
];
```

### Adding New Audio Tracks

1. Add audio files to `src/sound/` directory
2. Update the audio player source in your HTML
3. Configure media session metadata:

```javascript
navigator.mediaSession.metadata = new MediaMetadata({
  title: 'Track Title',
  artist: 'Artist Name',
  album: 'Album Name',
  artwork: [
    { src: 'img/artwork.jpg', sizes: '96x96', type: 'image/jpeg' }
  ]
});
```

### Customizing Visual Effects

#### CRT Effect
Toggle the CRT monitor effect:

```javascript
var crtEffect = false; // Disable CRT effect
```

#### Loading Cursor
Customize the loading cursor by replacing `img/loader.png`.

### Responsive Design

The application uses SCSS mixins for responsive design:

```scss
// Mobile-first approach
@include media-breakpoint-up(md) {
  // Desktop styles
}

@include media-breakpoint-up(lg) {
  // Large screen styles
}
```

### Adding New Features

#### 1. Create a new component:

```javascript
var myComponent = {
  init: function() {
    // Initialize component
  },
  
  // Component methods
};
```

#### 2. Initialize in system.init():

```javascript
system.init = function() {
  // ... existing code ...
  
  // Initialize new component
  myComponent.init();
};
```

#### 3. Add corresponding styles:

```scss
.my-component {
  // Component styles
}
```

## Performance Considerations

### Audio Optimization

- Use compressed audio formats (MP3, OGG)
- Implement lazy loading for large audio files
- Consider audio preloading for critical sounds

### Image Optimization

- Use WebP format with fallbacks
- Implement responsive images
- Optimize favicon and icon files

### JavaScript Performance

- Minimize DOM queries
- Use event delegation for dynamic content
- Implement debouncing for frequent events

## Browser Support

| Browser | Version | Support Level |
|---------|---------|---------------|
| Chrome | 60+ | Full support |
| Firefox | 55+ | Full support |
| Safari | 12+ | Full support (audio limitations) |
| Edge | 79+ | Full support |
| IE11 | 11 | Limited support (polyfills included) |

## Troubleshooting

### Common Issues

1. **Audio not playing on iOS**
   - iOS requires user interaction before audio can play
   - Use `ambientSound = false` for iOS devices

2. **CRT effect not working**
   - Ensure `crtEffect = true`
   - Check that CRT CSS is properly loaded

3. **Share popups blocked**
   - Modern browsers may block popups
   - Consider using Web Share API as fallback

### Debug Mode

Enable debug logging by adding to the console:

```javascript
// Enable debug mode
window.debugMode = true;

// Debug logging
if (window.debugMode) {
  console.log('Debug message');
}
```

## Contributing

When adding new features or modifying the API:

1. Update this documentation
2. Add JSDoc comments to new functions
3. Test across supported browsers
4. Update the README.md with new features

---

For more information, see the main [README.md](README.md) file.