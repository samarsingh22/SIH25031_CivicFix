import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StatsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(15, 0),
  backgroundColor: theme.palette.background.paper,
  textAlign: 'center',
  opacity: 0,
  transform: 'translateY(30px)',
  transition: 'all 0.8s ease',
  '&.animate': {
    opacity: 1,
    transform: 'translateY(0)'
  }
}));

const StatItem = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2)
}));

interface StatCounterProps {
  target: number;
  suffix?: string;
}

const StatCounter: React.FC<StatCounterProps> = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            let current = 0;
            const increment = target / 100;
            
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                setCount(target);
                clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, 20);
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`stat-${target}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <Typography
      id={`stat-${target}`}
      variant="h2"
      fontWeight={800}
      color="primary"
      sx={{ mb: 1 }}
    >
      {count.toLocaleString()}{suffix}
    </Typography>
  );
};

const stats = [
  { target: 15200, label: 'Issues Reported' },
  { target: 12900, label: 'Issues Resolved' },
  { target: 89500, label: 'Active Citizens' },
  { target: 50, label: 'Cities Served', suffix: '+' }
];

const StatsSection: React.FC = () => {
  useEffect(() => {
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

    const section = document.getElementById('stats-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <StatsContainer id="stats-section">
      <Container maxWidth="lg">
        <Typography variant="h2" gutterBottom sx={{ mb: 8 }}>
          Making cities better, together
        </Typography>
        <Grid container spacing={6}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatItem>
                <StatCounter target={stat.target} suffix={stat.suffix} />
                <Typography variant="body1" color="text.secondary">
                  {stat.label}
                </Typography>
              </StatItem>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StatsContainer>
  );
};

export default StatsSection;