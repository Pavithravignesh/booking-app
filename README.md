# Room Booking Scheduler

A simple web application for managing room bookings and schedules. Built with Next.js, TypeScript, and Tailwind CSS.

![Room Booking Scheduler](screenshot.png)

## 🌟 Features

- Dynamic room count management
- Interactive date selection
- Persistent room count storage
- Responsive design
- Real-time schedule updates
- Modern, clean UI

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm 

### Installation

1. Clone the repository: 

git clone https://github.com/yourusername/room-booking-scheduler.git

cd room-booking-scheduler

2. Install dependencies:

npm install

3. Run the development server:

bash

npm install

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - The React framework for production
- [TypeScript](https://www.typescriptlang.org/) - For type-safe code
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [React](https://reactjs.org/) - UI library

## 📱 Components

### DateSelector
Allows users to select dates for room bookings.

### RoomScheduler
Displays and manages the scheduling grid for all rooms.

### RoomCountSelector
Controls the number of rooms available for booking.

## 💾 Local Storage

The application uses browser's localStorage to persist the room count between sessions, ensuring a seamless user experience.

## 🎨 Styling

The project uses Tailwind CSS for styling, providing:
- Responsive design
- Modern UI components
- Consistent styling across the application
- Easy customization

## Achieved Functionalities

- month and year can be selected,
- Week starts with monday, as saturday and sunday were hoildays. Yet, If the user wants have slot they can be!
- x - axis in the table represents the time slots and y - axis represents the rooms.
- User can select the date and time slot to book the room.
- Rooms count for the daycan be configurable,
- once, booking got confirmed, it will be shown in the table.
- User can cancel the booking.
- data's will be persisted in the local storage.

## 👥 Authors

- Pavithravignesh Sathasivam

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by modern scheduling solutions
- Built with ❤️ using Next.js
