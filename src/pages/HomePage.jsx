import React, { useEffect, useState } from "react";

const newMembers = [
  {
    name: "Remedge",
    time: "vor 2 Stunden",
    avatar:
      "/images/pennsylvanileibin_A_hyper-realistic_cinematic_shot_of_a_girl_wi_6092af53-3f56-4d8c-a357-782784a59576.png",
  },
  {
    name: "elizabeth0606",
    time: "vor 3 Stunden",
    avatar:
      "/images/masterkein_707_A_creative_young_professional_in_Disney_Pixar_3D_3baaec47-907e-4e36-8dd9-8faeb4a3afc8.png",
  },
  {
    name: "Guffer",
    time: "vor 3 Stunden",
    avatar:
      "/images/training.midjourneyr01_A_wide_symmetrical_shot_of_a_family_at_t_b4a0c101-a0b6-4313-929d-36011681b15d.png",
  },
  {
    name: "Species-8472",
    time: "vor 4 Stunden",
    avatar: "/images/creative-thinking.jpg",
  },
  {
    name: "bergauf",
    time: "vor 4 Stunden",
    avatar: "/images/peace_transparent2.png",
  },
];

const timeline = [
  {
    title: "Wie KI die NC-Programmierung Revolutioniert",
    company: "DELMIA",
    date: "02.06.2025",
    type: "SPOTLIGHT",
  },
  {
    title:
      "Produktmanager (m/w/d) für den Produktbereich Werkzeugspann- und...",
    company: "ROEMHELD",
    date: "20.05.2025",
    type: "SPOTLIGHT",
  },
];

const slides = [
  {
    title: "NLX 2500|700 2. GENERATION",
    subtitle: "HOCHMODERNES UNIVERSAL-DREHZENTRUM",
    image: "/images/Sapucaiu 1.jpg",
    logo: "/images/logo-icon-medium.png",
    company: "DMG MORI",
    statistic: "49%",
    statisticText: "kürzere Zykluszeit im Vergleich zu herkömmlichen Verfahren",
  },
  {
    title: "WERKZEUGMASCHINEN DER ZUKUNFT",
    subtitle: "INNOVATIVE LÖSUNGEN FÜR DIE INDUSTRIE 4.0",
    image:
      "/images/deaflephant_advanced_spaceships_intricate_surface_details_sus_69094cf0-6501-4079-bc4d-dd5674ccdffb_3.png",
    logo: "/images/logo-icon-medium.png",
    company: "SIEMENS",
    statistic: "30%",
    statisticText: "höhere Produktivität durch intelligente Vernetzung",
  },
  {
    title: "AUTOMATION & ROBOTIK",
    subtitle: "VOLLAUTOMATISIERTE FERTIGUNGSPROZESSE",
    image:
      "/images/here_kitty_kitty_Fine_grain_photograph_of_a_a_tiny_lone_spacesh_e4abb49b-7e05-4975-a770-64e1bf7e1967.png",
    logo: "/images/logo-icon-medium.png",
    company: "KUKA",
    statistic: "24/7",
    statisticText: "Betrieb ohne menschliches Eingreifen möglich",
  },
  {
    title: "DIGITALE TRANSFORMATION",
    subtitle: "SMARTE FABRIK MIT INTELLIGENTEN SYSTEMEN",
    image:
      "/images/liamwinston__A_post-apocalyptic_desert_landscape_inspired_by__edad6941-fdb2-45b6-ad75-48ae56a5b4c4_1.png",
    logo: "/images/logo-icon-medium.png",
    company: "BEVARENA",
    statistic: "85%",
    statisticText: "schnellere Reaktionszeit auf Marktanforderungen",
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Slider */}
      <div className="relative bg-gray-800 h-[400px] overflow-hidden rounded-lg">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
              <div className="text-white ml-10 md:ml-20 max-w-xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {slide.title}
                </h1>
                <h2 className="text-xl mb-4">{slide.subtitle}</h2>
                <div className="flex items-end gap-4">
                  <div className="text-4xl md:text-6xl font-bold text-white">
                    {slide.statistic}
                  </div>
                  <div className="text-sm md:text-base max-w-[180px]">
                    {slide.statisticText}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 text-white font-bold flex items-center">
              <img
                src={slide.logo}
                alt={slide.company}
                className="w-6 h-6 mr-2"
              />
              {slide.company}
            </div>
          </div>
        ))}

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* New Members */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-bold text-lg mb-2">
            Wir begrüßen unsere neuen Mitglieder
          </h2>
          <div className="flex gap-2 mb-2">
            {newMembers.map((m, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs text-gray-500">{m.name}</span>
                <span className="text-[10px] text-gray-400">{m.time}</span>
              </div>
            ))}
          </div>
          <select className="w-full border rounded p-1 mb-2">
            <option>Forum Schnellauswahl ...</option>
          </select>
          <select className="w-full border rounded p-1">
            <option>Neueste Beiträge</option>
          </select>
        </div>
        {/* Timeline */}
        <div className="bg-white rounded-lg shadow p-4 col-span-2">
          <h2 className="font-bold text-lg mb-2">Globale Timeline</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {timeline.map((item, i) => (
              <div
                key={i}
                className="bg-blue-50 rounded p-3 flex flex-col gap-1"
              >
                <span className="text-xs text-blue-700 font-semibold">
                  {item.type} · {item.date}
                </span>
                <span className="font-bold text-blue-900">{item.title}</span>
                <span className="text-xs text-gray-500">{item.company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
