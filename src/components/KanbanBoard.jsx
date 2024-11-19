
import React, { useEffect, useState } from "react";
import { fetchTickets } from "../api/kanbanApi";
import TicketCard from "./TicketCard";
import AddIcon from "../assets/add.svg";
import PlusIcon from "../assets/add.svg";
import ThreeDotIcon from "../assets/3 dot menu.svg";
import TodoIcon from "../assets/To-do.svg";
import InProgressIcon from "../assets/in-progress.svg";
import DoneIcon from "../assets/Done.svg";
import CanceledIcon from "../assets/Cancelled.svg";
import UrgentIcon from "../assets/SVG - Urgent Priority.svg";
import HighIcon from "../assets/Img - High Priority.svg";
import MediumIcon from "../assets/Img - Medium Priority.svg";
import LowIcon from "../assets/Img - Low Priority.svg";
import NoPriorityIcon from "../assets/No-priority.svg";
import "../styles/KanbanBoard.css";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState({});
  const [grouping, setGrouping] = useState("status"); // Default grouping
  const [sortBy, setSortBy] = useState("priority"); // Default sorting

  const statusIcons = {
    Todo: TodoIcon,
    "In Progress": InProgressIcon,
    Done: DoneIcon,
    Cancelled: CanceledIcon,
  };

  const priorityIcons = {
    Urgent: UrgentIcon,
    High: HighIcon,
    Medium: MediumIcon,
    Low: LowIcon,
    "No priority": NoPriorityIcon,
  };

  useEffect(() => {
    const loadTickets = async () => {
      const data = await fetchTickets();
      console.log("Fetched data:", data);

      const userMap = {};
      data.users.forEach((user) => {
        userMap[user.id] = user;
      });

      const updatedTickets = data.tickets.map((ticket) => ({
        ...ticket,
        user: userMap[ticket.userId]?.name || "Unassigned",
      }));

      setTickets(updatedTickets);
      setUsers(userMap);
    };
    loadTickets();
  }, []);

  const groupBy = (tickets, key) => {
    if (!Array.isArray(tickets)) return {};

    return tickets.reduce((acc, ticket) => {
      let groupKey;
      if (key === "priority") {
        const priorityLevels = ["No priority", "Low", "Medium", "High", "Urgent"];
        groupKey = priorityLevels[ticket[key]] || "Unassigned";
      } else {
        groupKey = ticket[key] || "Unassigned";
      }

      acc[groupKey] = acc[groupKey] || [];
      acc[groupKey].push(ticket);
      return acc;
    }, {});
  };

  const groupedTickets = groupBy(tickets, grouping);

  return (
    <div className="kanban-board">
      <header className="kanban-header">
        <h1>Kanban Board</h1>
        <div className="controls">
          <button className="add-ticket-btn">
            <img src={AddIcon} alt="Add" className="icon" />
            Add Ticket
          </button>
          <div className="display-control">
            <label>Group by:</label>
            <select onChange={(e) => setGrouping(e.target.value)} value={grouping}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="sorting-control">
            <label>Sort by:</label>
            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </header>
      <div className="columns">
        {Object.keys(groupedTickets).length > 0 ? (
          Object.keys(groupedTickets).map((group) => {
            const user = Object.values(users).find((u) => u.name === group);
            let icon;

            if (grouping === "status") {
              icon = statusIcons[group];
            } else if (grouping === "priority") {
              icon = priorityIcons[group];
            } else if (grouping === "user" && user) {
              icon = `https://ui-avatars.com/api/?name=${user.name}&background=random`;
            }

            return (
              <div className="column" key={group}>
                <div className="column-header">
                  <div className="header-left">
                    {icon && <img src={icon} alt={group} className="header-icon" />}
                    <h2>{group}</h2>
                    <span className="ticket-count">{groupedTickets[group].length}</span>
                  </div>
                  <div className="header-actions">
                    <img src={PlusIcon} alt="Add" className="action-icon" />
                    <img src={ThreeDotIcon} alt="Options" className="action-icon" />
                  </div>
                </div>
                {groupedTickets[group].map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            );
          })
        ) : (
          <div>No tickets available for the selected grouping.</div>
        )}
      </div>
    </div>
  );
};

export default KanbanBoard;



