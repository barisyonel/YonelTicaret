'use client';

import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import Link from 'next/link';
import { Product } from '@/lib/models/Product';
import { generateProductUrl } from '@/lib/utils/slugify';
import QuickViewModal from '@/components/QuickViewModal';
import OptimizedImage from '@/components/OptimizedImage';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '905542597273';
  const whatsappMessage = `Merhaba, "${product.Name}" ürünü hakkında bilgi almak istiyorum.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const productUrl = `/products/${generateProductUrl(product)}`;

  return (
    <Card 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: { xs: '0.75rem', md: '1rem' },
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: '0 12px 40px rgba(168, 0, 0, 0.15)',
          transform: 'translateY(-0.5rem)',
          borderColor: '#a80000',
        },
        background: 'linear-gradient(to bottom, #ffffff 0%, #fafafa 100%)',
      }}
    >
      {/* Ürün Görseli - Modern Container */}
      <CardActionArea component={Link} href={productUrl}>
        {product.ImageUrl ? (
          <Box 
            sx={{ 
              height: { xs: '16rem', sm: '18rem', md: '17.5rem', lg: '18rem', xl: '16.5rem' },
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: { xs: '1rem', md: '1.5rem' },
            }}
          >
            <OptimizedImage
              src={product.ImageUrl}
              alt={product.Name}
              width={320}
              height={240}
              objectFit="contain"
              quality={85}
              sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
              style={{
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                width: '100%',
                height: '100%',
              }}
            />
            
            {/* Güven Badge'i */}
            <Box
              sx={{
                position: 'absolute',
                top: { xs: '0.75rem', md: '1rem' },
                left: { xs: '0.75rem', md: '1rem' },
                display: 'flex',
                alignItems: 'center',
                gap: { xs: '0.25rem', md: '0.375rem' },
                bgcolor: 'rgba(46, 204, 113, 0.95)',
                color: 'white',
                px: { xs: '0.75rem', md: '1rem' },
                py: { xs: '0.375rem', md: '0.5rem' },
                borderRadius: { xs: '0.5rem', md: '0.625rem' },
                fontSize: { xs: '0.7rem', md: '0.75rem' },
                fontWeight: 600,
                boxShadow: '0 2px 12px rgba(46, 204, 113, 0.3)',
              }}
            >
              <VerifiedIcon sx={{ fontSize: { xs: '0.875rem', md: '0.9375rem' } }} />
              Orijinal
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              height: { xs: '16rem', sm: '18rem', md: '17.5rem', lg: '18rem', xl: '16.5rem' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: { xs: '0.875rem', md: '0.9375rem' } }}>
              Görsel Yok
            </Typography>
          </Box>
        )}
      </CardActionArea>

      {/* Ürün İçeriği - Modern Layout */}
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          p: { xs: '1.25rem', sm: '1.5rem', md: '1.5rem', lg: '1.75rem' },
          bgcolor: 'white',
        }}
      >
        {/* Kategori Badge'leri - Modern Tasarım */}
        {(product.CategoryName || product.SubCategoryName) && (
          <Box sx={{ mb: { xs: '1rem', md: '1.25rem' }, display: 'flex', gap: { xs: '0.5rem', md: '0.625rem' }, flexWrap: 'wrap' }}>
            {product.CategoryName && (
              <Chip
                label={product.CategoryName}
                size="small"
                sx={{ 
                  fontSize: { xs: '0.65rem', md: '0.7rem' },
                  fontWeight: 700,
                  height: { xs: '1.375rem', md: '1.5rem' },
                  bgcolor: '#a80000',
                  color: 'white',
                  letterSpacing: '0.3px',
                  '&:hover': {
                    bgcolor: '#8a0000',
                  },
                }}
              />
            )}
            {product.SubCategoryName && (
              <Chip
                label={product.SubCategoryName}
                size="small"
                sx={{ 
                  fontSize: { xs: '0.65rem', md: '0.7rem' },
                  fontWeight: 600,
                  height: { xs: '1.375rem', md: '1.5rem' },
                  bgcolor: '#ecf0f1',
                  color: '#2c3e50',
                  border: '1px solid #bdc3c7',
                }}
              />
            )}
          </Box>
        )}

        {/* Başlık - Modern Typography */}
        <Typography 
          component={Link}
          href={productUrl}
          gutterBottom 
          variant="h6"
          sx={{ 
            fontWeight: 700,
            fontSize: { xs: '0.9375rem', sm: '1rem', md: '1.05rem', lg: '1.0625rem' },
            lineHeight: 1.4,
            minHeight: { xs: '2.6em', md: '2.8em' },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: { xs: '0.75rem', md: '1rem' },
            color: '#2c3e50',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: '#a80000',
            },
          }}
        >
          {product.Name}
        </Typography>

        {/* Açıklama - Modern Style */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            minHeight: { xs: '2.6em', md: '2.8em' },
            lineHeight: 1.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: { xs: '1.25rem', md: '1.5rem' },
            fontSize: { xs: '0.8125rem', md: '0.875rem' },
            color: '#7f8c8d',
          }}
        >
          {product.Description || 'Orijinal yedek parça. Detaylı bilgi için tıklayın.'}
        </Typography>

        {/* Hızlı Bilgi Banner */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: '0.625rem', md: '0.75rem' },
            bgcolor: '#e8f5e9',
            color: '#2e7d32',
            px: { xs: '1rem', md: '1.25rem' },
            py: { xs: '0.75rem', md: '0.875rem' },
            borderRadius: { xs: '0.5rem', md: '0.625rem' },
            mb: { xs: '1.25rem', md: '1.5rem' },
            fontSize: { xs: '0.7rem', md: '0.75rem' },
            fontWeight: 600,
          }}
        >
          <LocalShippingOutlinedIcon sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }} />
          Hızlı Kargo • Güvenli Ödeme
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Butonlar - Modern Layout */}
        <Box sx={{ display: 'flex', gap: { xs: '0.75rem', md: '1rem' }, mt: 'auto' }}>
          {/* Hızlı Görünüm */}
          <Tooltip title="Hızlı Görünüm">
            <IconButton
              onClick={() => setQuickViewOpen(true)}
              sx={{
                bgcolor: '#ecf0f1',
                color: '#a80000',
                border: '2px solid',
                borderColor: 'transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#a80000',
                  color: 'white',
                  borderColor: '#a80000',
                  transform: 'rotate(360deg)',
                },
                width: { xs: '2.5rem', md: '2.75rem' },
                height: { xs: '2.5rem', md: '2.75rem' },
                flexShrink: 0,
              }}
            >
              <VisibilityIcon sx={{ fontSize: { xs: '1.125rem', md: '1.25rem' } }} />
            </IconButton>
          </Tooltip>

          {/* WhatsApp Butonu - Modern */}
          <Button
            variant="contained"
            fullWidth
            startIcon={<WhatsAppIcon />}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              bgcolor: '#25D366',
              color: 'white',
              fontWeight: 700,
              fontSize: { xs: '0.8125rem', md: '0.875rem' },
              py: { xs: '0.875rem', md: '1rem' },
              borderRadius: { xs: '0.5rem', md: '0.625rem' },
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#128C7E',
                boxShadow: '0 6px 16px rgba(37, 211, 102, 0.4)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Bilgi Al
          </Button>
        </Box>
      </CardContent>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </Card>
  );
}

