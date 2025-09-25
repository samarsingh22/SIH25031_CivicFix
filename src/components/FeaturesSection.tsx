import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

const FeaturesContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(15, 0),
  backgroundColor: theme.palette.background.paper,
  opacity: 0,
  transform: 'translateY(30px)',
  transition: 'all 0.8s ease',
  '&.animate': {
    opacity: 1,
    transform: 'translateY(0)'
  }
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2)
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  backgroundColor: theme.palette.background.default,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: `0 auto ${theme.spacing(3)}`,
  color: theme.palette.primary.main,
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)'
  }
}));

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <PhoneIphoneOutlinedIcon sx={{ fontSize: 32 }} />,
    title: 'Mobile First',
    description: 'Report issues on the go with our mobile-optimized platform'
  },
  {
    icon: <VisibilityOutlinedIcon sx={{ fontSize: 32 }} />,
    title: 'Real-time Tracking',
    description: 'Monitor the status of your reports from submission to resolution'
  },
  {
    icon: <Groups2OutlinedIcon sx={{ fontSize: 32 }} />,
    title: 'Community Driven',
    description: 'Join thousands of citizens making their neighborhoods better'
  },
  {
    icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 32 }} />,
    title: 'Secure & Private',
    description: 'Your data is protected with enterprise-grade security'
  }
];

const FeaturesSection: React.FC = () => {
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const section = document.getElementById('features-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <FeaturesContainer id="features-section">
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureItem>
                <FeatureIcon>
                  {feature.icon}
                </FeatureIcon>
                <Typography variant="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </FeatureItem>
            </Grid>
          ))}
        </Grid>
      </Container>
    </FeaturesContainer>
  );
};

export default FeaturesSection;