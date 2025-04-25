import React, { useEffect, useState } from 'react';
import { fetchBusinesses, createBusiness } from './api';
import { BusinessTable } from './components/BusinessTable';

function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: '',
    category: '',
    city: '',
    maincontactname: '',
    maincontactphonenumber: '',
  });
  const [errors, setErrors] = useState({});
  const [searchFilters, setSearchFilters] = useState({
    city: '',
    category: '',
  });

  useEffect(() => {
    fetchBusinesses().then(setData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['name', 'category', 'city', 'maincontactname', 'maincontactphonenumber'];

    requiredFields.forEach((field) => {
      if (!form[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; //returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newBiz = await createBusiness(form);
      setData((prev) => [...prev, newBiz]);
      setForm({
        name: '',
        category: '',
        city: '',
        maincontactname: '',
        maincontactphonenumber: '',
      });
      setErrors({});
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prev) => ({ ...prev, [name]: value }));
  };

  //filter businesses based on search criteria
  const filteredData = data.filter((business) => {
    const { city, category } = searchFilters;
    return (
      (!city || business.city.toLowerCase().includes(city.toLowerCase())) &&
      (!category || business.category.toLowerCase().includes(category.toLowerCase()))
    );
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: '#f0f2f5',
        padding: '2rem',
        width: '100vw',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          background: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          padding: '2rem',
          boxSizing: 'border-box',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#1a202c',
            fontWeight: '600',
          }}
        >
          ZALocator
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr', //two columns layout
            gap: '1rem',
            gridTemplateRows: 'auto',
          }}
        >
          {Object.keys(form).map((key) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
              <label
                htmlFor={key}
                style={{
                  fontSize: '0.875rem',
                  color: '#2d3748',
                  marginBottom: '0.25rem',
                }}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                id={key}
                name={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={form[key]}
                onChange={handleChange}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: errors[key] ? '1px solid red' : '1px solid #cbd5e0', //red border for errors
                  fontSize: '1rem',
                  background: '#f7fafc',
                }}
              />
              {errors[key] && (
                <span style={{ color: 'red', fontSize: '0.875rem' }}>
                  {errors[key]}
                </span>
              )}
            </div>
          ))}
          <div
            style={{
              gridColumn: 'span 2', //the button spans across both columns
              textAlign: 'center',
            }}
          >
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.25rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#3182ce',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background 0.3s ease',
              }}
            >
              Add Business
            </button>
          </div>
        </form>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          marginTop: '2rem',
          boxSizing: 'border-box',
        }}
      >
        <BusinessTable data={filteredData} />
      </div>
    </div>
  );
}

export default App;
