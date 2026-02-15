import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import '../styles/Explorer.css';
import TransactionModal from '../components/dashboard/TransactionModal';
import TransactionItem from '../components/explorer/TransactionItem';

const Explorer = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const observerTarget = useRef(null);

  const fetchTransactions = useCallback(async (page) => {
    try {
      setLoading(true);
      const response = await api.get(`/api/transactions?page=${page}&limit=10`);
      if (page === 1) {
        setTransactions(response.data.transactions);
      } else {
        setTransactions(prev => [...prev, ...response.data.transactions]);
      }
      setHasMore(response.data.hasMore);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions(1);
  }, [fetchTransactions]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchTransactions(currentPage + 1);
    }
  }, [loading, hasMore, currentPage, fetchTransactions]);

  const filterTransactions = useCallback(() => {
    let filtered = [...transactions];

    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.notes && t.notes.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    if (dateRange.start) {
      filtered = filtered.filter(t => new Date(t.date) >= new Date(dateRange.start));
    }
    if (dateRange.end) {
      filtered = filtered.filter(t => new Date(t.date) <= new Date(dateRange.end));
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, selectedCategory, dateRange]);

  useEffect(() => {
    filterTransactions();
  }, [filterTransactions]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, loadMore]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await api.delete(`/api/transactions/${id}`);
        setTransactions(prev => prev.filter(t => t._id !== id));
      } catch (error) {
        alert('Failed to delete transaction');
      }
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingTransaction(null);
    fetchTransactions(1);
  };

  const categories = ['All', 'Food', 'Rent', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Healthcare', 'Education', 'Other'];

  return (
    <div className="explorer">
      <header className="explorer-header">
        <h1>Transaction Explorer</h1>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <div className="explorer-content">
        <div className="filters-section card">
          <h2>Search & Filter</h2>
          
          <input
            type="text"
            placeholder="Search by title or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
          />

          <div className="filter-row">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <input
              type="date"
              placeholder="Start Date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="input"
            />

            <input
              type="date"
              placeholder="End Date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="input"
            />
          </div>

          <button
            className="btn btn-secondary"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setDateRange({ start: '', end: '' });
            }}
          >
            Clear Filters
          </button>
        </div>

        <div className="transactions-section">
          <div className="transactions-header">
            <h2>Transactions ({filteredTransactions.length})</h2>
            <button className="btn btn-primary" onClick={() => {
              setEditingTransaction(null);
              setShowModal(true);
            }}>
              + Add Transaction
            </button>
          </div>

          {filteredTransactions.length === 0 && !loading ? (
            <div className="no-transactions">
              <p>No transactions found. {searchTerm || selectedCategory !== 'All' || dateRange.start || dateRange.end ? 'Try adjusting your filters.' : 'Add your first transaction!'}</p>
            </div>
          ) : (
            <div className="transactions-list">
              {filteredTransactions.map(transaction => (
                <TransactionItem
                  key={transaction._id}
                  transaction={transaction}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {hasMore && transactions.length > 0 && (
            <div ref={observerTarget} className="load-more-trigger">
              {loading && <p>Loading more transactions...</p>}
            </div>
          )}
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

export default Explorer;
