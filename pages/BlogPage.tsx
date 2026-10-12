import React from 'react';
import { Link } from 'react-router-dom';
import { blogData } from '../data/blogData';

// FIX: Defined props interface and used React.FC for better type safety and to resolve potential issues with special props like 'key'.
interface BlogPostCardProps {
    title: string;
    excerpt: string;
    image: string;
    link: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ title, excerpt, image, link }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group">
        <img src={image} alt={title} className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-brand-dark mb-2">{title}</h3>
            <p className="text-slate-500 flex-grow mb-4">{excerpt}</p>
            <Link to={link} className="font-semibold text-brand-secondary hover:text-sky-400 self-start">
                Baca Selengkapnya &rarr;
            </Link>
        </div>
    </div>
);

const BlogPage: React.FC = () => {
    return (
        <>
            <section className="py-12 sm:py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
                        Blog & Wawasan Hukum
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
                        Dapatkan informasi, tips, dan panduan hukum praktis yang relevan untuk membantu pertumbuhan dan keamanan bisnis UMKM Anda.
                    </p>
                </div>
            </section>
            <section className="py-12 sm:py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {blogData.map((post) => (
                            <BlogPostCard
                                key={post.slug}
                                title={post.title}
                                excerpt={post.excerpt}
                                image={post.image}
                                link={`/blog/${post.slug}`}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogPage;