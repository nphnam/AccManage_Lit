import React from 'react'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  BanknotesIcon,
  ChartBarIcon,
  DocumentDuplicateIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

const stats = [
  {
    name: 'Total Revenue',
    stat: '$71,897',
    change: '+4.75%',
    changeType: 'positive',
    icon: BanknotesIcon,
  },
  {
    name: 'Total Expenses',
    stat: '$58,123',
    change: '+1.23%',
    changeType: 'negative',
    icon: ChartBarIcon,
  },
  {
    name: 'Active Accounts',
    stat: '245',
    change: '+5.15%',
    changeType: 'positive',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Active Users',
    stat: '18',
    change: '0%',
    changeType: 'neutral',
    icon: UserGroupIcon,
  },
]

export function QuickStats() {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Last 30 days
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 rounded-lg overflow-hidden shadow"
          >
            <dt>
              <div className="absolute rounded-md p-3 bg-indigo-500">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'positive'
                    ? 'text-green-600'
                    : item.changeType === 'negative'
                    ? 'text-red-600'
                    : 'text-gray-500'
                }`}
              >
                {item.changeType === 'positive' ? (
                  <ArrowUpIcon
                    className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                ) : item.changeType === 'negative' ? (
                  <ArrowDownIcon
                    className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="ml-1">{item.change}</span>
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
