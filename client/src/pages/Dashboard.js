import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import '../styles/Dashboard.css';
import TransactionModal from '../components/dashboard/TransactionModal';

const Dashboard = () => {
  const [summary, setSummary] = useState({ totalExpenses: 0, categoryTotals: {}, totalTransactions: 0 });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await api.get('/api/transactions/stats/summary');
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setShowModal(true);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingTransaction(null);
    fetchSummary();
  };

  const categoryColors = {
    Food: '#ff6b6b',
    Rent: '#4ecdc4',
    Transport: '#fdcb6e',
    Entertainment: '#a29bfe',
    Utilities: '#fd79a8',
    Shopping: '#fdcb6e',
    Healthcare: '#74b9ff',
    Education: '#55efc4',
    Other: '#b2bec3'
  };
  
  const categoryBorderColors = {
    Food: '#ff6b6b',
    Rent: '#4ecdc4',
    Transport: '#fdcb6e',
    Entertainment: '#a29bfe',
    Utilities: '#fd79a8',
    Shopping: '#fdcb6e',
    Healthcare: '#74b9ff',
    Education: '#55efc4',
    Other: '#b2bec3'
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Expense Tracker Dashboard</h1>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/explorer')}>
            View All Transactions
          </button>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="summary-card card">
          <h2>Total Expenses</h2>
          <p className="total-amount">${summary.totalExpenses.toFixed(2)}</p>
          <p className="total-count">{summary.totalTransactions} transactions</p>
        </div>

        <div className="category-breakdown card">
          <h2>Expenses by Category</h2>
          {Object.keys(summary.categoryTotals).length === 0 ? (
            <p className="no-data">No transactions yet. Add your first transaction!</p>
          ) : (
            <div className="category-list">
              {Object.entries(summary.categoryTotals)
                .sort((a, b) => b[1] - a[1])
                .map(([category, amount], index) => (
                  <div key={category} className="category-item" style={{ borderLeftColor: categoryBorderColors[category] || '#667eea' }}>
                    <div className="category-header">
                      <span className="category-name">{category}</span>
                      <span className="category-amount">${amount.toFixed(2)}</span>
                    </div>
                    <div className="category-bar">
                      <div
                        className="category-bar-fill"
                        style={{
                          width: `${(amount / summary.totalExpenses) * 100}%`,
                          backgroundColor: categoryColors[category] || categoryColors['Other']
                        }}
                      />
                    </div>
                    <div className="category-percentage">
                      {((amount / summary.totalExpenses) * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="action-section">
          <button className="btn btn-primary btn-large" onClick={handleAddTransaction}>
            + Add New Transaction
          </button>
        </div>
      </div>

      {showModal && (
        <TransactionModal
          transaction={editingTransaction}
          onClose={handleModalClose}
          onSave={handleModalClose}
        />
      )}
    </div>
  );
};

export default Dashboard;
