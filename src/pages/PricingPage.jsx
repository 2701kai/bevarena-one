import React, { useState } from "react";

const plans = [
  {
    name: "BASIS FLEX",
    price: "ab 89,00 €",
    oldPrice: "99,-€",
    desc: "Kostengünstiger Einstieg ins Online-Marketing. Digitale Visitenkarte und modulare Struktur.",
    badge: "NUR FÜR NEUKUNDEN BUCHBAR",
    highlight: false,
    image:
      "/images/deaflephant_lone_metallic_spaceships_detailed_hull_texture_fl_d2b385a7-c133-4e16-a5aa-12123560e8b5_0.png",
  },
  {
    name: "CLASSIC",
    price: "199,00 €",
    oldPrice: "299,-€",
    desc: "Gezielte Ansprache, optimierte Reichweite und Content-Marketing.",
    badge: null,
    highlight: false,
    image:
      "/images/deaflephant_lone_metallic_spaceships_detailed_hull_texture_fl_d2b385a7-c133-4e16-a5aa-12123560e8b5_1.png",
  },
  {
    name: "PREMIUM",
    price: "299,00 €",
    oldPrice: "309,-€",
    desc: "Microsite mit hoher Sichtbarkeit im Zielgruppenmarkt der IndustryArena.",
    badge: null,
    highlight: true,
    image:
      "/images/deaflephant_sleek_interstellar_spaceships_weathered_hull_emer_d61e0090-2a3f-49e1-a806-6a96d2f14854_1.png",
  },
  {
    name: "PREMIUM PLUS",
    price: "399,00 €",
    oldPrice: "499,-€",
    desc: "Maximale Reichweite und höchste Aufmerksamkeit durch erweiterten Support.",
    badge: null,
    highlight: false,
    image:
      "/images/deaflephant_sleek_interstellar_spaceships_weathered_hull_emer_d61e0090-2a3f-49e1-a806-6a96d2f14854_2.png",
  },
];

export default function PricingPage() {
  const [duration, setDuration] = useState("12 Monate");
  const [billing, setBilling] = useState("Jährliche Abrechnung");

  return (
    <div className="space-y-8">
      <div className="relative rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/liamwinston__A_post-apocalyptic_desert_landscape_inspired_by__d67ffd94-20fe-4a49-93d8-8ab461ddaec5_2.png"
            alt="Pricing Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-700 opacity-80"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center mb-2">
            <img
              src="/images/logo-icon-medium.png"
              alt="BevArena Logo"
              className="h-8 mr-3"
            />
            <h1 className="text-2xl md:text-3xl font-bold">
              Showroom-Pakete & Preise
            </h1>
          </div>
          <p className="text-blue-100 max-w-xl">
            Wählen Sie Ihr Digital Showroom-Paket oder konfigurieren Sie
            individuell. Profitieren Sie von exklusiven Angeboten für Neukunden!
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        {["6 Monate", "12 Monate", "24 Monate"].map((d) => (
          <button
            key={d}
            className={`px-4 py-2 rounded border font-semibold ${duration === d ? "bg-green-500 text-white" : "bg-white text-blue-700"}`}
            onClick={() => setDuration(d)}
          >
            Laufzeit {d}
          </button>
        ))}
        <button
          className={`px-4 py-2 rounded border font-semibold ${billing === "Monatliche Abrechnung" ? "bg-blue-500 text-white" : "bg-white text-blue-700"}`}
          onClick={() => setBilling("Monatliche Abrechnung")}
        >
          Monatliche Abrechnung
        </button>
        <button
          className={`px-4 py-2 rounded border font-semibold ${billing === "Jährliche Abrechnung" ? "bg-green-500 text-white" : "bg-white text-blue-700"}`}
          onClick={() => setBilling("Jährliche Abrechnung")}
        >
          Jährliche Abrechnung
        </button>
      </div>
      <div className="grid md:grid-cols-4 gap-6">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative bg-white rounded-lg shadow overflow-hidden flex flex-col border-2 ${plan.highlight ? "border-yellow-400" : "border-transparent"}`}
          >
            {plan.badge && (
              <span className="absolute top-4 right-4 z-10 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow">
                {plan.badge}
              </span>
            )}
            <div className="h-40 overflow-hidden">
              <img
                src={plan.image}
                alt={plan.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="font-bold text-lg mb-2">{plan.name}</h2>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-2xl font-bold text-blue-700">
                  {plan.price}
                </span>
                <span className="text-sm line-through text-gray-400">
                  {plan.oldPrice}
                </span>
                <span className="text-xs text-gray-500">/ Monat</span>
              </div>
              <p className="text-gray-700 mb-4">{plan.desc}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition w-full">
                Jetzt buchen
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
