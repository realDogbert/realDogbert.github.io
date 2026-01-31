---
title: "XSS Security Test"
author: "Security Tester"
published: "2026-01-31"
excerpt: "Testing HTML sanitization to prevent XSS attacks"
slug: "xss-test"
---

This should be safe: **bold text**.

This should be stripped: <script>alert('XSS')</script>

This iframe should also be removed: <iframe src="https://evil.com"></iframe>

Safe HTML like <strong>bold</strong> and <em>italic</em> should work.

But dangerous <script>console.log('hack')</script> should be removed.