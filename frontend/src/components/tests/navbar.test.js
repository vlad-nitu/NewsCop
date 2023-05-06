/* global test, expect */
import { render, screen } from '@testing-library/react'
import NavbarComponent from '../navbar'

test('get navbar name', () => {
    const name = "NewsCop"
    render(<NavbarComponent name={ name } />)
    const linkElement = screen.getByText("NewsCop")
    expect(linkElement).toBeInTheDocument()
})
