'use client';

import { useState } from 'react';
import { Button, Input, Card } from '@/components/lit';
import { useRouter } from 'next/navigation';
export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async () => {
        setErrors({ email: '', password: '' });

        // Basic validation
        let hasErrors = false;
        const newErrors = { ...errors };

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
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        // TODO: Implement your login logic here
        try {
            // Call your login API
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            const data = await response.json();
            console.log('Login response:', data);
            console.log('Logging in with:', formData);
            localStorage.setItem('auth_token', data.token);
            router.push('/dashboard');

        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card variant="bordered" hoverable className='rounded-2xl'>
                <div slot="header" className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Sign in to your account</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Or{' '}
                        <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                            create a new account
                        </a>
                    </p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="mt-4 space-y-6 w-full p-8">
                    <div className="space-y-4">
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
                            required
                            onLitInput={(e: CustomEvent<{ value: string }>) =>
                                setFormData({ ...formData, password: e.detail.value })
                            }
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        size="large"
                        disabled={!formData.email || !formData.password}
                        onLitClick={handleSubmit}
                    >
                        Sign in
                    </Button>
                </form>

                <div slot="footer" className="text-center text-sm text-gray-500">
                    By signing in, you agree to our{' '}
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