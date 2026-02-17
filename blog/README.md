# Blog Posts

Add new articles as `.md` files. The filename is the URL slug (e.g. `2025-02-17-my-post.md` → `/blog/2025-02-17-my-post`).

## Naming Conventions

| Item           | Convention                         | Example                       |
| -------------- | ---------------------------------- | ----------------------------- |
| Post file      | `YYYY-MM-DD-slug.md`               | `2025-02-17-aviation-tips.md` |
| Image folder   | Same as slug                       | `2025-02-17-aviation-tips/`   |
| Images         | Descriptive, lowercase, hyphenated | `cockpit-view.jpg`            |
| Hero/thumbnail | `hero.jpg` or `hero.png`           | Used in frontmatter           |

## Folder Structure for Images

Store images in `public/blog/images/`, one folder per post:

```
public/blog/images/
├── 2024-11-16-first-article/     # folder name = post slug
│   └── hero.jpg
├── 2025-02-17-another-post/
│   ├── hero.jpg
│   └── code-screenshot.png
└── shared/                        # optional, for reused assets
    └── logo.png
```

**Rule:** Image folder name must match the post slug (filename without `.md`).

## Frontmatter

```yaml
---
title: "Post Title"
description: "Short description for SEO and listings"
date: "2025-02-17"
tags: ["Tag1", "Tag2"]
category: "Programming" # optional
thumbnail: "/blog/images/2025-02-17-my-post/hero.jpg" # optional
---
```

- **Required:** `title`, `description`, `date`, `tags`
- **Optional:** `category`, `thumbnail`
- **Thumbnail path:** `/blog/images/{slug}/hero.jpg` (relative to `public/`)

## In-Article Images

Use standard Markdown; paths are relative to the site root:

```markdown
![Cockpit view](/blog/images/2025-02-17-aviation-tips/cockpit.jpg)
```

Caption (separate paragraph below the image):

```markdown
![Cockpit at sunset](/blog/images/2025-02-17-aviation-tips/cockpit.jpg)

_Cockpit view during approach — optional caption_
```

## Full Post Example

```markdown
---
title: "Aviation Tips for Beginners"
description: "A short guide to getting started with flight training."
date: "2025-02-17"
tags: ["Aviation", "Flight Training"]
category: "Aviation"
thumbnail: "/blog/images/2025-02-17-aviation-tips/hero.jpg"
---

## Introduction

Here's what you need to know before your first lesson.

## Cockpit Overview

![Cockpit instruments](/blog/images/2025-02-17-aviation-tips/cockpit-view.jpg)

_The main instrument panel — altimeter, attitude indicator, and more._

## Next Steps

Book a discovery flight and enjoy the ride.
```
