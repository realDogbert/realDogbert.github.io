# Quickstart Guide: Adding Blog Posts

**Feature**: Markdown-based Blog Posts  
**For**: Content Authors  
**Last Updated**: 2026-01-31

## TL;DR - Add a Post in 3 Steps

1. Create `lib/posts/my-new-post.md`
2. Add frontmatter + content (see template below)
3. Run `npm run build` to verify

---

## Prerequisites

- Text editor (VS Code, Sublime, Vim, any editor)
- Basic markdown knowledge (paragraphs, blank lines)
- Access to project repository

---

## Step-by-Step: Adding Your First Post

### Step 1: Create Markdown File

Navigate to the `lib/posts/` directory and create a new `.md` file.

**File naming convention**: Use your desired slug as the filename

```bash
# Good examples:
lib/posts/getting-started-nextjs.md
lib/posts/typescript-best-practices.md
lib/posts/web-performance-tips.md

# Avoid:
lib/posts/Post 1.md           # Spaces not ideal
lib/posts/MyPost.md            # Use lowercase
lib/posts/random-name-123.md   # Name should match slug
```

### Step 2: Add Frontmatter

At the **very top** of the file, add YAML frontmatter between `---` markers:

```markdown
---
title: "Your Post Title Here"
author: "Your Name"
published: "2026-01-31"
excerpt: "A short description that appears on blog cards and previews. Keep it concise but descriptive."
slug: "your-post-slug"
---
```

**Field Descriptions**:

| Field | Required | Format | Example | Notes |
|-------|----------|--------|---------|-------|
| `title` | ✅ Yes | Any text | `"Getting Started with Next.js"` | Displayed as post heading |
| `author` | ✅ Yes | Any text | `"Jane Smith"` | Your name or pen name |
| `published` | ✅ Yes | `YYYY-MM-DD` | `"2026-01-31"` | Must be valid date |
| `excerpt` | ✅ Yes | Any text | `"Learn the fundamentals..."` | 100-150 characters ideal |
| `slug` | ✅ Yes | `lowercase-with-hyphens` | `"my-first-post"` | Must be unique, URL-safe |

### Step 3: Write Content

After the closing `---` of frontmatter, write your post content.

**Key Rules**:
- Use **blank lines** to separate paragraphs
- Each paragraph becomes a separate block in the UI
- No special formatting needed (just plain text for now)

**Example**:

```markdown
---
title: "My First Blog Post"
author: "Alex Johnson"
published: "2026-01-31"
excerpt: "An introduction to my blogging journey and what you can expect from future posts."
slug: "my-first-blog-post"
---

Welcome to my blog! I'm excited to start sharing my thoughts on web development, technology, and continuous learning.

This blog will focus on practical tutorials, real-world examples, and lessons learned from building production applications. I believe in learning by doing.

In upcoming posts, you can expect deep dives into modern JavaScript frameworks, best practices for TypeScript, and tips for building accessible web applications.

Thank you for visiting, and I hope you find the content helpful. Feel free to reach out with questions or suggestions for future topics!
```

### Step 4: Validate Your Post

Run the build command to ensure your post is valid:

```bash
npm run build
```

**If successful**: ✅ You'll see "Compiled successfully" and your post will appear in the build output

**If errors**: ❌ The build will fail with a descriptive message. Common issues:

| Error Message | Cause | Fix |
|---------------|-------|-----|
| `Missing required frontmatter field 'title'` | Forgot a required field | Add the missing field to frontmatter |
| `Invalid published date '2026-13-45'` | Invalid date format | Use valid YYYY-MM-DD format |
| `Duplicate slug 'my-post' found` | Another post has same slug | Choose a unique slug |
| `Empty content in my-post.md` | No content after frontmatter | Add at least one paragraph |
| `Invalid slug 'My Post!'` | Slug has invalid characters | Use only lowercase letters, numbers, hyphens |

### Step 5: Preview Locally

Start the development server to see your post:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser:
- Homepage shows your post in the list (newest first)
- Click the post card to view the full post
- URL will be: `http://localhost:3000/your-slug`

---

## Complete Example Post

**File**: `lib/posts/building-modern-web-apps.md`

```markdown
---
title: "Building Modern Web Applications with React and TypeScript"
author: "Jordan Lee"
published: "2026-02-01"
excerpt: "A comprehensive guide to setting up a React application with TypeScript, covering best practices for type safety and component architecture."
slug: "building-modern-web-apps"
---

Modern web development requires tools that help us write maintainable, scalable code. React and TypeScript are a powerful combination that addresses these needs.

TypeScript adds static typing to JavaScript, catching errors before they reach production. When combined with React's component model, you get a robust foundation for building complex UIs.

Setting up a new project is straightforward with Create React App or Next.js. Both support TypeScript out of the box with minimal configuration.

Component props should always have explicit TypeScript interfaces. This provides autocomplete in your editor and prevents prop-related bugs.

State management becomes safer with TypeScript. Whether using useState or more complex solutions like Redux, types ensure your state updates are correct.

Testing TypeScript React components is similar to JavaScript, but with the added benefit of compile-time checks. Tools like Jest and React Testing Library work seamlessly.

Start your next project with TypeScript. The initial learning curve pays off quickly with improved developer experience and fewer runtime errors.
```

---

## Best Practices

### Slugs

✅ **Good slugs**:
- `getting-started-nextjs`
- `typescript-tips-2026`
- `web-accessibility-101`

❌ **Bad slugs**:
- `Getting Started!` (uppercase, spaces, punctuation)
- `post1` (not descriptive)
- `my_post` (underscores instead of hyphens)
- `verylongslugwithoutanyhyphensoranyseparationatall` (too long, unreadable)

**Tips**:
- Keep slugs short but descriptive (3-5 words)
- Use hyphens to separate words
- Only lowercase letters, numbers, and hyphens
- Make it match the filename for easy location

### Excerpts

✅ **Good excerpts**:
- "Learn how to build a REST API with Node.js and Express, covering routing, middleware, and error handling."
- "Discover five TypeScript features that will make your code more maintainable and catch bugs earlier."

❌ **Bad excerpts**:
- "This post is about Next.js." (too vague)
- "In this comprehensive guide, we'll explore..." (filler words)
- A full paragraph copy-pasted from the post (too long)

**Tips**:
- 100-150 characters ideal
- Describe what the reader will learn
- Be specific and actionable
- Don't repeat the title verbatim

### Dates

✅ **Valid dates**:
- `"2026-01-31"`
- `"2026-12-25"`
- `"2025-06-15"`

❌ **Invalid dates**:
- `"1/31/2026"` (wrong format)
- `"Jan 31, 2026"` (wrong format)
- `"2026-13-01"` (month 13 doesn't exist)
- `"2026-02-30"` (Feb doesn't have 30 days)

**Tips**:
- Always use YYYY-MM-DD format
- Use leading zeros (e.g., `2026-01-05`, not `2026-1-5`)
- Verify the date is valid before publishing

### Content Formatting

✅ **Good formatting**:
```markdown
---
frontmatter here
---

First paragraph introduces the topic clearly.

Second paragraph provides more detail. Keep paragraphs focused on one idea.

Third paragraph continues the discussion. Blank lines separate paragraphs.
```

❌ **Bad formatting**:
```markdown
---
frontmatter
---
First paragraph with no blank line after frontmatter.
Second paragraph on next line without blank line separator.

Third paragraph with too much space.



Fourth paragraph after excessive blank lines.
```

**Tips**:
- One blank line after frontmatter closing `---`
- One blank line between paragraphs
- No trailing spaces at end of lines
- Keep paragraphs 3-5 sentences for readability

---

## Editing Existing Posts

### Step 1: Locate the File

Files are in `lib/posts/` directory, named by their slug:

```bash
lib/posts/
├── my-first-post.md          # slug: "my-first-post"
├── getting-started.md         # slug: "getting-started"
└── typescript-tips.md         # slug: "typescript-tips"
```

### Step 2: Make Changes

Edit the markdown file directly:
- Update frontmatter fields (title, excerpt, etc.)
- Modify content paragraphs
- Add or remove sections

### Step 3: Rebuild

```bash
npm run build
```

Changes appear after successful build.

**Important**: If you change the `slug` field, the post URL changes. Old URLs will return 404 unless you set up redirects.

---

## Troubleshooting

### Build Fails: "Missing required frontmatter field"

**Cause**: Forgot to include a required field

**Solution**: Ensure all 5 fields are present:
```yaml
---
title: "..."      # ← Required
author: "..."     # ← Required
published: "..."  # ← Required
excerpt: "..."    # ← Required
slug: "..."       # ← Required
---
```

### Build Fails: "Invalid published date"

**Cause**: Date format is wrong

**Solution**: Use YYYY-MM-DD format:
```yaml
published: "2026-01-31"  # ✅ Correct
published: "1/31/2026"   # ❌ Wrong
published: "Jan 31"      # ❌ Wrong
```

### Build Fails: "Duplicate slug"

**Cause**: Two posts have the same slug

**Solution**: 
1. Check all files in `lib/posts/`
2. Find the duplicate slug
3. Change one slug to be unique
4. Optionally rename the file to match

### Build Fails: "Empty content"

**Cause**: No content after frontmatter

**Solution**: Add at least one paragraph:
```markdown
---
frontmatter...
---

Add content here! At least one paragraph is required.
```

### Post Doesn't Appear on Site

**Possible causes**:

1. **Build not run**: Run `npm run build`
2. **Development server not restarted**: Restart with `npm run dev`
3. **File not in lib/posts/**: Ensure file is in correct directory
4. **File doesn't end in .md**: File must have `.md` extension

### Post Order is Wrong

**Cause**: Published date is incorrect

**Solution**: Posts are sorted by `published` date (newest first). Check your dates:

```yaml
published: "2026-02-01"  # This appears first
published: "2026-01-31"  # This appears second
published: "2026-01-15"  # This appears third
```

---

## Quick Reference Card

```markdown
# Template: New Blog Post

File: lib/posts/[YOUR-SLUG].md

---
title: "Your Post Title"
author: "Your Name"
published: "YYYY-MM-DD"
excerpt: "Short description (100-150 chars)"
slug: "url-safe-slug"
---

First paragraph introduces your topic.

Second paragraph provides details.

Third paragraph continues the discussion.

Final paragraph concludes or calls to action.
```

**Commands**:
- Build (validate): `npm run build`
- Dev server: `npm run dev`
- Open in browser: `http://localhost:3000`

**Slug Rules**:
- Lowercase only
- Use hyphens (not spaces or underscores)
- Only letters, numbers, hyphens
- Must be unique
- Example: `my-first-post`

**Date Format**: 
- `YYYY-MM-DD`
- Example: `2026-01-31`

---

## Need Help?

**Common Questions**:

1. **Can I use markdown formatting (bold, italic, links)?**
   - Current implementation: Plain text only
   - Future: Markdown formatting support planned

2. **How many posts can I add?**
   - No hard limit
   - Build time increases linearly (~0.01s per post)
   - Tested up to 100 posts with no issues

3. **Can I schedule posts for future dates?**
   - Yes! Use a future date in `published` field
   - Post appears on site after that date (requires rebuild)

4. **Can I delete a post?**
   - Yes, just delete the `.md` file from `lib/posts/`
   - Run `npm run build` to update the site

5. **Can I add images?**
   - Not yet implemented in markdown content
   - Future enhancement planned

---

## Next Steps

1. ✅ **Create your first post** using the template above
2. ✅ **Run the build** to validate: `npm run build`
3. ✅ **Preview locally**: `npm run dev`
4. ✅ **Commit your changes** to version control
5. ✅ **Deploy your site** (changes go live)

Happy blogging! 🚀
