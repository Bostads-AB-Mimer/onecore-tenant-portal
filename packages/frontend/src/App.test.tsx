import { describe, expect, it } from 'vitest'

import App from './App'
import { render, screen } from './test/test.utils'
import { MemoryRouter } from 'react-router-dom'

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
