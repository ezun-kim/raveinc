import React, { useState, useEffect } from 'react';
import { Brain, Users, Building, TrendingUp, Globe, CheckCircle, Mail, Phone, MapPin, AlertTriangle, BarChart2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { en } from './lang/en';
import { ko } from './lang/ko';

const content = { en, ko };

// Utility function to render text with line breaks
const renderTextWithLineBreaks = (text: string) => {
  return text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index !== text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
};

export default function Component() {
  const [lang, setLang] = useState<'en' | 'ko'>('ko');
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const t = content[lang];

  // New state for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);

    emailjs.init({
      publicKey: 'fhKFLuwqXJYTCwwB9',
      // Do not allow headless browsers
      blockHeadless: true,
      limitRate: {
        // Set the limit rate for the application
        id: 'app',
        // Allow 1 request per 10s
        throttle: 10000,
      },
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const result = await emailjs.send(
        'service_ckmb1ud', // Replace with your EmailJS service ID
        'template_158a8ns', // Replace with your EmailJS template ID
        formData,
      );

      console.log(result.text);
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Sticky Header */}
      <header className={`bg-white/80 z-50 backdrop-blur-md text-gray-900 py-4 transition-all duration-300 ${isHeaderSticky ? 'fixed top-0 left-0 right-0' : ''}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.svg?height=16&width=32" alt="Rave Inc. Logo" className="h-6 w-auto mr-2" />
            {/* <span className="text-xl font-semibold">Rave Inc.</span> */}
          </div>
          <nav className="flex items-center">
            <ul className="hidden md:flex space-x-6 mr-6">
              <li><a href="#about" className="hover:text-zinc-900 transition duration-300">{t.nav.about}</a></li>
              <li><a href="#services" className="hover:text-zinc-900 transition duration-300">{t.nav.services}</a></li>
              <li><a href="#showcase" className="hover:text-zinc-900 transition duration-300">{t.nav.showcase}</a></li>
              <li><a href="#team" className="hover:text-zinc-900 transition duration-300">{t.nav.team}</a></li>
              <li><a href="#contact" className="hover:text-zinc-900 transition duration-300">{t.nav.contact}</a></li>
            </ul>
            <button onClick={() => setLang(lang === 'en' ? 'ko' : 'en')} className="flex items-center bg-zinc-900 text-white px-3 py-1 rounded-full hover:bg-zinc-700 transition duration-300">
              <Globe className="w-4 h-4 mr-1" />
              {lang === 'en' ? '한국어' : 'English'}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section with Background Video and Dimmer */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute z-0 w-full h-full object-cover"
        >
          <source src="/sheem_optimized.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dimmer overlay */}
        <div className="absolute z-10 w-full h-full bg-black opacity-50"></div>
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">{t.hero.title}</h1>
          <p className="text-xl mb-8">{t.hero.subtitle}</p>
          <a href="#contact" className="bg-zinc-900 text-white px-8 py-3 rounded-full hover:bg-zinc-700 transition duration-300">{t.hero.cta}</a>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t.about.title}</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img src="/placeholder.svg?height=400&width=600" alt="About Rave Inc." className="rounded-lg" />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <p className="text-lg mb-6">{renderTextWithLineBreaks(t.about.description)}</p>
              <ul className="list-disc list-inside">
                {t.about.points.map((point, index) => (
                  <li key={index} className="mb-2">{renderTextWithLineBreaks(point)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t.services.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg">
              <Brain className="w-16 h-16 mb-6 text-zinc-900" />
              <h3 className="text-2xl font-semibold mb-4">{t.services.ai.title}</h3>
              <p className="text-gray-900">{renderTextWithLineBreaks(t.services.ai.description)}</p>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <Building className="w-16 h-16 mb-6 text-zinc-900" />
              <h3 className="text-2xl font-semibold mb-4">{t.services.lounge.title}</h3>
              <p className="text-gray-900">{renderTextWithLineBreaks(t.services.lounge.description)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">{t.showcase.title}</h2>
          <h3 className="text-2xl text-center mb-8">{t.showcase.subtitle}</h3>
          <p className="text-center mb-12 text-gray-900">{renderTextWithLineBreaks(t.showcase.description)}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.showcase.features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                {index === 0 && <Brain className="w-12 h-12 mb-6 text-zinc-900" />}
                {index === 1 && <CheckCircle className="w-12 h-12 mb-6 text-zinc-900" />}
                {index === 2 && <Building className="w-12 h-12 mb-6 text-zinc-900" />}
                {index === 3 && <BarChart2 className="w-12 h-12 mb-6 text-zinc-900" />}
                {index === 4 && <AlertTriangle className="w-12 h-12 mb-6 text-zinc-900" />}
                {index === 5 && <AlertTriangle className="w-12 h-12 mb-6 text-zinc-900" />}
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-900">{renderTextWithLineBreaks(feature.description)}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#contact" className="bg-zinc-900 text-white px-8 py-3 rounded-full hover:bg-zinc-700 transition duration-300">
              {t.showcase.cta}
            </a>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t.team.title}</h2>
          <div className="max-w-4xl mx-auto">
            {t.team.members.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mb-6 md:mb-0 md:mr-8" />
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-zinc-900 mb-2">{member.position}</p>
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                        LinkedIn Profile
                      </a>
                    )}
                    <p className="text-gray-900 mb-4">{renderTextWithLineBreaks(member.description)}</p>
                    <h4 className="font-semibold mb-2">Key Achievements:</h4>
                    <ul className="list-disc list-inside mb-4">
                      {member.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-900">{renderTextWithLineBreaks(achievement)}</li>
                      ))}
                    </ul>
                    <h4 className="font-semibold mb-2">Skills:</h4>
                    <div className="flex flex-wrap">
                      {member.skills.map((skill, i) => (
                        <span key={i} className="bg-gray-200 text-gray-800 px-2 py-1 rounded mr-2 mb-2">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t.testimonials.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.testimonials.items.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg">
                <p className="mb-6 italic text-gray-900">"{item.quote}"</p>
                <p className="font-semibold">{item.author}</p>
                <p className="text-zinc-900">{item.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Form */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t.contact.title}</h2>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t.contact.form.name}
                  className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t.contact.form.email}
                  className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  required
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t.contact.form.message}
                  rows={4}
                  className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-zinc-900 text-white px-6 py-3 rounded-lg hover:bg-zinc-700 transition duration-300 disabled:bg-gray-400"
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? 'Sending...' : t.contact.form.submit}
                </button>
                {formStatus === 'success' && (
                  <p className="mt-4 text-green-600">Your message has been sent successfully!</p>
                )}
                {formStatus === 'error' && (
                  <p className="mt-4 text-red-600">There was an error sending your message. Please try again.</p>
                )}
              </form>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h3 className="text-2xl font-semibold mb-6">{t.contact.info.title}</h3>
              <p className="mb-4 flex items-center text-gray-900"><Mail className="w-6 h-6 mr-4 text-zinc-900" /> {t.contact.info.email}</p>
              <p className="mb-4 flex items-center text-gray-900"><Phone className="w-6 h-6 mr-4 text-zinc-900" /> {t.contact.info.phone}</p>
              <p className="mb-6 flex items-center text-gray-900"><MapPin className="w-6 h-6 mr-4 text-zinc-900" /> {t.contact.info.address}</p>
              <p className="text-gray-900">{renderTextWithLineBreaks(t.contact.info.description)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">&copy; 2023 Rave Inc. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-zinc-400 transition duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400 transition duration-300">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}