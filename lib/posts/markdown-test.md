---
title: "Markdown Formatting Test"
author: "Test Author"
published: "2026-01-31"
excerpt: "Test post to verify markdown rendering: bold, italic, code, links, headings, lists, blockquotes"
slug: "markdown-test"
---

This is a **bold text** and this is *italic text*. We can also combine them: **bold and *italic* together**.

Here is some `inline code` that should have a background.

Let's test links: [internal link](/blog/another-post) and [external link](https://example.com) should behave differently.

Another external link: [Google](https://www.google.com) should open in new tab.

## This is a Heading 2

Headings create hierarchy in documents.

### This is a Heading 3

Even smaller headings work too.

Here's a code block with syntax highlighting:

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```

And here's an unordered list:

- First item
- Second item
- Third item

And an ordered list:

1. First step
2. Second step
3. Third step

> This is a blockquote. It should have a border on the left and be styled differently from regular text.

---

## Special Syntax

Here's a horizontal rule above. And some ~~strikethrough text~~ below.

| Feature | Status | Priority |
|---------|--------|----------|
| Bold | ✅ Working | P1 |
| Italic | ✅ Working | P1 |
| Links | ✅ Working | P1 |
| Tables | 🧪 Testing | P3 |