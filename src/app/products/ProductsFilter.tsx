'use client';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import { Category } from '@/lib/models/Category';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { slugify } from '@/lib/utils/slugify';

interface Props {
  categories: Category[];
  activeCategory?: Category | null;
  onClose?: () => void; // Drawer'ı kapatma callback'i
}

export default function ProductsFilter({ categories, activeCategory, onClose }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openCategories, setOpenCategories] = useState<Record<number, boolean>>({});
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  // Aktif filtre var mı kontrolü
  const hasActiveFilters = searchParams.get('search') || activeCategory;

  const handleCategoryClick = (categoryId: number) => {
    setOpenCategories((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  // Bir kategorinin parent'ını bul
  const findParentCategory = (category: Category): Category | null => {
    for (const cat of categories) {
      if (cat.SubCategories) {
        for (const sub of cat.SubCategories) {
          if (sub.Id === category.Id) {
            return cat;
          }
        }
      }
    }
    return null;
  };

  const handleCategoryFilter = (category?: Category) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    
    let url = '/urunler';
    if (category) {
      // Alt kategori mi yoksa ana kategori mi kontrol et
      const parentCat = findParentCategory(category);
      
      if (parentCat) {
        // Alt kategori ise: /urunler/parent-slug/sub-slug
        url += `/${slugify(parentCat.Name)}/${slugify(category.Name)}`;
      } else {
        // Ana kategori ise: /urunler/parent-slug
        url += `/${slugify(category.Name)}`;
      }
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    router.push(url);
    
    // Mobil drawer'ı kapat
    if (onClose) {
      onClose();
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    
    let url = '/urunler';
    if (activeCategory) {
      const parentCat = findParentCategory(activeCategory);
      
      if (parentCat) {
        // Alt kategori ise: /urunler/parent-slug/sub-slug
        url += `/${slugify(parentCat.Name)}/${slugify(activeCategory.Name)}`;
      } else {
        // Ana kategori ise: /urunler/parent-slug
        url += `/${slugify(activeCategory.Name)}`;
      }
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    router.push(url);
    
    // Mobil drawer'ı kapat
    if (onClose) {
      onClose();
    }
  };

  // Tüm filtreleri temizle
  const clearAllFilters = () => {
    setSearchTerm('');
    router.push('/urunler');
    
    // Mobil drawer'ı kapat
    if (onClose) {
      onClose();
    }
  };

  // Tek bir filtreyi kaldır
  const removeFilter = (filterType: 'search' | 'category') => {
    if (filterType === 'search') {
      setSearchTerm('');
      let url = '/urunler';
      if (activeCategory) {
        const parentCat = findParentCategory(activeCategory);
        
        if (parentCat) {
          // Alt kategori ise: /urunler/parent-slug/sub-slug
          url += `/${slugify(parentCat.Name)}/${slugify(activeCategory.Name)}`;
        } else {
          // Ana kategori ise: /urunler/parent-slug
          url += `/${slugify(activeCategory.Name)}`;
        }
      }
      router.push(url);
    } else if (filterType === 'category') {
      const params = new URLSearchParams();
      if (searchParams.get('search')) {
        params.set('search', searchParams.get('search')!);
      }
      const url = params.toString() ? `/urunler?${params.toString()}` : '/urunler';
      router.push(url);
    }
    
    // Mobil drawer'ı kapat
    if (onClose) {
      onClose();
    }
  };

  return (
    <Paper
      sx={{
        p: { xs: '1.5rem', md: '1.8rem', lg: '2rem' },
        position: 'sticky',
        top: '1.25rem',
        maxHeight: 'calc(100vh - 2.5rem)',
        overflowY: 'auto',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        '&::-webkit-scrollbar': {
          width: '0.5rem',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '0.25rem',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#a80000',
          borderRadius: '0.25rem',
          '&:hover': {
            background: '#8b0000',
          },
        },
      }}
    >
      {/* Aktif Filtreler */}
      {hasActiveFilters && (
        <Box sx={{ mb: { xs: '1.5rem', md: '2rem' } }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: '0.75rem',
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#a80000', fontSize: { xs: '0.875rem', md: '0.9375rem' } }}>
              Aktif Filtreler
            </Typography>
            <Button
              size="small"
              startIcon={<FilterListOffIcon />}
              onClick={clearAllFilters}
              sx={{
                fontSize: { xs: '0.7rem', md: '0.75rem' },
                minWidth: 'auto',
              }}
            >
              Temizle
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: '0.5rem', md: '0.75rem' } }}>
            {searchParams.get('search') && (
              <Chip
                label={`Arama: "${searchParams.get('search')}"`}
                onDelete={() => removeFilter('search')}
                color="primary"
                size="small"
              />
            )}
            {activeCategory && (
              <Chip
                label={`Kategori: ${activeCategory.Name}`}
                onDelete={() => removeFilter('category')}
                color="primary"
                size="small"
              />
            )}
          </Box>
        </Box>
      )}

      {/* Search */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 600,
          fontSize: { xs: '1rem', md: '1.125rem' },
          mb: { xs: '1rem', md: '1.25rem' },
        }}
      >
        Arama
      </Typography>
      <form onSubmit={handleSearch}>
        <TextField
          fullWidth
          size="small"
          placeholder="Ürün ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: searchTerm && (
              <ClearIcon
                sx={{ cursor: 'pointer', color: 'action.active' }}
                onClick={() => {
                  setSearchTerm('');
                  removeFilter('search');
                }}
              />
            ),
          }}
          sx={{
            mb: { xs: '0.75rem', md: '1rem' },
            '& .MuiOutlinedInput-root': {
              borderRadius: '0.5rem',
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          startIcon={<SearchIcon />}
          sx={{
            mb: { xs: '2rem', md: '2.5rem' },
            py: { xs: '0.75rem', md: '0.875rem' },
            borderRadius: '0.5rem',
            fontWeight: 600,
            fontSize: { xs: '0.875rem', md: '0.9375rem' },
            bgcolor: '#a80000',
            '&:hover': {
              bgcolor: '#8b0000',
            },
          }}
        >
          Ara
        </Button>
      </form>

      {/* Categories */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 600,
          fontSize: { xs: '1rem', md: '1.125rem' },
          mb: { xs: '1rem', md: '1.25rem' },
        }}
      >
        Kategoriler
      </Typography>
      <List
        component="nav"
        sx={{
          '& .MuiListItemButton-root': {
            borderRadius: '0.5rem',
            mb: '0.25rem',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: 'rgba(168, 0, 0, 0.08)',
            },
          },
        }}
      >
        <ListItemButton
          onClick={() => handleCategoryFilter()}
          selected={!activeCategory}
          sx={{
            '&.Mui-selected': {
              bgcolor: '#a80000',
              color: 'white',
              '&:hover': { bgcolor: '#8b0000' },
            },
          }}
        >
          <ListItemText
            primary="Tüm Ürünler"
            primaryTypographyProps={{
              sx: {
                fontSize: { xs: '0.875rem', md: '0.9375rem' },
                fontWeight: !activeCategory ? 600 : 500,
              },
            }}
          />
        </ListItemButton>
        {categories.map((category) => {
          const isCategoryActive = activeCategory?.Id === category.Id;
          return (
            <div key={category.Id}>
              <ListItemButton
                onClick={() =>
                  category.SubCategories && category.SubCategories.length > 0
                    ? handleCategoryClick(category.Id)
                    : handleCategoryFilter(category)
                }
                selected={isCategoryActive}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: '#a80000',
                    color: 'white',
                    '&:hover': { bgcolor: '#8b0000' },
                  },
                }}
              >
                <ListItemText
                  primary={category.Name}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: { xs: '0.875rem', md: '0.9375rem' },
                      fontWeight: isCategoryActive ? 600 : 500,
                    },
                  }}
                />
                {category.SubCategories && category.SubCategories.length > 0 && (
                  <>{openCategories[category.Id] ? <ExpandLess /> : <ExpandMore />}</>
                )}
              </ListItemButton>
              {category.SubCategories && category.SubCategories.length > 0 && (
                <Collapse in={openCategories[category.Id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {category.SubCategories.map((sub) => {
                      const isSubActive = activeCategory?.Id === sub.Id;
                      return (
                        <ListItemButton
                          key={sub.Id}
                          sx={{
                            pl: 4,
                          '&.Mui-selected': {
                            bgcolor: '#a80000',
                            color: 'white',
                            '&:hover': { bgcolor: '#8b0000' },
                          },
                        }}
                        selected={isSubActive}
                        onClick={() => handleCategoryFilter(sub)}
                      >
                        <ListItemText
                          primary={sub.Name}
                          primaryTypographyProps={{
                            sx: {
                              fontSize: { xs: '0.8125rem', md: '0.875rem' },
                              fontWeight: isSubActive ? 600 : 400,
                            },
                          }}
                        />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </div>
          );
        })}
      </List>
    </Paper>
  );
}

