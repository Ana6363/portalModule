import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOperationRequest, createOperationRequest, updateOperationRequest, deleteOperationRequest } from '../../services/OperationRequestService';
import './StafffPage.css';
import Button from '../../components/Buttons/Buttons'; 
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import SelectableTable from '../../components/Table/SelectableTable';

const OperationRequest: React.FC = () => {
    const navigate = useNavigate();
    const [operationRequests, setOperationRequests] = useState<any[]>([]);
    const [editData, setEditData] = useState<any>(null);
    const [newRequestData, setNewRequestData] = useState({
        deadline: '',
        priority: '',
        recordNumber: '',
        status: 'PENDING',
        operationTypeName: '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOperationRequest, setSelectedOperationRequest] = useState<any | null>(null);
    const [modalContent, setModalContent] = useState({
        title: '',
        message: '',
        action: () => {},
      });

    const loadOperationRequests = useCallback(async () => {
        try {
            const data = await fetchOperationRequest({});
            setOperationRequests(data);
        } catch (error) {
            console.error('Failed to load operation requests:', error);
        }
    }, []);

    useEffect(() => {
        loadOperationRequests();
    }, [loadOperationRequests]);

    const handleInputChange = (field: string, value: string, isEdit = false) => {
        if (isEdit) {
            setEditData((prev: any) => ({ ...prev, [field]: value }));
        } else {
            setNewRequestData((prev) => ({ ...prev, [field]: value }));
        }
    };

    const handleNavigateToCreate  = () => {
        navigate('/operationRequest/create'); // Navigate to the create page
    };

    const handleNavigateToUpdate = () => {
        if (!selectedOperationRequest) {
            alert("No patient selected.");
            return;
        }
        navigate('/operationRequest/update'); // Navigate to the update page
    };

    const handleNavigateToDelete = () => {
        navigate('/operationRequest/delete'); // Navigate to the delete page
    };

    const openModal = (title: string, message: string, action: () => void) => {
        setModalContent({ title, message, action });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const menuItems = [
        { id: 1, name: 'Main Page', route: '/mainPageStaff' },
        { id: 2, name: 'Operations Request', route: '/operationRequest' },
        
    ];

    return (
        <div className="app-wrapper">
          <Navbar menuItemsProp={menuItems} />
          <main className="main-content">
            <div className="container">
              <h1 className="text-3xl font-bold text-center mb-8">Admin Patient Page</h1>
    
              {/* Table Container */}
              <div className="table-container">
                <SelectableTable
                  data={operationRequests}
                  headers={[
                    { key: 'recordNumber', label: 'Record Number' },
                    { key: 'priority', label: 'Priority' },
                    { key: 'deadline', label: 'Deadline' },
                    { key: 'status', label: 'Status' },
                    { key: 'operationTypeName', label: 'Operation Type' },
                  ]}
                  onRowSelect={setSelectedOperationRequest}
                />
              </div>
    
              {/* Action Buttons */}
              <div className="action-buttons">
                <Button onClick={handleNavigateToCreate} className="button button-primary">
                  Create Patient
                </Button>
                <Button onClick={handleNavigateToUpdate} disabled={!selectedOperationRequest} className="button button-primary">
                  Update Patient
                </Button>
                <Button onClick={handleNavigateToDelete} disabled={!selectedOperationRequest} className="button button-danger">
                  {selectedOperationRequest?.isToBeDeleted ? 'Delete Patient' : 'Mark for Deletion'}
                </Button>
              </div>
    
              {/* Modal for confirmation before delete/mark */}
              {isModalOpen && (
                <div className="modal">
                  <div className="modal-content">
                    <h2>{modalContent.title}</h2>
                    <p>{modalContent.message}</p>
                    <div>
                      <button onClick={modalContent.action}>Confirm</button>
                      <button onClick={closeModal}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            </main>
            <Footer /> {/* Footer at the bottom */}
        </div>
      );
    
    
};

export default OperationRequest;