import React from 'react';

const CustomLogin = (props) => {
  const { action, errorMessage } = props;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #04445E 0%, #169AB4 100%)'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          color: '#04445E', 
          marginBottom: '10px',
          textAlign: 'center' 
        }}>
          NextSteps CV Portal
        </h2>
        <p style={{ 
          color: '#666', 
          marginBottom: '30px',
          textAlign: 'center' 
        }}>
          Admin Dashboard Login
        </p>

        <form action={action} method="POST">
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{ 
              display: 'block', 
              marginBottom: '5px',
              color: '#333',
              fontWeight: '500'
            }}>
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ 
              display: 'block', 
              marginBottom: '5px',
              color: '#333',
              fontWeight: '500'
            }}>
              Password *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          {errorMessage && (
            <div style={{ 
              color: 'red', 
              marginBottom: '15px',
              fontSize: '14px' 
            }}>
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#169AB4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
        </form>

        <p style={{ 
          marginTop: '20px', 
          textAlign: 'center',
          color: '#666',
          fontSize: '12px'
        }}>
          Default: admin@cvportal.com / admin123
        </p>
      </div>
    </div>
  );
};

export default CustomLogin;