import React from 'react';
import { Box, Typography, Button, Container, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';

const DemoContainer = styled(Box)(({ theme }) => ({
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

const DemoContent = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(10),
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(6)
  }
}));

const DemoButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderRadius: 8,
  fontWeight: 600,
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${theme.palette.primary.main}30`
  }
}));

const DemoVideoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 24px 48px rgba(0, 0, 0, 0.1)'
}));

const DemoVideo = styled('img')({
  width: '100%',
  height: 400,
  objectFit: 'cover'
});

const DemoOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(135deg, rgba(0, 97, 255, 0.1), rgba(0, 0, 0, 0.3))',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: theme.spacing(3)
}));

const DemoUI = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: 12,
  padding: theme.spacing(2.5)
}));

const DemoHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2.5),
  fontWeight: 600
}));

const DemoDots = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.75)
}));

const DemoDot = styled(Box)<{ color: 'red' | 'orange' | 'green' }>(({ theme, color }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: color === 'red' ? theme.palette.error.main : 
                   color === 'orange' ? theme.palette.warning.main : 
                   theme.palette.success.main
}));

const DemoStats = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4)
}));

const Stat = styled(Box)({
  textAlign: 'center'
});

const features = [
  'Quick issue reporting with photos',
  'GPS location tagging',
  'Real-time status updates',
  'Community feedback system'
];

const DemoSection: React.FC = () => {
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

    const section = document.getElementById('demo-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <DemoContainer id="demo-section">
      <Container maxWidth="lg">
        <DemoContent>
          <Box>
            <Typography variant="h2" gutterBottom>
              See CivicFix in action
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
              Watch how easy it is to report civic issues and track their resolution. 
              Our intuitive interface makes civic engagement simple and effective.
            </Typography>
            <List sx={{ mb: 4 }}>
              {features.map((feature, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
            <DemoButton variant="contained" size="large">
              Try CivicFix now
            </DemoButton>
          </Box>
          
          <Box position="relative">
            <DemoVideoContainer>
              <DemoVideo
                src="https://images.unsplash.com/photo-1752659985868-80da149a25d1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxwZW9wbGUlMjBjb21tdW5pdHklMjBtZWV0aW5nJTIwcGxhbm5pbmclMjBjb2xsYWJvcmF0aW9ufGVufDB8MHx8fDE3NTg2NDE1MzV8MA&ixlib=rb-4.1.0&q=85"
                alt="People working together on city planning, community engagement - Sweet Life on Unsplash"
                width="600"
                height="400"
              />
              <DemoOverlay>
                <DemoUI>
                  <DemoHeader>
                    <DemoDots>
                      <DemoDot color="red" />
                      <DemoDot color="orange" />
                      <DemoDot color="green" />
                    </DemoDots>
                    <Typography variant="body2" fontWeight={600}>
                      CivicFix Dashboard
                    </Typography>
                  </DemoHeader>
                  <DemoStats>
                    <Stat>
                      <Typography variant="h4" fontWeight={800} color="primary">
                        15.2K+
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Issues Reported
                      </Typography>
                    </Stat>
                    <Stat>
                      <Typography variant="h4" fontWeight={800} color="primary">
                        12.9K+
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Issues Resolved
                      </Typography>
                    </Stat>
                  </DemoStats>
                </DemoUI>
              </DemoOverlay>
            </DemoVideoContainer>
          </Box>
        </DemoContent>
      </Container>
    </DemoContainer>
  );
};

export default DemoSection;