import React, { useEffect } from 'react';
import '../components/lit-ui/modal';
import '../components/lit-ui/tooltip';
import '../components/lit-ui/tabs';
import '../components/lit-ui/select';
import '../components/lit-ui/toast';
import '../components/lit-ui/spinner';
import '../components/lit-ui/skeleton';
import '../components/lit-ui/accordion';
import '../components/lit-ui/form';
import '../components/lit-ui/table';
import '../components/lit-ui/avatar';

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

export default function Home() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState('tab1');
  const [selectedOption, setSelectedOption] = React.useState('');

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

  const handleModalClose = React.useCallback((e: Event) => {
    e.stopPropagation();
    setIsModalOpen(false);
  }, []);

  return (
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
          onclose={handleModalClose}
          onopenchange={(e: CustomEvent) => setIsModalOpen(e.detail.open)}
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
        <lit-tabs
          items={tabItems}
          defaultValue={selectedTab}
          ontab-change={(e: CustomEvent) => setSelectedTab(e.detail.tabId)}
        ></lit-tabs>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select</h2>
        <lit-select
          options={selectOptions}
          value={selectedOption}
          onchange={(e: CustomEvent) => setSelectedOption(e.detail.value)}
        ></lit-select>
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
  );
} 