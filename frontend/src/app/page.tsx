"use client";

import { BookOpen, Brain, Users, MessageCircle, ChevronRight, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 transition-colors duration-300">

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>AI මගින් බලගන්වන ලංකා ඉගෙනුම</span>
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6 leading-tight">
              ඔබගේ පුද්ගලික
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                AI ගුරුවරයා
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              සිංහල භාෂාවෙන් නිර්මාණය කරන ලද නවීන AI තාක්ෂණය සමඟ ඔබගේ ඉගෙනුම් ගමන වේගවත් කරන්න. 
              ඕනෑම විෂයක් ඕනෑම වේලාවක ඉගෙන ගන්න.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
                නොමිලේ ආරම්භ කරන්න
              </button>
              <button className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-600 flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                AI සමඟ කතාබහ කරන්න
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 left-1/4 w-16 h-16 bg-indigo-200/30 rounded-full blur-xl animate-pulse"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50 dark:bg-slate-900/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              AI-පාසල හි විශේෂාංග
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              ශ්‍රී ලංකා ඉගෙනුම් ක්‍රමයට සරිලන පරිදි නිර්මාණය කරන ලද නවීන AI තාක්ෂණය
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl dark:hover:shadow-xl dark:hover:shadow-blue-500/10 transition-all border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-600">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">සිංහල AI සහායක</h4>
              <p className="text-slate-600 dark:text-slate-300">
                සම්පූර්ණයෙන්ම සිංහල භාෂාවෙන් පිළිතුරු ලබා දෙන AI සහායකයෙක් සමඟ ඔබගේ ප්‍රශ්න විසඳා ගන්න.
              </p>
            </div>
            
            <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl dark:hover:shadow-xl dark:hover:shadow-purple-500/10 transition-all border border-slate-100 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-600">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">සියලුම විෂයන්</h4>
              <p className="text-slate-600 dark:text-slate-300">
                ගණිතය, විද්‍යාව, ඉතිහාසය, භූගෝල විද්‍යාව සහ තවත් විෂයන් ඉගෙන ගන්න.
              </p>
            </div>
            
            <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl dark:hover:shadow-xl dark:hover:shadow-indigo-500/10 transition-all border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-600">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">පුද්ගලික ඉගෙනුම</h4>
              <p className="text-slate-600 dark:text-slate-300">
                ඔබගේ ඉගෙනුම් ගමන හා දක්ෂතා මට්ටම අනුව පුද්ගලික පාඩම් සැලසුම් ලබා ගන්න.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section id="subjects" className="py-20 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-indigo-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              ලබා ගත හැකි විෂයන්
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              ශ්‍රී ලංකා අධ්‍යාපන ක්‍රමයට සරිලන සියලුම විෂයන්
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'ගණිතය', icon: '📊', color: 'from-blue-500 to-blue-600' },
              { name: 'විද්‍යාව', icon: '🧪', color: 'from-green-500 to-green-600' },
              { name: 'ඉතිහාසය', icon: '📚', color: 'from-yellow-500 to-yellow-600' },
              { name: 'භූගෝල විද්‍යාව', icon: '🌍', color: 'from-purple-500 to-purple-600' },
              { name: 'ඉංග්‍රීසි', icon: '🗣️', color: 'from-red-500 to-red-600' },
              { name: 'තාක්ෂණය', icon: '💻', color: 'from-indigo-500 to-indigo-600' }
            ].map((subject, index) => (
              <div key={index} className="group bg-white dark:bg-slate-800 rounded-2xl p-6 text-center hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-blue-500/10 transition-all cursor-pointer border border-slate-100 dark:border-slate-700">
                <div className="text-3xl mb-4">{subject.icon}</div>
                <h4 className="font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {subject.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">10,000+</div>
              <div className="text-slate-600 dark:text-slate-300">සක්‍රිය ශිෂ්‍යයන්</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">50+</div>
              <div className="text-slate-600 dark:text-slate-300">විෂයන් සහ පාඩම්</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">95%</div>
              <div className="text-slate-600 dark:text-slate-300">ශිෂ්‍ය සෑහීමකම</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            අදම AI-පාසලට එක් වන්න
          </h3>
          <p className="text-xl text-blue-100 dark:text-blue-200 mb-8">
            ඔබගේ ඉගෙනුම් ගමන දැනටම ආරම්භ කරන්න. නොමිලේ ගිණුමක් සාදා ගන්න.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 mx-auto">
            ආරම්භ කරන්න
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}