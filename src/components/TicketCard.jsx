import React from "react";
import "../styles/TicketCard.css";
import LowPriorityIcon from "../assets/Img - Low Priority.svg"; // Replace with actual priority icons
import MediumPriorityIcon from "../assets/Img - Medium Priority.svg";
import HighPriorityIcon from "../assets/Img - High Priority.svg";
import UrgentPriorityIcon from "../assets/SVG - Urgent Priority.svg";
import NoPriorityIcon from "../assets/No-priority.svg";

// Map priority icons
const priorityIcons = {
  0: NoPriorityIcon,
  1: LowPriorityIcon,
  2: MediumPriorityIcon,
  3: HighPriorityIcon,
  4: UrgentPriorityIcon,
};

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <img
          src={priorityIcons[ticket.priority]}
          alt={`Priority ${ticket.priority}`}
          className="priority-icon"
        />
      </div>
      <h3 className="ticket-title">{ticket.title}</h3>
      <div className="card-footer">
        <div className="tag-container">
          {ticket.tag.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
        {ticket.user && (
          <div className="user-avatar">
            <img
              src={`https://ui-avatars.com/api/?name=${ticket.user}&background=random`} // Example avatar generator
              alt={ticket.user}
              className="avatar-img"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketCard;
