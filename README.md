# pshry.com

Source code for my personal website.

Code is open-source. Content is mine.

## Need to have

- Accessible
  - Ideal: WCAG 2.2 AAA
  - Acceptable: WCAG 2.1 AA
- Agnostic design
  - Device-agnostic: Desktop, laptop, tablet, mobile, watch, other
  - Platform-agnostic: Brand, operating system
  - User preference-agnostic
    - Prefers reduced motion
    - Prefers reduced transparency
    - Prefers contrast
    - Forced colors
    - Prefers color scheme
    - Prefers reduced data
  - Client-agnostic: Web browser, Search engine, RSS, Screen reader, Reader mode, Print
  - Cookie-agnostic: Work without cookies, and maybe don't use cookies
  - Browser-agnostic: Chrome, Safari, Edge, Firefox, Internet Explorer, etc.
  - Network-agnostic: No/Slow/Fast network connection, Prefers reduced data
  - IP/location-agnostic: CDN, serverless
  - Content-agnostic: content will change and vary in length; design accordingly
  - Script-agnostic: progressive-enhancement, JS fails to load
  - Style-agnostic: source order, optimized for reader mode, RSS, etc.
  - Media-agnostic: Fonts, icons, images, animations, videos, etc. fail to load
- CI/CD
  - Continuous integration: linting, testing (GitHub actions)
  - Continuous delivery: feature flags
  - Continuous deployment
- Discoverable: Written for humans, optimized for machines
- Documented: Write documentation > Write documented tests > Write documented code
- Ethical: Earth > People > Companies
- Inclusive: Welcome everyone
- Measured: Test all metrics and set budgets.
- Performant: Be fast. Seem fast. Provide feedback. Smooth movement.
  - Reducing overall load time
  - Making the site usable as soon as possible
  - Smoothness and interactivity
- Privacy: Don't track users or invade user privacy
- Secure
- Test-driven
- Type-checked

## Nice to have

- Analytics: Website traffic trends, popular content, popular referrers, goals, etc.
- CMS (optional): Easy to author content in code and/or via decoupled, interchangable CMS
- Internationalization
- Mailing list

## Engineering

### Front End (www.pshry.com)

#### HTML

- Maybe download or import assets
- Lint and format YAML/Liquid/Markdown source code
- Compile, transform and bundle YAML/Liquid/Markdown into HTML
- Lint and format HTML built code

#### CSS

- Maybe download or import assets
- Lint and format Sass source code
- Compile, transform and bundle Sass into CSS
- Lint and format CSS built code

#### JavaScript

- Maybe download or import assets
- Lint and format TypeScript source code
- Compile, transform and bundle TypeScript into JavaScript
- Lint and format JavaScript built code

#### Images

- Maybe download or import assets
- Optimize, crop, resize, and compress images

#### Fonts

- Maybe download or import assets
- Optimize and compress fonts