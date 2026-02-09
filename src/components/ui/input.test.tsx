import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Input } from './input';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Username" />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Input label="Email" isInvalid errorMessage="Invalid email" />);
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });

  it('displays description', () => {
    render(<Input label="Password" description="Must be 8 chars" />);
    expect(screen.getByText(/must be 8 chars/i)).toBeInTheDocument();
  });
});
