import React from 'react'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

interface MyPaginationProps {
  page: number
  totalPages: number
  hasNextPage: boolean
  handlePageChange: (newPage: number) => void
}

export default function MyPagination({ page, totalPages, hasNextPage, handlePageChange }: MyPaginationProps) {
  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={(event, value) => handlePageChange(value)}
      renderItem={(item) => (
        <PaginationItem
          slots={{
            previous: ArrowBackIcon,
            next: ArrowForwardIcon
          }}
          {...item}
        />
      )}
      // Disabled if the last page is reached and there is no next page
    />
  )
}
