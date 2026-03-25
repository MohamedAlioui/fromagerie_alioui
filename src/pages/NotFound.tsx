import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f5f0]">
      <div className="text-center px-6">
        {/* Cheese wheel decoration */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="w-40 h-40 rounded-full border-[12px] border-[#1B3A2D] flex items-center justify-center bg-amber-50 shadow-xl">
            <div className="w-28 h-28 rounded-full border-[8px] border-amber-300 flex items-center justify-center bg-amber-100">
              <span className="text-5xl font-black text-[#1B3A2D]" style={{ fontFamily: 'Playfair Display, serif' }}>
                404
              </span>
            </div>
          </div>
          {/* small dots around */}
          {[0, 60, 120, 180, 240, 300].map(deg => (
            <div
              key={deg}
              className="absolute w-3 h-3 rounded-full bg-amber-400"
              style={{
                transform: `rotate(${deg}deg) translateY(-82px)`,
              }}
            />
          ))}
        </div>

        <h1
          className="text-3xl font-bold text-[#1B3A2D] mb-3"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Page introuvable
        </h1>
        <p className="text-gray-500 mb-8 max-w-xs mx-auto">
          Cette page n'existe pas ou a été déplacée. Revenez à l'accueil.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl border-2 border-[#1B3A2D] text-[#1B3A2D] font-semibold text-sm hover:bg-[#1B3A2D] hover:text-white transition-colors"
          >
            ← Retour
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-colors"
            style={{ background: '#1B3A2D' }}
          >
            Accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
