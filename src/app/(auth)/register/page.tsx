'use client';

import { useState } from 'react';
import { Button, Input, Card } from '@/components/lit';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ fullName: '', email: '', password: '', confirmPassword: '' });

    // Basic validation
    let hasErrors = false;
    const newErrors = { ...errors };

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
      hasErrors = true;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      hasErrors = true;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      hasErrors = true;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      hasErrors = true;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      hasErrors = true;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    // TODO: Implement your registration logic here
    try {
      // Call your registration API
      console.log('Registering with:', formData);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card variant="bordered" hoverable>
        <div slot="header" className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6 w-full p-8">
          <div className="space-y-4">
            <Input
              className='w-full'
              label="Full Name"
              type="text"
              value={formData.fullName}
              error={errors.fullName}
              required
              onLitInput={(e: CustomEvent<{ value: string }>) => 
                setFormData({ ...formData, fullName: e.detail.value })
              }
            />

            <Input
              label="Email address"
              type="email"
              value={formData.email}
              error={errors.email}
              required
              onLitInput={(e: CustomEvent<{ value: string }>) => 
                setFormData({ ...formData, email: e.detail.value })
              }
            />

            <Input
              label="Password"
              type="password"
              value={formData.password}
              error={errors.password}
              helperText="Must be at least 8 characters"
              required
              onLitInput={(e: CustomEvent<{ value: string }>) => 
                setFormData({ ...formData, password: e.detail.value })
              }
            />

            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              error={errors.confirmPassword}
              required
              onLitInput={(e: CustomEvent<{ value: string }>) => 
                setFormData({ ...formData, confirmPassword: e.detail.value })
              }
            />
          </div>

          <Button
            variant="primary"
            size="large"
            disabled={!formData.email || !formData.password || !formData.fullName || !formData.confirmPassword}
          >
            Create Account
          </Button>
        </form>

        <div slot="footer" className="text-center text-sm text-gray-500">
          By creating an account, you agree to our{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Privacy Policy
          </a>
        </div>
      </Card>
    </main>
  );
} 