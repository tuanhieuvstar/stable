import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SEOMetadata from '@/components/SEOMetadata';
import StructuredData from '@/components/StructuredData';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  const pageTitle = "Contact Us - Find a Tradesperson Ireland";
  const pageDescription = "Get in touch with Find a Tradesperson Ireland. We're here to help you connect with skilled professionals or answer any questions you may have.";
  const canonicalUrl = "https://findatradespersonireland.com/contact";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl
  };

  return (
    <>
      <SEOMetadata
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
      />
      <StructuredData data={structuredData} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <div className="max-w-2xl mx-auto">
          <p className="mb-6">Have a question or need assistance? We're here to help. Fill out the form below, and we'll get back to you as soon as possible.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1">Message</label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
              />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </div>
      </div>
    </>
  );
}