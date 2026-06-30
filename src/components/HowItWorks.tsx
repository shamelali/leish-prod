import { Search, CalendarCheck, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getDictionary, type Locale } from "../lib/i18n";

export default function HowItWorks({
  locale = "en",
  dict,
}: {
  locale?: Locale;
  dict?: Record<string, any>;
} = {}) {
  const t = dict ?? getDictionary(locale as Locale);

  const steps = [
    {
      num: "01",
      icon: Search,
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Desc,
      color: "#e11d48",
      bgColor: "bg-rose-50 dark:bg-rose-950/30",
    },
    {
      num: "02",
      icon: CalendarCheck,
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Desc,
      color: "#db2777",
      bgColor: "bg-pink-50 dark:bg-pink-950/30",
    },
    {
      num: "03",
      icon: Sparkles,
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Desc,
      color: "#8b5cf6",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
  ];

  return (
    <section
      className="py-24 bg-gradient-to-b from-white to-rose-50/30 dark:from-neutral-950 dark:to-neutral-900"
      id="how-it-works"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-rose-500 uppercase tracking-wider mb-2">
            The Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-white">
            {t.howItWorks.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-16">
          {steps.map((step, i) => (
            <div key={step.num} className="relative text-center group">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-[60%] w-[80%]">
                  <div className="border-t-2 border-dashed border-rose-200 dark:border-rose-900/50" />
                  <ArrowRight className="absolute -right-3 -top-2 w-4 h-4 text-rose-300 dark:text-rose-700" />
                </div>
              )}
              <div className="relative">
                <div
                  className={`inline-flex items-center justify-center w-28 h-28 rounded-3xl ${step.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                >
                  <step.icon
                    className="w-12 h-12"
                    style={{ color: step.color }}
                  />
                </div>
                <p className="text-xs font-bold text-rose-300 dark:text-rose-700 mb-2 tracking-[0.2em]">
                  {step.num}
                </p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            to="/artists"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-2xl hover:from-rose-600 hover:to-pink-700 transition-all shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 hover:scale-105"
          >
            {t.common.learnMore} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
