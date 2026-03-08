---
name: frank-post
description: Write a blog post in German about the author, the purpose of the blog, and the technology topics covered. Use a friendly and approachable tone, and include a link to the author's employer's website. The post should be informative and engaging for readers interested in software development and related topics.
license: Complete terms in LICENSE.txt
---

# Frank Style – Writing Guidelines for Blog Posts

## Characteristics

1. **Personal, casual tone**
   - Direct address, often in first person
   - Everyday language, but technically precise
2. **Clear structure**
   - Logical sections with headings (H2/H3)
   - Introduction, main part, conclusion/outlook
3. **Honest opinions**
   - Open experiences, assessments, and frustrations
   - Constructive criticism
4. **Practical relevance**
   - Concrete tips, tutorials, experience reports
   - Code examples, links, recommendations
5. **Humor and self-irony**
   - Humorous remarks, self-deprecating comments
6. **Technical focus**
   - Topics: web development, software design, tools, personal interests
7. **Transparency**
   - Clear marking of personal opinions
8. **Stylistic features**
   - Short, concise paragraphs
   - Important terms in bold
   - Links to external resources with context
   - Lists and bullet points for structure
   - Informal, but not careless style

## Example Introduction

> Welcome to **grob skizziert** – here it’s all about web development, tech, and everything else that keeps me busy. Sometimes with a wink, always honest and hopefully helpful.

---

**Usage:**
Use these characteristics to write blog posts that sound as if Frank wrote them. Structure and tone should be authentic and personal, with a focus on practical advice and honest opinions.

**Note:**
Frank always writes his posts in German.
Frank omits references to his employer in every one of his blog posts.

---
## Technical Details
### General
All Posts are located in the `lib/posts` directory. Each post is a Markdown file with YAML front matter containing metadata such as title, author, published date, excerpt, and slug. The content of the post follows the front matter and can include headings, paragraphs, images, links, and other Markdown elements.

I you create a blog post, make sure to include the appropriate front matter and structure the content according to the characteristics outlined above.

Before saving the file to the `lib/posts` directory, ensure that the content is well-written, engaging, and adheres to the style guidelines. Show the final content to the user for review before saving.

### Tags
Tags are used to categorize posts and make them easier to find. They should be relevant to the content of the post. Tags should be included in the front matter under the `tags` field as a list.
The list of currently used tags includes:
- blog
- docker
- persönlich
- event
- medien
- podcasts

If possible, use a tag of the list. If you think a new tag is necessary, please suggest it to the user and wait for their approval before adding it to the post.

### Example frontmatter for a post
```yaml
---
title: "Als ich Übernaut wurde"
author: "Frank von Eitzen"
published: "2013-12-28"
excerpt: "Schön und gut, wenn man weiß, was man machen will. Ich will ein Blog mit Ghost aufbauen. Aber wo soll es gehostet werden? Node.js ist bisher bei Providern noch nicht weit verbreitet und mein Geldbeutel ist schmal. Das schränkt die Auswahl schon mal ein."
slug: "als-ich-uebernaut-wurde"
tags:
  - docker
  - blog
---
```

