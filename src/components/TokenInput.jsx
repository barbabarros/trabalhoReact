import { useState } from 'react';

export default function TokenInput({ onTokenChange }) {
  const [token, setToken] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setToken(value);
    onTokenChange(value);
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <label htmlFor="token-input" style={{ fontWeight: 'bold' }}>Token JWT:</label>
      <input
        id="token-input"
        type="text"
        value={token}
        onChange={handleChange}
        placeholder="Cole o token"
        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
      />
    </div>
  );
}
