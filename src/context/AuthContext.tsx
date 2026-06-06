import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BankAccount {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'loan';
  accountNo: string;
  balance: number;
  availableLimit?: number; // for credit card
  color: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  status: 'completed' | 'pending';
}

export interface CardState {
  id: string;
  cardNumber: string;
  holderName: string;
  expiry: string;
  cvv: string;
  isFrozen: boolean;
  limit: number;
  spent: number;
}

export interface BankNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'critical' | 'success';
  time: string;
  read: boolean;
}

interface AuthContextType {
  user: { name: string; email: string } | null;
  accounts: BankAccount[];
  transactions: Transaction[];
  cards: CardState[];
  notifications: BankNotification[];
  creditScore: number;
  savingsGoal: { target: number; current: number; name: string };
  isLoggedIn: boolean;
  login: (email: string, name: string) => void;
  logout: () => void;
  transferFunds: (fromAccountId: string, toAccountName: string, amount: number, memo: string) => boolean;
  payBill: (payeeName: string, amount: number, category: string, fromAccountId: string) => boolean;
  toggleCardFreeze: (cardId: string) => void;
  updateCardLimit: (cardId: string, limit: number) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotification: (id: string) => void;
  addFunds: (accountId: string, amount: number, reason: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INITIAL_ACCOUNTS: BankAccount[] = [
  { id: 'checking-1', name: 'Corporate Operating Fund', type: 'checking', accountNo: '•••• 4820', balance: 15132500.00, color: 'bg-brand-primary' },
  { id: 'savings-1', name: 'Treasury Reserves', type: 'savings', accountNo: '•••• 9153', balance: 28950000.00, color: 'bg-brand-secondary' },
  { id: 'credit-1', name: 'Infinite Commercial Visa', type: 'credit', accountNo: '•••• 3099', balance: -142500.75, availableLimit: 1000000, color: 'bg-brand-dark' },
  { id: 'loan-1', name: 'Syndicated Term Facility', type: 'loan', accountNo: '•••• 7741', balance: -12241200.00, color: 'bg-slate-800' }
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'tx-1', date: '2026-06-04', description: 'Enterprise AWS Cloud Cluster Systems', category: 'Infrastructure', amount: 185420.00, type: 'withdrawal', status: 'completed' },
  { id: 'tx-2', date: '2026-06-04', description: 'Apex Global Strategic Venture Fund Round-B Deposit', category: 'Liquidity Receipt', amount: 12500000.00, type: 'deposit', status: 'completed' },
  { id: 'tx-3', date: '2026-06-03', description: 'Salesforce & Slack Enterprise Suite Lizensing', category: 'Software Services', amount: 45000.00, type: 'withdrawal', status: 'completed' },
  { id: 'tx-4', date: '2026-06-02', description: 'Commercial Hub Lease Manhattan HQ Terminal', category: 'Real Estate', amount: 210000.00, type: 'withdrawal', status: 'completed' },
  { id: 'tx-5', date: '2026-06-01', description: 'Stripe Merchant Consolidated Escrow Settlement', category: 'Receivables Operations', amount: 1420500.00, type: 'deposit', status: 'completed' },
  { id: 'tx-6', date: '2026-05-28', description: 'PwC Corporate Audit & Tax Advisory Q2 Payment', category: 'Professional Services', amount: 85000.00, type: 'withdrawal', status: 'completed' },
  { id: 'tx-7', date: '2026-05-27', description: 'Enterprise Cisco Security Firewalls Suite Upgrade', category: 'Security Hardware', amount: 115000.00, type: 'withdrawal', status: 'completed' },
  { id: 'tx-8', date: '2026-05-25', description: 'Vanguard Treasury Yield Bond Maturity Settlement', category: 'Investments', amount: 2350000.00, type: 'deposit', status: 'completed' },
  { id: 'tx-9', date: '2026-06-05', description: 'Apple Inc - hardware Refresh Program Macbook Pros', category: 'Enterprise IT', amount: 849000.00, type: 'withdrawal', status: 'pending' }
];

const INITIAL_CARDS: CardState[] = [
  { id: 'card-1', cardNumber: '4532 9982 7741 3099', holderName: 'ALEX CARTER', expiry: '12/29', cvv: '382', isFrozen: false, limit: 1000000, spent: 142500.75 },
  { id: 'card-2', cardNumber: '4912 3088 4410 9851', holderName: 'ALEX CARTER', expiry: '06/28', cvv: '114', isFrozen: true, limit: 500000, spent: 0 }
];

const INITIAL_NOTIFICATIONS: BankNotification[] = [
  { id: 'notif-1', title: 'Operational Treasury Shift', message: 'Corporate Treasury Reserves account balance has climbed beyond current quarterly target, liquidity allocation recommended.', type: 'info', time: '2 hours ago', read: false },
  { id: 'notif-2', title: 'Secure Access Validation', message: 'A standard webhook verified successful connection with NovaSecure API nodes for secure invoice generation.', type: 'success', time: '1 day ago', read: false },
  { id: 'notif-3', title: 'Q2 Audit Compiled Statement', message: 'Federal corporate tax records and detailed Nova Finance fiscal account statements are ready for advisory review.', type: 'info', time: '2 days ago', read: true }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const saved = localStorage.getItem('nova_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [accounts, setAccounts] = useState<BankAccount[]>(() => {
    const saved = localStorage.getItem('nova_accounts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const holdsOldBalance = parsed.some((acc: any) => acc.type === 'checking' && acc.balance < 1000000);
        if (holdsOldBalance) {
          localStorage.removeItem('nova_accounts');
          localStorage.removeItem('nova_transactions');
          localStorage.removeItem('nova_cards');
          localStorage.removeItem('nova_notifs');
          return INITIAL_ACCOUNTS;
        }
        return parsed;
      } catch (e) {
        return INITIAL_ACCOUNTS;
      }
    }
    return INITIAL_ACCOUNTS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('nova_transactions');
    const accountsSaved = localStorage.getItem('nova_accounts');
    if (!accountsSaved) {
      return INITIAL_TRANSACTIONS;
    }
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [cards, setCards] = useState<CardState[]>(() => {
    const saved = localStorage.getItem('nova_cards');
    const accountsSaved = localStorage.getItem('nova_accounts');
    if (!accountsSaved) {
      return INITIAL_CARDS;
    }
    return saved ? JSON.parse(saved) : INITIAL_CARDS;
  });

  const [notifications, setNotifications] = useState<BankNotification[]>(() => {
    const saved = localStorage.getItem('nova_notifs');
    const accountsSaved = localStorage.getItem('nova_accounts');
    if (!accountsSaved) {
      return INITIAL_NOTIFICATIONS;
    }
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [savingsGoal, setSavingsGoal] = useState(() => {
    return { name: 'Acquisition & Capital Expansion Portfolio', target: 50000000, current: 28950000.00 };
  });

  useEffect(() => {
    if (user) localStorage.setItem('nova_user', JSON.stringify(user));
    else localStorage.removeItem('nova_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nova_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('nova_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('nova_cards', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem('nova_notifs', JSON.stringify(notifications));
  }, [notifications]);

  const login = (email: string, name: string) => {
    setUser({ name: name || 'Alex Carter', email });
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Secure Session Initiated',
        message: `Welcome back, ${name || 'Alex Carter'}. Access verified securely at ${new Date().toLocaleTimeString()}.`,
        type: 'success',
        time: 'Just now',
        read: false
      },
      ...prev
    ]);
  };

  const logout = () => {
    setUser(null);
    // Keep internal local storage state so the mock data stays interactive next time
  };

  const transferFunds = (fromAccountId: string, toAccountName: string, amount: number, memo: string) => {
    if (amount <= 0) return false;

    // Check balance in source
    const srcAccount = accounts.find(a => a.id === fromAccountId);
    if (!srcAccount) return false;
    
    // Check if enough funds (credit card balance increases negatively or standard accounts can cover)
    if (srcAccount.type !== 'credit' && srcAccount.balance < amount) {
      return false;
    }

    setAccounts(prev => prev.map(acc => {
      if (acc.id === fromAccountId) {
        return { ...acc, balance: acc.balance - amount };
      }
      // If the destination is one of our own accounts, add it there
      const matchingDest = prev.find(p => p.name.toLowerCase() === toAccountName.toLowerCase() || p.id === toAccountName);
      if (matchingDest && acc.id === matchingDest.id) {
        return { ...acc, balance: acc.balance + amount };
      }
      return acc;
    }));

    // Create custom transactions
    const newTx: Transaction = {
      id: `tx-f-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      description: `Transfer to ${toAccountName}: ${memo || 'No memo'}`,
      category: 'Transfers',
      amount,
      type: 'withdrawal',
      status: 'completed'
    };

    setTransactions(prev => [newTx, ...prev]);

    // Check if transferring to savings, update current goal progress
    if (toAccountName.toLowerCase().includes('savings') || toAccountName === 'savings-1') {
      setSavingsGoal(g => ({ ...g, current: g.current + amount }));
    }

    // Add alert
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Transfer Completed',
        message: `$${amount.toLocaleString()} transferred to ${toAccountName} successfully.`,
        type: 'success',
        time: 'Just now',
        read: false
      },
      ...prev
    ]);

    return true;
  };

  const payBill = (payeeName: string, amount: number, category: string, fromAccountId: string) => {
    if (amount <= 0) return false;

    const srcAccount = accounts.find(a => a.id === fromAccountId);
    if (!srcAccount) return false;

    if (srcAccount.type !== 'credit' && srcAccount.balance < amount) {
      return false;
    }

    setAccounts(prev => prev.map(acc => {
      if (acc.id === fromAccountId) {
        return { ...acc, balance: acc.balance - amount };
      }
      return acc;
    }));

    const newTx: Transaction = {
      id: `tx-b-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      description: `Bill Paid: ${payeeName}`,
      category: category || 'Utilities',
      amount,
      type: 'withdrawal',
      status: 'completed'
    };

    setTransactions(prev => [newTx, ...prev]);

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Bill Pay Registered',
        message: `$${amount.toLocaleString()} has been sent to ${payeeName}.`,
        type: 'info',
        time: 'Just now',
        read: false
      },
      ...prev
    ]);

    return true;
  };

  const toggleCardFreeze = (cardId: string) => {
    setCards(prev => prev.map(c => {
      if (c.id === cardId) {
        const frozenState = !c.isFrozen;
        // Trigger notification
        setNotifications(notif => [
          {
            id: `notif-${Date.now()}`,
            title: frozenState ? 'Card Deactivated' : 'Card Activated',
            message: `Card ending in ${c.cardNumber.slice(-4)} was successfully ${frozenState ? 'frozen for security purposes' : 'unfrozen and is fully active'}.`,
            type: frozenState ? 'warning' : 'success',
            time: 'Just now',
            read: false
          },
          ...notif
        ]);
        return { ...c, isFrozen: frozenState };
      }
      return c;
    }));
  };

  const updateCardLimit = (cardId: string, limit: number) => {
    setCards(prev => prev.map(c => {
      if (c.id === cardId) {
        return { ...c, limit };
      }
      return c;
    }));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addFunds = (accountId: string, amount: number, reason: string) => {
    if (amount <= 0) return;
    setAccounts(prev => prev.map(acc => {
      if (acc.id === accountId) {
        return { ...acc, balance: acc.balance + amount };
      }
      return acc;
    }));
    const newTx: Transaction = {
      id: `tx-dep-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      description: reason || 'Electronic Deposit',
      category: 'Income',
      amount,
      type: 'deposit',
      status: 'completed'
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  return (
    <AuthContext.Provider value={{
      user,
      accounts,
      transactions,
      cards,
      notifications,
      creditScore: 785,
      savingsGoal,
      isLoggedIn: !!user,
      login,
      logout,
      transferFunds,
      payBill,
      toggleCardFreeze,
      updateCardLimit,
      markNotificationAsRead,
      clearNotification,
      addFunds
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
