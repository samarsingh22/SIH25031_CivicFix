import React from 'react';
import { Box, Typography, Button, Stack, Container } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MapIcon from '@mui/icons-material/Map';
import WarningIcon from '@mui/icons-material/Warning';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(10, 0),
  opacity: 0,
  transform: 'translateY(30px)',
  animation: `${fadeInUp} 1s ease forwards`
}));

const HeroContent = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(10),
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(6)
  }
}));

const HeroImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 24px 48px rgba(0, 0, 0, 0.1)'
}));

const HeroImage = styled('img')({
  width: '100%',
  height: 400,
  objectFit: 'cover',
  display: 'block'
});

const FloatingCardsContainer = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
});

const FloatingCard = styled(Box)(({ theme }) => ({
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2, 2.5),
  borderRadius: 12,
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  fontWeight: 600,
  animation: `${float} 3s ease-in-out infinite`,
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(255, 255, 255, 0.95)'
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderRadius: 8,
  fontWeight: 600,
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${theme.palette.primary.main}30`
  }
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderRadius: 8,
  fontWeight: 600,
  border: `2px solid ${theme.palette.grey[300]}`,
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
  }
}));

const HeroSection: React.FC = () => {
  return (
    <HeroContainer>
      <Container maxWidth="lg">
        <HeroContent>
          <Box sx={{ maxWidth: 500 }}>
            <Typography variant="h1" gutterBottom color="text.primary">
              Fix your city, one report at a time
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
              CivicFix empowers residents to report civic issues like potholes, broken streetlights, 
              and sanitation problems. Track progress and see real improvements in your neighborhood.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ maxWidth: { xs: 300, sm: 'none' }, mx: { xs: 'auto', sm: 0 } }}>
              <PrimaryButton
                variant="contained"
                startIcon={<AddCircleIcon />}
                size="large"
              >
                Report an Issue
              </PrimaryButton>
              <SecondaryButton
                variant="outlined"
                startIcon={<MapIcon />}
                size="large"
                color="inherit"
              >
                View Public Map
              </SecondaryButton>
            </Stack>
          </Box>
          
          <Box position="relative">
            <HeroImageContainer>
              <HeroImage
                src="https://images.unsplash.com/photo-1637987897990-e660edd0af44?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYnVpbGRpbmdzJTIwdXJiYW4lMjBza3lsaW5lJTIwZ292ZXJubWVudHxlbnwwfDB8fGJsdWV8MTc1ODY0MTUzNXww&ixlib=rb-4.1.0&q=85"
                alt="Modern city skyline with civic buildings - Naveed Anjum on Unsplash"
                width="600"
                height="400"
              />
              <FloatingCardsContainer>
                <FloatingCard sx={{ top: 20, left: 20, color: 'error.main', animationDelay: '0s' }}>
                  <WarningIcon sx={{ fontSize: 20 }} />
                  <Typography variant="body2" fontWeight={600}>Issue Reported</Typography>
                </FloatingCard>
                <FloatingCard sx={{ top: '50%', right: 20, color: 'warning.main', animationDelay: '1s' }}>
                  <BuildIcon sx={{ fontSize: 20 }} />
                  <Typography variant="body2" fontWeight={600}>In Progress</Typography>
                </FloatingCard>
                <FloatingCard sx={{ bottom: 20, left: '50%', transform: 'translateX(-50%)', color: 'success.main', animationDelay: '2s' }}>
                  <CheckCircleIcon sx={{ fontSize: 20 }} />
                  <Typography variant="body2" fontWeight={600}>Resolved</Typography>
                </FloatingCard>
              </FloatingCardsContainer>
            </HeroImageContainer>
          </Box>
        </HeroContent>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;