# Mayton Lyceum School District Website

[![GitHub Pages](https://img.shields.io/github/deployments/legertom/maytonlyceum/github-pages?label=pages&logo=github)](https://github.com/legertom/maytonlyceum/deployments/activity_log?environment=github-pages)

Live site: https://maytonlyceum.com  
Fallback (GitHub Pages): https://legertom.github.io/maytonlyceum/

A comprehensive, modern school district website featuring school listings, staff directory, policy pages, and district information.

## Project Overview

This website serves the Mayton Lyceum School District community with information about schools, staff, policies, and district news. The site is designed to be user-friendly, accessible, and mobile-responsive.

## Features

### Core Features
- **School Listings**: Comprehensive pages for Elementary, Junior High, and High School
  - School information (address, phone, hours)
  - Principal and staff information
  - Programs and activities
  - School photos
  
- **Staff Directory**: 
  - Searchable by name, position, school
  - Sortable by name, department, school
  - Contact information (email, phone, office)
  - Department filters

- **Policy Pages**:
  - Academic policies
  - Student conduct code
  - Attendance policy
  - Technology use policy
  - Transportation policy
  - Parent/Guardian handbook

- **Additional Pages**:
  - Home page with district news and announcements
  - About the District
  - Board of Education
  - Calendar (academic year, events)
  - Contact Us
  - Employment opportunities

## Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox/Grid
- **JavaScript**: Interactive features (search, sort, mobile menu)
- **Responsive Design**: Mobile-first approach

### Optional Enhancements (Future)
- React/Vue.js for more interactive features
- Tailwind CSS or Bootstrap for styling
- CMS integration (WordPress, Strapi, etc.)

## Project Structure

```
maytonlyceum/
├── index.html                 # Home page
├── about.html                 # About the district
├── board.html                 # Board of Education
├── calendar.html              # District calendar
├── contact.html               # Contact information
├── employment.html            # Job opportunities
├── schools/
│   ├── index.html            # Schools overview
│   ├── elementary.html       # Riverside Elementary
│   ├── junior-high.html      # Central Junior High
│   └── high-school.html      # Mayton High School
├── staff/
│   └── directory.html        # Staff directory (searchable/sortable)
├── policies/
│   ├── index.html            # Policies overview
│   ├── academic.html         # Academic policies
│   ├── conduct.html          # Student conduct
│   ├── attendance.html       # Attendance policy
│   ├── technology.html       # Technology use
│   ├── transportation.html   # Transportation
│   └── handbook.html         # Parent handbook
├── assets/
│   ├── css/
│   │   ├── main.css         # Main stylesheet
│   │   └── directory.css    # Staff directory styles
│   ├── js/
│   │   ├── main.js          # Main JavaScript
│   │   ├── directory.js     # Directory search/sort
│   │   └── mobile-menu.js   # Mobile navigation
│   └── images/
│       ├── logo.png
│       ├── schools/         # School photos
│       ├── staff/           # Staff photos
│       └── district/        # General district images
└── README.md                # This file
```

## Realistic Sample Data

### Schools
1. **Riverside Elementary School** (K-5)
   - Address: 425 Maple Avenue, Mayton, CA 95401
   - Phone: (707) 684-3200
   - Principal: Dr. Jennifer Martinez

2. **Central Junior High School** (6-8)
   - Address: 850 Oak Street, Mayton, CA 95401
   - Phone: (707) 684-3300
   - Principal: Mr. David Chen

3. **Mayton High School** (9-12)
   - Address: 1200 Heritage Drive, Mayton, CA 95402
   - Phone: (707) 684-3400
   - Principal: Ms. Sarah Thompson

### District Office
- Address: 100 Education Way, Mayton, CA 95401
- Phone: (707) 684-3100
- Superintendent: Dr. Robert Williams

### Sample Staff (30+ staff members across all schools)
- Teachers (various subjects and grade levels)
- Administrators
- Counselors
- Support staff
- Coaches

## Design Guidelines

### Color Scheme
- Primary: #003d82 (District Blue)
- Secondary: #ffa500 (School Gold)
- Accent: #2c5f2d (Academic Green)
- Text: #333333
- Background: #ffffff
- Light Gray: #f5f5f5

### Typography
- Headings: 'Roboto' or 'Open Sans'
- Body: 'Source Sans Pro' or system fonts
- Font sizes: Responsive, minimum 16px for body text

### Accessibility
- WCAG 2.1 AA compliance
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigation
- High contrast ratios

## Development Phases

### Phase 1: Foundation (Current)
- [x] Project structure and planning
- [ ] Create base HTML templates with navigation
- [ ] Develop main CSS framework
- [ ] Set up responsive layout

### Phase 2: Core Pages
- [ ] Home page with news section
- [ ] About page
- [ ] School pages (3 schools)
- [ ] Contact page

### Phase 3: Staff Directory
- [ ] Staff data structure (JSON or embedded)
- [ ] Search functionality
- [ ] Sort functionality
- [ ] Filters (school, department)

### Phase 4: Policy Pages
- [ ] Create all policy pages
- [ ] Policy navigation
- [ ] Downloadable PDF versions

### Phase 5: Additional Features
- [ ] Calendar functionality
- [ ] Board of Education page
- [ ] Employment/careers page
- [ ] Photo galleries

### Phase 6: Polish
- [ ] Optimize images
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Accessibility audit
- [ ] SEO optimization

## Getting Started

1. Open `index.html` in your browser to view the site
2. No build process required for basic HTML/CSS/JS version
3. Use a local server for best results: `python3 -m http.server 8000`

## Future Enhancements

- Online registration system
- Parent portal
- Lunch menu integration
- Sports schedules and scores
- Photo galleries with lightbox
- News/announcement blog
- Search functionality across entire site
- Multilingual support (Spanish)
- Social media integration

## Notes

All phone numbers, addresses, and staff information are placeholder data. Replace with actual district information before deployment.

## License

Proprietary - Mayton Lyceum School District
