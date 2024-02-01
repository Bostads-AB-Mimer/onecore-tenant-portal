import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

import App from './App'
import { render, screen } from './test/test.utils'

describe('Simple working test', () => {
  it('can find the logo', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByAltText('Mimer logotyp'))
  })
})
