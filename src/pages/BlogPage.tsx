import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Container } from "../components/common/Container";
import { SectionHeader } from "../components/common/SectionHeader";
import { SEO } from "../components/common/SEO";
import { blogPosts } from "../data/blogs";
import { siteUrl } from "../lib/constants";

export default function BlogPage() {
  return (
    <>
      <SEO title="Veena Academy Blog | Study Tips and Parent Guidance" description="Read study strategies, exam guidance, parent tips and academic insights from Veena Academy." canonical={`${siteUrl}/blog`} />
      <section className="bg-gradient-secondary pb-20 pt-32">
        <Container>
          <SectionHeader badge="Blog" title="Study strategy, exam guidance and parent insights" description="Helpful articles for students and parents preparing for boards, JEE, NEET, CUET, SSC and foundation courses." />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.id} className="premium-card flex min-h-80 flex-col p-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-muted">{post.category}</p>
                <h2 className="mt-4 text-2xl font-black text-primary">{post.title}</h2>
                <p className="mt-4 flex-1 leading-7 text-text-secondary">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between text-sm font-semibold text-text-muted"><span>{post.readTime}</span><span>{post.publishedAt}</span></div>
                <Link to={`/blog/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-black text-primary hover:text-accent">Read article <ArrowUpRight size={17} /></Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
