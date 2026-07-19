import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Save</Button>)
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('applies variant + size classes', () => {
    render(
      <Button variant='destructive' size='sm'>
        Delete
      </Button>
    )
    const btn = screen.getByRole('button', { name: 'Delete' })
    expect(btn.className).toContain('bg-destructive')
    expect(btn.className).toContain('h-8')
  })

  it('fires onClick', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Go</Button>)
    fireEvent.click(screen.getByRole('button', { name: 'Go' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders as a child element when asChild', () => {
    render(
      <Button asChild>
        <a href='/x'>Link</a>
      </Button>
    )
    expect(screen.getByRole('link', { name: 'Link' })).toHaveAttribute(
      'href',
      '/x'
    )
  })
})
