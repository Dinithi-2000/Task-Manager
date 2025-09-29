// app/page.tsx
'use client';
import React from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
      }}
    >
      <Paper 
        elevation={0}
        sx={{
          p: 4,
          maxWidth: '600px',
          backgroundColor: 'transparent',
          textAlign: 'center',
        }}
      >
        {/* Main Heading - Split into two lines exactly as shown */}
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#2c3e50',
            mb: 2,
            fontSize: { xs: '2rem', md: '2.5rem' },
            lineHeight: 1.2,
          }}
        >
          Welcome to Our
        </Typography>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#1976d2',
            mb: 4,
            fontSize: { xs: '2rem', md: '2.5rem' },
            lineHeight: 1.2,
          }}
        >
          Task Manager
        </Typography>
        
        {/* Description text */}
        <Typography 
          variant="h6" 
          sx={{
            color: '#666',
            mb: 4,
            lineHeight: 1.6,
            fontSize: '1.1rem',
          }}
        >
          This is a simple task management application built<br />
          with Next.js and Material UI.
        </Typography>
        
        {/* Get Started Button */}
        <Button
          variant="contained"
          size="large"
          onClick={() => router.push('/tasks')}
          sx={{
            backgroundColor: '#1976d2',
            padding: '12px 40px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: '4px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Get Started
        </Button>
      </Paper>
    </Container>
  );
}