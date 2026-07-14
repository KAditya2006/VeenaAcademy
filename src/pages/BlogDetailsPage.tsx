import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Container } from "../components/common/Container";
import { SEO } from "../components/common/SEO";
import { blogPosts } from "../data/blogs";
import { siteUrl } from "../lib/constants";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return <section className="pb-20 pt-32"><Container size="reading"><h1 className="font-display text-5xl text-primary">Article not found</h1><Link to="/blog" className="mt-6 inline-flex items-center gap-2 font-bold text-primary"><ArrowLeft size={18} /> Back to blog</Link></Container></section>;
  }

  return (
    <>
      <SEO title={`${post.title} | Veena Academy`} description={post.excerpt} canonical={`${siteUrl}/blog/${post.slug}`} jsonLd={{ "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.excerpt, datePublished: post.publishedAt }} />
      <article className="bg-background pb-20 pt-32">
        <Container size="reading">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-black text-primary hover:text-accent"><ArrowLeft size={18} /> All articles</Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-text-muted">{post.category} • {post.readTime}</p>
          <h1 className="mt-5 font-display text-5xl leading-tight text-text-primary sm:text-7xl">{post.title}</h1>
          <p className="mt-6 text-xl leading-8 text-text-secondary">{post.excerpt}</p>
          <div className="my-10 h-px bg-divider" />
          <p className="text-lg leading-9 text-text-secondary">{post.content}</p>
        </Container>
      </article>
    </>
  );
}
