import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from '../theme';
import LoadingScreen from './LoadingScreen';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import DemoSection from './DemoSection';
import StatsSection from './StatsSection';
import ProcessSection from './ProcessSection';
import TestimonialsSection from './TestimonialsSection';
import CTASection from './CTASection';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      {!isLoading && (
        <>
          <HeroSection />
          <FeaturesSection />
          <DemoSection />
          <StatsSection />
          <ProcessSection />
          <TestimonialsSection />
          <CTASection />
        </>
      )}
    </ThemeProvider>
  );
};

export default HomePage;