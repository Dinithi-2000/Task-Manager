// components/Layout.tsx
'use client';
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Tasks', path: '/tasks' },
    { text: 'About', path: '/about' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: '#1976d2',
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold',
              fontSize: '1.5rem'
            }}
          >
            Task Manager
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                onClick={() => router.push(item.path)}
                sx={{
                  backgroundColor: pathname === item.path ? 'rgba(255,255,255,0.2)' : 'transparent',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.15)',
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <main>
        {children}
      </main>
    </Box>
  );
};

export default Layout;