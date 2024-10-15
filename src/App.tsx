import React, { useState } from 'react';
import { Brain, Users, Building, TrendingUp, Globe } from 'lucide-react';

// Language content
const content = {
  en: {
    nav: {
      about: "About",
      services: "Services",
      future: "Future",
      contact: "Contact"
    },
    hero: {
      title: "Transforming Businesses with AI",
      subtitle: "Rave Inc. is pioneering the future of business operations through advanced AI and automation technologies.",
      cta: "Get Started"
    },
    services: {
      title: "Our Services",
      ai: {
        title: "AI-Powered Customer Service",
        description: "Revolutionize customer interactions with our intelligent AI system, seamlessly integrating human expertise when needed."
      },
      lounge: {
        title: "Unmanned Lounge Solutions",
        description: "Transform your business operations with our AI-driven unmanned solutions for restaurants, retail stores, and more."
      }
    },
    future: {
      title: "Future Growth",
      description: "We aim to scale Rave Inc. to a valuation of 100 billion KRW, delivering innovative solutions and substantial returns for investors."
    },
    why: {
      title: "Why Choose Rave Inc.?",
      innovation: {
        title: "Innovation Leader",
        description: "Leveraging the latest AI technology to stay ahead of industry trends."
      },
      excellence: {
        title: "Operational Excellence",
        description: "Driving efficiency and profitability through our solutions."
      },
      customer: {
        title: "Customer-Centric",
        description: "Enhancing customer experiences through intelligent automation."
      },
      scalable: {
        title: "Scalable Solutions",
        description: "Technologies designed to grow with your business needs."
      }
    },
    contact: {
      title: "Contact Us",
      description: "Join us at Rave Inc. as we redefine the future of business operations.",
      info: "Email: info@raveinc.com | Phone: (123) 456-7890"
    }
  },
  ko: {
    nav: {
      about: "소개",
      services: "서비스",
      future: "미래",
      contact: "연락처"
    },
    hero: {
      title: "AI로 비즈니스를 혁신하다",
      subtitle: "Rave Inc.는 첨단 AI와 자동화 기술을 통해 비즈니스 운영의 미래를 선도합니다.",
      cta: "시작하기"
    },
    services: {
      title: "우리의 서비스",
      ai: {
        title: "AI 기반 고객 서비스",
        description: "지능형 AI 시스템으로 고객 상호작용을 혁신하고, 필요할 때 인간의 전문성을 원활하게 통합합니다."
      },
      lounge: {
        title: "무인 라운지 솔루션",
        description: "AI 기반 무인 솔루션으로 레스토랑, 소매점 등의 비즈니스 운영을 혁신합니다."
      }
    },
    future: {
      title: "미래 성장",
      description: "Rave Inc.를 1000억 원 규모의 기업 가치로 성장시키며, 혁신적인 솔루션과 투자자들에게 상당한 수익을 제공하는 것을 목표로 합니다."
    },
    why: {
      title: "Rave Inc.를 선택해야 하는 이유",
      innovation: {
        title: "혁신 리더",
        description: "최신 AI 기술을 활용하여 산업 트렌드를 선도합니다."
      },
      excellence: {
        title: "운영 우수성",
        description: "우리의 솔루션을 통해 효율성과 수익성을 높입니다."
      },
      customer: {
        title: "고객 중심",
        description: "지능형 자동화를 통해 고객 경험을 향상시킵니다."
      },
      scalable: {
        title: "확장 가능한 솔루션",
        description: "귀사의 비즈니스 요구에 맞춰 성장할 수 있는 기술을 제공합니다."
      }
    },
    contact: {
      title: "연락처",
      description: "Rave Inc.와 함께 비즈니스 운영의 미래를 재정의하세요.",
      info: "이메일: info@raveinc.com | 전화: (123) 456-7890"
    }
  }
};

function App() {
  const [lang, setLang] = useState('en');
  const t = content[lang];

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Header */}
      <header className="bg-black text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Rave Inc.</h1>
          <nav className="flex items-center">
            <ul className="flex space-x-4 mr-4">
              <li><a href="#about" className="hover:text-gray-300">{t.nav.about}</a></li>
              <li><a href="#services" className="hover:text-gray-300">{t.nav.services}</a></li>
              <li><a href="#future" className="hover:text-gray-300">{t.nav.future}</a></li>
              <li><a href="#contact" className="hover:text-gray-300">{t.nav.contact}</a></li>
            </ul>
            <button onClick={() => setLang(lang === 'en' ? 'ko' : 'en')} className="flex items-center">
              <Globe className="w-5 h-5 mr-1" />
              {lang === 'en' ? '한국어' : 'English'}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">{t.hero.title}</h2>
          <p className="text-xl mb-8">{t.hero.subtitle}</p>
          <a href="#contact" className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition duration-300">{t.hero.cta}</a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.services.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <Brain className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.services.ai.title}</h3>
              <p>{t.services.ai.description}</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <Building className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.services.lounge.title}</h3>
              <p>{t.services.lounge.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Growth Section */}
      <section id="future" className="bg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">{t.future.title}</h2>
          <p className="text-xl mb-8">{t.future.description}</p>
          <TrendingUp className="w-16 h-16 mx-auto" />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.why.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Brain className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.why.innovation.title}</h3>
              <p>{t.why.innovation.description}</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.why.excellence.title}</h3>
              <p>{t.why.excellence.description}</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.why.customer.title}</h3>
              <p>{t.why.customer.description}</p>
            </div>
            <div className="text-center">
              <Building className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.why.scalable.title}</h3>
              <p>{t.why.scalable.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">{t.contact.title}</h2>
          <p className="mb-4">{t.contact.description}</p>
          <p>{t.contact.info}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;