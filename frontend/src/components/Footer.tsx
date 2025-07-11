import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-800 dark:bg-slate-900 text-white py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-xl font-bold">Ai-පාසල</h4>
            </div>
            <p className="text-slate-400 dark:text-slate-300">
              AI තාක්ෂණය සමඟ ශ්‍රී ලංකා ඉගෙනුම් අනුභවය නව මාවතකට ගෙන යන්න.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-4">විෂයන්</h5>
            <ul className="space-y-2 text-slate-400 dark:text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">ගණිතය</a></li>
              <li><a href="#" className="hover:text-white transition-colors">විද්‍යාව</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ඉතිහාසය</a></li>
              <li><a href="#" className="hover:text-white transition-colors">භූගෝල විද්‍යාව</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">සහාය</h5>
            <ul className="space-y-2 text-slate-400 dark:text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">සහාය මධ්‍යස්ථානය</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">සම්බන්ධ කරන්න</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ප්‍රතිපෝෂණ</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">සමාගම</h5>
            <ul className="space-y-2 text-slate-400 dark:text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">අප ගැන</a></li>
              <li><a href="#" className="hover:text-white transition-colors">කණ්ඩායම</a></li>
              <li><a href="#" className="hover:text-white transition-colors">රැකියා</a></li>
              <li><a href="#" className="hover:text-white transition-colors">පුවත්</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 dark:border-slate-600 mt-8 pt-8 text-center text-slate-400 dark:text-slate-300">
          <p>&copy; 2025 Ai-පාසල. සියලුම හිමිකම් ආරක්ෂිතයි.</p>
        </div>
      </div>
    </footer>
  );
}
