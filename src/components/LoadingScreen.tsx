import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationCityIcon from '@mui/icons-material/LocationCity';

const LoadingContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  transition: 'opacity 0.5s ease'
}));

const LoadingContent = styled(Box)({
  textAlign: 'center'
});

const LoadingLogo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: 200,
  height: 4,
  borderRadius: 2,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    backgroundColor: theme.palette.primary.main
  }
}));

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 15;
        const newProgress = prev + increment;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <LoadingContainer sx={{ opacity: isVisible ? 1 : 0 }}>
      <LoadingContent>
        <LoadingLogo>
          <LocationCityIcon sx={{ fontSize: 32 }} />
          <Typography variant="h4" fontWeight={700}>
            CivicFix
          </Typography>
        </LoadingLogo>
        <StyledLinearProgress variant="determinate" value={progress} />
      </LoadingContent>
    </LoadingContainer>
  );
};

export default LoadingScreen;