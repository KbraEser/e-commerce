import { LayoutGrid, ListChecks } from 'lucide-react';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { setFilter, setOffset, setSort } from '../store/slice/productSlice';
import { fetchProducts } from '../store/thunks/productThunks';

const sortOptions = [
  { label: 'Price: Low to High', value: 'price:asc' },
  { label: 'Price: High to Low', value: 'price:desc' },
  { label: 'Rating: Low to High', value: 'rating:asc' },
  { label: 'Rating: High to Low', value: 'rating:desc' },
]

export default function FilterRow() {
  const dispatch = useDispatch<AppDispatch>()
  const {total} = useSelector((state: RootState) => state.product)

  
  const [viewMode, setViewMode] = useState('grid');
  const [filterInput, setFilterInput] = useState('')
  const [sortBy, setSortBy] = useState('');

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const handleFilterClick = () => {
    dispatch(setFilter(filterInput))
    dispatch(setSort(sortBy))
    dispatch(setOffset(0))
    dispatch(fetchProducts())
  }

  return (
    <div className="w-full bg-white font-sans text-gray-light">
      <div className="mx-auto mb-2 w-full max-w-[1440px] px-4 py-6 sm:px-6 md:px-12">
        <div className="mx-auto flex w-full max-w-[1060px] flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-center text-sm font-bold text-gray-light tracking-wide shrink-0">
            Showing all {total} results
          </div>

          <div className="flex items-center justify-center gap-4 shrink-0">
            <span className="text-sm font-bold text-gray-light">Views:</span>
            <div className="flex gap-3">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-md border border-light-open-gray transition-all flex items-center justify-center ${
                  viewMode === 'grid'
                    ? 'border-primary text-primary bg-gray-50'
                    : 'border-gray-light text-primary hover:border-gray-400'
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>

              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-md border border-light-open-gray transition-all flex items-center justify-center ${
                  viewMode === 'list'
                    ? 'border-primary text-primary bg-gray-50'
                    : 'border-gray-light text-primary hover:border-gray-400'
                }`}
                aria-label="List view"
              >
                <ListChecks className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 w-full shrink-0 md:w-auto">
            <FormControl size="small" sx={{ minWidth: 176 }}>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) return 'Sort by';
                  return sortOptions.find((option) => option.value === selected)?.label || '';
                }}
                sx={{
                  bgcolor: '#F9F9F9',
                  color: '#737373',
                  fontSize: '14px',
                  fontWeight: 500,
                  borderRadius: '6px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E6E6E6',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E6E6E6',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#23A6F0',
                  },
                  '& .MuiSelect-select': {
                    py: '14px',
                    px: '16px',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#737373',
                  },
                }}
              >
                {sortOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{
                      fontSize: '14px',
                      color: option.value === sortBy ? '#252B42' : '#737373',
                      fontWeight: option.value === sortBy ? 600 : 400,
                    }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <input
              type="text"
              placeholder="Filter products..."
              value={filterInput}
              onChange={(e) => setFilterInput(e.target.value)}
              className="rounded-md border border-light-open-gray bg-[#F9F9F9] px-4 py-3.5 text-sm text-gray-light outline-none focus:border-primary"
            />



            <button
              className="bg-secondary text-white text-sm font-bold px-8 py-3.5 rounded-md hover:bg-[#1b8ecf] transition-colors shadow-sm flex items-center justify-center whitespace-nowrap"
              onClick={handleFilterClick}
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
