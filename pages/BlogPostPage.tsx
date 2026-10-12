import DOMPurify from 'dompurify';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogData, type BlogPost } from '../data/blogData';
import Icon from '../components/Icon';

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC<{ headings: Heading[] }> = ({ headings }) => {
  if (headings.length === 0) return null;

  return (
    <div className="sticky top-28">
      <h3 className="text-lg font-bold text-brand-dark mb-4 border-b pb-2">Daftar Isi</h3>
      <nav>
        <ul className="space-y-2 text-sm">
          {headings.map(heading => (
            <li key={heading.id}>
              <a 
                href={`#${heading.id}`}
                className="text-slate-600 hover:text-brand-secondary transition-colors"
                style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

const RelatedPostCard: React.FC<{ post: BlogPost }> = ({ post }) => (
    <Link to={`/blog/${post.slug}`} className="bg-slate-50 rounded-xl overflow-hidden flex flex-col group border border-slate-200 hover:border-brand-secondary transition-all">
        <img src={post.image} alt={post.title} className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="p-4 flex flex-col flex-grow">
            <h4 className="text-md font-bold text-brand-dark mb-1 group-hover:text-brand-secondary transition-colors">{post.title}</h4>
            <p className="text-xs text-slate-500">{post.date}</p>
        </div>
    </Link>
);

const BlogPostPage: React.FC<{ slug: string }> = ({ slug }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [contentWithIds, setContentWithIds] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const post = blogData.find(p => p.slug === slug);

  // Find related posts based on tags
  const relatedPosts = post 
    ? blogData.filter(p => {
        if (p.slug === post.slug) return false; // Exclude the current post
        return p.tags.some(tag => post.tags.includes(tag)); // Find posts with at least one common tag
      }).slice(0, 2) // Limit to 2 related posts
    : [];

  useEffect(() => {
    if (!post) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.content;

    const newHeadings: Heading[] = [];
    const headingElements = tempDiv.querySelectorAll('h2, h3');

    headingElements.forEach((el, index) => {
      const text = el.textContent || '';
      const level = parseInt(el.tagName.substring(1), 10);
      const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
      const uniqueId = `${id}-${index}`;
      el.id = uniqueId;

      newHeadings.push({ id: uniqueId, text, level });
    });
    
    setHeadings(newHeadings);
    setContentWithIds(tempDiv.innerHTML);
    
    // Smooth scrolling for hash links within the TOC
    const handleTocLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      const nav = target.closest('nav');
      if (nav && target.tagName === 'A' && target.hash) {
        const element = document.querySelector(target.hash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    
    document.addEventListener('click', handleTocLinkClick);

    return () => {
      document.removeEventListener('click', handleTocLinkClick);
    };

  }, [post]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  if (!post) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold">Artikel Tidak Ditemukan</h1>
        <p className="mt-4">Maaf, artikel yang Anda cari tidak ada.</p>
        <Link to="/blog" className="mt-8 inline-block bg-brand-dark text-white font-semibold py-3 px-6 rounded-lg">Kembali ke Blog</Link>
      </div>
    );
  }
  
  const postUrl = window.location.href;
  const postTitle = post.title;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Post Body with TOC */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Table of Contents (Desktop) */}
          <aside className="hidden lg:block lg:col-span-1">
            <TableOfContents headings={headings} />
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
             <div className="mb-8">
                <Link to="/blog" className="text-sm font-semibold text-brand-secondary hover:underline">
                    &larr; Kembali ke Blog
                </Link>
            </div>
            <article>
              <img src={post.image} alt={post.title} className="rounded-2xl shadow-lg mb-8 w-full object-cover" style={{aspectRatio: '16/9'}} />

              {/* Post Header */}
              <div className="mb-8">
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight mb-4">{post.title}</h1>
                  <div className="flex items-center space-x-4 text-slate-500">
                    <span>Oleh: {post.author}</span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                    <span>{post.date}</span>
                  </div>
              </div>
              
              {/* Social Share Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-slate-500 my-8 py-4 border-y border-slate-200">
                  <span className="text-sm font-semibold">Bagikan Artikel Ini:</span>
                  <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Bagikan di Twitter" className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                      <Icon className="w-5 h-5"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></Icon>
                  </a>
                  <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Bagikan di LinkedIn" className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                      <Icon className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></Icon>
                  </a>
                  <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Bagikan di Facebook" className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                      <Icon className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></Icon>
                  </a>
                  <button onClick={handleCopyLink} aria-label="Salin tautan" className="p-2 rounded-full hover:bg-slate-100 transition-colors relative">
                      <Icon className="w-5 h-5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></Icon>
                      {isCopied && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-brand-dark text-white px-2 py-1 rounded animate-fadeInDown">Disalin!</span>}
                  </button>
              </div>

              {/* Table of Contents (Mobile) */}
              <div className="lg:hidden mb-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
                <TableOfContents headings={headings} />
              </div>
              
              <div
                className="prose lg:prose-lg max-w-none text-slate-600 prose-h2:scroll-mt-28 prose-h3:scroll-mt-28"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(contentWithIds) }}
              />
            </article>

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 pt-12 border-t border-slate-200">
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-8">Artikel Terkait</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {relatedPosts.map(relatedPost => (
                    <RelatedPostCard key={relatedPost.slug} post={relatedPost} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
       <style>{`
        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown { animation: fadeInDown 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default BlogPostPage;
