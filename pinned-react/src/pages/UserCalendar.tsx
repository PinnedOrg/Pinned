import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '@/styles/customCalendarStyles.css';

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    id: 1,
    title: 'Meeting',
    start: new Date(2024, 6, 15, 10, 0), // year, month (0-based index), day, hour, minute
    end: new Date(2024, 6, 15, 12, 0),
  },
  {
    id: 2,
    title: 'Conference',
    start: new Date(2024, 6, 17, 11, 0),
    end: new Date(2024, 6, 17, 15, 0),
  },
];

const UserCalendar = () => {
  return (
    <div className='p-3 h-[85vh] w-[65vw] items-center justify-center shadow-xl shadow-black/20 dark:shadow-black/50 border-none bg-slate-300 rounded-lg ml-3'>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={(event) => {
          return { style: { backgroundColor: '#FF0000' } };
        }}
      />
    </div>
  );
};

export default UserCalendar;
