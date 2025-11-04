import React, { useState } from 'react';

const WorkshopRegistrations = (props) => {
  const { record } = props;
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size should be less than 10MB');
        return;
      }
      if (!['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        alert('Only PDF, JPG, and PNG files are allowed');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('certificate', selectedFile);

      const registrationId = record.params._id;

      const response = await fetch(`/api/workshops/registrations/${registrationId}/certificate`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        alert('Certificate uploaded successfully!');
        window.location.reload();
      } else {
        alert(data.message || 'Failed to upload certificate');
      }
    } catch (error) {
      console.error('Error uploading certificate:', error);
      alert('Error uploading certificate');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) {
      return;
    }

    try {
      setUploading(true);
      const registrationId = record.params._id;

      const response = await fetch(`/api/workshops/registrations/${registrationId}/certificate`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        alert('Certificate deleted successfully!');
        window.location.reload();
      } else {
        alert(data.message || 'Failed to delete certificate');
      }
    } catch (error) {
      console.error('Error deleting certificate:', error);
      alert('Error deleting certificate');
    } finally {
      setUploading(false);
    }
  };

  const certificateUrl = record.params['certificate.url'];
  const hasCertificate = !!certificateUrl;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #dee2e6'
      }}>
        <h3 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>
          Student Information
        </h3>
        <p style={{ marginBottom: '5px' }}>
          <strong>Status:</strong> {record.params.status}
        </p>
      </div>

      <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: 'bold' }}>
        Certificate Management
      </h3>

      {hasCertificate && (
        <div style={{ 
          backgroundColor: '#d4edda', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '15px',
          border: '1px solid #c3e6cb'
        }}>
          <p style={{ marginBottom: '10px', fontWeight: 'bold', color: '#155724' }}>
            ✓ Certificate Available
          </p>
          <a 
            href={certificateUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: '#169AB4', 
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'block',
              marginBottom: '10px'
            }}
          >
            📄 View Certificate
          </a>
          {record.params['certificate.uploadedAt'] && (
            <p style={{ fontSize: '12px', color: '#6c757d' }}>
              Uploaded: {new Date(record.params['certificate.uploadedAt']).toLocaleString()}
            </p>
          )}
        </div>
      )}

      {hasCertificate && (
        <button
          onClick={handleDelete}
          disabled={uploading}
          style={{
            padding: '10px 20px',
            backgroundColor: uploading ? '#ccc' : '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: uploading ? 'not-allowed' : 'pointer',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}
        >
          {uploading ? 'Deleting...' : '🗑️ Delete Certificate'}
        </button>
      )}

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          Select Certificate File
        </label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          disabled={uploading}
          style={{
            padding: '10px',
            border: '2px dashed #169AB4',
            borderRadius: '5px',
            width: '100%',
            cursor: 'pointer',
            backgroundColor: '#f8f9fa'
          }}
        />
        {selectedFile && (
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#495057' }}>
            📄 Selected: <strong>{selectedFile.name}</strong> ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
      </div>

      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        style={{
          padding: '12px 24px',
          backgroundColor: (!selectedFile || uploading) ? '#ccc' : '#169AB4',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: (!selectedFile || uploading) ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        {uploading ? '⏳ Uploading...' : (hasCertificate ? '🔄 Replace Certificate' : '☁️ Upload Certificate')}
      </button>
    </div>
  );
};

export default WorkshopRegistrations;