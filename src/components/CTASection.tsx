import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const CTAContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(15, 0),
  backgroundColor: theme.palette.primary.main,
  textAlign: 'center',
  color: theme.palette.primary.contrastText,
  opacity: 0,
  transform: 'translateY(30px)',
  transition: 'all 0.8s ease',
  '&.animate': {
    opacity: 1,
    transform: 'translateY(0)'
  }
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderRadius: 8,
  fontWeight: 600,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.background.default,
    transform: 'translateY(-2px)'
  }
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderRadius: 8,
  fontWeight: 600,
  backgroundColor: 'transparent',
  color: theme.palette.primary.contrastText,
  border: `2px solid rgba(255, 255, 255, 0.3)`,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: theme.palette.primary.contrastText,
    transform: 'translateY(-2px)'
  }
}));

const CTASection: React.FC = () => {
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

    const section = document.getElementById('cta-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <CTAContainer id="cta-section">
      <Container maxWidth="lg">
        <Typography variant="h2" gutterBottom>
          Ready to make your city better?
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4, opacity: 0.9 }}>
          Join thousands of citizens who are already making a difference in their communities.
        </Typography>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          justifyContent="center"
          sx={{ maxWidth: { xs: 300, sm: 'none' }, mx: 'auto' }}
        >
          <PrimaryButton size="large">
            Get started for free
          </PrimaryButton>
          <SecondaryButton size="large">
            View public map
          </SecondaryButton>
        </Stack>
      </Container>
    </CTAContainer>
  );
};

export default CTASection;