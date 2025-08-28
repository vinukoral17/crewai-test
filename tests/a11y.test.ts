import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'vitest-axe'
import HomePage from '../app/(routes)/(home)/page'

expect.extend(toHaveNoViolations)

describe('a11y', () => {
  it('home page has no accessibility violations', async () => {
    const { container } = render(<HomePage />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
