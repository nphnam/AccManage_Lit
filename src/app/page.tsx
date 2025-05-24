'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import '../components/lit-ui/accordion'
import '../components/lit-ui/form'
import '../components/lit-ui/table'
import '../components/lit-ui/avatar'
import '../components/lit-ui/modal'
import '../components/lit-ui/tooltip'
import '../components/lit-ui/tabs'
import '../components/lit-ui/select'
import '../components/lit-ui/toast'
import '../components/lit-ui/spinner'
import '../components/lit-ui/skeleton'


declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lit-modal': any;
      'lit-tooltip': any;
      'lit-tabs': any;
      'lit-select': any;
      'lit-toast': any;
      'lit-spinner': any;
      'lit-skeleton': any;
      'lit-accordion': any;
      'lit-form': any;
      'lit-table': any;
      'lit-avatar': any;
      'lit-avatar-group': any;
    }
  }
}
export default function HomePage() {

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  const tabItems = [
    { id: 'tab1', label: 'Tab 1', content: 'Content for Tab 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Content for Tab 2' },
    { id: 'tab3', label: 'Tab 3', content: 'Content for Tab 3' },
  ];

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const accordionItems = [
    {
      id: 'acc1',
      title: 'Section 1',
      content: 'Content for Section 1',
    },
    {
      id: 'acc2',
      title: 'Section 2',
      content: 'Content for Section 2',
    },
  ];

  const formFields = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
  ];

  const tableColumns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
  ];

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];
  console.log(isModalOpen)
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Modern Accounting Software for Your Business
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Streamline your financial operations with our comprehensive accounting solution.
                  Track expenses, manage invoices, and generate reports with ease.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/register"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </Link>
                  <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                    Sign in <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36" />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                <div className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36" />
                <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
                      <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                        <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
                          <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                            Dashboard Preview
                          </div>
                        </div>
                      </div>
                      <div className="px-6 pt-6 pb-14">
                        {/* Placeholder for dashboard preview */}
                        <div className="grid grid-cols-3 gap-4">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="h-24 rounded-lg bg-gradient-to-r from-indigo-400/30 to-indigo-400/10 p-4"
                            >
                              <div className="h-6 w-3/4 rounded bg-white/10" />
                              <div className="mt-4 h-4 w-1/2 rounded bg-white/5" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>

      {/* Feature section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Comprehensive Accounting Features
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            All the tools you need to manage your business finances in one place.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Lit UI Components Demo</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Modal</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Open Modal
          </button>
          <lit-modal
            open={isModalOpen}
            title="Demo Modal"
            onClose={() => setIsModalOpen(false)}
          >
            <p>This is a modal dialog built with Lit</p>
          </lit-modal>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Tooltip</h2>
          <lit-tooltip content="This is a tooltip">
            <button className="bg-gray-200 px-4 py-2 rounded">
              Hover me
            </button>
          </lit-tooltip>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Tabs</h2>
          <lit-tabs items={tabItems} defaultValue="tab1"></lit-tabs>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Select</h2>
          <lit-select options={selectOptions}></lit-select>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Toast</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setShowToast(true)}
          >
            Show Toast
          </button>
          <lit-toast
            show={showToast}
            message="This is a toast message"
            type="success"
            onToastClose={() => setShowToast(false)}
></lit-toast>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Loading Spinner</h2>
          <lit-spinner></lit-spinner>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Skeleton</h2>
          <lit-skeleton width="200px" height="20px"></lit-skeleton>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Accordion</h2>
          <lit-accordion items={accordionItems}></lit-accordion>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Form</h2>
          <lit-form fields={formFields}></lit-form>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Table</h2>
          <lit-table columns={tableColumns} data={tableData}></lit-table>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Avatar</h2>
          <div className="flex space-x-4">
            <lit-avatar
              initials="JD"
              size="lg"
              status="online"
            ></lit-avatar>
            <lit-avatar-group>
              <lit-avatar initials="JD"></lit-avatar>
              <lit-avatar initials="JS"></lit-avatar>
              <lit-avatar initials="AS"></lit-avatar>
              <lit-avatar initials="RK"></lit-avatar>
            </lit-avatar-group>
          </div>
        </section>
      </div>
    </div>
  )
}

const features = [
  {
    name: 'Financial Dashboard',
    description: 'Get a real-time overview of your business finances with our intuitive dashboard.',
    icon: ArrowRightIcon,
  },
  {
    name: 'Expense Tracking',
    description: 'Track and categorize expenses automatically with smart receipt scanning.',
    icon: ArrowRightIcon,
  },
  {
    name: 'Financial Reports',
    description: 'Generate professional financial reports with just a few clicks.',
    icon: ArrowRightIcon,
  },
] 