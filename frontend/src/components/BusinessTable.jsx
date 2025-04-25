import * as React from 'react';

export function BusinessTable({ data }) {
  const [selectedBusiness, setSelectedBusiness] = React.useState(null);

  const toggleContactInfo = (id) => {
    setSelectedBusiness(selectedBusiness === id ? null : id);
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: '#f3f3f3' }}>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Category</th>
          <th style={thStyle}>City</th>
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((b) => (
          <tr key={b.id}>
            <td style={tdStyle}>{b.name}</td>
            <td style={tdStyle}>{b.category}</td>
            <td style={tdStyle}>{b.city}</td>
            <td style={tdStyle}>
              <button
                onClick={() => toggleContactInfo(b.id)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#3182ce',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'background 0.3s ease',
                }}
              >
                {selectedBusiness === b.id ? 'Hide Contact Info' : 'Show Contact Info'}
              </button>

              {selectedBusiness === b.id && (
                <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f7fafc', borderRadius: '8px' }}>
                  <p><strong>Contact Name:</strong> {b.maincontactname}</p>
                  <p><strong>Contact Number:</strong> {b.maincontactphonenumber}</p>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const thStyle = { border: '1px solid #ccc', padding: '8px', textAlign: 'left' };
const tdStyle = { border: '1px solid #ddd', padding: '8px' };
