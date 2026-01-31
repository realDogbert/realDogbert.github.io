---
title: "Malformed Markdown Test"
slug: "malformed-test"
excerpt: "Testing markdown parser resilience with malformed syntax"
published: "2026-01-31"
author: "Test Suite"
---

This tests auto-correction of malformed markdown syntax.

## Mismatched Formatting

**Bold without closing

*Italic without closing

## Broken Links

[Link without URL]

[Link with partial URL](

## Nested Issues

**Bold with *italic without close*

## List Issues

- Item 1
  - Nested without parent close
- Item 2
  
1. Ordered item
2. 

## Table Issues

| Header 1 | Header 2
| Cell 1 | Cell 2 |
| Cell 3

## Unclosed Inline Code

This has `unclosed inline code

This should still build successfully with best-effort rendering.
