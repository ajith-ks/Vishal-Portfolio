/**
 * Automated Media Gallery Asset Discovery — Dr. Vishal Kattery
 * 
 * Automatically discovers all images under assets/images/ (including all nested subfolders)
 * and all videos under assets/video/ (and nested subfolders) via Vite's build-time import.meta.glob().
 * 
 * Satisfies all requirements:
 * 1. Recursive build-time discovery (no runtime filesystem calls in browser).
 * 2. Supported image extensions: .jpg, .jpeg, .png, .webp, .gif, .avif, .svg.
 * 3. Supported video extensions: .mp4, .webm, .mov, .m4v.
 * 4. Distinct collections, deterministic sorting by normalized file path.
 * 5. Deduplication and handling of filenames with spaces.
 * 6. Native aspect ratio preservation (landscape, portrait, square).
 * 7. Newly added assets automatically picked up on server restart or build.
 */

// ---------------------------------------------------------------------------
// 1. Build-time Asset Discovery via Vite import.meta.glob
// ---------------------------------------------------------------------------

// Discover all images in assets/images/ and all nested subfolders
const rawImageModules = import.meta.glob(
  '/assets/images/**/*.{jpg,jpeg,png,webp,gif,avif,svg,JPG,JPEG,PNG,WEBP,GIF,AVIF,SVG}',
  { eager: true, query: '?url', import: 'default' }
);

// Discover all videos in assets/video/ (and nested video directories)
const rawVideoModules = import.meta.glob(
  [
    '/assets/video/**/*.{mp4,webm,mov,m4v,MP4,WEBM,MOV,M4V}',
    '/assets/videos/**/*.{mp4,webm,mov,m4v,MP4,WEBM,MOV,M4V}',
    '/assets/**/*.{mp4,webm,mov,m4v,MP4,WEBM,MOV,M4V}'
  ],
  { eager: true, query: '?url', import: 'default' }
);

// ---------------------------------------------------------------------------
// 2. Editorial Overrides for Known Featured Assets
// Preserves rich captions, keynote descriptions, and verified milestones
// ---------------------------------------------------------------------------
const curatedPhotoMetadata = {
  "/assets/images/teaching/classroom training 3.jpg": {
    title: "Interactive Classroom Mentorship & Pedagogy",
    category: "Teaching",
    aspectRatio: "landscape"
  },
  "/assets/images/speaking/on stage addressing crowd.jpg": {
    title: "Keynote Address to Collegiate Auditorium",
    category: "Keynote",
    aspectRatio: "landscape"
  },
  "/assets/images/academic/teaching.jpeg": {
    title: "Classroom Lecture & Core Curriculum Delivery",
    category: "Teaching",
    aspectRatio: "portrait"
  },
  "/assets/images/students/celebration with students.jpg": {
    title: "Post-Bootcamp Celebration with Graduating Students",
    category: "Mentorship",
    aspectRatio: "landscape"
  },
  "/assets/images/phd/with phd certificate.jpg": {
    title: "Doctoral Milestone — Ph.D. in Management",
    category: "Academic",
    aspectRatio: "portrait"
  },
  "/assets/images/speaking/speach 3.jpg": {
    title: "Placement Bootcamp & Career Guidance Forum",
    category: "Speaking",
    aspectRatio: "landscape"
  },
  "/assets/images/events/inaguration as a cief guest for a function.jpg": {
    title: "Chief Guest Lamp Lighting Inauguration",
    category: "Events",
    aspectRatio: "portrait"
  },
  "/assets/images/speaking/seminar 3.jpg": {
    title: "Institutional Management Seminar Presentation",
    category: "Seminar",
    aspectRatio: "landscape"
  },
  "/assets/images/events/trophy giving.jpg": {
    title: "Student Recognition & Honor Presentation",
    category: "Honors",
    aspectRatio: "landscape"
  },
  "/assets/images/students/interaction with students2.jpg": {
    title: "Campus Discussion & Career Counselling Session",
    category: "Mentorship",
    aspectRatio: "landscape"
  },
  "/assets/images/portraits/radom 2.jpeg": {
    title: "Executive Portrait — Academic & Banking Leadership",
    category: "Portrait",
    aspectRatio: "portrait"
  },
  "/assets/images/speaking/speaking from audience.jpeg": {
    title: "Interactive Auditorium Floor Engagement",
    category: "Speaking",
    aspectRatio: "landscape"
  }
};

const curatedVideoMetadata = {
  "/assets/video/classroom video.mp4": {
    title: "Classroom Mentorship & Interactive Placement Training",
    subtitle: "Real-time lecture dynamics, student engagement & interview preparedness",
    duration: "01:15",
    poster: "/assets/images/teaching/classroom training.jpg",
    aspectRatio: "9:16"
  },
  "/assets/video/BBA Aviation & BBA CA Induction Programme @SAN International College of Arts & Science, Walayar.mp4": {
    title: "Induction Programme Address",
    subtitle: "BBA Aviation & BBA CA Induction @SAN International College, Walayar",
    duration: "01:00",
    poster: "/assets/images/speaking/speach 3.jpg",
    aspectRatio: "9:16"
  }
};

// Pre-measured native aspect ratios for verified image assets
const knownAspectRatios = {
  "/assets/images/academic/teaching.jpeg": "portrait",
  "/assets/images/events/from meet with modi.jpeg": "square",
  "/assets/images/events/inaguration as a cief guest for a function.jpg": "portrait",
  "/assets/images/events/trophy giving.jpg": "landscape",
  "/assets/images/events/with mic on stage.jpg": "portrait",
  "/assets/images/family/with family on phd award ceremony .jpg": "portrait",
  "/assets/images/family/with family on phd award ceremony1.jpg": "portrait",
  "/assets/images/phd/phd certificate receving.jpg": "landscape",
  "/assets/images/phd/with family on phd award ceremony .jpg": "portrait",
  "/assets/images/phd/with family on phd award ceremony1.jpg": "portrait",
  "/assets/images/phd/with phd certificate.jpg": "portrait",
  "/assets/images/portraits/radom 2.jpeg": "portrait",
  "/assets/images/portraits/random.jpeg": "portrait",
  "/assets/images/review/pic with a famous person.jpg": "square",
  "/assets/images/review/pic with famous person 2.jpg": "landscape",
  "/assets/images/review/random 9.jpg": "portrait",
  "/assets/images/review/random3.jpg": "portrait",
  "/assets/images/review/random5.jpg": "portrait",
  "/assets/images/review/session.jpeg": "portrait",
  "/assets/images/speaking/on stage addressing crowd.jpg": "landscape",
  "/assets/images/speaking/random pic at seminar.jpg": "landscape",
  "/assets/images/speaking/seminar  7.jpg": "landscape",
  "/assets/images/speaking/seminar 2.jpeg": "landscape",
  "/assets/images/speaking/seminar 3.jpg": "landscape",
  "/assets/images/speaking/seminar 7.jpg": "landscape",
  "/assets/images/speaking/seminar.jpeg": "landscape",
  "/assets/images/speaking/speach 3.jpg": "landscape",
  "/assets/images/speaking/speach 6.jpg": "portrait",
  "/assets/images/speaking/speach from co operative bank seminar.jpeg": "square",
  "/assets/images/speaking/speach.jpeg": "landscape",
  "/assets/images/speaking/Speach.jpg": "landscape",
  "/assets/images/speaking/speach1.jpg": "landscape",
  "/assets/images/speaking/speaking from audience.jpeg": "landscape",
  "/assets/images/speaking/speaking from audience2.jpeg": "landscape",
  "/assets/images/speaking/speaking from audience3.jpeg": "landscape",
  "/assets/images/speaking/with mic on stage.jpg": "portrait",
  "/assets/images/speaking/with mic1.jpeg": "portrait",
  "/assets/images/speaking/with mic2.jpeg": "portrait",
  "/assets/images/students/celebration with students.jpg": "landscape",
  "/assets/images/students/interaction with students2.jpg": "landscape",
  "/assets/images/students/interactions with student.jpg": "landscape",
  "/assets/images/students/interview prep.jpg": "landscape",
  "/assets/images/students/motivational class.jpg": "portrait",
  "/assets/images/teaching/classrom training 2.jpg": "landscape",
  "/assets/images/teaching/classroom training 0.jpg": "landscape",
  "/assets/images/teaching/classroom training 3.jpg": "landscape",
  "/assets/images/teaching/classroom training 4.jpg": "landscape",
  "/assets/images/teaching/classroom training 5.jpg": "landscape",
  "/assets/images/teaching/classroom training 6.jpg": "landscape",
  "/assets/images/teaching/classroom training.jpg": "landscape",
  "/assets/images/teaching/classroom training1.jpg": "portrait"
};

// ---------------------------------------------------------------------------
// 3. Helper Functions for Automatic Categorization & Title Formatting
// ---------------------------------------------------------------------------

function formatTitleFromPath(filePath) {
  const filename = filePath.split('/').pop().replace(/\.[^/.]+$/, '');
  const cleaned = filename.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  return cleaned
    .split(' ')
    .map(word => {
      if (!word) return '';
      if (/^(ph\.?d\.?|bba|ca|san|istd|ai|mba|mcom)$/i.test(word)) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

function formatCategoryFromPath(filePath) {
  const parts = filePath.split('/');
  const imagesIdx = parts.findIndex(p => p === 'images');
  if (imagesIdx !== -1 && parts.length > imagesIdx + 2) {
    const rawCategory = parts[imagesIdx + 1];
    const categoryMap = {
      academic: 'Academic',
      achievements: 'Honors',
      events: 'Events',
      family: 'Convocation',
      hero: 'Leadership',
      phd: 'Doctoral',
      portraits: 'Portraits',
      review: 'Mentorship',
      speaking: 'Speaking',
      students: 'Mentorship',
      teaching: 'Teaching'
    };
    if (categoryMap[rawCategory.toLowerCase()]) {
      return categoryMap[rawCategory.toLowerCase()];
    }
    return rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);
  }
  return 'Archive';
}

// ---------------------------------------------------------------------------
// 4. Construct Deduplicated, Deterministically Sorted Photo Collection
// ---------------------------------------------------------------------------

const seenImagePaths = new Set();
const sortedImageEntries = Object.entries(rawImageModules)
  .filter(([rawPath]) => {
    const normalized = rawPath.replace(/\\/g, '/');
    // Exclude hero.png from the gallery, regardless of filename casing
    if (/(^|\/)hero\.png$/i.test(normalized)) return false;
    if (seenImagePaths.has(normalized)) return false;
    seenImagePaths.add(normalized);
    return true;
  })
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

export const galleryPhotos = sortedImageEntries.map(([rawPath, resolvedUrl], idx) => {
  const normalizedPath = rawPath.replace(/\\/g, '/');
  const curated = curatedPhotoMetadata[normalizedPath] || {};
  return {
    id: `photo-${idx + 1}`,
    src: normalizedPath,
    resolvedUrl: resolvedUrl,
    title: curated.title || formatTitleFromPath(normalizedPath),
    category: curated.category || formatCategoryFromPath(normalizedPath),
    aspectRatio: curated.aspectRatio || knownAspectRatios[normalizedPath] || 'landscape'
  };
});

// ---------------------------------------------------------------------------
// 5. Construct Deduplicated, Deterministically Sorted Video Collection
// ---------------------------------------------------------------------------

const seenVideoPaths = new Set();
const sortedVideoEntries = Object.entries(rawVideoModules)
  .filter(([rawPath]) => {
    const normalized = rawPath.replace(/\\/g, '/');
    if (seenVideoPaths.has(normalized)) return false;
    seenVideoPaths.add(normalized);
    return true;
  })
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

export const galleryVideos = sortedVideoEntries.map(([rawPath, resolvedUrl], idx) => {
  const normalizedPath = rawPath.replace(/\\/g, '/');
  const curated = curatedVideoMetadata[normalizedPath] || {};
  return {
    id: `video-${idx + 1}`,
    src: normalizedPath,
    resolvedUrl: resolvedUrl,
    poster: curated.poster || '/assets/images/teaching/classroom training.jpg',
    title: curated.title || formatTitleFromPath(normalizedPath),
    subtitle: curated.subtitle || 'Verified Lecture Dynamics & Keynote Address',
    duration: curated.duration || 'Vertical Reel',
    aspectRatio: curated.aspectRatio || '9:16'
  };
});

// ---------------------------------------------------------------------------
// 6. Curated Combined Media Collection for 3D Floating Carousel
// Automatically populated from all discovered photos and videos
// ---------------------------------------------------------------------------
export const allMediaItems = (() => {
  const combined = [];
  const photos = [...galleryPhotos];
  const videos = [...galleryVideos];

  let pIdx = 0;
  let vIdx = 0;

  // Interleave videos into the sequence so visitors encounter both media types
  while (pIdx < photos.length || vIdx < videos.length) {
    // Push up to 2-3 photos
    for (let i = 0; i < 3 && pIdx < photos.length; i++) {
      const p = photos[pIdx++];
      combined.push({
        id: p.id,
        type: 'image',
        src: p.src,
        resolvedUrl: p.resolvedUrl,
        poster: p.src,
        title: p.title,
        alt: p.title,
        aspectRatio: p.aspectRatio
      });
    }
    // Push 1 video if available
    if (vIdx < videos.length) {
      const v = videos[vIdx++];
      combined.push({
        id: v.id,
        type: 'video',
        src: v.src,
        resolvedUrl: v.resolvedUrl,
        poster: v.poster,
        title: v.title,
        alt: v.title,
        aspectRatio: v.aspectRatio
      });
    }
  }

  return combined;
})();

