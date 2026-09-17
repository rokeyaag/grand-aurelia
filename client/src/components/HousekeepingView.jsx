import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Bed, 
  Check, 
  Plus, 
  Filter, 
  X,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HousekeepingView({ 
  housekeepingTasks, 
  rooms, 
  onUpdateHousekeepingStatus, 
  onCreateHousekeepingTask 
}) {
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  // New task form state
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0]?.id || '');
  const [taskType, setTaskType] = useState('Daily Turndown & Sanitization');
  const [assignedTo, setAssignedTo] = useState('Farhana Akter');
  const [priority, setPriority] = useState('Medium');
  const [notes, setNotes] = useState('');

  const filteredTasks = housekeepingTasks.filter(t => {
    if (filterPriority === 'ALL') return true;
    return t.priority.toUpperCase() === filterPriority;
  });

  const handleStatusChange = (taskId, newStatus) => {
    onUpdateHousekeepingStatus(taskId, newStatus);
    if (newStatus === 'Cleaned') {
      confetti({ particleCount: 50, spread: 45 });
    }
  };

  const handleCreateTaskSubmit = (e) => {
    e.preventDefault();
    const room = rooms.find(r => r.id === selectedRoomId);
    if (!room) return;

    onCreateHousekeepingTask({
      roomId: room.id,
      roomNumber: room.number,
      taskType,
      assignedTo,
      priority,
      notes
    });

    setShowNewTaskModal(false);
    setNotes('');
  };

  return (
    <div className="housekeeping-view-container animate-fade-in">
      {/* Header */}
      <div className="section-header-row">
        <div>
          <h2>Housekeeping & Facility Care</h2>
          <p className="text-secondary">
            Room cleaning turnover, daily sanitization schedules, and room inspection status.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-primary" onClick={() => setShowNewTaskModal(true)}>
            <Plus size={16} /> Schedule Cleaning Task
          </button>
        </div>
      </div>

      {/* Priority Filters */}
      <div className="filter-pills-bar mt-3">
        {['ALL', 'HIGH', 'MEDIUM'].map(p => (
          <button 
            key={p} 
            className={`filter-pill ${filterPriority === p ? 'active' : ''}`}
            onClick={() => setFilterPriority(p)}
          >
            {p} Priority ({p === 'ALL' ? housekeepingTasks.length : housekeepingTasks.filter(t => t.priority.toUpperCase() === p).length})
          </button>
        ))}
      </div>

      {/* Task Columns Grid / Cards */}
      <div className="hk-columns-grid">
        {/* Column 1: Pending */}
        <div className="hk-column">
          <div className="hk-column-header bg-danger-subtle">
            <div className="flex items-center gap-2 font-semibold">
              <Clock size={16} className="text-danger" />
              <span>Pending Cleaning ({filteredTasks.filter(t => t.status === 'Pending').length})</span>
            </div>
          </div>

          <div className="hk-task-list">
            {filteredTasks.filter(t => t.status === 'Pending').map(task => (
              <div key={task.id} className="hk-task-card card">
                <div className="flex items-center justify-between mb-2">
                  <span className="hk-room-tag">Suite {task.roomNumber}</span>
                  <span className={`badge badge-${task.priority === 'High' ? 'danger' : 'warning'}`}>
                    {task.priority} Priority
                  </span>
                </div>

                <h4 className="hk-task-title">{task.taskType}</h4>
                <p className="hk-task-desc">{task.notes || 'Standard housekeeping protocol.'}</p>

                <div className="hk-task-meta">
                  <span className="text-xs text-muted flex items-center gap-1">
                    <UserCheck size={12} /> {task.assignedTo}
                  </span>
                </div>

                <div className="hk-task-footer mt-3">
                  <button 
                    className="btn btn-primary btn-sm w-full" 
                    onClick={() => handleStatusChange(task.id, 'In-Progress')}
                  >
                    Start Cleaning
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: In-Progress */}
        <div className="hk-column">
          <div className="hk-column-header bg-warning-subtle">
            <div className="flex items-center gap-2 font-semibold">
              <Sparkles size={16} className="text-warning" />
              <span>In-Progress ({filteredTasks.filter(t => t.status === 'In-Progress').length})</span>
            </div>
          </div>

          <div className="hk-task-list">
            {filteredTasks.filter(t => t.status === 'In-Progress').map(task => (
              <div key={task.id} className="hk-task-card card border-warning">
                <div className="flex items-center justify-between mb-2">
                  <span className="hk-room-tag">Suite {task.roomNumber}</span>
                  <span className="badge badge-warning">Active Cleaning</span>
                </div>

                <h4 className="hk-task-title">{task.taskType}</h4>
                <p className="hk-task-desc">{task.notes}</p>

                <div className="hk-task-meta">
                  <span className="text-xs text-muted flex items-center gap-1">
                    <UserCheck size={12} /> {task.assignedTo}
                  </span>
                </div>

                <div className="hk-task-footer mt-3">
                  <button 
                    className="btn btn-accent btn-sm w-full" 
                    onClick={() => handleStatusChange(task.id, 'Cleaned')}
                  >
                    <CheckCircle2 size={15} /> Mark Cleaned & Ready
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Cleaned & Inspected */}
        <div className="hk-column">
          <div className="hk-column-header bg-success-subtle">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 size={16} className="text-success" />
              <span>Cleaned & Available ({filteredTasks.filter(t => t.status === 'Cleaned' || t.status === 'Completed').length})</span>
            </div>
          </div>

          <div className="hk-task-list">
            {filteredTasks.filter(t => t.status === 'Cleaned' || t.status === 'Completed').map(task => (
              <div key={task.id} className="hk-task-card card border-success opacity-85">
                <div className="flex items-center justify-between mb-2">
                  <span className="hk-room-tag">Suite {task.roomNumber}</span>
                  <span className="badge badge-success">Clean & Inspected</span>
                </div>

                <h4 className="hk-task-title">{task.taskType}</h4>
                <p className="hk-task-desc">{task.notes}</p>

                <div className="hk-task-meta">
                  <span className="text-xs text-muted flex items-center gap-1">
                    <UserCheck size={12} /> {task.assignedTo}
                  </span>
                  <span className="text-xs text-success font-semibold">Ready for Guest Check-In</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Cleaning Task Modal */}
      {showNewTaskModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-primary" />
                <h3>Schedule Room Cleaning Task</h3>
              </div>
              <button className="btn-ghost" onClick={() => setShowNewTaskModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateTaskSubmit} className="modal-body">
              <div className="form-group">
                <label>Select Room</label>
                <select 
                  value={selectedRoomId} 
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="form-control"
                >
                  {rooms.map(r => (
                    <option key={r.id} value={r.id}>
                      Suite {r.number} ({r.type}) — {r.status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Task Type</label>
                <select 
                  value={taskType} 
                  onChange={(e) => setTaskType(e.target.value)}
                  className="form-control"
                >
                  <option value="Post Checkout Deep Clean">Post Checkout Deep Clean & Linen Turnover</option>
                  <option value="Daily Turndown & Sanitization">Daily Turndown & Sanitization</option>
                  <option value="Mini-Bar & Amenities Restock">Mini-Bar & Toiletries Restock</option>
                  <option value="AC & Fixture Maintenance">AC & Fixture Maintenance</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Assign Housekeeper</label>
                  <input 
                    type="text" 
                    value={assignedTo} 
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)}
                    className="form-control"
                  >
                    <option value="High">High (Immediate Turnover)</option>
                    <option value="Medium">Medium (Scheduled)</option>
                    <option value="Low">Low (Routine Check)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Cleaning Notes</label>
                <textarea 
                  rows="2" 
                  placeholder="Special instructions, e.g. extra feather pillows or bathroom sanitization..." 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-control"
                ></textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowNewTaskModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Sparkles size={16} /> Assign Housekeeping Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
