import { waitFor } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import App from './App'

test('Show App Component', () => {
  render(<App />)

  expect(screen.getByText('Hello Vite + React!')).toBeInTheDocument()
})
