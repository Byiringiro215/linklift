import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, DollarSign, Clock, User, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

const LoansPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [showRequestForm, setShowRequestForm] = useState(false);

  const loanRequests = [
    {
      id: 1,
      borrower: 'Marie Uwimana',
      purpose: 'Expand tailoring business',
      amount: 1500,
      repaymentPlan: '12 months',
      interestRate: 8,
      riskLevel: 'Low',
      requestDate: '2024-01-10',
      description: 'Looking to purchase additional sewing machines and expand my tailoring business to serve more customers in the community.',
      monthlyIncome: 400,
      collateral: 'Business equipment',
      rating: 4.5,
      funded: 750,
      lenders: 5
    },
    {
      id: 2,
      borrower: 'Jean Baptiste',
      purpose: 'Agricultural equipment',
      amount: 2000,
      repaymentPlan: '18 months',
      interestRate: 10,
      riskLevel: 'Medium',
      requestDate: '2024-01-08',
      description: 'Need funding to purchase modern farming equipment to increase crop yield and improve farming efficiency.',
      monthlyIncome: 300,
      collateral: 'Land title',
      rating: 4.2,
      funded: 1200,
      lenders: 8
    },
    {
      id: 3,
      borrower: 'Grace Mukamana',
      purpose: 'Start food delivery service',
      amount: 800,
      repaymentPlan: '6 months',
      interestRate: 12,
      riskLevel: 'Medium',
      requestDate: '2024-01-05',
      description: 'Starting a local food delivery service with electric motorcycle. Community has shown strong interest.',
      monthlyIncome: 250,
      collateral: 'Vehicle',
      rating: 4.7,
      funded: 800,
      lenders: 12,
      status: 'Fully Funded'
    }
  ];

  const myLoans = [
    {
      id: 1,
      type: 'borrowed',
      amount: 1000,
      purpose: 'Business expansion',
      monthlyPayment: 95,
      remainingBalance: 760,
      nextPayment: '2024-02-15',
      status: 'Active'
    },
    {
      id: 2,
      type: 'lent',
      borrower: 'Paul Niyonshuti',
      amount: 500,
      monthlyReturn: 45,
      remainingBalance: 320,
      nextPayment: '2024-02-10',
      status: 'Active'
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getFundingProgress = (funded: number, total: number) => {
    return Math.round((funded / total) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Microloans</h1>
          <p className="text-slate-600">Support community members with accessible financing</p>
        </div>
        <button
          onClick={() => setShowRequestForm(true)}
          className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Request Loan
        </button>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/70 backdrop-blur-sm p-1 rounded-xl border border-slate-200/50 shadow-sm mb-8"
      >
        <div className="flex space-x-1">
          {[
            { id: 'available', name: 'Available Loans', count: loanRequests.filter(l => !l.status).length },
            { id: 'my-loans', name: 'My Loans', count: myLoans.length },
            { id: 'history', name: 'Transaction History', count: 8 }
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
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-slate-200 text-slate-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Available Loans */}
      {activeTab === 'available' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {loanRequests.map((loan, index) => (
            <div
              key={loan.id}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{loan.borrower}</h3>
                    <p className="text-sm text-slate-600">{loan.purpose}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-800">${loan.amount.toLocaleString()}</div>
                  <div className="text-sm text-slate-600">{loan.repaymentPlan}</div>
                </div>
              </div>

              <p className="text-slate-600 mb-4">{loan.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-lg font-semibold text-slate-800">{loan.interestRate}%</div>
                  <div className="text-xs text-slate-600">Interest Rate</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(loan.riskLevel)}`}>
                    {loan.riskLevel} Risk
                  </div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-lg font-semibold text-slate-800">${loan.monthlyIncome}</div>
                  <div className="text-xs text-slate-600">Monthly Income</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm font-semibold text-slate-800">{loan.collateral}</div>
                  <div className="text-xs text-slate-600">Collateral</div>
                </div>
              </div>

              {loan.status !== 'Fully Funded' ? (
                <>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Funding Progress</span>
                      <span className="text-slate-600">
                        {getFundingProgress(loan.funded, loan.amount)}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                        style={{ width: `${getFundingProgress(loan.funded, loan.amount)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>${loan.funded.toLocaleString()} funded by {loan.lenders} lenders</span>
                      <span>${(loan.amount - loan.funded).toLocaleString()} remaining</span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-green-500 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-shadow">
                      Fund This Loan
                    </button>
                    <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                      View Details
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">Fully Funded</span>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      )}

      {/* My Loans */}
      {activeTab === 'my-loans' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {myLoans.map((loan, index) => (
            <div
              key={loan.id}
              className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {loan.type === 'borrowed' ? 'Borrowed' : 'Lent to ' + loan.borrower}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {loan.type === 'borrowed' ? loan.purpose : 'Investment loan'}
                  </p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {loan.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-lg font-semibold text-slate-800">${loan.amount}</div>
                  <div className="text-xs text-slate-600">Original Amount</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-lg font-semibold text-slate-800">${loan.remainingBalance}</div>
                  <div className="text-xs text-slate-600">Remaining</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-lg font-semibold text-slate-800">
                    ${loan.type === 'borrowed' ? loan.monthlyPayment : loan.monthlyReturn}
                  </div>
                  <div className="text-xs text-slate-600">Monthly {loan.type === 'borrowed' ? 'Payment' : 'Return'}</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm font-semibold text-slate-800">{loan.nextPayment}</div>
                  <div className="text-xs text-slate-600">Next Payment</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>Next payment in 5 days</span>
                </div>
                <div className="flex space-x-2">
                  {loan.type === 'borrowed' && (
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                      Make Payment
                    </button>
                  )}
                  <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm">
                    View History
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Transaction History */}
      {activeTab === 'history' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {[
              {
                date: '2024-01-15',
                type: 'Payment Received',
                amount: 45,
                from: 'Paul Niyonshuti',
                status: 'Completed'
              },
              {
                date: '2024-01-10',
                type: 'Loan Payment',
                amount: -95,
                to: 'Community Pool',
                status: 'Completed'
              },
              {
                date: '2024-01-05',
                type: 'Loan Funded',
                amount: -300,
                to: 'Marie Uwimana',
                status: 'Completed'
              },
              {
                date: '2023-12-15',
                type: 'Payment Received',
                amount: 45,
                from: 'Paul Niyonshuti',
                status: 'Completed'
              }
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    transaction.amount > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <div className="font-medium text-slate-800">{transaction.type}</div>
                    <div className="text-sm text-slate-600">
                      {transaction.from && `From ${transaction.from}`}
                      {transaction.to && `To ${transaction.to}`}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                  </div>
                  <div className="text-xs text-slate-500">{transaction.date}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Loan Request Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Request a Loan</h2>
              <button
                onClick={() => setShowRequestForm(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Loan Amount</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter amount in USD"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Purpose</label>
                <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select purpose</option>
                  <option value="business">Business expansion</option>
                  <option value="equipment">Equipment purchase</option>
                  <option value="inventory">Inventory</option>
                  <option value="education">Education</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Repayment Period</label>
                <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select period</option>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="18">18 months</option>
                  <option value="24">24 months</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Explain how you plan to use this loan..."
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LoansPage;