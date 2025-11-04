'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '905542597273';
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #a80000 0%, #8b0000 50%, #6b0000 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        mt: 'auto',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.1,
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: '2%', sm: '3%', md: '2%', lg: '1.5%' },
          py: { xs: '3rem', sm: '4rem', md: '5rem' },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                color: 'white',
                fontWeight: 800,
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                mb: 2,
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              }}
            >
              YÖNEL OTO YEDEK PARÇA
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                lineHeight: 1.8,
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: { xs: '0.9375rem', md: '1rem' },
                mb: 3,
              }}
            >
              50+ yıllık tecrübe ile Foton traktör, Iveco Daily, Karataş traktör yedek parçaları
              ve Mutlu akü satışında Türkiye'nin güvenilir adresi.
            </Typography>

            {/* Social Media */}
            <Box sx={{ display: 'flex', gap: 1.5, mt: 3 }}>
              <IconButton
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    bgcolor: '#25D366',
                    borderColor: '#25D366',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <WhatsAppIcon />
              </IconButton>
              <IconButton
                href="https://www.instagram.com/fethiynll?igsh=dmVwYnYycTMyamRn"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    bgcolor: '#E4405F',
                    borderColor: '#E4405F',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 12px rgba(228, 64, 95, 0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                mb: 2.5,
                color: 'white',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '3rem',
                  height: '3px',
                  background: 'linear-gradient(90deg, #ffd700, #ffed4e)',
                  borderRadius: '2px',
                },
              }}
            >
              Hızlı Linkler
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 3 }}>
              {[
                { href: '/', label: 'Ana Sayfa' },
                { href: '/urunler', label: 'Ürünler' },
                { href: '/blog', label: 'Blog' },
                { href: '/hakkimizda', label: 'Hakkımızda' },
                { href: '/iletisim', label: 'İletişim' },
                { href: '/kvkk', label: 'KVKK' },
                { href: '/gizlilik-politikasi', label: 'Gizlilik Politikası' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: 'rgba(255, 255, 255, 0.85)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9375rem',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffd700';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <ArrowForwardIcon sx={{ fontSize: '0.875rem', opacity: 0.7 }} />
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Product Categories */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                mb: 2.5,
                color: 'white',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '3rem',
                  height: '3px',
                  background: 'linear-gradient(90deg, #ffd700, #ffed4e)',
                  borderRadius: '2px',
                },
              }}
            >
              Ürün Kategorileri
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 3 }}>
              {[
                { href: '/urunler?search=iveco', label: 'İveco Daily' },
                { href: '/urunler?search=ducato', label: 'Fiat Ducato' },
                { href: '/urunler?search=foton', label: 'Foton Traktör' },
                { href: '/urunler?search=karataş', label: 'Karataş Traktör' },
                { href: '/urunler?search=mutlu', label: 'Mutlu Akü' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: 'rgba(255, 255, 255, 0.85)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9375rem',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffd700';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <ArrowForwardIcon sx={{ fontSize: '0.875rem', opacity: 0.7 }} />
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                mb: 2.5,
                color: 'white',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '3rem',
                  height: '3px',
                  background: 'linear-gradient(90deg, #ffd700, #ffed4e)',
                  borderRadius: '2px',
                },
              }}
            >
              İletişim
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
              <Box
                component="a"
                href="tel:+905542597273"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#ffd700',
                    transform: 'translateX(5px)',
                  },
                }}
              >
                <Box
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '50%',
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PhoneIcon sx={{ fontSize: '1.25rem' }} />
                </Box>
                <Typography variant="body2" sx={{ fontSize: '0.9375rem' }}>
                  0 (554) 259 72 73
                </Typography>
              </Box>

              <Box
                component="a"
                href="mailto:tokatyonelotoyedekparca@gmail.com"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#ffd700',
                    transform: 'translateX(5px)',
                  },
                }}
              >
                <Box
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '50%',
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <EmailIcon sx={{ fontSize: '1.25rem' }} />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.9375rem',
                    wordBreak: 'break-word',
                  }}
                >
                  tokatyonelotoyedekparca@gmail.com
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                <Box
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '50%',
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: '1.25rem' }} />
                </Box>
                <Typography variant="body2" sx={{ fontSize: '0.9375rem' }}>
                  Pzt-Cmt: 08:00 - 18:00
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                <Box
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '50%',
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <LocationOnIcon sx={{ fontSize: '1.25rem' }} />
                </Box>
                <Typography variant="body2" sx={{ fontSize: '0.9375rem' }}>
                  Tokat, Türkiye
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            mt: { xs: 4, md: 5 },
            pt: { xs: 3, md: 4 },
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.85)',
              mb: 1,
              fontSize: { xs: '0.875rem', md: '0.9375rem' },
            }}
          >
            © {new Date().getFullYear()} Yönel Oto Yedek Parça. Tüm hakları saklıdır.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: { xs: '0.8125rem', md: '0.875rem' },
            }}
          >
            Designed by{' '}
            <Box
              component="a"
              href="https://www.bariscanyonel.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#ffd700',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                borderBottom: '1px solid transparent',
                '&:hover': {
                  borderBottom: '1px solid #ffd700',
                  color: '#ffed4e',
                },
              }}
            >
              Barış Can Yönel
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

