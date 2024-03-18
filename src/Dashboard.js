import React, { useState } from 'react';
import DomainRecordChart from './DomainRecordChart'; 

function Dashboard() {
  const [domains, setDomains] = useState([]);
  const [newDomain, setNewDomain] = useState('');
  const [newRecord, setNewRecord] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleDomainUpload = () => {
    if (newDomain.trim() !== '') {
      setDomains([...domains, { name: newDomain, records: [] }]);
      setNewDomain('');
    }
  };

  const handleRecordUpload = (index) => {
    if (newRecord.trim() !== '') {
      const updatedDomains = [...domains];
      updatedDomains[index].records.push(newRecord);
      setDomains(updatedDomains);
      setNewRecord('');
    }
  };

  const handleDeleteRecord = (domainIndex, recordIndex) => {
    const updatedDomains = [...domains];
    updatedDomains[domainIndex].records.splice(recordIndex, 1);
    setDomains(updatedDomains);
  };

  const handleSearch = () => {
    const results = domains.filter(domain => domain.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setSearchResults(results);
  };

  return (
    <div>
      <h1>Domain Dashboard</h1>
      <div>
        <h2>Domains</h2>
        <input
          type="text"
          placeholder="Enter domain name"
          value={newDomain}
          onChange={(e) => setNewDomain(e.target.value)}
        />
        <button onClick={handleDomainUpload}>Add Domain</button>
        <input
          type="text"
          placeholder="Search domain"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <table>
          <thead>
            <tr>
              <th>Domain Name</th>
              <th>DNS Records</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.length > 0 ? (
              searchResults.map((domain, index) => (
                <tr key={index}>
                  <td>{domain.name}</td>
                  <td>
                    <ul>
                      {domain.records.map((record, idx) => (
                        <li key={idx}>
                          {record}{' '}
                          <button onClick={() => handleDeleteRecord(index, idx)}>Delete</button>
                        </li>
                      ))}
                    </ul>
                    <input
                      type="text"
                      placeholder="Enter DNS record"
                      value={newRecord}
                      onChange={(e) => setNewRecord(e.target.value)}
                    />
                    <button onClick={() => handleRecordUpload(index)}>Add Record</button>
                  </td>
                </tr>
              ))
            ) : (
              domains.map((domain, index) => (
                <tr key={index}>
                  <td>{domain.name}</td>
                  <td>
                    <ul>
                      {domain.records.map((record, idx) => (
                        <li key={idx}>
                          {record}{' '}
                          <button onClick={() => handleDeleteRecord(index, idx)}>Delete</button>
                        </li>
                      ))}
                    </ul>
                    <input
                      type="text"
                      placeholder="Enter DNS record"
                      value={newRecord}
                      onChange={(e) => setNewRecord(e.target.value)}
                    />
                    <button onClick={() => handleRecordUpload(index)}>Add Record</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <DomainRecordChart domains={domains} /> {}
    </div>
  );
}

export default Dashboard;
  
