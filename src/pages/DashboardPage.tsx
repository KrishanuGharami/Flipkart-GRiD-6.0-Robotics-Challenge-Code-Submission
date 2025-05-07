import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Bell,
  Check,
  Clock,
  Database,
  Eye,
  Filter,
  LineChart,
  ListFilter,
  Menu,
  MoreHorizontal,
  PieChart,
  RefreshCw,
  Search,
  Settings,
  X
} from 'lucide-react';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('Today');
  
  // Sample data for charts
  const lineChartData = {
    labels: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
    datasets: [
      {
        label: 'Products Inspected',
        data: [240, 350, 420, 390, 450, 520],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };
  
  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Defect Rate (%)',
        data: [1.2, 0.8, 1.5, 0.9, 0.7],
        backgroundColor: '#F59E0B',
      },
    ],
  };
  
  const pieChartData = {
    labels: ['Passed', 'Minor Issues', 'Failed'],
    datasets: [
      {
        data: [78, 17, 5],
        backgroundColor: ['#22C55E', '#F59E0B', '#EF4444'],
        borderWidth: 0,
      },
    ],
  };

  // Mock quality control metrics
  const metrics = [
    { name: 'Products Inspected', value: 8542, change: +12.3, status: 'positive' },
    { name: 'Defect Rate', value: '0.9%', change: -0.4, status: 'positive' },
    { name: 'Processing Speed', value: '12.8s', change: -0.2, status: 'positive' },
    { name: 'System Uptime', value: '99.8%', change: +0.1, status: 'positive' },
  ];

  // Mock recent alerts
  const alerts = [
    {
      id: 1,
      message: 'Potential OCR misconfiguration on Line 3',
      status: 'warning',
      time: '15 min ago',
    },
    {
      id: 2,
      message: 'Quality threshold exceeded for Apple Freshness Detection',
      status: 'error',
      time: '1 hour ago',
    },
    {
      id: 3,
      message: 'System update available: v2.1.4',
      status: 'info',
      time: '2 hours ago',
    },
    {
      id: 4,
      message: 'Maintenance scheduled for tomorrow, 9:00 AM',
      status: 'info',
      time: '3 hours ago',
    },
  ];

  // Mock recent quality control reports
  const reports = [
    {
      id: 1,
      product: 'Organic Apples',
      batch: 'BA-2024-05-10-A',
      passRate: 98.2,
      inspectedCount: 1200,
      timestamp: '10:42 AM',
    },
    {
      id: 2,
      product: 'Premium Chocolate',
      batch: 'CH-2024-05-10-C',
      passRate: 99.5,
      inspectedCount: 850,
      timestamp: '10:15 AM',
    },
    {
      id: 3,
      product: 'Cereal Boxes',
      batch: 'CE-2024-05-10-B',
      passRate: 97.8,
      inspectedCount: 1500,
      timestamp: '9:30 AM',
    },
    {
      id: 4,
      product: 'Milk Cartons',
      batch: 'MC-2024-05-10-A',
      passRate: 96.5,
      inspectedCount: 2000,
      timestamp: '9:00 AM',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-16 left-4 z-20">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white p-2 rounded-md shadow-md border border-gray-200"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -250 }}
          animate={{ x: sidebarOpen ? 0 : -250 }}
          transition={{ duration: 0.3 }}
          className="fixed lg:relative lg:translate-x-0 z-10 w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <div className="p-4">
            <div className="px-4 py-3 bg-primary-50 text-primary-700 rounded-lg mb-6 flex items-center">
              <Database size={18} className="mr-2" />
              <span className="font-medium">Quality Control</span>
            </div>

            <div className="space-y-1">
              <Link to="#" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg bg-primary-50 text-primary-700">
                <BarChart3 size={18} className="mr-3" />
                Dashboard
              </Link>
              <Link to="#" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50">
                <Eye size={18} className="mr-3" />
                Monitoring
              </Link>
              <Link to="#" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50">
                <LineChart size={18} className="mr-3" />
                Analytics
              </Link>
              <Link to="#" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50">
                <Bell size={18} className="mr-3" />
                Alerts
                <span className="ml-auto bg-error-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
              </Link>
              <Link to="#" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50">
                <Settings size={18} className="mr-3" />
                Settings
              </Link>
            </div>

            <div className="mt-8">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                MODULES
              </h3>
              <div className="space-y-1">
                <Link to="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  OCR Analysis
                </Link>
                <Link to="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  IR Counting System
                </Link>
                <Link to="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Freshness Detection
                </Link>
                <Link to="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Defect Analysis
                </Link>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {/* Dashboard header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quality Control Dashboard</h1>
              <p className="text-gray-500 mt-1">Monitor and analyze quality control metrics</p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <div className="relative">
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option>Today</option>
                  <option>Yesterday</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Clock size={14} className="text-gray-400" />
                </div>
              </div>
              
              <button className="bg-white p-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                <RefreshCw size={16} />
              </button>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-white border border-gray-300 rounded-md pl-9 pr-3 py-1.5 text-sm w-40 md:w-auto focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={14} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Metrics cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">{metric.name}</p>
                    <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                  </div>
                  <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    metric.status === 'positive' ? 'bg-success-50 text-success-700' : 'bg-error-50 text-error-700'
                  }`}>
                    {metric.change > 0 ? '↑' : '↓'} {Math.abs(metric.change)}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Inspection Volume</h2>
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <div className="h-64">
                <Line 
                  data={lineChartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }} 
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Defect Rate Trend</h2>
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <div className="h-64">
                <Bar 
                  data={barChartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        suggestedMax: 3,
                      },
                    },
                  }} 
                />
              </div>
            </motion.div>
          </div>

          {/* Bottom section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quality distribution chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Quality Distribution</h2>
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <div className="h-64 flex items-center justify-center">
                <div className="w-48">
                  <Pie 
                    data={pieChartData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom',
                        },
                      },
                    }} 
                  />
                </div>
              </div>
            </motion.div>

            {/* Alerts section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start p-2 rounded-md hover:bg-gray-50">
                    <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full mr-2 ${
                      alert.status === 'error' ? 'bg-error-500' :
                      alert.status === 'warning' ? 'bg-warning-500' :
                      'bg-primary-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-500 p-1">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  View all alerts
                </button>
              </div>
            </motion.div>

            {/* Recent reports */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-gray-500">
                    <Filter size={16} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {reports.map((report) => (
                  <div key={report.id} className="flex items-start p-2 rounded-md hover:bg-gray-50">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-md mr-3 flex items-center justify-center ${
                      report.passRate >= 99 ? 'bg-success-50 text-success-600' :
                      report.passRate >= 95 ? 'bg-warning-50 text-warning-600' :
                      'bg-error-50 text-error-600'
                    }`}>
                      <Check size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">{report.product}</p>
                        <p className="text-xs text-gray-500">{report.timestamp}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Batch: {report.batch}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs font-medium mr-2">
                          {report.passRate}% Pass
                        </span>
                        <div className="w-24 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="h-1.5 rounded-full"
                            style={{ 
                              width: `${report.passRate}%`,
                              backgroundColor: report.passRate >= 99 ? '#22C55E' :
                                              report.passRate >= 95 ? '#F59E0B' : '#EF4444'
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-auto">
                          {report.inspectedCount} items
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  View all reports
                </button>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;