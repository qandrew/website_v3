# Website V3

In 2015 I created qandrew.github.io as a basic website, and I got more familiar with web development. In 2017, I upgraded to using a static website generator via Hugo. While this has served my website and blogging desires somewhat, it has become unmaintainable due to my Hugo dependencies being customized and not having an adaptable dev environment. Having worked in the software engineering industry for a few years now, I have an opportunity to re-vamp my website and try to use the latest frameworks.

## Desired Features

Here are some of the must haves in the website
- **Maintainability** I do not want a framework that would require too much coding effort.
- **Performance**: Since the website is mostly static, should I compile the website prior to deployment and make it static, or server side rendered, or a combination?
- **Fast content generation with markdown**: I want to write content in Markdown, so there is minimal overhead to creating new work, rather than spending a lot of time formatting websites
  - however, Markdown can also be limiting in expression, so I would also like the ability to insert custom HTML.
- **Flexibilty to embed non-static content**: if I want to be able to insert an animation, or something that needs tools beyond markdown / html, the framework should be flexible enough to support. See *mdx, frontmatter*.
- **Good looking UI**: I want a blog that looks nice, with good navigation, and the ability to add certain UI / UX features (ie parallax). The website needs to look good both on mobile and desktop.
- **easy to deploy**: multi docker container websites could be more complicated to deploy and I am not sure how much money I want to spend. Github offers free static website hosting, so if I can compile a website (without a backend) this might be easier.

Here are some optional features that should be lower in priority
- **Password Protection**: do I want some of my web pages to be password protected?
- **Photography support** Do I want to host my photography portfolio on this website, and if so how can I improve the load times and UI?

## Technology comparison

- **Raw HTML**: this was essentially what I did in my first website version. While very lightweight, copying-and-pasting and editng files is too much overhead for content generation.
- **Hugo**: this is the static blog website that I have been using for the past few years. The issue with my current hugo set up is that I do not like any of the templates, and it is "older technology"
- **NextJS**: nextJS is a framework on top of react, written in Javascript. While the framework offers a lot of flexibility, I also want to limit scope so I do not accrue too much maintenance overhead.

## Content

This part of the document is non-technical, but more of a thought process for what I want to put on my blog. I definitely would love to write about my travel adventures and mountaineering journey. Blogging about coding or other things that happen in my life (photography, cooking) would be nice also.

What I want to write about would affect the structure of my web page.

## Implementation Timeline

Backwards compatibility should be lower in priority. I do not necessarily need to maintain old blog posts if they are no longer relevant.

In terms of what to get done, I foresee the following:
- evaluate frameworks and technologies
- write a simple blog post on new web framework
- deprecate qandrew.github.io
- migrate old blog posts to new website

## References

[Static Blog With Next.js and Markdown - YouTube](https://www.youtube.com/watch?v=MrjeefD8sac)
[How I Built my Blog using MDX, Next.js, and React](https://www.joshwcomeau.com/blog/how-i-built-my-blog/)
[How To Build and Deploy Your Personal Blog With Next.js \| Kalo Pilato](https://www.kalopilato.com/blog/how-to-build-and-deploy-your-personal-blog-with-next-js)
[Learn Next.js](https://nextjs.org/learn)