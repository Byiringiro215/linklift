import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Plus, Minus, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, CreditCard, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const WalletPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const balance = 1450.75;
  const monthlyReturn = 156.30;
  const totalInvested = 3200.00;
  const availableCredit = 800.00;

  const earningsData = [
    { month: 'Jan', earnings: 98 },
    { month: 'Feb', earnings: 134 },
    { month: 'Mar', earnings: 167 },
    { month: 'Apr', earnings: 143 },
    { month: 'May', earnings: 189 },
    { month: 'Jun', earnings: 156 }
  ];

  const investmentData = [
    { month: 'Jan', amount: 500 },
    { month: 'Feb', amount: 750 },
    { month: 'Mar', amount: 450 },
    { month: 'Apr', amount: 600 },
    { month: 'May', amount: 900 },
    { month: 'Jun', amount: 0 }
  ];

  const transactions = [
    {
      id: 1,
      type: 'investment_return',
      description: 'Urban Farming Initiative - Monthly Return',
      amount: 45.50,
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'investment',
      description: 'Tech Skills Training Center',
      amount: -300.00,
      date: '2024-01-12',
      status: 'completed'
    },
    {
      id: 3,
      type: 'loan_repayment',
      description: 'Loan Payment - Community Pool',
      amount: -95.00,
      date: '2024-01-10',
      status: 'completed'
    },
    {
      id: 4,
      type: 'deposit',
      description: 'Bank Transfer',
      amount: 500.00,
      date: '2024-01-08',
      status: 'completed'
    },
    {
      id: 5,
      type: 'investment_return',
      description: 'Community Marketplace - Dividend',
      amount: 67.80,
      date: '2024-01-05',
      status: 'completed'
    },
    {
      id: 6,
      type: 'withdrawal',
      description: 'Bank Transfer',
      amount: -200.00,
      date: '2024-01-03',
      status: 'completed'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'investment_return': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'investment': return <TrendingDown className="w-5 h-5 text-blue-600" />;
      case 'deposit': return <ArrowDownLeft className="w-5 h-5 text-green-600" />;
      case 'withdrawal': return <ArrowUpRight className="w-5 h-5 text-red-600" />;
      case 'loan_repayment': return <DollarSign className="w-5 h-5 text-yellow-600" />;
      default: return <DollarSign className="w-5 h-5 text-slate-600" />;
    }
  };

  const getTransactionColor = (amount: number) => {
    return amount > 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Wallet & Transactions</h1>
        <p className="text-slate-600">Manage your funds and track your financial activity</p>
      </motion.div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <Wallet className="w-8 h-8" />
            <span className="text-sm font-medium">Available Balance</span>
          </div>
          <div className="text-3xl font-bold mb-2">${balance.toFixed(2)}</div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowDepositModal(true)}
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm transition-colors"
            >
              <Plus className="w-4 h-4 inline mr-1" />
              Add Funds
            </button>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm transition-colors"
            >
              <Minus className="w-4 h-4 inline mr-1" />
              Withdraw
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8" />
            <span className="text-sm font-medium">Monthly Returns</span>
          </div>
          <div className="text-3xl font-bold mb-2">${monthlyReturn.toFixed(2)}</div>
          <div className="text-sm text-green-100">+12.5% from last month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8" />
            <span className="text-sm font-medium">Total Invested</span>
          </div>
          <div className="text-3xl font-bold mb-2">${totalInvested.toFixed(2)}</div>
          <div className="text-sm text-purple-100">Across 5 ventures</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-xl text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <CreditCard className="w-8 h-8" />
            <span className="text-sm font-medium">Credit Available</span>
          </div>
          <div className="text-3xl font-bold mb-2">${availableCredit.toFixed(2)}</div>
          <div className="text-sm text-yellow-100">5.5% interest rate</div>
        </motion.div>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/70 backdrop-blur-sm p-1 rounded-xl border border-slate-200/50 shadow-sm mb-8"
      >
        <div className="flex space-x-1">
          {[
            { id: 'overview', name: 'Overview' },
            { id: 'transactions', name: 'Transactions' },
            { id: 'analytics', name: 'Analytics' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Monthly Earnings</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="earnings" stroke="#3B82F6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {transactions.slice(0, 5).map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getTransactionIcon(transaction.type)}
                    <div>
                      <div className="font-medium text-slate-800">{transaction.description}</div>
                      <div className="text-sm text-slate-600">{transaction.date}</div>
                    </div>
                  </div>
                  <div className={`font-semibold ${getTransactionColor(transaction.amount)}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-6">All Transactions</h3>
          <div className="space-y-4">
            {transactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <div className="font-medium text-slate-800">{transaction.description}</div>
                    <div className="text-sm text-slate-600">{transaction.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${getTransactionColor(transaction.amount)}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-500 capitalize">{transaction.status}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Investment History</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={investmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Financial Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-slate-700">Total Returns (6 months)</span>
                <span className="font-semibold text-green-600">+$867.40</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-slate-700">Average Monthly Return</span>
                <span className="font-semibold text-blue-600">$144.57</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-slate-700">ROI (Return on Investment)</span>
                <span className="font-semibold text-purple-600">13.5%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-slate-700">Active Investments</span>
                <span className="font-semibold text-yellow-600">5 ventures</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Add Funds</h2>
              <button
                onClick={() => setShowDepositModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Amount</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter amount in USD"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Payment Method</label>
                <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="bank">Bank Transfer</option>
                  <option value="mobile">Mobile Money</option>
                  <option value="card">Credit/Debit Card</option>
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowDepositModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow"
                >
                  Add Funds
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Withdraw Funds</h2>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Amount</label>
                <input
                  type="number"
                  max={balance}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter amount in USD"
                />
                <div className="text-xs text-slate-600 mt-1">Available: ${balance.toFixed(2)}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Withdrawal Method</label>
                <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="bank">Bank Transfer</option>
                  <option value="mobile">Mobile Money</option>
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow"
                >
                  Withdraw
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;