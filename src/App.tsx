import React, { useState, useEffect } from 'react';
import { Brain, Users, Building, TrendingUp, Globe, CheckCircle, Mail, Phone, MapPin, AlertTriangle, BarChart2, ChevronLeft, ChevronRight, Star as StarFilled } from 'lucide-react';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ['/sheem_preview.jpg', '/solutions.png']; // 캐러셀에 표시할 이미지 목록
  const t = content[lang];

  // New state for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

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

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5초마다 이미지 전환

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(imageInterval);
    };
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % t.testimonials.items.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + t.testimonials.items.length) % t.testimonials.items.length);
  };

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
            <a href="https://sheem.me/" target="_blank" rel="noopener noreferrer">
              <img src="/logo.svg?height=16&width=32" alt="Rave Inc. Logo" className="h-6 w-auto mr-2" />
            </a>
          </div>
          <nav className="flex items-center">
            <ul className="hidden md:flex space-x-6 mr-6">
              <li><a href="#about" className="hover:text-zinc-900 transition duration-300">{t.nav.about}</a></li>
              <li><a href="#services" className="hover:text-zinc-900 transition duration-300">{t.nav.services}</a></li>
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
          <h1 className="text-4xl font-bold mb-8 leading-normal">{renderTextWithLineBreaks(t.hero.title)}</h1>
          {/* <div className="w-16 h-0.5 bg-white mx-auto my-8"></div> */}
          <p className="text-xl mb-8">{renderTextWithLineBreaks(t.hero.subtitle)}</p>
          <a href="#contact" className="bg-white/10 backdrop-blur-lg text-white px-8 py-3 rounded-full hover:bg-white/30 transition duration-300">{t.hero.cta}</a>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{renderTextWithLineBreaks(t.about.title)}</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 relative">
              <img 
                src={images[currentImageIndex]} 
                alt="About Rave Inc." 
                className="rounded-lg w-full h-auto transition-opacity duration-500"
              />
              <button 
                onClick={prevImage} 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button 
                onClick={nextImage} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'}`}
                  ></div>
                ))}
              </div>
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
            <div className="bg-white p-8 rounded-lg flex flex-col items-center text-center">
              <img src="/cally.svg" alt="Cally" className="h-24 mt-6 mb-12" />
              <h3 className="text-2xl font-semibold mb-4">{t.services.cally.title}</h3>
              <p className="text-gray-900 mb-6">{renderTextWithLineBreaks(t.services.cally.description)}</p>
              <a 
                href="https://cally.kr" 
                className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition duration-300 text-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Phone className="w-6 h-6 mr-3 animate-pulse" />
                <span className="relative">
                  <span className="relative">{t.services.cally.cta}</span>
                </span>
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg flex flex-col items-center text-center">
              <img src="/sheem.svg" alt="sheem" className="h-24 mt-6 mb-12" />
              <h3 className="text-2xl font-semibold mb-4">{t.services.lounge.title}</h3>
              <p className="text-gray-900 mb-4">{renderTextWithLineBreaks(t.services.lounge.description)}</p>
              <div className="mb-6">
                <ul className="list-disc list-inside">
                  <li>{t.services.lounge.locations.gangnam}</li>
                  <li>{t.services.lounge.locations.nambu}</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://sheem.me/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block bg-zinc-900 text-white px-8 py-4 rounded-full hover:bg-zinc-700 transition duration-300"
                >
                  {t.services.lounge.cta}
                </a>
                <a 
                  href="https://map.naver.com/p/entry/place/1340054150?c=15.00,0,0,0,dh" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center bg-green-500 text-white px-8 py-4 rounded-full hover:bg-green-600 transition duration-300"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  {t.services.lounge.location}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Team Section */}
      <section id="team" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t.team.title}</h2>
          <div className="max-w-4xl mx-auto">
            {t.team.members.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-lg">
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t.testimonials.title}</h2>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg relative">
            <button 
              onClick={prevReview} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button 
              onClick={nextReview} 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
            <div className="text-center">
              <p className="text-xl italic mb-6">"{renderTextWithLineBreaks(t.testimonials.items[currentReviewIndex].quote)}"</p>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarFilled 
                    key={i} 
                    className={`w-6 h-6 ${i < t.testimonials.items[currentReviewIndex].rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="font-semibold">{t.testimonials.items[currentReviewIndex].author}</p>
              <p className="text-gray-600">{t.testimonials.items[currentReviewIndex].position}</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <a 
              href="https://map.naver.com/p/entry/place/1340054150?c=15.00,0,0,0,dh&placePath=/review" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300"
            >
              {t.testimonials.seeMore}
            </a>
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
          <p className="mb-4">&copy; 2025 Rave Inc. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
          </div>
        </div>
      </footer>
    </div>
  );
}
