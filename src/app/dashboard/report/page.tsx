'use client'

import React, { useState } from 'react';
import { ChevronDown, Download, FileText } from 'lucide-react';

const ReportPage: React.FC = () => {

    const [dateRange, setDateRange] = useState('last30');
  const [reportType, setReportType] = useState('sales');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="dark:text-gray-50 text-2xl font-bold">Reporte</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Generar reporte
          </p>
        </div>
        <button className="btn btn-primary flex items-center gap-2">
          <Download className="h-5 w-5" />
          Descargar Reporte
        </button>
      </div>

      {/* Report Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 0 1px 3px border border-gray-300 fade-in">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Report Type
            </label>
            <div className="relative">
              <select
                className="input appearance-none pr-10"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="sales">Sales Report</option>
                <option value="revenue">Revenue Report</option>
                <option value="customers">Customer Analytics</option>
                <option value="inventory">Inventory Report</option>
                <option value="performance">Restaurant Performance</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date Range
            </label>
            <div className="relative">
              <select
                className="input appearance-none pr-10"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7">Last 7 Days</option>
                <option value="last30">Last 30 Days</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="custom">Custom Range</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Format
            </label>
            <div className="relative">
              <select className="input appearance-none pr-10">
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            title: 'Sales Summary',
            description: 'Detailed breakdown of sales by restaurant and category',
            icon: FileText,
            type: 'sales'
          },
          {
            title: 'Revenue Analysis',
            description: 'Revenue trends and projections',
            icon: FileText,
            type: 'revenue'
          },
          {
            title: 'Customer Analytics',
            description: 'Customer behavior and demographics',
            icon: FileText,
            type: 'customers'
          },
          {
            title: 'Inventory Report',
            description: 'Stock levels and consumption patterns',
            icon: FileText,
            type: 'inventory'
          },
          {
            title: 'Restaurant Performance',
            description: 'Individual restaurant metrics and rankings',
            icon: FileText,
            type: 'performance'
          },
          {
            title: 'Custom Report',
            description: 'Create a custom report with selected metrics',
            icon: FileText,
            type: 'custom'
          }
        ].map((report, index) => (
          <div 
            key={index}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-card hover:shadow-card-hover p-6 0 1px 3px border border-gray-300 fade-in cursor-pointer transition-all ${
              reportType === report.type ? 'ring-2 ring-primary-500' : ''
            }`}
            onClick={() => setReportType(report.type)}
          >
            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-primary-50 dark:bg-gray-700">
                <report.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{report.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {report.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-6 0 1px 3px border border-gray-300 fade-in">
        <h2 className="text-lg font-semibold mb-4">Report Preview</h2>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-8 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Select a report type and date range to preview the report
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;