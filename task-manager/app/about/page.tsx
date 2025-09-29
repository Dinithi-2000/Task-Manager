// app/about/page.tsx
'use client';
import React from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  AppBar,
  Toolbar,
  Button,
  Divider,
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>

      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Paper 
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'left',
            backgroundColor: 'transparent'
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#000',
              mb: 3,
              fontSize: '2rem',
            }}
          >
            About
          </Typography>

          {/* Main Description */}
          <Typography 
            variant="h6" 
            component="p"
            sx={{
              color: '#000',
              lineHeight: 1.6,
              fontSize: '1.1rem',
              mb: 2,
            }}
          >
            We are a leading software solutions company specializing in delivering 
            high-quality, innovative software products and services.
          </Typography>
          
          <Typography 
            variant="h6" 
            component="p"
            sx={{
              color: '#000',
              lineHeight: 1.6,
              fontSize: '1.1rem',
            }}
          >
            Our team of experts is dedicated to helping businesses achieve their 
            goals with tailor-made solutions.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}