import React, { useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import dayjs from "dayjs";
import "./App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "./Modal";

const App = () => {
  const localizer = dayjsLocalizer(dayjs);
  const DnDCalendar = withDragAndDrop(Calendar);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: `Slashash Tech LLP,${dayjs(
        "2024-02-14T12:00:00"
      )}-&{dayjs("2024-02-14T13:00:00")}`,
      color: "#135691",
    },
    {
      start: dayjs("2024-02-14T08:00:00").toDate(),
      end: dayjs("2024-02-14T09:00:00").toDate(),
      title: "Meeting with Marketing Team",
      color: "#FF5733",
      id: 2,
    },
    {
      start: dayjs("2024-02-14T10:00:00").toDate(),
      end: dayjs("2024-02-14T11:00:00").toDate(),
      title: "Conference Call with Investors",
      color: "#33FF57",
      id: 3,
    },
    {
      start: dayjs("2024-02-14T13:00:00").toDate(),
      end: dayjs("2024-02-14T14:00:00").toDate(),
      title: "Lunch with Clients",
      color: "#5733FF",
      id: 4,
    },
    {
      start: dayjs("2024-02-14T16:00:00").toDate(),
      end: dayjs("2024-02-14T17:00:00").toDate(),
      title: "Team Building Activity",
      color: "#33FFCC",
      id: 5,
    },
    {
      start: dayjs("2024-02-14T09:00:00").toDate(),
      end: dayjs("2024-02-14T10:00:00").toDate(),
      title: "Training Session",
      color: "#CC33FF",
      id: 6,
    },
    {
      start: dayjs("2024-02-14T06:00:00").toDate(),
      end: dayjs("2024-02-14T08:00:00").toDate(),
      title: "Product Development Meeting",
      color: "#FF3399",
      id: 7,
    },
    {
      start: dayjs("2024-02-15T10:00:00").toDate(),
      end: dayjs("2024-02-15T11:00:00").toDate(),
      title: "Strategy Planning Workshop",
      color: "#99FF33",
      id: 8,
    },
    {
      start: dayjs("2024-02-15T12:00:00").toDate(),
      end: dayjs("2024-02-15T13:00:00").toDate(),
      title: "Client Presentation",
      color: "#3333FF",
      id: 9,
    },
  ]);

  const onEventResize = (data) => {
    const { start, end } = data;
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents];
      updatedEvents[0].start = start;
      updatedEvents[0].end = end;
      return updatedEvents;
    });
  };

  const onEventDrop = (data) => {
    const { event, start, end } = data;
    setEvents((prevEvents) => {
      return prevEvents.map((prevEvent) =>
        prevEvent.id === event.id ? { ...prevEvent, start, end } : prevEvent
      );
    });
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.color,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ marginLeft: "10px", marginRight: "10px" }}>
      <div className="main-width700">
        <DnDCalendar
          defaultView="month"
          events={events}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          resizable
          style={{ height: "100vh", width: "100%" }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={(event) => handleEventClick(event)}
        />
      </div>
      <div className="max-width500">
        <DnDCalendar
          view={"day"}
          views={""}
          events={events}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          resizable
          style={{ height: "100vh", width: "100%" }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={(event) => handleEventClick(event)}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} event={selectedEvent} />
    </div>
  );
};

export default App;
