import React from 'react';
import '../../styles/TransactionItem.css';
import { formatCurrency, formatDate } from '../../utils/formatters';

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  return (
    <div className="transaction-item" data-category={transaction.category}>
      <div className="transaction-main">
        <div className="transaction-info">
          <h3 className="transaction-title">{transaction.title}</h3>
          <div className="transaction-meta">
            <span className="transaction-category">{transaction.category}</span>
            <span className="transaction-date">{formatDate(transaction.date)}</span>
          </div>
          {transaction.notes && (
            <p className="transaction-notes">{transaction.notes}</p>
          )}
        </div>
        <div className="transaction-amount">
          ${formatCurrency(transaction.amount)}
        </div>
      </div>
      <div className="transaction-actions">
        <button className="btn btn-secondary btn-sm" onClick={() => onEdit(transaction)}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(transaction._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
