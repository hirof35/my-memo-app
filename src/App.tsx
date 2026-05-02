import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 型定義 ---
interface Memo {
  id: string;
  text: string;
}

const MemoApp: React.FC = () => {
  // --- 状態管理 ---
  const [memos, setMemos] = useState<Memo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');

  // --- ストレージからの読み込み (初回のみ) ---
  useEffect(() => {
    const savedMemos = localStorage.getItem('react-memos-v2');
    if (savedMemos) setMemos(JSON.parse(savedMemos));
  }, []);

  // --- ストレージへの自動保存 (memos更新時) ---
  useEffect(() => {
    localStorage.setItem('react-memos-v2', JSON.stringify(memos));
  }, [memos]);

  // --- 基本アクション ---
  const addMemo = () => {
    if (!inputValue.trim()) return;
    const newMemo: Memo = { id: crypto.randomUUID(), text: inputValue };
    setMemos([newMemo, ...memos]); // 新しいメモを先頭に追加
    setInputValue('');
  };

  const deleteMemo = (id: string) => {
    setMemos(memos.filter(memo => memo.id !== id));
  };

  const startEdit = (memo: Memo) => {
    setEditingId(memo.id);
    setEditText(memo.text);
  };

  const saveEdit = (id: string) => {
    setMemos(memos.map(m => (m.id === id ? { ...m, text: editText } : m)));
    setEditingId(null);
  };

  // --- テキストファイル保存機能 ---
  const downloadAsTxt = () => {
    if (memos.length === 0) return alert("メモがありません");
    const content = memos.map(m => `・${m.text}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `memo-${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // --- スタイル定義 ---
  const styles = {
    container: {
      maxWidth: '500px',
      margin: '40px auto',
      padding: '20px',
      backgroundColor: '#f1f3f5',
      borderRadius: '24px',
      fontFamily: 'system-ui, sans-serif',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    },
    header: { textAlign: 'center' as const, color: '#1a1a1a', marginBottom: '20px' },
    inputGroup: { display: 'flex', gap: '8px', marginBottom: '16px' },
    input: {
      flex: 1, padding: '12px 16px', borderRadius: '12px',
      border: '2px solid #e9ecef', fontSize: '16px', outline: 'none'
    },
    primaryBtn: {
      padding: '12px 20px', backgroundColor: '#007bff', color: '#fff',
      border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer'
    },
    downloadBtn: {
      width: '100%', marginBottom: '20px', padding: '10px',
      backgroundColor: '#28a745', color: 'white', border: 'none',
      borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer'
    },
    card: {
      backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px',
      marginBottom: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      display: 'flex', flexDirection: 'column' as const, gap: '10px'
    },
    memoText: { fontSize: '16px', color: '#333', cursor: 'pointer', minHeight: '24px' },
    btnArea: { display: 'flex', justifyContent: 'flex-end', gap: '8px' },
    subBtn: {
      padding: '6px 12px', backgroundColor: '#eee', border: 'none',
      borderRadius: '8px', cursor: 'pointer', fontSize: '13px'
    },
    deleteBtn: {
      padding: '6px 12px', backgroundColor: '#ffdede', color: '#d9534f',
      border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Advanced Memo</h2>

      <div style={styles.inputGroup}>
        <input
          style={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addMemo()}
          placeholder="新しいメモを追加..."
        />
        <button style={styles.primaryBtn} onClick={addMemo}>追加</button>
      </div>

      <button style={styles.downloadBtn} onClick={downloadAsTxt}>
        .txt形式で書き出す
      </button>

      <div style={{ minHeight: '200px' }}>
        <AnimatePresence>
          {memos.map(memo => (
            <motion.div
              key={memo.id}
              style={styles.card}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
            >
              {editingId === memo.id ? (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    style={styles.input}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    autoFocus
                  />
                  <button style={styles.primaryBtn} onClick={() => saveEdit(memo.id)}>保存</button>
                </div>
              ) : (
                <>
                  <div 
                    style={styles.memoText} 
                    onDoubleClick={() => startEdit(memo)}
                  >
                    {memo.text}
                  </div>
                  <div style={styles.btnArea}>
                    <button style={styles.subBtn} onClick={() => startEdit(memo)}>編集</button>
                    <button style={styles.deleteBtn} onClick={() => deleteMemo(memo.id)}>削除</button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MemoApp;