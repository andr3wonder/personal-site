import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ReelLens } from './lenses/reel/ReelLens';
import { AtlasLens } from './lenses/atlas/AtlasLens';
import { VolumeLens } from './lenses/volume/VolumeLens';
import { LineLens } from './lenses/line/LineLens';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Reel is the default after the critic review. */}
        <Route path="/" element={<ReelLens />} />
        <Route path="/reel" element={<ReelLens />} />
        <Route path="/atlas" element={<AtlasLens />} />
        <Route path="/volume" element={<VolumeLens />} />
        <Route path="/line" element={<LineLens />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
