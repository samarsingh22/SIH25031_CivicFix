import React from 'react';
import { Box, Typography, Container, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';

const ProcessContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(15, 0),
  backgroundColor: theme.palette.background.default,
  opacity: 0,
  transform: 'translateY(30px)',
  transition: 'all 0.8s ease',
  '&.animate': {
    opacity: 1,
    transform: 'translateY(0)'
  }
}));

const ProcessHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(10)
}));

const StepCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-8px)'
  }
}));

const StepVisual = styled(Box)({
  position: 'relative',
  height: 240,
  overflow: 'hidden'
});

const StepImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
});

const StepNumber = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 20,
  left: 20,
  width: 48,
  height: 48,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 800,
  fontSize: 20
}));

const steps = [
  {
    number: 1,
    title: 'Report',
    description: 'Spot an issue? Take a photo, add location details, and submit your report in seconds.',
    image: 'https://images.unsplash.com/photo-1594978637827-b405fb50611f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw3fHxpbmZyYXN0cnVjdHVyZSUyMHJvYWRzJTIwYnJpZGdlcyUyMGNpdHklMjB1cmJhbnxlbnwwfDB8fGJsdWV8MTc1ODY0MTUzNXww&ixlib=rb-4.1.0&q=85',
    alt: 'Modern city infrastructure - Chris Tweten on Unsplash'
  },
  {
    number: 2,
    title: 'Track',
    description: 'Follow your report\'s journey from submission to assignment to resolution with real-time updates.',
    image: 'https://images.unsplash.com/photo-1752659504452-1736acab1662?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxwZW9wbGUlMjBjb21tdW5pdHklMjBtZWV0aW5nJTIwcGxhbm5pbmclMjBjb2xsYWJvcmF0aW9ufGVufDB8MHx8fDE3NTg2NDE1MzV8MA&ixlib=rb-4.1.0&q=85',
    alt: 'People collaborate on civic projects - Sweet Life on Unsplash'
  },
  {
    number: 3,
    title: 'Resolve',
    description: 'Watch as authorities take action and see the positive impact on your community.',
    image: 'https://images.unsplash.com/photo-1612381068436-7ebfddd382d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxpbmZyYXN0cnVjdHVyZSUyMHJvYWRzJTIwYnJpZGdlcyUyMGNpdHklMjB1cmJhbnxlbnwwfDB8fGJsdWV8MTc1ODY0MTUzNXww&ixlib=rb-4.1.0&q=85',
    alt: 'White bridge infrastructure - FERNANDO TRIVIÑO on Unsplash'
  }
];

const ProcessSection: React.FC = () => {
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

    const section = document.getElementById('process-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <ProcessContainer id="process-section">
      <Container maxWidth="lg">
        <ProcessHeader>
          <Typography variant="h2" gutterBottom>
            How CivicFix works
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Three simple steps to make your city better
          </Typography>
        </ProcessHeader>
        
        <Grid container spacing={6}>
          {steps.map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              <StepCard>
                <StepVisual>
                  <StepImage
                    src={step.image}
                    alt={step.alt}
                    width="400"
                    height="240"
                  />
                  <StepNumber>
                    {step.number}
                  </StepNumber>
                </StepVisual>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h3" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {step.description}
                  </Typography>
                </CardContent>
              </StepCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ProcessContainer>
  );
};

export default ProcessSection;