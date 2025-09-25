import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Avatar, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';

const TestimonialsContainer = styled(Box)(({ theme }) => ({
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

const TestimonialsHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(10)
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: 16,
  padding: theme.spacing(4),
  transition: 'transform 0.2s ease',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'translateY(-4px)'
  }
}));

const TestimonialAuthor = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2)
}));

const testimonials = [
  {
    rating: 5,
    text: "CivicFix helped me report a dangerous pothole on my street. It was fixed within 3 days! Amazing response time.",
    author: {
      name: "Sarah Johnson",
      location: "Downtown District",
      avatar: "https://i.pravatar.cc/150?img=1"
    }
  },
  {
    rating: 5,
    text: "The tracking feature is incredible. I could see exactly when my report was assigned and when work began. Very transparent!",
    author: {
      name: "Maria Garcia",
      location: "Riverside Area",
      avatar: "https://i.pravatar.cc/150?img=2"
    }
  },
  {
    rating: 5,
    text: "Finally, a platform that makes it easy to report issues and actually see results. Our neighborhood looks so much better now!",
    author: {
      name: "David Chen",
      location: "Tech District",
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  }
];

const TestimonialsSection: React.FC = () => {
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

    const section = document.getElementById('testimonials-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <TestimonialsContainer id="testimonials-section">
      <Container maxWidth="lg">
        <TestimonialsHeader>
          <Typography variant="h2" gutterBottom>
            What citizens are saying
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Real stories from people making their communities better
          </Typography>
        </TestimonialsHeader>
        
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <TestimonialCard>
                <CardContent sx={{ p: 0 }}>
                  <Rating
                    value={testimonial.rating}
                    readOnly
                    sx={{ mb: 2.5, color: 'warning.main' }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: 18,
                      lineHeight: 1.6,
                      mb: 3,
                      fontStyle: 'italic'
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>
                  <TestimonialAuthor>
                    <Avatar
                      src={testimonial.author.avatar}
                      alt={testimonial.author.name}
                      sx={{ width: 48, height: 48 }}
                    />
                    <Box>
                      <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                        {testimonial.author.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" fontSize={14}>
                        {testimonial.author.location}
                      </Typography>
                    </Box>
                  </TestimonialAuthor>
                </CardContent>
              </TestimonialCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </TestimonialsContainer>
  );
};

export default TestimonialsSection;