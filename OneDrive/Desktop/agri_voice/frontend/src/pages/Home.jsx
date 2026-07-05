import { Link } from 'react-router-dom';

import IMAGES from '../utils/images';

function Home() {
  return (
    <main className="min-h-screen">
      <section className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">Smart Agricultural Advisor</p>
          <h1 className="mt-3 text-4xl font-extrabold text-text">Krishi Mitra for practical farming decisions</h1>
          <p className="mt-4 text-gray-600 max-w-2xl">A premium interface giving farmers fast access to AI guidance, weather, and market insights — designed for clarity and real-world decisions.</p>

          <div className="mt-6 flex gap-3">
            <Link to="/dashboard" className="px-4 py-2 rounded-full bg-primary text-white font-semibold">Get Started</Link>
            <Link to="/ask-ai" className="px-4 py-2 rounded-full border border-border text-text">Try Ask AI</Link>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white card-16 p-4 shadow-soft">
              <p className="text-sm text-gray-500">Quick checks</p>
              <p className="mt-2 font-bold text-text">Weather + Market</p>
            </div>
            <div className="bg-white card-16 p-4 shadow-soft">
              <p className="text-sm text-gray-500">Advice style</p>
              <p className="mt-2 font-bold text-text">Simple</p>
            </div>
            <div className="bg-white card-16 p-4 shadow-soft">
              <p className="text-sm text-gray-500">Access</p>
              <p className="mt-2 font-bold text-text">Mobile friendly</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white card-16 overflow-hidden shadow-soft">
            <picture>
              <source type="image/webp" srcSet={IMAGES.hero.webpSrcSet} sizes="(max-width: 768px) 100vw, 40vw" />
              <img loading="lazy" src={IMAGES.hero.src} srcSet={IMAGES.hero.srcSet} sizes="(max-width: 768px) 100vw, 40vw" alt="Farm hero" className="w-full h-72 object-cover" />
            </picture>
            <div className="p-4">
              <h3 className="font-semibold">Daily field view</h3>
              <p className="text-sm text-gray-600 mt-1">See crop conditions, planning tips, and seasonal trends at a glance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white card-16 p-6 shadow-soft">
            <p className="text-xs font-semibold text-primary uppercase">Why this exists</p>
            <h2 className="mt-2 font-semibold text-text">Fast guidance for real farm work</h2>
            <p className="mt-2 text-gray-600">Farmers need quick answers for crop care, fertilizer use, weather checks, and market timing.</p>
          </div>

          <div className="bg-white card-16 p-6 shadow-soft">
            <p className="text-xs font-semibold text-primary uppercase">What it offers</p>
            <h2 className="mt-2 font-semibold text-text">Tools in one place</h2>
            <ul className="mt-2 text-gray-600 list-disc list-inside">
              <li>Farmer registration and login</li>
              <li>Ask AI for crop advice</li>
              <li>Weather and market price summaries</li>
              <li>Profile and query history</li>
            </ul>
          </div>

          <div className="bg-white card-16 p-6 shadow-soft">
            <p className="text-xs font-semibold text-primary uppercase">Website first</p>
            <h2 className="mt-2 font-semibold text-text">Designed for browsing on the go</h2>
            <p className="mt-2 text-gray-600">Responsive cards, clear spacing, and stronger visual hierarchy make the app easier to scan.</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white card-16 overflow-hidden shadow-soft">
            <picture>
              <source type="image/webp" srcSet={IMAGES.cropCloseup.webpSrcSet} sizes="(max-width: 768px) 100vw, 33vw" />
              <img loading="lazy" src={IMAGES.cropCloseup.src} srcSet={IMAGES.cropCloseup.srcSet} sizes="(max-width: 768px) 100vw, 33vw" alt="Crop planning" className="w-full h-44 object-cover" />
            </picture>
            <div className="p-4">
              <h3 className="font-semibold">Crop planning</h3>
              <p className="mt-1 text-gray-600">Track the condition of your field and keep your next action simple.</p>
            </div>
          </div>

          <div className="bg-white card-16 overflow-hidden shadow-soft">
            <picture>
              <source type="image/webp" srcSet={IMAGES.weather.webpSrcSet} sizes="(max-width: 768px) 100vw, 33vw" />
              <img loading="lazy" src={IMAGES.weather.src} srcSet={IMAGES.weather.srcSet} sizes="(max-width: 768px) 100vw, 33vw" alt="Weather over farmland" className="w-full h-44 object-cover" />
            </picture>
            <div className="p-4">
              <h3 className="font-semibold">Weather tracking</h3>
              <p className="mt-1 text-gray-600">Check rain, humidity, and field timing before heading out.</p>
            </div>
          </div>

          <div className="bg-white card-16 overflow-hidden shadow-soft">
            <picture>
              <source type="image/webp" srcSet={IMAGES.market.webpSrcSet} sizes="(max-width: 768px) 100vw, 33vw" />
              <img loading="lazy" src={IMAGES.market.src} srcSet={IMAGES.market.srcSet} sizes="(max-width: 768px) 100vw, 33vw" alt="Market produce" className="w-full h-44 object-cover" />
            </picture>
            <div className="p-4">
              <h3 className="font-semibold">Market timing</h3>
              <p className="mt-1 text-gray-600">Compare crop prices and make better selling decisions.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
